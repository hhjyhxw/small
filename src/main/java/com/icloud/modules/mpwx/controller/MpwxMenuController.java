package com.icloud.modules.mpwx.controller;

import com.alibaba.fastjson.JSON;
import com.icloud.common.R;
import com.icloud.modules.mpwx.entity.MpwxMenu;
import com.icloud.modules.mpwx.service.MpwxMenuService;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;


/**
 * 
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:44:26
 * 菜单主连接： modules/mpwx/mpwxmenu.html
 */
@RestController
@RequestMapping("mpwx/menu")
@Slf4j
public class MpwxMenuController {
    @Autowired
    private MpwxMenuService mpwxMenuService;



    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("mpwx:mpwxmenu:save")
    public R save(@RequestBody  List<MpwxMenu> list){
        log.info("menuList==="+JSON.toJSONString(list));
        try {
            mpwxMenuService.myupdateBatch(list);
        } catch (WxErrorException e) {
            e.printStackTrace();
            return R.error(e.getError().getErrorMsg());
        }
        return R.ok();
    }


    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("mpwx:mpwxmenu:list")
    public R list(@RequestParam Map<String, Object> params){
        List<MpwxMenu> list = mpwxMenuService.getMenuList(params.get("wxappId")!=null?Long.valueOf(params.get("wxappId").toString()):null);
//        List<MpwxMenu> list = getMenu();
        return R.ok().put("menuList", list);
    }

    private List<MpwxMenu> getMenu(){
        List<MpwxMenu> list = getFirstMenu();
        MpwxMenu menu = null;
        MpwxMenu oldmenu = null;
        for (int i=0;i<3;i++){
            oldmenu = list.get(i);
            if(i==0){
                List<MpwxMenu> childList = new ArrayList<MpwxMenu>();
                for (int j=0;j<5;j++){
                    menu = new MpwxMenu();
                    menu.setId(j+5L);
                    menu.setSortNum(menu.getId().intValue());
                    menu.setParentId(1L);
                    menu.setWxappId(1L);
                    menu.setName("推客活动");
                    menu.setMenuLevel(2);
                    menu.setMenuType("click");
                    menu.setMsgType("0");//文本
                    menu.setTextContent("哈哈哈");
                    childList.add(menu);
                    Collections.sort(childList, new Comparator<MpwxMenu>() {
                        @Override
                        public int compare(MpwxMenu o1, MpwxMenu o2) {
                            return o2.getSortNum()-o1.getSortNum();
                        }
                    });
                    oldmenu.setChildList(childList);
                }

                list.set(0,oldmenu);
            }
            if(i==1){
                List<MpwxMenu> childList = new ArrayList<MpwxMenu>();
                for (int j=0;j<5;j++) {
                    menu = new MpwxMenu();
                    menu.setId(15L+j);
                    menu.setSortNum(menu.getId().intValue());
                    menu.setParentId(2L);
                    menu.setWxappId(1L);
                    menu.setName("话题广场");
                    menu.setMenuLevel(2);
                    menu.setMenuType("view");
                    childList.add(menu);
                    Collections.sort(childList, new Comparator<MpwxMenu>() {
                        @Override
                        public int compare(MpwxMenu o1, MpwxMenu o2) {
                            return o2.getSortNum()-o1.getSortNum();
                        }
                    });
                    oldmenu.setChildList(childList);
                }
                list.set(1, oldmenu);
            }
            if(i==2){
                List<MpwxMenu> childList = new ArrayList<MpwxMenu>();
                for (int j=0;j<5;j++){
                    if(j==0){
                        menu = new MpwxMenu();
                        menu.setId(25L+j);
                        menu.setSortNum(menu.getId().intValue());
                        menu.setParentId(3L);
                        menu.setWxappId(1L);
                        menu.setName("真龙君表情");
                        menu.setMenuLevel(2);
                        menu.setMenuType("click");
                        menu.setMsgType("1");//素材
                        menu.setWxscId(1l);//素材id
                        childList.add(menu);

                    }else {
                        menu = new MpwxMenu();
                        menu.setId(25L+j);
                        menu.setSortNum(menu.getId().intValue());
                        menu.setParentId(3L);
                        menu.setWxappId(1L);
                        childList.add(menu);
                    }
                    oldmenu.setChildList(childList);
                }
                Collections.sort(childList, new Comparator<MpwxMenu>() {
                    @Override
                    public int compare(MpwxMenu o1, MpwxMenu o2) {
                        return o2.getSortNum()-o1.getSortNum();
                    }
                });
                list.set(2,oldmenu);
            }
        }
        return list;
    }

    private List<MpwxMenu> getFirstMenu(){
        List<MpwxMenu> list = new ArrayList<MpwxMenu>();
        MpwxMenu menu1 = new MpwxMenu();
        menu1.setId(1L);
        menu1.setParentId(0L);
        menu1.setWxappId(1L);
        menu1.setName("扫码");
        menu1.setMenuLevel(1);
        menu1.setMenuType("view");
        list.add(menu1);
        MpwxMenu menu2 = new MpwxMenu();
        menu2.setId(2L);
        menu2.setParentId(0L);
        menu2.setWxappId(1L);
        menu2.setName("活动");
        menu2.setMenuLevel(1);
        menu2.setMenuType("view");
        list.add(menu2);
        MpwxMenu menu3 = new MpwxMenu();
        menu3.setId(3L);
        menu3.setParentId(0L);
        menu3.setWxappId(1L);
        menu3.setName("发现");
        menu3.setMenuLevel(1);
        menu3.setMenuType("view");
        list.add(menu3);
        return list;
    }

//    public static void main(String[] args) {
//        MpwxMenuController menu = new MpwxMenuController();
//        System.out.println(JSON.toJSONString(menu.getMenu()));
//    }
}
