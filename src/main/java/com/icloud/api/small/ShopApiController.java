package com.icloud.api.small;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.annotation.AuthIgnore;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.modules.bsactivity.entity.BsactivityAd;
import com.icloud.modules.bsactivity.service.BsactivityAdService;
import com.icloud.modules.small.entity.SmallCategory;
import com.icloud.modules.small.entity.SmallSpu;
import com.icloud.modules.small.service.SmallCategoryService;
import com.icloud.modules.small.service.SmallSpuService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Api("店铺与商品相关接口")
@RestController
@RequestMapping("/api/shop")
public class ShopApiController {

    @Autowired
    private BsactivityAdService bsactivityAdService;
    @Autowired
    private SmallCategoryService smallCategoryService;
    @Autowired
    private SmallSpuService smallSpuService;

    /**
     * 获取滚动广告列表
     * @return
     */
    @ApiOperation(value="获取广告列表", notes="")
    @RequestMapping(value = "/adlist",method = {RequestMethod.GET})
    @ResponseBody
    @AuthIgnore
    public R adlist() {
       List<BsactivityAd> list  = bsactivityAdService.list(new QueryWrapper<BsactivityAd>().eq("status",1));
       return R.ok().put("list",list);
    }

    /**
     * 获取商品分类列表
     * @return
     */
    @ApiOperation(value="获取商品分类", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "supplierId", value = "商户id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/categoryList",method = {RequestMethod.GET})
    @ResponseBody
    @AuthIgnore
    public R categoryList(@RequestParam Long supplierId) {

        List<SmallCategory> list  = smallCategoryService.list(new QueryWrapper<SmallCategory>().eq("status",1));
        return R.ok().put("list",list);
    }

    /**
     * 获取商品列表
     * 目前需要参数：
     *
     *   pageNum //第几页
     *   pageSize  //每页条数
     *   categoryId //分类id
     *   supplierId //商户id (必填)
     * @return
     */
    @ApiOperation(value="获取商品列表", notes="")
//    @ApiImplicitParams({
//            @ApiImplicitParam(name = "pageNum", value = "页码", required = false, paramType = "query", dataType = "Integer"),
//            @ApiImplicitParam(name = "pageSize", value = "每页多少记录", required = false, paramType = "query", dataType = "Integer"),
//            @ApiImplicitParam(name = "supplierId", value = "商户id", required = true, paramType = "query", dataType = "Long"),
//            @ApiImplicitParam(name = "categoryId", value = "分类id", required = false, paramType = "query", dataType = "Long"),
//
//    })
    @RequestMapping(value = "/goodsList",method = {RequestMethod.GET})
    @ResponseBody
    @AuthIgnore
//    public R goodsList(@RequestParam String pageNum,@RequestParam String pageSize,@RequestParam Long supplierId,@RequestParam String categoryId) {
    public R goodsList(@RequestParam Map<String,Object> params) {
        if(!params.containsKey("supplierId")){
            return R.error("商户id为空");
        }
        Query query = new Query(new HashMap<>());
        query.put("status",1);
        query.put("page",params.get("pageNum"));
        query.put("limit",params.get("pageSize"));
        query.put("supplierId",params.get("supplierId"));
        query.put("categoryId",params.get("categoryId"));
        PageUtils<SmallSpu> page = smallSpuService.findByPage(query.getPageNum(),query.getPageSize(), query);
        return R.ok().put("page", page);
    }

    /**
     * 获取商品分详细
     * @return
     */
    @ApiOperation(value="获取商品详细", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "商品id", required = true, paramType = "query", dataType = "Long"),
    })
    @RequestMapping(value = "/goodsDetail",method = {RequestMethod.GET})
    @ResponseBody
    @AuthIgnore
    public R goodsDetail(@RequestParam Long id)  {
        if(id==null){
            return R.error("商品id不能为空");
        }
        Object smallSpu = smallSpuService.getById(id);
        return R.ok().put("goods",smallSpu);
    }

}
