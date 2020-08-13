package com.icloud.api.wxmp.menu;

import com.icloud.modules.mpwx.entity.MpwxMenu;

public class ClickMenu extends BaseMenu {
	private String key;
	private String type = "click";

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public ClickMenu(){
		super();
	}
	
	public ClickMenu(MpwxMenu wxMenu){
		super(wxMenu);
		this.key = wxMenu.getId().toString();
	}
}
