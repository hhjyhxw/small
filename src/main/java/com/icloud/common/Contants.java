package com.icloud.common;


/**
 * 系统常量配置
 * @author luoqw
 *2016年9月18日 上午9:46:40
 */
public class Contants { 
	
	public static final String service_domain = ConfigUtil.get("service_domain");
	
	public static final String token_server_domain = "http:tokenservername.com/";
	
	public static final String userInfo_get = token_server_domain+"/Token/userInfo";//获取token地址

	
	/**公众号请求接口**/
	public static final String mct_mp_add = service_domain+"/mp/add";//添加公众号地址
	
//	/**图片服务器路径**/
//	public static final String IMG_SERVER = ConfigUtil.get("imageserver");
	/**图片上传基本路径**/
	public static final String IMG_BASE_PATH_ = ConfigUtil.get("uploadpath");
	public static final String _DO_MAIN_ = ConfigUtil.get("service_domain");

	/**腾讯地图API**/
	public static final String TX_LBS_API_KEY = "WWKBZ-NNPR3-JON3J-3JMPX-KM6ES-ODFCH";
	//逆地址转换API 地址-》坐标
	public static final String TX_LBS_GEOCODER_URL = "http://apis.map.qq.com/ws/geocoder/v1/?address=ADDRESS&key=KEY";
	
	/**百度地图API **/
	public static final String BD_LBS_API_KEY="A4gjEvgoyry4G4zxMg8mCiCtGh7dhst4";
	/** 百度逆地址转换**/
	public static final String BD_LBS_GEOCODER_URL= "http://api.map.baidu.com/geocoder/v2/?output=json&address=ADDRESS&ak=AK";
	
	
	
	//物料平台配置
	
	public static final String km_app_key = "";
	public static final String km_app_secert = "";
	public static final String km_user_name = "";
	public static final String km_pass_word = "";
	
	public static final String kmapi_product_materiel_get = "";
	public static final String kmapi_product_productlist_query = "";
	public static final String kmapi_product_detail_query = "";
	public static final String kmapi_address_alladdress_query = "";
	public static final String kmapi_order_unite_submit = "";
	public static final String kmapi_wuliu_query = "";
	
	
}
