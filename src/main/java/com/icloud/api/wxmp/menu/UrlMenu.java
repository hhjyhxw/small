package com.icloud.api.wxmp.menu;

import com.icloud.modules.mpwx.entity.MpwxMenu;

public class UrlMenu extends BaseMenu {
	private String type = "view";
	private String url;
	

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	public UrlMenu(){
	}
	public UrlMenu(MpwxMenu wxMenu){
		super(wxMenu);
		this.url = wxMenu.getUrl();
	}

}
