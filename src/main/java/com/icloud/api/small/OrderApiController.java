package com.icloud.api.small;

import com.icloud.annotation.LoginUser;
import com.icloud.common.R;
import com.icloud.common.util.StringUtil;
import com.icloud.modules.bsactivity.service.BsactivityAdService;
import com.icloud.modules.small.entity.SmallSpu;
import com.icloud.modules.small.service.SmallCategoryService;
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
    private BsactivityAdService bsactivityAdService;
    @Autowired
    private SmallCategoryService smallCategoryService;
    @Autowired
    private SmallSpuService smallSpuService;


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
        List<CartVo> list  = new ArrayList<CartVo>();
        for(int i=0;i<preOrder.getSkuId().length;i++){
            CartVo vo = new CartVo();
            SmallSpu spu = (SmallSpu) smallSpuService.getById(preOrder.getSkuId()[i]);
            BeanUtils.copyProperties(vo,spu);
            vo.setNum(preOrder.getNum()[i].intValue());
            list.add(vo);
        }
        CartTotalVo total = CartOrderUtil.getTotal(list);
        return R.ok().put("list",list).put("totalAmout",total.getTotalAmout()).put("totalNum",total.getTotalNum());
    }


    @ApiOperation(value="生成订单", notes="")
    @RequestMapping(value = "/createOrder",method = {RequestMethod.POST})
    @ResponseBody
    public R createOrder(@RequestBody PreOrder preOrder, @LoginUser WxUser user) throws Exception {
        if(preOrder==null || !StringUtil.checkStr(preOrder.getTypes())){
            return R.error("参数为空");
        }
        if(preOrder.getNum()==null || preOrder.getNum().length==0 || preOrder.getSkuId()==null || preOrder.getNum().length!=preOrder.getSkuId().length){
            return R.error("参数不正确");
        }
        //直接查询商品生成订单
        if("buynow".equals(preOrder.getTypes().trim())){

        }
        //查询对应的购物车生成订单，并删除或者减少对应购物车商品数量
        if("cart".equals(preOrder.getTypes().trim())){

        }
        return R.ok();
    }


}
