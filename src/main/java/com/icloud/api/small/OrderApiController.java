package com.icloud.api.small;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.annotation.LoginUser;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.beanutils.ColaBeanUtils;
import com.icloud.common.util.StringUtil;
import com.icloud.modules.small.entity.SmallAddress;
import com.icloud.modules.small.entity.SmallOrder;
import com.icloud.modules.small.entity.SmallOrderDetail;
import com.icloud.modules.small.entity.SmallSpu;
import com.icloud.modules.small.service.SmallAddressService;
import com.icloud.modules.small.service.SmallOrderDetailService;
import com.icloud.modules.small.service.SmallOrderService;
import com.icloud.modules.small.service.SmallSpuService;
import com.icloud.modules.small.util.CartOrderUtil;
import com.icloud.modules.small.vo.*;
import com.icloud.modules.wx.entity.WxUser;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Api("订单相关接口")
@RestController
@RequestMapping("/api/order")
public class OrderApiController {

    @Autowired
    private SmallSpuService smallSpuService;
    @Autowired
    private SmallOrderService smallOrderService;
    @Autowired
    private SmallOrderDetailService smallOrderDetailService;
    @Autowired
    private SmallAddressService smallAddressService;

    @ApiOperation(value="订单确认", notes="")
    @RequestMapping(value = "/preOrder",method = {RequestMethod.POST})
    @ResponseBody
    public R preOrder(@RequestBody PreOrder preOrder, @LoginUser WxUser user) throws Exception {

        if(preOrder==null || !StringUtil.checkStr(preOrder.getTypes())){
            return R.error("参数为空");
        }
        if(preOrder.getNum()==null || preOrder.getNum().length==0 || preOrder.getSkuId()==null || preOrder.getNum().length!=preOrder.getSkuId().length){
            return R.error("参数不正确");
        }
        SmallAddress address = null;
        List<SmallAddress> addressList = smallAddressService.list(new QueryWrapper<SmallAddress>().eq("user_id",user.getId()));
        for (SmallAddress temp:addressList){
            if(temp.getDefaultAddress()!=null && temp.getDefaultAddress().intValue()==1){
                address = temp;
                break;
            }
        }
        if(address==null && addressList!=null && addressList.size()>0){
            address = addressList.get(0);
        }

        List<CartVo> list  = new ArrayList<CartVo>();
        for(int i=0;i<preOrder.getSkuId().length;i++){
            CartVo vo = new CartVo();
            SmallSpu spu = (SmallSpu) smallSpuService.getById(preOrder.getSkuId()[i]);
            BeanUtils.copyProperties(vo,spu);
            vo.setNum(preOrder.getNum()[i].intValue());
            vo.setUserId(user.getId().longValue());
            if(vo.getNum().intValue()<=0){
                vo.setNum(1);
            }
            vo.setSkuId(vo.getId());
            vo.setId(null);
            list.add(vo);
        }
        CartTotalVo total = CartOrderUtil.getTotal(list);
        return R.ok().put("list",list).put("totalAmout",total.getTotalAmout()).put("totalNum",total.getTotalNum()).put("address",address);
    }


    @ApiOperation(value="生成订单", notes="")
    @RequestMapping(value = "/createOrder",method = {RequestMethod.POST})
    @ResponseBody
    public R createOrder(@RequestBody PreOrder preOrder, @LoginUser WxUser user) throws Exception {
        try {

            if(preOrder==null || !StringUtil.checkStr(preOrder.getTypes())){
                return R.error("参数为空");
            }
            if(preOrder.getNum()==null || preOrder.getNum().length==0 || preOrder.getSkuId()==null || preOrder.getNum().length!=preOrder.getSkuId().length){
                return R.error("商品数量与商品id不匹配");
            }
            if(preOrder.getSupplierId()==null || preOrder.getSupplierId()<=0){
                return R.error("商户id不能为空");
            }
            if(preOrder.getAddressId()==null || preOrder.getAddressId()<=0){
                return R.error("收货地址不能为空");
            }
            SmallAddress address = null;
            List<SmallAddress> addressList = smallAddressService.list(new QueryWrapper<SmallAddress>().eq("user_id",user.getId()).eq("id",preOrder.getAddressId()));
            if(addressList==null || addressList.size()<=0){
                return R.error("收货地址不能为空");
            }
            address = addressList.get(0);
                //2、生成订单、冻结库存
            return  smallOrderService.createOrder(preOrder,user,address);
        }catch (Exception e){
            e.printStackTrace();
            return R.error(e.getMessage());
        }
    }



    /**
     * 用户订单列表
     * @return
     */
    @ApiOperation(value="用户订单列表", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageNum", value = "页码", required = false, paramType = "query", dataType = "String"),
            @ApiImplicitParam(name = "pageSize", value = "每页多少记录", required = false, paramType = "query", dataType = "String")
    })
    @RequestMapping(value = "/orderlist",method = {RequestMethod.GET})
    @ResponseBody
    public R orderlist(@LoginUser WxUser user,String pageNum,String pageSize) {
        Query query = new Query(new HashMap<>());
        query.put("page",pageNum);
        query.put("limit",pageSize);
        query.put("userId",user.getId());
//        List<SmallOrder> orderlist = smallOrderService.list(new QueryWrapper<SmallOrder>().eq("user_id",user.getId()));
        PageUtils<SmallOrder> page = smallOrderService.findByPage(query.getPageNum(),query.getPageSize(), query);
        return R.ok().put("page", page);
    }

    /**
     * 订单详情
     * @return
     */
    @ApiOperation(value="订单详情", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "订单id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/orderdetail",method = {RequestMethod.GET})
    @ResponseBody
    public R orderdetail(@RequestParam Long id,@LoginUser WxUser user) throws Exception {

        List<SmallOrder> orderlist = smallOrderService.list(new QueryWrapper<SmallOrder>().eq("user_id",user.getId()).eq("id",id));
        if(orderlist==null || orderlist.size()<=0){
            return R.error();
        }
        OrderVo orderVo = new OrderVo();
        BeanUtils.copyProperties(orderVo,orderlist.get(0));
        List<SmallOrderDetail> detaillist =  smallOrderDetailService.list(new QueryWrapper<SmallOrderDetail>().eq("order_id",orderVo.getId()));
        List<OrderDetailVo> detaillistvo = ColaBeanUtils.copyListProperties(detaillist , OrderDetailVo::new, (articleEntity, articleVo) -> {
            // 回调处理
        });
        orderVo.setDetaillist(detaillistvo);
        return R.ok().put("order",orderVo);
    }



}
