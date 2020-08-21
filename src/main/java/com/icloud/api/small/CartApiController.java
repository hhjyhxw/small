package com.icloud.api.small;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.annotation.LoginUser;
import com.icloud.common.R;
import com.icloud.modules.bsactivity.service.BsactivityAdService;
import com.icloud.modules.small.entity.SmallCart;
import com.icloud.modules.small.entity.SmallSpu;
import com.icloud.modules.small.service.SmallCartService;
import com.icloud.modules.small.service.SmallSpuService;
import com.icloud.modules.small.vo.CartTotalVo;
import com.icloud.modules.small.vo.CartVo;
import com.icloud.modules.wx.entity.WxUser;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api("购物车相关接口")
@RestController
@RequestMapping("/api/cart")
public class CartApiController {

    @Autowired
    private BsactivityAdService bsactivityAdService;
    @Autowired
    private SmallCartService smallCartService;
    @Autowired
    private SmallSpuService smallSpuService;

    /**
     * 单个店铺商品购物车
     * @return
     */
    @ApiOperation(value="获取用户店铺购车信息", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "supplierId", value = "商户id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/cartList",method = {RequestMethod.GET})
    @ResponseBody
//    @AuthIgnore
    public R cartList(@RequestParam Long supplierId,@LoginUser WxUser user) {
        if(supplierId==null){
            return R.error("零售户id为空");
        }
        Map<String,Object> params = new HashMap<String,Object>();
        params.put("user_id",user.getId());
        params.put("supplier_id",supplierId);
        List<CartVo> list  = smallCartService.getCartVoList(params);
        CartTotalVo total = getTotal(list);
        return R.ok().put("list",list).put("totalAmout",total.getTotalAmout()).put("totalNum",total.getTotalNum());
    }



    @ApiOperation(value="购物车加一", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "supplierId", value = "商户id", required = true, paramType = "query", dataType = "Long"),
            @ApiImplicitParam(name = "skuId", value = "商品id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/addCart",method = {RequestMethod.GET})
    @ResponseBody
    public R addCart(@RequestParam Long supplierId,@RequestParam Long skuId,@LoginUser WxUser user) {
        if(supplierId==null || skuId==null){
            return R.error("缺少参数");
        }
        //库存校验
        if(!checkStock(skuId,1L)){
            return R.error("库存不足");
        }
        SmallCart cart = new SmallCart();
        List<SmallCart> list  = smallCartService.list(new QueryWrapper<SmallCart>()
                .eq("user_id",user.getId())
                .eq("sku_id",skuId)
                .eq("supplier_id",supplierId));
        if (!CollectionUtils.isEmpty(list)) {
            //若非空
            cart.setId(list.get(0).getId());
            cart.setNum(list.get(0).getNum()+1);
            cart.setModifyTime(new Date());
            return smallCartService.updateById(cart)?R.ok():R.error();
        }else{
            cart.setNum(1);
            cart.setCreateTime(new Date());
            cart.setUserId((long)user.getId());
            cart.setSupplierId(supplierId);
            cart.setSkuId(skuId);
            return smallCartService.save(cart)?R.ok():R.error();
        }
    }


    @ApiOperation(value="购物车减一", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "supplierId", value = "商户id", required = true, paramType = "query", dataType = "Long"),
            @ApiImplicitParam(name = "skuId", value = "商品id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/subCart",method = {RequestMethod.GET})
    @ResponseBody
    public R subCart(@RequestParam Long supplierId,@RequestParam Long skuId,@LoginUser WxUser user) {
        if(supplierId==null || skuId==null){
            return R.error("缺少参数");
        }
        SmallCart cart = new SmallCart();
        List<SmallCart> list  = smallCartService.list(new QueryWrapper<SmallCart>()
                .eq("user_id",user.getId())
                .eq("sku_id",skuId)
                .eq("supplier_id",supplierId));
        if (!CollectionUtils.isEmpty(list)) {

            boolean result = false;
            cart.setId(list.get(0).getId());
            cart.setNum(list.get(0).getNum()-1);
            cart.setModifyTime(new Date());
            if(cart.getNum().intValue()<=0){
                result = smallCartService.removeById(cart);
            }else{
                result = smallCartService.updateById(cart);
            }
            return result?R.ok():R.error();
        }
        return R.ok();
    }



