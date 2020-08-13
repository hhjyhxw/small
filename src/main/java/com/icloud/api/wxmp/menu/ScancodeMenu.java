package com.icloud.api.wxmp.menu;

import com.icloud.modules.mpwx.entity.MpwxMenu;

public class ScancodeMenu extends BaseMenu {
	private String type = "scancode_push";
	private String key;
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
	public ScancodeMenu(){
	}
	public ScancodeMenu(MpwxMenu wxMenu){
		super(wxMenu);
		this.key = wxMenu.getId().toString();
	}
}
