package com.icloud.api.wxmp.menu;

import java.util.ArrayList;
import java.util.List;




public class MenuSubButton extends BaseMenu  {
	
	
	public MenuSubButton() {

	}

	private List<BaseMenu> sub_button = new ArrayList<BaseMenu>();

	public List<BaseMenu> getSub_button() {
		return sub_button;
	}

	public void setSub_button(List<BaseMenu> sub_button) {
		this.sub_button = sub_button;
	}

	
	

}
