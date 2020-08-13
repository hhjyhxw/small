package com.icloud.api.wxmp.menu;


import com.icloud.modules.mpwx.entity.MpwxMenu;

/**
 * 对应微信菜单的每一个项
 */
public class BaseMenu {
	
	private String name;
	
	
	
	public BaseMenu(MpwxMenu wxMenu) {
		this.name=wxMenu.getName();
	}

	public BaseMenu() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

	
	
}
