package com.icloud.api.small;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.annotation.AuthIgnore;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.modules.bsactivity.entity.BsactivityAd;
import com.icloud.modules.bsactivity.service.BsactivityAdService;
import com.icloud.modules.small.entity.SmallCategory;
import com.icloud.modules.small.entity.SmallRetail;
import com.icloud.modules.small.entity.SmallSellCategory;
import com.icloud.modules.small.entity.SmallSpu;
import com.icloud.modules.small.service.SmallCategoryService;
import com.icloud.modules.small.service.SmallRetailService;
import com.icloud.modules.small.service.SmallSellCategoryService;
import com.icloud.modules.small.service.SmallSpuService;
import com.icloud.modules.small.vo.CategoryAndGoodListVo;
import com.icloud.modules.small.vo.ShopInfo;
import com.icloud.modules.small.vo.SpuVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Api("店铺与商品相关接口")
@RestController
@RequestMapping("/api/shop")
public class ShopApiController {

    @Autowired
    private BsactivityAdService bsactivityAdService;
    @Autowired
    private SmallCategoryService smallCategoryService;
    @Autowired
    private SmallSellCategoryService smallSellCategoryService;
    @Autowired
    private SmallSpuService smallSpuService;
    @Autowired
    private SmallRetailService smallRetailService;

    /**
     * 获取商品分详细
     * @return
     */
    @ApiOperation(value="获取商家信息", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "商家id", required = true, paramType = "query", dataType = "Long"),
    })
    @RequestMapping(value = "/shopInfo",method = {RequestMethod.GET})
    @ResponseBody
    @AuthIgnore
    public R shopInfo(@RequestParam Long id)  {
        if(id==null){
            return R.error("商家id不能为空");
        }
        Object shop = smallRetailService.getById(id);
        ShopInfo shopInfo = new ShopInfo();
        if(shop!=null){
            BeanUtils.copyProperties((SmallRetail)shop,shopInfo);
        }
        return R.ok().put("shopInfo",shopInfo);
    }


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
/*    @ApiOperation(value="获取商品分类", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "supplierId", value = "商户id", required = true, paramType = "query", dataType = "Long")
    })
    @RequestMapping(value = "/categoryList",method = {RequestMethod.GET})
    @ResponseBody
    @AuthIgnore
    public R categoryList(@RequestParam Long supplierId) {
        //先获取店铺个性化分类，如果店铺个性化分类不存在，则获取公共商品分类
        List<SmallSellCategory> list  = smallSellCategoryService.list(new QueryWrapper<SmallSellCategory>().eq("status",1).eq("supplier_id",supplierId));
        if(list!=null && list.size()>0){
            return R.ok().put("list",list);
        }else{
            List<SmallCategory> lists  = smallCategoryService.list(new QueryWrapper<SmallCategory>().eq("status",1));
            return R.ok().put("list",lists);
        }
    }*/


    /**
     * 获取商品分类列表(关联相关商品)
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
        List<CategoryAndGoodListVo> categoryvolist  = new ArrayList<CategoryAndGoodListVo>();
        List<SpuVo> spuListvo  = null;
        //先获取店铺个性化分类，如果店铺个性化分类不存在，则获取公共商品分类
        List<SmallSellCategory> list  = smallSellCategoryService.list(new QueryWrapper<SmallSellCategory>().eq("status",1).eq("supplier_id",supplierId));
        List<SmallSpu> spuList = smallSpuService.list(new QueryWrapper<SmallSpu>().eq("status",1).eq("supplier_id",supplierId));
        if(list!=null && list.size()>0){
            for(SmallSellCategory category:list){
                CategoryAndGoodListVo categoryvo= new CategoryAndGoodListVo();
                categoryvo.setId(category.getId());
                categoryvo.setTitile(category.getTitle());
                spuListvo = new ArrayList<SpuVo>();
                for(SmallSpu spu:spuList){
                    if(spu.getCategoryId().longValue()==category.getId().longValue()){
                        SpuVo spuvo = new SpuVo();
                        spuvo.setId(spu.getId());
                        spuvo.setImg(spu.getImg());
                        spuvo.setPrice(spu.getPrice());
                        spuvo.setTitle(spu.getTitle());
                        spuListvo.add(spuvo);
                    }
                }
                categoryvo.setList(spuListvo);
                categoryvolist.add(categoryvo);
            }

            return R.ok().put("list",categoryvolist);
        }else{
            List<SmallCategory> lists  = smallCategoryService.list(new QueryWrapper<SmallCategory>().eq("status",1));
            for(SmallCategory category:lists){
                CategoryAndGoodListVo categoryvo= new CategoryAndGoodListVo();
                categoryvo.setId(category.getId());
                categoryvo.setTitile(category.getTitle());
                spuListvo = new ArrayList<SpuVo>();
                for(SmallSpu spu:spuList){
                    if(spu.getCategoryId().longValue()==category.getId().longValue()){
                        SpuVo spuvo = new SpuVo();
                        spuvo.setId(spu.getId());
                        spuvo.setImg(spu.getImg());
                        spuvo.setPrice(spu.getPrice());
                        spuvo.setTitle(spu.getTitle());
                        spuListvo.add(spuvo);
                    }
                }
                categoryvo.setList(spuListvo);
                categoryvolist.add(categoryvo);
            }
            return R.ok().put("list",categoryvolist);
        }
    }

    /**
     * 获取商品列表
     * 目前需要参数：
     *   pageNum //第几页
     *   pageSize  //每页条数
     *   categoryId //分类id
     *   supplierId //商户id (必填)
     * @return
     */
    @ApiOperation(value="获取商品列表", notes="")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageNum", value = "页码", required = false, paramType = "query", dataType = "String"),
            @ApiImplicitParam(name = "pageSize", value = "每页多少记录", required = false, paramType = "query", dataType = "String"),
            @ApiImplicitParam(name = "supplierId", value = "商户id", required = true, paramType = "query", dataType = "Long"),
            @ApiImplicitParam(name = "categoryId", value = "分类id", required = false, paramType = "query", dataType = "Long"),

    })
    @RequestMapping(value = "/goodsList",method = {RequestMethod.GET})
    @ResponseBody
    @AuthIgnore
    public R goodsList(String pageNum,String pageSize,@RequestParam Long supplierId,@RequestParam String categoryId) {
//    public R goodsList(@RequestBody Map<String,Object> params) {
//        if(!params.containsKey("supplierId")){
//            return R.error("商户id为空");
//        }
        Query query = new Query(new HashMap<>());
        query.put("status",1);
//        query.put("page",params.get("pageNum"));
//        query.put("limit",params.get("pageSize"));
//        query.put("supplierId",params.get("supplierId"));
//        query.put("categoryId",params.get("categoryId"));
        query.put("page",pageNum);
        query.put("limit",pageSize);
        query.put("supplierId",supplierId);
        List<SmallSellCategory> list  = smallSellCategoryService.list(new QueryWrapper<SmallSellCategory>().eq("status",1).eq("supplier_id",supplierId));
        //有自定义分类。查询自定义分类；没有则查询公共分类
        if(list!=null && list.size()>0){
            query.put("sellcategoryId",categoryId);
        }else{
            query.put("categoryId",categoryId);
        }
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
