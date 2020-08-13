package com.icloud.api.wxmp.menu;

import com.icloud.modules.mpwx.entity.MpwxMenu;

public class LocationMenu extends BaseMenu {
	private String type = "location_select";
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
	public LocationMenu(){
	}
	public LocationMenu(MpwxMenu wxMenu){
		super(wxMenu);
		this.key = wxMenu.getId().toString();
	}
}
