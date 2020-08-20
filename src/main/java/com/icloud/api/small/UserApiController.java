package com.icloud.api.small;

import com.icloud.modules.bsactivity.service.BsactivityAdService;
import com.icloud.modules.small.service.SmallCategoryService;
import com.icloud.modules.small.service.SmallSpuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserApiController {

    @Autowired
    private BsactivityAdService bsactivityAdService;
    @Autowired
    private SmallCategoryService smallCategoryService;
    @Autowired
    private SmallSpuService smallSpuService;

//    /**
//     * 获取滚动广告列表
//     * @return
//     */
//    @RequestMapping("/adlist")
//    @ResponseBody
//    @AuthIgnore
//    public R adlist() {
//       List<BsactivityAd> list  = bsactivityAdService.list(new QueryWrapper<BsactivityAd>().eq("status",1));
//       return R.ok().put("list",list);
//    }


}
