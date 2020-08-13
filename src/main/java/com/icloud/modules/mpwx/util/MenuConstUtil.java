package com.icloud.modules.mpwx.util;

import com.alibaba.fastjson.JSON;
import com.icloud.api.wxmp.menu.BaseMenu;
import com.icloud.api.wxmp.menu.MenuButton;
import com.icloud.api.wxmp.menu.MenuSubButton;
import com.icloud.common.util.StringUtil;
import com.icloud.modules.mpwx.entity.MpwxMenu;
import org.apache.shiro.util.ClassUtils;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MenuConstUtil {

	   
	   private static Map<String,String> map = new HashMap<String,String>();
	   //1视图2事件3扫码（显示结果）或者跳转链接 4跳转小程序,5扫码，有提示框，可以接受开发者推送的消息
	   static{
		   map.put("menu", "com.icloud.api.wxmp.menu.BaseMenu");//
		   map.put("view", "com.icloud.api.wxmp.menu.UrlMenu");//view
		   map.put("click", "com.icloud.api.wxmp.menu.ClickMenu");//事件
		   map.put("scancode_push", "com.icloud.api.wxmp.menu.ScancodeMenu");//扫码（显示结果）或者跳转链接
		   map.put("miniprogram", "com.icloud.api.wxmp.menu.XcxMenu");//跳转小程序
		   map.put("scancode_waitmsg", "com.icloud.api.wxmp.menu.ScancodeWaitmsg");//扫码，有提示框，可以接受开发者推送的消息
		   map.put("location_select", "com.icloud.api.wxmp.menu.LocationMenu");//
	   }
	/**
	 * 根据菜单类型封装对应的微信菜单项
	 */
	public static BaseMenu getWxMenu(MpwxMenu wxMenu){
		 Class<BaseMenu> zlass = null;
		  if(StringUtil.checkStr(wxMenu.getMenuType())){
			  zlass = ClassUtils.forName(map.get(wxMenu.getMenuType().toString()));
		  }else if(wxMenu.getMenuLevel().intValue()==1 && !StringUtil.checkStr(wxMenu.getMenuType())){//1及菜单为空的时候
			  zlass = ClassUtils.forName(map.get("menu"));
		  }else {
		  	return null;
		  }
		  Constructor<BaseMenu> c;
		  BaseMenu baseMenu = null;
		try {
			c = zlass.getConstructor(MpwxMenu.class);
			baseMenu = c.newInstance(wxMenu);
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}//获取有参构造
		catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return baseMenu;
	   }

	   public static String getWeixinMenuJson(List<MpwxMenu> list) {
		   //封装微信菜单json
		   MenuButton botton = new MenuButton();//对应一级菜单
		   for (MpwxMenu menu : list) {
			   if (StringUtil.checkStr(menu.getName())) {
				   BaseMenu parentMenu = getWxMenu(menu);
				   MenuSubButton subButton = new MenuSubButton();//对应二级菜单
				   for (MpwxMenu menuSon : menu.getChildList()) {
					   if (StringUtil.checkStr(menuSon.getName())) {
						   BaseMenu wxSonMenu = getWxMenu(menuSon);
						   subButton.getSub_button().add(wxSonMenu);
					   }
				   }
				   //有子项
				   if (subButton.getSub_button().size() > 0) {
					   subButton.setName(parentMenu.getName());
					   botton.getButton().add(subButton);
				   } else {
				   	   //无子项
					   botton.getButton().add(parentMenu);
				   }
			   }
		   }
		   return JSON.toJSONString(botton);
	   }

	   
}
