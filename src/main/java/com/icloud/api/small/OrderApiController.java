package com.icloud.api.small;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.annotation.LoginUser;
import com.icloud.common.R;
import com.icloud.common.util.StringUtil;
import com.icloud.modules.small.entity.SmallAddress;
import com.icloud.modules.small.entity.SmallSpu;
import com.icloud.modules.small.service.SmallAddressService;
import com.icloud.modules.small.service.SmallOrderService;
import com.icloud.modules.small.service.SmallSpuService;
import com.icloud.modules.small.util.CartOrderUtil;
import com.icloud.modules.small.vo.CartTotalVo;
import com.icloud.modules.small.vo.CartVo;
import com.icloud.modules.small.vo.PreOrder;
import com.icloud.modules.wx.entity.WxUser;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderApiController {

    @Autowired
    private SmallSpuService smallSpuService;
    @Autowired
    private SmallOrderService smallOrderService;
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


}
