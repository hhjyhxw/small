package com.icloud.api.small;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.annotation.AuthIgnore;
import com.icloud.common.R;
import com.icloud.exceptions.ApiException;
import com.icloud.modules.bsactivity.entity.BsactivityAd;
import com.icloud.modules.bsactivity.service.BsactivityAdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shop")
public class ShopApiController {

    @Autowired
    private BsactivityAdService bsactivityAdService;

    /**
     * 获取滚动广告列表
     * @return
     */
    @RequestMapping("/adlist")
    @ResponseBody
    @AuthIgnore
    public R adlist() throws ApiException {
       List<BsactivityAd> list  = bsactivityAdService.list(new QueryWrapper<BsactivityAd>().eq("status",1));
       return R.ok().put("list",list);
    }

}