    @ApiOperation(value="删除一项购物项", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "购物车id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/deletCart",method = {RequestMethod.GET})
    @ResponseBody
    public R deletCart(@RequestParam Long id,@LoginUser WxUser user) {
        if(id==null ){
            return R.error("购物车id为空");
        }
        boolean result = smallCartService.remove(new QueryWrapper<SmallCart>()
                .eq("user_id",user.getId())
                .eq("id",id));

        return result?R.ok():R.error();
    }


    @ApiOperation(value="删除多项购物项", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", value = "购物车ids", required = true, paramType = "query", dataType = "body")
    })
    @RequestMapping(value = "/deletBatchCart",method = {RequestMethod.POST})
    @ResponseBody
    public R deletBatchCart(@RequestBody Long[] ids,@LoginUser WxUser user) {
        if(ids==null || ids.length<=0){
            return R.error("购物车id为空");
        }
        boolean result = smallCartService.remove(new QueryWrapper<SmallCart>()
                .eq("user_id",user.getId())
                .in("id", ids));

        return result?R.ok():R.error();
    }


    @ApiOperation(value="清空购物项", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "supplierId", value = "商户id", required = true, paramType = "query", dataType = "Long"),
    })
    @RequestMapping(value = "/deletAllCart",method = {RequestMethod.GET})
    @ResponseBody
    public R deletAllCart(@RequestParam Long supplierId,@LoginUser WxUser user) {
        if(supplierId==null){
            return R.error("supplierId为空");
        }
        boolean result = smallCartService.remove(new QueryWrapper<SmallCart>()
                .eq("user_id",user.getId())
                .eq("supplier_id", supplierId));

        return result?R.ok():R.error();
    }




    @ApiOperation(value="更新购物车", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "购车和id", required = true, paramType = "query", dataType = "Long"),
            @ApiImplicitParam(name = "skuId", value = "商品id", required = true, paramType = "query", dataType = "Long"),
            @ApiImplicitParam(name = "num", value = "商品数量", required = true, paramType = "query", dataType = "Long"),
    })
    @RequestMapping(value = "/updateCart",method = {RequestMethod.GET})
    @ResponseBody
    public R updateCart(@RequestParam Long id,@RequestParam Long skuId,@RequestParam Long num,@LoginUser WxUser user) {
        if(id==null || skuId==null){
            return R.error("id为空");
        }
        if(id==num || num.intValue()<=0 ){
            return R.error("num不正确");
        }
        if(!checkStock(skuId,num)){
            return R.error("库存不足");
        }
        SmallCart cart = new SmallCart();
        cart.setNum(num.intValue());
        cart.setModifyTime(new Date());
        boolean result = smallCartService.update(cart,new QueryWrapper<SmallCart>()
                .eq("user_id",user.getId())
                .eq("id", id));
        return result?R.ok():R.error();
    }


    @ApiOperation(value="查询购车数量", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "supplierId", value = "商户id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/countCart",method = {RequestMethod.GET})
    @ResponseBody
    public R countCart(@RequestParam Long supplierId,@LoginUser WxUser user) {
        if(supplierId==null){
            return R.error("supplierId为空");
        }
        int num = smallCartService.count(new QueryWrapper<SmallCart>()
                .eq("user_id",user.getId())
                .eq("supplier_id", supplierId));
        return R.ok().put("totalNum",num);
    }

    public boolean checkStock(Long id, Long num){
        SmallSpu smallSpu = (SmallSpu) smallSpuService.getById(id);
        int kuncun = smallSpu.getStock()-(smallSpu.getFreezeStock()!=null?smallSpu.getFreezeStock():0);
        if(kuncun>=num.intValue()){
            return true;
        }
        return false;
    }


    /**
     * 计算商品总数 和总额
     * @return
     */
    private  CartTotalVo getTotal(List<CartVo> list){
        int totalAmout = 0;
        int totalNum = 0;
        CartTotalVo total = new CartTotalVo();
        for (CartVo temp:list){
            totalAmout+=temp.getPrice();
            totalNum+=temp.getNum();
        }
        total.setTotalAmout(totalAmout);
        total.setTotalNum(totalNum);
        return total;
    }


}
