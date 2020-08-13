package com.icloud.api.wxmp.menu;

import com.icloud.modules.mpwx.entity.MpwxMenu;

public class ScancodeWaitmsg extends BaseMenu {
	private String type = "scancode_waitmsg";
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
	
	public ScancodeWaitmsg(){
	}
	public ScancodeWaitmsg(MpwxMenu wxMenu){
		super(wxMenu);
		this.key = wxMenu.getId().toString();
	}
}
