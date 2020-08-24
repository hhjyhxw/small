package com.icloud.api.small;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.annotation.AuthIgnore;
import com.icloud.annotation.LoginUser;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.bsactivity.service.BsactivityAdService;
import com.icloud.modules.small.entity.SmallAddress;
import com.icloud.modules.small.service.SmallAddressService;
import com.icloud.modules.small.service.SmallCategoryService;
import com.icloud.modules.small.vo.AddressVo;
import com.icloud.modules.wx.entity.WxUser;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api("用户地址关接口")
@RestController
@RequestMapping("/api/address")
public class SmallAddressApiController {

    @Autowired
    private BsactivityAdService bsactivityAdService;
    @Autowired
    private SmallCategoryService smallCategoryService;
    @Autowired
    private SmallAddressService smallAddressService;

    /**
     * 获取用户地址列表
     * @return
     */
    @ApiOperation(value="用户地址列表", notes="")
    @ApiImplicitParams({
//            @ApiImplicitParam(name = "id", value = "商户id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/addresslist",method = {RequestMethod.GET})
    @ResponseBody
    public R addresslist(@LoginUser WxUser user) {
        List<SmallAddress> smallAddressList = smallAddressService.list(new QueryWrapper<SmallAddress>().eq("user_id",user.getId()));
       return R.ok().put("list",smallAddressList);
    }


    /**
     * 根据id获取地址
     * @return
     */
    @ApiOperation(value="获取地址详细信息", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "地址id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/getAddress",method = {RequestMethod.GET})
    @ResponseBody
    public R getAddress(@RequestParam Long id,@LoginUser WxUser user) {
        List<SmallAddress> smallAddressList = smallAddressService.list(new QueryWrapper<SmallAddress>().eq("user_id",user.getId()).eq("id",id));
        return R.ok().put("address",smallAddressList!=null?smallAddressList.get(0):null);
    }

    /**
     * 添加或者更新地址
     * @return
     */
    @ApiOperation(value="添加或者更新地址", notes="")
    @RequestMapping(value = "/addOrUpadteDdress",method = {RequestMethod.POST})
    @ResponseBody
    public R addOrUpadteDdress(@RequestBody AddressVo addressVo, @LoginUser WxUser user) {
        ValidatorUtils.validateEntityForFront(addressVo);
        addressVo.setUserId(user.getId().longValue());
        SmallAddress smallAddress = new SmallAddress();
        BeanUtils.copyProperties(addressVo,smallAddress);
        boolean resutl = smallAddressService.saveOrUpdate(smallAddress);
        return resutl?R.ok():R.error();
    }

    /**
     * 设置默认地址
     * @return
     */
    @ApiOperation(value="设置默认地址", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "地址id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/setDefaut",method = {RequestMethod.GET})
    @ResponseBody
    @AuthIgnore
    public R setDefaut(@RequestParam Long id,@LoginUser WxUser user) {
        int result = smallAddressService.setDefaut(id,user);
        return result==1?R.ok():R.error();
    }

    /**
     * 删除地址
     * @return
     */
    @ApiOperation(value="删除地址", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "地址id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/deleteAddress",method = {RequestMethod.GET})
    @ResponseBody
    @AuthIgnore
    public R deleteAddress(@RequestParam Long id,@LoginUser WxUser user) {
        boolean result = smallAddressService.remove(new QueryWrapper<SmallAddress>().eq("id",id).eq("user_id",user.getId()));
        return result?R.ok():R.error();
    }
}
