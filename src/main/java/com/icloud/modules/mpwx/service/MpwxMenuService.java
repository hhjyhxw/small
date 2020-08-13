package com.icloud.modules.mpwx.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.mpwx.dao.MpwxMenuMapper;
import com.icloud.modules.mpwx.entity.MpwxMenu;
import com.icloud.modules.mpwx.util.MenuConstUtil;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import me.chanjar.weixin.mp.api.WxMpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:44:26
 */
@Slf4j
@Service
@Transactional
public class MpwxMenuService extends BaseServiceImpl<MpwxMenuMapper,MpwxMenu> {

    @Autowired
    private MpwxMenuMapper mpwxMenuMapper;
    @Autowired
    private WxMpService wxMpService;

    public List<MpwxMenu> getMenuList(Long wxappId) {
        if(wxappId==null){
            wxappId = 1L;
        }
        List<MpwxMenu> list = mpwxMenuMapper.selectList(new QueryWrapper<MpwxMenu>().eq("wxapp_id",wxappId));
        if(list==null || list.size()<=0){
            //初始化菜单
            return initMenu(wxappId);
        }else{
            return list.stream().filter(mpwxMenu -> {
                return mpwxMenu.getParentId().longValue()==0L;
            }).map((menu)->{                                                 //map() : 映射
                menu.setChildList(getChildrens(menu , list));
                return menu;
            }).sorted((menu1,menu2)->{
                return (menu2.getSortNum() == null ? 0 : menu2.getSortNum()) - (menu1.getSortNum() == null ? 0 : menu1.getSortNum()); //防止空指针异常
            }).collect(Collectors.toList());
        }
    }

    /**
     * 递归找到所有父菜单的子菜单
     * @param root 当前菜单
     * @param all  所有菜单
     * @return
     */
    public List<MpwxMenu> getChildrens(MpwxMenu root , List<MpwxMenu> all){

        List<MpwxMenu> list = all.stream().filter((sonMenu)->{
            return sonMenu.getParentId().longValue()== root.getId().longValue(); //如果mpwxMenu 的父id 是当前菜单的id 那么就说明 次菜单是当前菜单的子菜单
        }).sorted((menu1,menu2)->{
            return (menu2.getSortNum() == null ? 0 : menu2.getSortNum()) - (menu1.getSortNum() == null ? 0 : menu1.getSortNum()); //防止空指针异常
        }).collect(Collectors.toList());
        return list;
    }

    /**
     * 初始化菜单
     * @param wxappId
     * @return
     */
    private List<MpwxMenu> initMenu(Long wxappId){
        List<MpwxMenu> list = getFirstMenu(wxappId);
        MpwxMenu menu = null;
        MpwxMenu oldmenu = null;
        for (int i=0;i<list.size();i++){
            oldmenu = list.get(i);
            List<MpwxMenu> childList = new ArrayList<MpwxMenu>();
            for (int j=0;j<5;j++){
                menu = new MpwxMenu();
                menu.setSortNum(j);
                menu.setParentId(oldmenu.getId());
                menu.setWxappId(wxappId);
                menu.setMenuLevel(2);
                mpwxMenuMapper.insert(menu);
                childList.add(menu);
                Collections.sort(childList, new Comparator<MpwxMenu>() {
                    @Override
                    public int compare(MpwxMenu o1, MpwxMenu o2) {
                        return o2.getSortNum()-o1.getSortNum();
                    }
                });
                oldmenu.setChildList(childList);
            }
            list.set(i,oldmenu);
        }
        return list;
    }

    /**
     * 初始化一级菜单
     * @param wxappId
     * @return
     */
    private List<MpwxMenu> getFirstMenu(Long wxappId){
        List<MpwxMenu> list = new ArrayList<MpwxMenu>();
        MpwxMenu menu = null;
        for(int i=1;i<=3;i++){
            menu= new MpwxMenu();
            menu.setParentId(0L);
            menu.setWxappId(wxappId);
            menu.setMenuLevel(1);
            menu.setSortNum(i);
            mpwxMenuMapper.insert(menu);
            log.info("menu"+i+"==="+menu.getId());
            list.add(menu);
        }
        return list;
    }

    public void myupdateBatch(List<MpwxMenu> list) throws WxErrorException {
        //封装微信菜单json
        String menuJson = MenuConstUtil.getWeixinMenuJson(list);
        //提交到微信
        String result = wxMpService.getMenuService().menuCreate(menuJson);

        //保存数据库
        for (MpwxMenu menu:list){
            this.saveOrUpdateBatch(menu.getChildList());
            mpwxMenuMapper.updateById(menu);
        }

    }


    /**
     * 递归找到所有父菜单的子菜单
     * @param root 当前菜单
     * @param all  所有菜单
     * @return
     */
/*    public List<CategoryEntity> getChildrens(CategoryEntity root , List<CategoryEntity> all){

        List<CategoryEntity> list = all.stream().filter((categoryEntity)->{
            return categoryEntity.getParentCid() == root.getCatId(); //如果categoryEntity 的父id 是当前菜单的id 那么就说明 次菜单是当前菜单的子菜单
        }).map((menu)->{
            menu.setChildren(getChildrens(menu , all));
            return menu;
        }).sorted((menu1,menu2)->{
            return (menu1.getSort() == null ? 0 : menu1.getSort()) - (menu2.getSort() == null ? 0 : menu2.getSort()); //防止空指针异常
        }).collect(Collectors.toList());

        return list;
    }*/
}

