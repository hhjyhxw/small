define("tpl/cardticket/card_quantity.html.js",[],function(){
return'<div class="pop_store">\n	{if !data.is_sns_card}\n	{if data.quantity==0}\n	<p class="frm_msg fail" style="display:block;">库存为0，请先增加库存</p>\n	{/if}\n	<!-- 普通卡券增减库存 -->\n	<div class="pop_card_normal">\n		<!--增减库存-->\n		{if setquantity}\n		<!-- 这一部分貌似要废弃掉 -->\n		<div class="frm_control_group">\n			<div class="frm_controls">\n				<label class="frm_radio_label selected">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">增加</span>\n					<input type="radio" name="isadd" checked value="1" class="frm_radio js_quantity_type">\n				</label>\n				<label class="frm_radio_label">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">减少</span>\n					<input type="radio" name="isadd" value="0" class="frm_radio js_quantity_type">\n				</label>\n			</div>\n		</div>\n		{/if}\n		<div class="frm_control_group">                        \n			<div class="frm_controls">\n				<div class="frm_controls_hint group">\n					<span class="frm_input_box"><input type="text" class="frm_input js_value"></span>\n					<span class="frm_hint">份</span>\n				</div>\n				<p class="frm_tips fail">库存不能少于1</p>\n			</div>\n		</div>\n		<!--增减库存 end-->\n	</div>\n	{else}\n	<!-- 朋友券增加库存 -->\n	<!-- message fail-->\n	<div class="js_state_5 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg info"></i>\n            </span>\n            <div class="msg_content">\n                <h4> 当前未开通券点账户，暂时无法添加库存 </h4>\n            </div>\n        </div>\n        <div class="popover_bar tc">\n			<a href="javascript:;" class="btn btn_primary js_go_activate">去开通</a>\n        </div>\n    </div>\n	<i class="loading js_satate_0 js_state_quantity" style="display:none"></i>\n	<div class="js_state_1 js_state_quantity pop_card_quantity" style="display:none">\n		{if data.quantity==0}\n		<p class="frm_msg fail" style="display:block;">库存为0，请先增加库存</p>\n		{/if}\n		<div class="pop_hd">\n			<div class="frm_control_group frm_card_extend">                        \n				<label for="" class="frm_label">\n					<span class="title">库存单价</span>\n				</label>\n				<div class="frm_preview"><span class="js_price">0.2</span>券点/张\n				</div>\n			</div>\n			<div class="frm_control_group frm_card_extend">                        \n				<label for="" class="frm_label">\n					<span class="title">增加库存</span>\n				</label>\n				<div class="">\n					<span class="frm_input_box"><input type="text" class="frm_input js_value"></span>\n					<span class="frm_hint">张</span>\n				</div>\n				<!-- <p class="frm_tips fail">库存不能少于1</p> -->\n			</div>\n		</div>\n		<div class="frm_control_group frm_card_extend js_total_price_container">                        \n			<label for="" class="frm_label">\n				所需券点			</label>\n			<div class="frm_preview">\n				<span class="js_total_price card_fee_quantity">0</span>券点			</div>\n		</div>\n		<p class="js_error frm_msg fail"></p>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_primary js_confirm">确认添加</a>\n			<a href="javascript:;" class="btn btn_default js_cancel">取消</a>\n        </div>\n	</div>\n	<!-- 朋友券 确认预览 -->\n	<div class="js_state_2 js_state_quantity pop_card_quantity" style="display:none">\n		<div class="pop_hd">\n			<div class="frm_control_group frm_card_extend">                        \n				<label for="" class="frm_label">\n					卡券名称				</label>\n                <div class="frm_preview js_cardname">{data.title}\n				</div>\n			</div>\n			<div class="frm_control_group frm_card_extend">                        \n				<label for="" class="frm_label">\n					库存单价				</label>\n                <div class="frm_preview"><span class="js_price"></span>券点/张\n				</div>\n			</div>\n			<div class="frm_control_group frm_card_extend">                        \n				<label for="" class="frm_label">\n					增加库存\n				</label>\n                <div class="frm_preview"><span class="js_quantity"></span>张				</div>\n			</div>\n		</div>\n		<div class="frm_control_group frm_card_extend">                        \n			<label for="" class="frm_label">\n				支出券点\n			</label>\n			<div class="frm_preview">\n				免费券点<span class="js_freecoin"></span> ，付费券点<span class="js_paycoin"></span>\n			</div>\n		</div>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_primary js_confirm">确定</a>\n			<a href="javascript:;" class="btn btn_default js_cancel">取消</a>\n        </div>\n	</div>\n	<!-- message success-->\n	<div class="js_state_3 js_state_quantity pop_card_quantity page_msg small msg_success default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg success"></i>\n                <!-- loging gif也可以放到这里 -->\n            </span>\n            <div class="msg_content">\n                <h4> 已添加成功 </h4>\n            </div>\n        </div>\n    </div>\n	<!-- message success-->\n	<div class="js_state_9 js_state_quantity pop_card_quantity page_msg small msg_success default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg success"></i>\n                <!-- loging gif也可以放到这里 -->\n            </span>\n            <div class="msg_content">\n                <h4> 已购买成功 </h4>\n                <p class="tl">请通知适用商户登录微信支付平台审核，通过库存生效。若不通过，将退回券点。</p>\n            </div>\n        </div>\n        <div class="plant_msg">\n        	总库存：        	<span class="frm_preview js_cardname"><span class="js_total_price mini_tips weak_text js_current_quantity">{data.quantity}</span>\n			</span>\n			<div class="mini_tips weak_text">(<span class=\'js_quantity\'></span>库存审核通过后生效)</div>\n        </div>\n        <!--\n        <div class="frm_control_group frm_card_extend">                        \n			<label for="" class="frm_label">\n				总库存：			</label>\n            <div class="frm_preview js_cardname"><span class="js_total_price card_fee_quantity mini_tips weak_text js_current_quantity">{data.quantity}</span><span class="mini_tips weak_text">(<span class=\'js_quantity\'></span>库存审核通过后生效)</span>\n			</div>\n			<p class="frm_msg" style="display:block">少于100时，将通过公众号通知核销员 <a href="">修改</a></p>\n		</div>-->\n        <div class="popover_bar tc">\n			<a href="javascript:;" class="btn btn_primary js_close_quantity">完成</a>\n        </div>\n    </div>\n	<!-- message fail-->\n	<div class="js_state_4 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg info"></i>\n            </span>\n            <div class="msg_content">\n                <h4> 库存添加中，可前往流水记录查看本次添加进度 </h4>\n            </div>\n        </div>\n        <div class="popover_bar tc">\n			<a href="javascript:;" class="btn btn_primary js_close_quantity">我知道了</a>\n        </div>\n    </div>\n    <!-- 子商户库存提示-->\n	<div class="js_state_8 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg info"></i>\n            </span>\n            <div class="msg_content js_quantity_exceed_msg">\n                <h4> 子商户每张券累计只可发放10000份 </h4>\n            </div>\n        </div>\n        <div class="popover_bar tc">\n			<a href="javascript:;" class="btn btn_primary js_close_quantity">我知道了</a>\n        </div>\n    </div>\n	<!-- message fail-->\n	<div class="js_state_7 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg warn"></i>\n            </span>\n            <div class="msg_content">\n                <h4> 库存添加失败，请稍后再试 </h4>\n                <p> 所扣币值将退回你的账户，请耐心等待 </p>\n            </div>\n        </div>\n        <div class="popover_bar tc">\n			<a href="javascript:;" class="btn btn_primary js_close_quantity">我知道了</a>\n        </div>\n    </div>\n    {/if}\n</div>\n';
});define("tpl/cardticket/choose_card_type.html.js",[],function(){
return'{if is_sns_card}<div class="proc_put_tick">\n	<div class="choose_card_friend">\n	    <div class="frm_control_group">\n	        <label class="frm_radio_label selected">\n	            <i class="icon_radio"></i>\n	            <span class="lbl_content">创建朋友共享的优惠券</span> <i class="icon_common new" style=""></i>\n	            <input type="radio" value="1" checked class="frm_radio js_is_friend">\n	        </label>\n	        <div class="frm_tips js_is_friend_tips js_is_friend_support_tips">用户领取一张优惠券后，他的好友无需领取即可在优惠券列表看到和使用该张优惠券。这将为你的优惠券带来更多的曝光和使用。</div>\n	        <div style="display:none;" class="frm_tips js_is_friend_tips js_is_friend_view_mode2_tips">所选子商户类目不支持制作朋友的券，<a target="_blank" href="/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info&lang=zh_CN#0dot2">查看类目要求</a></div>\n	        <div style="display:none;" class="frm_tips js_is_friend_tips js_is_friend_view_mode1_tips">当前商户类目不支持制作朋友的券，<a target="_blank" href="/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info&lang=zh_CN#0dot2">查看类目要求</a></div>\n	    </div>\n	</div>\n    <div class="choose_card_type js_is_friend_type js_is_friend_type_1">\n	    <div class="frm_control_group radio_row frm_tab">\n			<div class="frm_controls frm_vertical_lh">\n				<label class="frm_radio_label selected">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">无使用门槛代金券</span>\n					<input type="radio" value="4" data-not_has_condition="1" class="frm_radio js_card_type" checked="checked">\n	                <p class="frm_tips">可抵扣现金，无使用门槛</p>\n				</label>\n				<label class="frm_radio_label selected">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">满减代金券/指定品类代金券</span>\n					<input type="radio" value="4" class="frm_radio js_card_type">\n	                <p class="frm_tips">可抵扣现金，需消费指定金额或品类</p>\n				</label>\n				<label class="frm_radio_label">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">兑换券</span>\n					<input type="radio" value="3" class="frm_radio js_card_type">\n					<p class="frm_tips">可兑换商品或服务</p>\n				</label>\n			</div>\n		</div>\n		<div class="frm_tab_content">\n			<div class="tab_items">\n				<div class="frm_tab_item js_tabed_item_4">\n					<div class="tab_inner">\n						<ul class="prom_list">\n							<li>消费者体验好</li>\n							<li>使用转化率高</li>\n							<li>引流效果较好</li>\n							{if view_mode==1}\n							<li>支持微信买单</li>\n							{/if}\n						</ul>\n						<p>查看案例：<a href="http://mp.weixin.qq.com/s?__biz=MjM5NDQ5Njk3OA==&mid=407898139&idx=1&sn=f3ea0f070d756d8d2f61d496aeb35286#rd" target="_blank">广州某百货公司无门槛代金券活动 ></a></p>\n					</div>\n				</div>\n				<div class="frm_tab_item js_tabed_item_4">\n					<div class="tab_inner">\n						<ul class="prom_list">\n							<li>成本可控</li>\n							<li>提升客单价</li>\n							<li>多种优惠使用条件组合</li>\n							{if view_mode==1}\n							<li>支持微信买单</li>\n							{/if}\n						</ul>\n					</div>\n				</div>\n				<div class="frm_tab_item js_tabed_item_3">\n					<div class="tab_inner">\n						<ul class="prom_list">\n							<li>成本可控</li>\n							<li>推广新品效果佳</li>\n							<li>引流到店效果好</li>\n							<li>方便组合促销</li>\n						</ul>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n	{if show_all_card}\n	<div class="choose_card_normal">\n	    <div class="frm_control_group frm_card_normal">\n	        <label class="frm_radio_label">\n	            <i class="icon_radio"></i>\n	            <span class="lbl_content">我要创建普通优惠券</span>\n	            <input type="radio" value="2" class="frm_radio js_is_friend">\n	        </label>\n	        <div class="frm_tips">传统优惠券的电子版，可在微信中收纳、传播和使用。只可领取到我的卡券自己使用</div>\n	        <div class="frm_control_group radio_row js_is_friend_type js_is_friend_type_2" style="display:none">\n				<div class="frm_controls frm_vertical_lh">\n					{if flag==0}\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">折扣券</span>\n						<input type="radio" value="2" class="frm_radio js_card_type">\n		                <p class="frm_tips">可为用户提供消费折扣{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n					</label>\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">代金券</span>\n						<input type="radio" value="4" class="frm_radio js_card_type">\n		                <p class="frm_tips">可为用户提供抵扣现金服务。可设置成为“满*元，减*元”{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n					</label>\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">兑换券</span>\n						<input type="radio" value="3" class="frm_radio js_card_type">\n						<p class="frm_tips">可为用户提供消费送赠品服务</p>\n					</label>\n					{/if}\n					<label class="frm_radio_label selected">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">团购券</span>\n						<input type="radio" value="1" class="frm_radio js_card_type">\n						<p class="frm_tips">可为用户提供团购套餐服务</p>\n					</label>\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">优惠券</span>\n						<input type="radio" value="0" class="frm_radio js_card_type">\n						<p class="frm_tips">{if flag==0}即“通用券”，建议当以上四种无法满足需求时采用{else}即“通用券”，建议当团购券无法满足需求时适用{/if}</p>\n					</label>\n				</div>\n			</div>\n	    </div>\n    </div>\n{/if}    \n</div>\n{else}<div class="proc_put_tick js_is_friend_type_2">\n<div class="choose_card_normal">\n	<div class="frm_control_group radio_row frm_card_normal">\n		<label for="" class="frm_label">选择你要创建的卡券类型</label>\n		<div class="frm_controls frm_vertical_lh">\n		{if flag==0}\n			<label class="frm_radio_label selected">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">折扣券</span>\n				<input type="radio" value="2" class="frm_radio js_card_type">\n                <p class="frm_tips">可为用户提供消费折扣{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n			</label>\n			<label class="frm_radio_label">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">代金券</span>\n				<input type="radio" value="4" class="frm_radio js_card_type">\n                <p class="frm_tips">可为用户提供抵扣现金服务。可设置成为“满*元，减*元”{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n			</label>\n			<label class="frm_radio_label">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">兑换券</span>\n				<input type="radio" value="3" class="frm_radio js_card_type">\n				<p class="frm_tips">可为用户提供消费送赠品服务</p>\n			</label>\n		{/if}\n			<label class="frm_radio_label selected">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">团购券</span>\n				<input type="radio" value="1" class="frm_radio js_card_type">\n				<p class="frm_tips">可为用户提供团购套餐服务</p>\n			</label>\n		\n			<label class="frm_radio_label">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">优惠券</span>\n				<input type="radio" value="0" class="frm_radio js_card_type">\n				<p class="frm_tips">{if flag==0}即“通用券”，建议当以上四种无法满足需求时采用{else}即“通用券”，建议当团购券无法满足需求时适用{/if}</p>\n			</label>\n		</div>\n	</div>\n</div>\n</div>\n{/if}';
});define("common/wx/tooltipsManager.js", [ "common/wx/tooltips.js" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict";
var i = e("common/wx/tooltips.js"), s = {
tooltips: [],
init: function(e, t) {
var n = this;
$(e).each(function() {
t.container = this, n.add(new i(t));
});
},
add: function(e) {
this.tooltips.push(e);
},
hideAll: function() {
for (var e = 0; e < this.tooltips.length; e++) this.tooltips[e].hide();
},
removeItem: function(e) {
for (var t = 0; t < this.tooltips.length; t++) if (this.tooltips[t] === e) return this.tooltips.splice(t, 1), e.$dom.remove(), !0;
return !1;
},
removeIndex: function(e) {
if (e >= this.tooltips.length || e < 0) return;
var t = this.tooltips[e];
this.tooltips.splice(e, 1), t.$dom.remove();
},
current: function() {},
hide: function() {},
removeAll: function() {
for (var e = 0; e < this.tooltips.length; e++) this.tooltips[e].$dom.remove();
this.tooltips = [];
}
};
return s;
} catch (o) {
wx.jslog({
src: "common/wx/tooltipsManager.js"
}, o);
}
});define("tpl/cardticket/select_sub_merchant_table.html.js",[],function(){
return'{if loading}<i class="icon_loading_small white"></i>\n{else}\n<div class="sub_title_bar">\n    <span class="frm_input_box search append l">\n        <a href="javascript:void(0);" class="js_search_btn frm_input_append">\n            <i class="icon16_common search_gray">\n                搜索\n            </i>\n            &nbsp;\n        </a>\n        <input type="text" placeholder="请输入商户名" value="{param.keyword}" class="frm_input js_search_input">\n    </span>\n    <div class="tr">\n        <a data-actionid="2014" class="btn btn_primary r" href="{wx_url \'/merchant/cardhelpmakesend?action=addpage\'}" target="_blank"><i class="icon14_common add_white"></i>添加子商户</a>\n    </div>\n</div>\n<div class="in_bd">\n	{if !data.length}\n	<div class="account_list empty js_empty">\n		{if param.keyword}\n		你输入的名称未搜索到，请确认否输入正确或未添加该子商户。		{else}\n		您还没有添加子商户，请点击右上角按钮添加子商户		{/if}\n		<!-- 抱歉，未找到符合公众号 -->\n	</div>\n	{else}\n	<ul class="account_list js_merchant_item_p">\n		{each data as sub i}\n		<li class="list_item js_merchant_item{if check_remain_quota && (sub.remain_quota==0||sub.can_not_use_sns_card)} js_merchant_disabled disabled{/if}" data-id="{sub.Id}">\n	        <div class="inner_list_item">\n	            <img class="pic" src="{http2https sub.Logo}" width="100px">\n				<div class="item_txt">\n					<p class="nick_name">{sub.BrandName}</p>\n                    {if check_remain_quota}{if max_card===0}<p>账号违规，暂停制券</p>{else}{if sub.remain_quota==0}<p>已超出制券量</p>{else if sub.can_not_use_sns_card}<p>该商户类目不可创建朋友的券</p>{/if}{/if}{/if}\n				</div>\n			</div>\n			<a href="javascript:;" class="account_selected"></a>\n			<div class="list_mask"></div>\n	    </li>\n	    {/each}\n	</ul>\n	<div class="js_pager"></div>\n	{/if}\n	<!-- <div class="loading_box empty dn" id="js_loading">\n		<img src="<%@GetResFullName($images_comm_path$icon/common/icon32_loading_light.gif)%>">\n		<p>加载中，请稍候</p>\n	</div> -->\n</div>\n{/if}\n';
});define("tpl/cardticket/select_shop.html.js",[],function(){
return'{if loading}\n<div class="choose_tick"><i class="icon_loading_small white"></i></div>\n{else}\n<script type="text/html" id="js_select_shop_tips">\n    <div class="info_section">\n        <p class="info_title">选择核销员所在的门店</p>\n        <p class="info_content">指定核销员所在的门店后，核销员仅可以核销适用于该门店的卡券，方便核销后数据跟踪。</p>\n    </div>\n    <div class="info_section">\n        <p class="info_title">不指定门店核销</p>\n        <p class="info_content">核销员可核销公众号的所有卡券</p>\n    </div>\n</script>\n<script type="text/html" id="js_select_shop_shopnametips">\n    {if is_paycard()}\n    <div class="info_section">\n        <p class="info_title">微信买单</p>\n        <p class="info_content">已配备核销员的门店，支持使用微信买单功能。</p>\n    </div>\n    {/if}\n</script>\n{if multi}\n<div class="sub_title_bar">\n    {if nostore}\n    <span class="r js_help_tips">帮助&nbsp;<i class="icon_msg_mini ask"></i></span>\n    {/if}\n    <span class="frm_input_box search append">\n    <a href="javascript:void(0);" class="js_search frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n    <input type="text" placeholder="输入门店名称" value="" class="frm_input js_keyword">\n    </span>\n    <!-- <a href="javascript:;" class="btn btn_default js_all_shop">全部门店适用</a>-->\n\n</div>\n<table class="table" cellspacing="0">\n    <thead class="thead">\n        <tr>\n            <th class="table_cell opr">\n                <div class="td_panel">\n                    {if multi}\n                    <div class="frm_controls">\n                        <label class="frm_checkbox_label">\n                            <i class="icon_checkbox"></i>\n                            <input type="checkbox" class="js_select_all" class="frm_checkbox">\n                        </label>\n                    </div>\n                    {/if}\n                </div>\n            </th>\n            <th class="table_cell store_name">\n                <div class="td_panel">门店名称 <i class="icon_msg_mini ask js_shopname_tips" style="display:none;"></i></div>\n                <!-- 门店筛选 后续支持-->\n                <!-- <div class="dropdown_menu">\n                        <a href="javascript:void(0);" class="btn dropdown_switch">\n                            <label>全部门店</label>\n                            <i class="arrow"></i>\n                        </a>\n                        <ul class="dropdown_data_list" style="display:block;">\n                                <li class="dropdown_data_item">\n                                        <a href="javascript:void(0);">全部门店</a>\n                                </li>\n                                <li class="dropdown_data_item">\n                                        <a href="javascript:void(0);">支持买单</a>\n                                </li>\n                                <li class="dropdown_data_item">\n                                        <a href="javascript:void(0);">优质门店</a>\n                                </li>\n                        </ul>\n                </div> -->\n\n            </th>\n            <th class="table_cell store_address no_extra"><div class="td_panel">地址</div></th>\n        </tr>\n    </thead>\n    <!--Begin 帮助气泡\n        <div class="pop_select_shop">\n                <h4>微信买单</h4>\n                <p>已配备核销员的门店，支持使用微信买单功能。<br /></p>\n                <h4>优质门店</h4>\n                <p>优质门店将有机会在附近的人中展示。</p>\n        </div>\n    End 帮助气泡 气泡-->\n    <tbody class="tbody js_shop_body">\n        {if access_deny}\n            <tr class="empty_item">\n                <td colspan="3" class="empty_tips">\n                    尚未开通门店，<a href="{addtoken \'/merchant/newentityshop?action=apply\'}" target="_blank">请前往开通</a>\n                </td>\n            </tr>\n        {else if data.length}\n            {each data as item i}\n            <tr {if !item.iscurrent}class="dn"{/if}>\n                <td class="table_cell opr"><div class="td_panel">\n                    {if !multi}\n                    <label class="frm_radio_label">\n                        <i class="icon_radio"></i>\n                        <input type="radio" data-id="{item.wx_poi_uid}" value="{item.wx_poi_uid}" class="frm_radio">\n                    </label>\n                    {else}\n                    <label class="frm_checkbox_label">\n                        <i class="icon_checkbox"></i>\n                        <input type="checkbox" {if item.selected}checked{/if} data-id="{item.wx_poi_uid}" value="{item.wx_poi_uid}" class="frm_checkbox">\n                    </label>\n                    {/if}\n                </div></td>\n                <td class="table_cell store_name {if item.validity_flag==2}store_quality{/if}{if item.card_pay_money} store_can_pay{/if}"><div class="td_panel">\n                    {if item.business_name}{item.business_name}{else}{item.branch_name}{/if}{if item.business_name && item.branch_name}({item.branch_name}){/if}\n                    {if item.validity_flag==2}<!-- <i class="icon18 store_excellent"></i> -->{/if}\n                    {if item.card_pay_money}<i class="ic_declarerer">核销员</i>{/if}\n                </div></td>\n                <td class="table_cell store_address"><div class="td_panel">{item.address}</div></td>\n            </tr>\n            {/each}\n        {else}\n            <tr class="empty_item">\n                <td colspan="3" class="empty_tips">\n                    没有门店信息，<a href="{if is_from_wxapoi}{addtoken \'/merchant/newentityshop?action=list\'}{else}{addtoken \'/merchant/entityshop?action=list&t=cardticket/store_list\'}{/if}" target="_blank">请前往设置</a>\n                </td>\n            </tr>\n        {/if}\n    </tbody>\n</table>\n<p class="dialog_ft_desc">\n已选<span class="js_selected_count mini_tips">0</span>家，共<span class="js_all_count">{total_count}</span>家\n</p>\n{else}\n<div class="sub_title_bar">\n    <span class="frm_input_box search append">\n    <a href="javascript:void(0);" class="js_search frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n    <input type="text" placeholder="输入门店名称" value="" class="frm_input js_keyword">\n    </span>\n    <span class="r js_help_tips">帮助 <i class="icon_msg_mini ask"></i></span>\n</div>\n<table class="table" cellspacing="0">\n    <thead class="thead">\n        <tr>\n            <th class="table_cell opr">&nbsp;</th>\n            <th class="table_cell store_name">\n                <div class="td_panel">门店名称                <i class="icon_msg_mini ask js_shopname_tips" style="display:none;"></i></div>\n            </th>\n            <th class="table_cell store_address no_extra"><div class="td_panel">地址</div></th>\n        </tr>\n    </thead>\n    <tbody class="tbody js_shop_body">\n        {if access_deny}\n            <tr class="empty_item"><td colspan="3" class="empty_tips">\n                <div class="pop_no_data">\n                    <h4>你的帐号尚未开通门店</h4>\n                    <p>你的帐号尚未开通门店，<a href="{addtoken \'/merchant/newentityshop?action=apply\'}" target="_blank">请前往开通</a></p>\n                </div>\n            </td></tr>\n        {else if data.length}\n            {each data as item i}\n            <tr {if !item.iscurrent}class="dn"{/if}>\n                <td class="table_cell opr">\n                    <div class="td_panel">\n                        <label class="frm_radio_label">\n                            <i class="icon_radio"></i>\n                            <input type="radio" {if item.selected}checked{/if} data-id="{item.wx_poi_uid}" value="{item.wx_poi_uid}" class="frm_radio">\n                        </label>\n\n                    </div>\n                </td>\n                <td class="table_cell store_name {if item.validity_flag==2}store_quality{/if}{if item.card_pay_money} store_can_pay{/if}">\n                    <div class="td_panel">\n                        <span>{if item.business_name}{item.business_name}{else}{item.branch_name}{/if}{if item.business_name && item.branch_name}({item.branch_name}){/if}</span>\n                        {if item.card_pay_money}<i class="ic_declarerer">核销员</i>{/if}\n                    </div>\n                </td>\n                <td class="table_cell store_address"><div class="td_panel">{item.address}</div></td>\n            </tr>\n            {/each}\n        {else}\n            <tr class="empty_item"><td colspan="3" class="empty_tips">\n                <div class="pop_no_data">\n                    <h4>你的帐号还没有设置门店信息</h4>\n                    <p>你的帐号还没有设置门店信息，<a href="{if is_from_wxapoi}{addtoken \'/merchant/newentityshop?action=list\'}{else}{addtoken \'/merchant/entityshop?action=list&t=cardticket/store_list\'}{/if}" target="_blank">请前往设置</a></p>\n                </div>\n            </td></tr>\n        {/if}\n    </tbody>\n</table>\n{if nostore}\n<p class="dialog_ft_desc">\n<label class="frm_checkbox_label">\n    <i class="icon_checkbox"></i>\n    不指定门店    <input type="checkbox" class="frm_checkbox js_no_store" {if notpoint==1}checked{/if} value="1">\n</label>\n</p>\n{/if}\n{/if}\n<div class="table_oper_btm group">\n\n    <div class="js_pagebar tr r"></div>\n</div>\n{if showSelectTips}\n<p class="mini_tips weak_text select_shop_tips">选择要挂载卡券的门店，挂载了卡券的优质门店通过审核将获得“附近的人”曝光位置，每个门店每天在附近最多可发放100张券。</p>\n{/if}\n{/if}';
});define("cardticket/card_quantity.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","cardticket/common_template_helper.js","tpl/cardticket/card_quantity.html.js","common/wx/tooltips.js","common/wx/tooltipsManager.js"],function(t){
"use strict";
var e=t("common/wx/Cgi.js"),a=t("common/wx/Tips.js"),i=(t("biz_web/ui/checkbox.js"),
t("cardticket/common_template_helper.js")),o=template.compile(t("tpl/cardticket/card_quantity.html.js")),s={
container:"",
quantityChange:$.noop,
max_sku_for_eachcard:1e4,
setquantity:!0
},r=t("common/wx/tooltips.js"),n=t("common/wx/tooltipsManager.js"),c=function(t){
t=$.extend(!0,{},s,t),this.opt=t;
var c=this;
t.data||(t.data={}),$(t.container).on("click",function(s){
function l(i,o){
$(".js_state_quantity",c.tooltip.$dom).hide();
var s=$(".js_state_"+i,c.tooltip.$dom).show(),r=s.attr("isinit");
if(0==i)e.get({
url:"/merchant/cardmoneymgr?action=get_card_price",
data:{
card_id:_
},
success:function(t){
if(0==t.base_resp.ret){
var a=$.parseJSON(t.result_json);
a.items[0].total_coin_balance=t.total_coin_balance,l(1,a.items[0]);
}else e.show(t);
}
});else if(1==i){
var d=o.price,p=o.total_coin_balance;
if(!r){
var m=$(".js_error",s),f=$(".js_total_price",s),h=$(".js_total_price_container",s),y=$(".js_value",s).keyup(function(){
var t=$(this),e=$.trim($(this).val());
if(!/^[0-9]+$/.test(e)||isNaN(e)||0>=e)return m.text("库存必须是不小于1的整数").show().addClass("fail"),
t.focus(),h.hide(),!1;
var a=1e9;
return e>=a?(m.text("库存不能大于10亿").show().addClass("fail"),t.focus(),!1):d*e>p?(m.html('券点余额：%s 余额不足，<a target="_blank" href="%s">去充值</a>'.sprintf(p/100,wx.url("/merchant/cardmoneymgr?action=get_order_flow"))).show().addClass("fail"),
t.focus(),h.show(),f.text(d*e/100),!1):(m.text("券点余额：%s，优先使用免费券点".sprintf(p/100)).show().removeClass("fail"),
h.show(),void f.text(d*e/100));
});
$(".js_confirm",s).click(function(){
var t=$.trim(y.val());
if(!/^[0-9]+$/.test(t)||isNaN(t)||0>=t)return m.text("库存必须是不小于1的整数").show().addClass("fail"),
y.focus(),h.hide(),!1;
var a=1e9;
return t>=a?(m.text("库存不能大于10亿").show().addClass("fail"),y.focus(),!1):d*t>p?(m.html('券点余额：%s 余额不足，<a target="_blank" href="%s">去充值</a>'.sprintf(p/100,wx.url("/merchant/cardmoneymgr?action=get_order_flow"))).show().addClass("fail"),
y.focus(),!1):($(this).btn(!1),t=parseInt(t),void e.get({
url:"/merchant/cardmoneymgr?action=get_card_pay_price",
data:{
card_id:_,
quantity:t
},
success:function(a){
0==a.base_resp.ret?(a.quantity=t,l(2,a)):e.show(a);
}
}));
}),$(".js_cancel",s).click(function(){
c.tooltip.hide(),n.removeAll(),c.tooltip=null;
});
}
s.find(".js_price").text(o.price/100);
}else if(2==i){
if(!r){
var v=!1;
$(".js_confirm",s).click(function(){
v||($(this).btn(!1),v=!0,e.post({
url:"/merchant/cardmoneymgr?action=confirm_card_coin_pay",
data:{
card_id:_,
quantity:o.quantity,
free_coin:o.free_coin,
pay_coin:o.pay_coin,
order_id:o.order_id,
price:o.price
},
complete:function(){
v=!1;
},
success:function(t){
$(this).btn(!0),0==t.base_resp.ret?(t.addquantity=o.quantity,u.pay_info.is_swipe_card?l(9,t):l(3,t)):26==t.base_resp.ret?(t.is_fail=!1,
l(4,t)):10039==t.base_resp.ret||76==t.base_resp.ret?l(8,t):(t.is_fail=!0,l(4,t));
}
}));
}),$(".js_cancel",s).click(function(){
c.tooltip.hide(),n.removeAll(),c.tooltip=null;
});
}
s.find(".js_price").text(o.price/100),s.find(".js_quantity").text(o.quantity),s.find(".js_freecoin").text(o.free_coin/100),
s.find(".js_paycoin").text(o.pay_coin/100);
}else if(3==i||9==i){
r||$(".js_close_quantity",s).click(function(){
n.removeAll();
});
var w=o.addquantity;
s.find(".js_quantity").text(w),$(t.container).data("isswipe")||a.suc("设置库存成功"),setTimeout(function(){
3==i&&n.removeAll();
},1500),t.quantityChange&&t.quantityChange.call(c,_,w);
}else 4==i||7==i||8==i?(r||$(".js_close_quantity",s).click(function(){
n.removeAll();
}),8==i&&$(".js_quantity_exceed_msg h4",s).text(t.max_sku_for_eachcard>0?" 子商户每张券累计只可发放%s份 ".sprintf(t.max_sku_for_eachcard):" 账号违规，不能改动库存，详请查看通知中心 ")):5==i?r||$(".js_go_activate",s).click(function(){
n.removeAll(),location.href=wx.url("/merchant/cardstat?action=overviewpage");
}):6==i&&e.get({
url:"/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
},function(t){
0==t.base_resp.ret?l(1==t.is_acct_open?0:5):e.handleRet(t,{
id:64463,
key:25,
url:"/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
});
});
s.attr("isinit",1);
}
var d,_=$(this).data("cid");
if(t.before&&t.before(_)===!1)return!1;
var u=t.data;
if(t.cache_card&&(u=t.cache_card[_]),u.is_sns_card&&3!=u.status&&5!=u.status&&6!=u.status)return a.err("审核中的朋友的券无法修改库存"),
!1;
if(u.is_sns_card){
if(c.tooltip=new r({
container:this,
content:o({
setquantity:t.setquantity,
data:u
}),
container_mode:t.mode||"absolute",
reposition:!0,
type:"click",
onclose:function(t){
if(t){
for(var e=this.$dom.get(0),a=t.target,i=!1;a&&a!==document.body;){
if(a==e){
i=!0;
break;
}
a=a.parentNode;
}
i?this.show():this.hide();
}
}
}),l(6),c.tooltip.show(),n.removeAll(),n.add(c.tooltip),$(".popover").css({
"z-index":"10000",
width:"326px"
}),"fixed"==t.mode){
var p=parseInt(c.tooltip.$dom.css("top"))||0;
c.tooltip.$dom.css("top",p-($(document.body).scrollTop()||0));
}
s.stopPropagation();
}else{
var m=new r({
container:this,
content:o({
setquantity:t.setquantity,
data:u
}),
container_mode:t.mode||"absolute",
type:"click",
reposition:!0,
onclose:function(t){
if(t){
for(var e=this.$dom.get(0),a=t.target,i=!1;a&&a!==document.body;){
if(a==e){
i=!0;
break;
}
a=a.parentNode;
}
i?this.show():this.hide();
}
},
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
var o=m.$dom,s=o.find(".js_value"),r=parseInt($.trim(s.val()));
if(isNaN(r)||0>=r)return a.err("库存必须是不能小于1的整数"),!1;
var l=1e9;
return r>=l?(a.err("库存不能大于10亿"),s.focus(),!1):void e.post({
url:"/merchant/electroniccardmgr",
data:{
action:t.setquantity?"modifyquantity":"setquantity",
card_id:_,
value:r,
isadd:d.value()
}
},function(o){
if(0==o.base_resp.ret)$(t.container).data("isswipe")||a.suc("设置库存成功"),n.removeAll(),
t.quantityChange&&t.quantityChange.call(c,_,!t.setquantity||d.value()?r:-r);else if(10039==o.base_resp.ret||76==o.base_resp.ret){
var s=$.parseJSON(o.biz_quota_json),l=i.parse_assistsend_quota(s.quota_list);
a.err(l.max_sku>0?"子商户每张券累计只可发放%s份".sprintf(l.max_sku):"账号违规，不能改动库存，详请查看通知中心");
}else 1e4==o.base_resp.ret?a.err("库存不能小于0"):e.show(o);
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
n.removeAll();
}
}]
});
if(m.show(),n.removeAll(),n.add(m),$(".popover").css({
"z-index":"10000",
width:"326px"
}),d=m.$dom.find(".js_quantity_type").checkbox(),m.$dom.find(".js_value").focus(),
"fixed"==t.mode){
var p=parseInt(m.$dom.css("top"))||0;
m.$dom.css("top",p-($(document.body).scrollTop()||0));
}
s.stopPropagation();
}
window.report_click_ele&&window.report_click_ele(this);
});
};
return c;
});define("tpl/cardticket/card_preview.html.js",[],function(){
return'<div class="pop_card_preview js_pop_card_preview">\n	<span class="hook hook_right_top js_arrow">\n	<!--\n		箭头位置 \n		hook_right_top      右偏上\n		\n	-->\n		<span class="hook_top"></span>\n		<span class="hook_btm"></span>\n	</span>\n	<div class="card_preview">\n		<div class="client_side">\n			<div class="banner">{convert_type card.type}</div>\n			<div class="wrp">\n				<div class="top" style="background-color: {card.color};border-bottom-color: {card.color};">\n					<div class="logo group">\n						<div class="avartar l"><img src="{http2https card.logo_url}"></div>\n						<p>{card.brand_name}</p>\n					</div>\n					<div class="msg">\n						<div class="main_msg">\n							<p>{card.title}</p>\n							<p class="title_sub">{card.sub_title}</p>\n						</div>\n						<p class="time">有效期 {validtime card \'YYYY-MM-DD\'}</p>\n					</div>\n					<div class="deco"></div>\n				</div>\n				<div class="wrp_content">\n					<div class="wrp_section section_dispose">\n						{if card.code_type==0}\n							<div class="main_msg sn">1513-2290-1878</div>\n						{else if card.code_type==1}\n							<div class="bar_code_panel">\n								<div class="main_msg bar_code"></div>\n								<p class="sn">1513-2290-1878</p>\n							</div>\n						{else if card.code_type==2}\n							<div class="qr_code_panel">\n								<div class="main_msg qr_code"></div>\n								<p class="sn">1513-2290-1878</p>\n							</div>\n						{/if}\n						<p>{card.notice}</p>\n					</div>\n					<div class="wrp_section">\n						<ul class="info_list">\n							<li class="info_li">\n								<p class="info">{convert_type card.type}详情</p>\n								<span class="supply_area"><i class="ic ic_go"></i></span>\n							</li>\n							<li class="info_li">\n								<p class="info">适用门店</p>\n								<span class="supply_area">{card.location_id_list.length}家<i class="ic ic_go"></i></span>\n							</li>\n						</ul>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>';
});define("tpl/cardticket/card_table.html.js",[],function(){
return'<div class="release_method js_card_container send_card">\n	{if loading}\n	<div class="loading"><i class="icon_loading_small white">loading...</i></div>\n	{else}\n	<div class="sub_title_bar group">\n		{if sns_card_type==2}<a href="javascript:void(0);" class="js_add_card_link r btn btn_primary">新建朋友的券 </a>{/if}\n		<!-- <span class="frm_input_box search append">\n			<a href="javascript:void(0);" class="js_search frm_input_append">\n				<i class="icon16_common search_gray">搜索</i>\n				&nbsp;\n			</a>\n			<input type="text" placeholder="请输入卡券名称" class="frm_input js_keyword">\n		</span>  -->\n	</div>\n	<div class="table_wrp release_method_select_table_wrp">\n		<table class="table" cellspacing="0">\n			<thead class="thead">\n				<tr>\n					<th class="table_cell release_method_select_box">&nbsp;</th>\n					{if view_mode==2}\n					<th class="table_cell">商户名</th>\n					{/if}\n					<th class="table_cell release_method_kind"><div class="td_panel">卡券类型</div></th>\n					<th class="table_cell release_method_name"><div class="td_panel"><div class="js_filter_tag">卡券名称</div></div></th>\n					{if !hide_valid_date}\n					<th class="table_cell release_method_time"><div class="td_panel">卡券有效期</div></th>\n					{/if}\n					<th class="table_cell release_method_stock"><div class="td_panel">库存</div></th>\n					{if (payflag==1||payflag==2) && sns_card_type!=2}<th class="table_cell release_method_price"><div class="td_panel">微信价(元)</div></th>{/if}\n					<!-- <th class="table_cell release_method_preview"><div class="td_panel">预览</div></th> -->\n					<th class="table_cell release_method_state"><div class="td_panel">卡券状态</div></th>\n				</tr>\n			</thead>\n			<tbody class="tbody">\n			{if !data.length}\n				<tr>\n					<td class="empty_tips" colspan="6">暂无卡券</td>\n				</tr>\n			{else}\n			{each data as card i}\n            <tr  class="{if hasdata && (i<pageInfo.begin||i>=pageInfo.begin+pageInfo.count)}dn{/if}{if (sns_card_type==2 && !card.is_sns_card) || (sns_card_type==1 && card.is_sns_card) || card.is_sub_merchant_disabled} disabled_item{/if}" id="js_ct_tr_{card.id}">\n					<td class="table_cell release_method_select_box"><div class="td_panel">\n						{if !multi}\n						<label class="frm_radio_label">\n							<i class="icon_radio"></i>\n							<input type="radio" data-id="{card.id}" value="{card.id}" class="frm_radio js_select{if sns_card_type}{if card.is_sns_card} js_select_disabled_1{else} js_select_disabled_2{/if}{/if}">\n						</label>\n						{else}\n						<label class="frm_checkbox_label">\n							<i class="icon_checkbox"></i>\n							<input type="checkbox" data-id="{card.id}" value="{card.id}" class="frm_checkbox js_select{if sns_card_type}{if card.is_sns_card} js_select_disabled_1{else} js_select_disabled_2{/if}{/if}">\n						</label>\n						{/if}\n					</div></td>\n					{if view_mode==2}\n					<td class="table_cell release_method_kind"><div class="td_panel">{card.brand_name}</div></td>\n					{/if}\n					<td class="table_cell release_method_kind"><div class="td_panel">{convert_type card.type}</div></td>\n					<td class="table_cell release_method_name"><div class="td_panel">{card.title}{if card.is_sns_card}<i class="ic_social">共享</i>{/if}{if card.is_intercomm}<i class="icon18 ic_intercomm"></i>{/if}</div></td>\n					{if !hide_valid_date}\n					<td class="table_cell release_method_time"><div class="td_panel">{validtime card \'YYYY-MM-DD\'}</div></td>\n					{/if}\n					<td class="table_cell release_method_stock"><div class="td_panel"><span class="js_sendcard_quantity{if card.quantity==0} text_weak{/if}">{card.quantity}</span>\n						{if editquantity && !card.is_from_intercomm && card.can_edit_quantity}<a class="icon14_common edit_gray js_modify_quantity" href="javascript:;" data-new="{if card.isnew}1{/if}" data-cid="{card.id}" data-x="-161" title="修改库存"></a>{else}<span class="w20"></span>{/if}</div>\n					</td>\n					{if (payflag==1||payflag==2) && sns_card_type!=2}<td class="table_cell release_method_price"><div class="td_panel">{if card.ispay}{card.price}{else}--{/if}</div></td>{/if}\n					<!-- <td class="table_cell release_method_preview"><div class="td_panel"><a data-cid="{card.id}" data-x="-125" class="js_card_preview" href="javascript:void(0);">预览</a></div></td> -->\n					<td class="table_cell release_method_state"><div class="td_panel"><span class="fail pass"><i></i>{convert_state card.status}</span></div></td></td>\n				</tr>\n			{/each}\n			{/if}\n			</tbody>\n		</table>\n		{if !hide_tips}\n			{if tips_wording}\n				<div class="mini_tips l">{=tips_wording}</div>\n			{else if sns_card_type==1}\n				<div class="mini_tips l">只能投放普通券</div>\n			{else if sns_card_type==2}\n				<div class="mini_tips l">\n					{if use_scene==2}\n						只能投放商户的其它可共享优惠券					{else}\n						只能投放可共享优惠券					{/if}\n				</div>\n			{/if}\n		{/if}\n        <div class="js_pager"></div>\n        {if multi}\n        <p class="dialog_bt_tip">已选<span class="js_selectcount">{defaultValues.length||0}</span>个</p>\n        {/if}\n	</div>\n	{/if}\n</div>\n';
});define("cardticket/create_card_select.js",["biz_web/ui/checkbox.js","common/wx/Tips.js","common/wx/popup.js","common/wx/dialog.js","cardticket/select_sub_merchant_table.js","cardticket/common_template_helper.js","tpl/cardticket/choose_card_type.html.js","common/wx/Step.js"],function(e){
"use strict";
function t(e){
return 1==window.view_mode&&(1==c||2==c)||2==window.view_mode&&e&&h.can_category_use_sns_card(e.PrimaryCategoryId,e.SecondaryCategoryId);
}
function i(e,t){
var i=$(e.step2container).html(f({
flag:e.ispay,
is_sns_card:e.is_sns_card,
show_all_card:e.show_all_card,
view_mode:window.view_mode
})),n=$(".frm_tab").height();
$(".js_is_friend_type_1 .js_card_type",i).checkbox({
onChanged:function(e){
t.card_type1=$(e).val();
var s=$(e).attr("data-not_has_condition");
t.has_condition=1==s?!1:!0;
var o=$(".frm_tab .selected",i).index(),_=0-o*n;
$(".tab_items",i).css("top",_);
}
}),$(".js_is_friend_type_2 .js_card_type",i).checkbox({
onChanged:function(e){
t.card_type2=$(e).val();
var i=$(e).attr("data-not_has_condition");
t.has_condition=1==i?!1:!0;
}
}),i.find(".js_is_friend").checkbox({
onChanged:function(e){
$(".js_is_friend_type",i).hide(),$(".js_is_friend_type_"+$(e).val(),i).show(),1==$(e).val()?(t.is_friend=!0,
setTimeout(function(){
n=$(".frm_tab",i).height();
var e=$(".js_is_friend_type_1 .frm_radio_label",i).length;
$(".choose_card_type,.frm_tab_item",i).css("height",n),$(".tab_items",i).css("height",n*e);
})):t.is_friend=!1,$(".js_is_friend_type_"+$(e).val(),i).find(".js_card_type:checked").click(),
t.$popup.popup("resetPosition");
}
}),"undefined"!=typeof c&&_(e,t,i);
}
function n(e,i){
var n=$(m()).popup({
title:"创建优惠券",
autoShow:!1,
width:956,
buttons:[{
text:"取消",
type:"default",
click:function(){
this.hide();
}
},{
text:"下一步",
type:"primary",
click:function(){
var e=i.merchantSelector.selectedValue();
e&&(i.merchant_data=e,o(i));
}
},{
text:"上一步",
type:"default",
click:function(){
s(i);
}
},{
text:"确定",
type:"primary",
click:function(){
return i.is_friend&&"undefined"==typeof c?!0:(i.is_friend&&!t(i.merchant_data)&&(p.show({
msg:'本公众号子商户类目不支持制作朋友的券|<a href="https://mp.weixin.qq.com/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info&lang=zh_CN#1dot1" target="_blank">查看朋友的券类目开放范围</a>',
type:"info",
buttons:[{
text:"取消",
click:function(e){
this.remove(e);
},
type:"normal"
},{
text:"配置子商户",
click:function(e){
window.open(wx.url("/merchant/cardhelpmakesend?action=list")),this.remove(e);
},
type:"primary"
}]
}),this.hide()),i.is_friend&&i.card_type1||!i.is_friend&&i.card_type2?(window.open(wx.url("/merchant/electroniccardmgr?action=%s&type=%s&flag=%s&is_sns_card=%s&has_condition=%s%s".sprintf(i.is_friend?"addsnspage":"addpage",i.is_friend?i.card_type1:i.card_type2,1==e.ispay?1:"0",i.is_friend?1:"0",i.has_condition?1:"0",i.merchant_data?"&sub_merchant_id="+i.merchant_data.Id:""))),
void this.hide()):void d.err("请选择卡券类型"));
}
}],
onHide:function(){
e.onHide&&e.onHide.call(i),this.remove();
},
className:"align_edge"
});
i.$popup=n,i.step=new l({
container:n.find(".js_step_container"),
names:["1 选择代制的子商户","2 选择券类型"]
}),i.$popup.popup("show");
var _=n.popup("get").find(".js_step_content");
i.opt.step2container=_[1],i.opt.container=$(_[0]).find(".js_sub_merchant_list");
}
function s(e){
var t=e.$popup,i=t.popup("get").find(".js_step_content"),n=t.popup("get").find(".js_btn_p");
$(n[0]).show(),$(n[1]).show(),$(n[2]).hide(),$(n[3]).hide(),e.step.go(1),$(i[0]).show(),
$(i[1]).hide(),t.popup("resetPosition");
}
function o(e){
var t=e.$popup,n=t.popup("get").find(".js_step_content"),s=t.popup("get").find(".js_btn_p");
$(s[0]).hide(),$(s[1]).hide(),$(s[2]).show(),$(s[3]).show(),$(n[0]).hide(),$(n[1]).show(),
e.step.go(2),e.opt.merchant_data=e.merchant_data,i(e.opt,e),t.popup("resetPosition");
}
function _(e,i,n){
$(".js_is_friend_tips",n).hide(),!t(i.merchant_data)&&e.show_all_card?($(n.find(".js_is_friend")[1]).click(),
$(n.find(".js_is_friend")[0]).checkbox().disabled(!0),$(".js_is_friend_view_mode"+(window.view_mode||1)+"_tips",n).show()):($(n.find(".js_is_friend")[0]).checkbox().disabled(!1),
$(n.find(".js_is_friend")[0]).click(),$(".js_is_friend_support_tips",n).show());
}
function a(e){
var t=this;
this.opt=e,n(e,t);
var i=t.$popup.popup("get");
if(1==window.view_mode){
o(t);
var i=t.$popup.popup("get");
i.find(".js_step_container").hide();
var a=i.find(".js_btn_p");
$(a[2]).hide();
}else s(t);
var d={
resetPosition:function(){
t.$popup.popup("resetPosition");
},
getDataComplete:function(e){
var i=t.$popup.popup("get");
e&&e.length?$(i.find(".js_btn_p")[0]).removeClass("btn_disabled"):$(i.find(".js_btn_p")[0]).addClass("btn_disabled");
},
container:e.container,
is_sns_card:!1,
max_card:e.max_card
};
t.merchantSelector=new r(d),"undefined"==typeof c&&h.check_assist_brand_name_type(function(n){
c=n,_(e,t,i);
});
}
var c,d=(e("biz_web/ui/checkbox.js"),e("common/wx/Tips.js")),p=(e("common/wx/popup.js"),
e("common/wx/dialog.js")),r=e("cardticket/select_sub_merchant_table.js"),h=e("cardticket/common_template_helper.js"),f=template.compile(e("tpl/cardticket/choose_card_type.html.js")),m=template.compile('<div>			<div class="wrp_processor js_step_container"></div>			<div class="first_step js_step_content js_step1">				<div class="js_sub_merchant_list select_subshop"></div>			</div>			<div class="second_step js_step_content js_step2"></div>			</div>'),l=e("common/wx/Step.js");
return window.view_mode||(window.view_mode=1),a;
});define("cardticket/store_cgi.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/tooltipsManager.js","common/wx/dialog.js"],function(t){
"use strict";
var e=t("common/wx/Cgi.js"),s=t("common/wx/Tips.js"),o=t("common/wx/tooltips.js"),c=t("common/wx/tooltipsManager.js"),n=(t("common/wx/dialog.js"),
{
deleteStore:function(t){
e.post({
url:"/merchant/entityshop?action=delete",
data:{
id:t.store_id
},
btn:t.btn
},function(o){
0==o.base_resp.ret?(s.suc("删除门店成功"),t.success&&t.success()):e.show(o);
});
},
deleteWithConfirm:function(t){
if(3==t.state||4==t.state){
var e=new o({
container:t.container,
content:"删除将影响在用此门店的卡券功能、微信连Wi-Fi、摇一摇周边、LBS广告等相关业务。<br />你确定要删除吗？",
type:"click",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
if(t.success){
var e=t.success;
t.success=function(){
e&&e(),c.removeAll();
};
}
n.deleteStore(t);
}
},{
text:"取消",
type:"btn_default",
click:function(){
c.removeAll();
}
}]
});
e.show(),c.removeAll(),c.add(e);
}
},
listStore:function(t){
var s=$.extend({},{
action:"list",
begin:0,
count:9999999,
keyword:t.keyword,
task_id:t.task_id,
audit_state:t.audit_state||3
},t.getDataExtra);
e.get({
url:"/merchant/entityshop",
data:s
},function(s){
var o,c=s?1*s.base_resp.ret:-1;
if(0===c){
var n=$.parseJSON(s.data);
o={
shop_list:n.store_location,
total_num:s.total_count,
is_from_wxapoi:"true"===s.is_from_wxapoi
};
}else{
if(-7!==c&&200007!==c)return void e.show(s);
o={
shop_list:[],
total_num:0,
access_deny:!0
};
}
t.success&&t.success(o),wx.cgiData&&!wx.cgiData._store_data&&(wx.cgiData._store_data=o);
});
},
canSendCard:function(t){
t.success&&t.success(!0);
}
});
return n;
});define("tpl/popover.html.js",[],function(){
return'<div class="popover {className}" style="{if width}width:{width}px;{/if}">\n    <div class="popover_inner">\n        <div class="popover_content jsPopOverContent">{=content}</div>\n		<!--#0001#-->\n        {if close}<a href="javascript:;" class="popover_close icon16_common close_flat jsPopoverClose">关闭</a>{/if}\n        <!--%0001%-->\n\n        <div class="popover_bar">{each buttons as bt index}<a href="javascript:;" class="btn btn_{bt.type} jsPopoverBt">{bt.text}</a>{if index < buttons.length-1}&nbsp;{/if}{/each}</div>\n    </div>\n    <i class="popover_arrow popover_arrow_out"></i>\n    <i class="popover_arrow popover_arrow_in"></i> \n</div>\n';
});define("biz_web/lib/spin.js",[],function(){
var t=function(){
function t(t,n){
for(var e=~~((t[f]-1)/2),r=1;e>=r;r++)n(t[2*r-1],t[2*r]);
}
function n(n){
var e=document.createElement(n||"div");
return t(arguments,function(t,n){
e[t]=n;
}),e;
}
function e(t,n,r){
return r&&!r[z]&&e(t,r),t.insertBefore(n,r||null),t;
}
function r(t,n){
var e,r=[h,n,~~(100*t)].join("-"),i="{"+h+":"+t+"}";
if(!A[r]){
for(e=0;e<T[f];e++)try{
D.insertRule("@"+(T[e]&&"-"+T[e].toLowerCase()+"-"||"")+"keyframes "+r+"{0%{"+h+":1}"+n+"%"+i+"to"+i+"}",D.cssRules[f]);
}catch(o){}
A[r]=1;
}
return r;
}
function i(t,n){
var e,r,i=t[g];
if(void 0!==i[n])return n;
for(n=n.charAt(0).toUpperCase()+n.slice(1),r=0;r<T[f];r++)if(e=T[r]+n,void 0!==i[e])return e;
}
function o(n){
return t(arguments,function(t,e){
n[g][i(n,t)||t]=e;
}),n;
}
function s(n){
return t(arguments,function(t,e){
void 0===n[t]&&(n[t]=e);
}),n;
}
var a,u="width",f="length",l="radius",c="lines",d="trail",p="color",h="opacity",v="speed",m="shadow",g="style",w="height",b="left",x="top",y="px",k="childNodes",$="firstChild",z="parentNode",C="position",M="relative",R="absolute",j="animation",B="transform",N="Origin",E="Timeout",L="coord",O="#000",S=g+"Sheets",T="webkit0Moz0ms0O".split(0),A={};
e(document.getElementsByTagName("head")[0],n(g));
var D=document[S][document[S][f]-1],H=function(t){
this.opts=s(t||{},c,12,d,100,f,7,u,5,l,10,p,O,h,.25,v,1);
},I=H.prototype={
spin:function(t){
var n=this,r=n.el=n[c](n.opts);
if(t&&e(t,o(r,b,~~(t.offsetWidth/2)+y,x,~~(t.offsetHeight/2)+y),t[$]),!a){
var i=n.opts,s=0,u=20/i[v],f=(1-i[h])/(u*i[d]/100),l=u/i[c];
!function p(){
s++;
for(var t=i[c];t;t--){
var e=Math.max(1-(s+t*l)%u*f,i[h]);
n[h](r,i[c]-t,e,i);
}
n[E]=n.el&&window["set"+E](p,50);
}();
}
return n;
},
stop:function(){
var t=this,n=t.el;
return window["clear"+E](t[E]),n&&n[z]&&n[z].removeChild(n),t.el=void 0,t;
}
};
I[c]=function(t){
function i(e,r){
return o(n(),C,R,u,t[f]+t[u]+y,w,t[u]+y,"background",e,"boxShadow",r,B+N,b,B,"rotate("+~~(360/t[c]*k)+"deg) translate("+t[l]+y+",0)","borderRadius","100em");
}
for(var s,a=o(n(),C,M),g=r(t[h],t[d]),k=0;k<t[c];k++)s=o(n(),C,R,x,1+~(t[u]/2)+y,B,"translate3d(0,0,0)",j,g+" "+1/t[v]+"s linear infinite "+(1/t[c]/t[v]*k-1/t[v])+"s"),
t[m]&&e(s,o(i(O,"0 0 4px "+O),x,2+y)),e(a,e(s,i(t[p],"0 0 1px rgba(0,0,0,.1)")));
return a;
},I[h]=function(t,n,e){
t[k][n][g][h]=e;
};
var U="behavior",V="url(#default#VML)",W="group0roundrect0fill0stroke".split(0);
return function(){
var t,r=o(n(W[0]),U,V);
if(!i(r,B)&&r.adj){
for(t=0;t<W[f];t++)D.addRule(W[t],U+":"+V);
I[c]=function(){
function t(){
return o(n(W[0],L+"size",d+" "+d,L+N,-a+" "+-a),u,d,w,d);
}
function r(r,i,f){
e(v,e(o(t(),"rotation",360/s[c]*r+"deg",b,~~i),e(o(n(W[1],"arcsize",1),u,a,w,s[u],b,s[l],x,-s[u]/2,"filter",f),n(W[2],p,s[p],h,s[h]),n(W[3],h,0))));
}
var i,s=this.opts,a=s[f]+s[u],d=2*a,v=t(),g=~(s[f]+s[l]+s[u])+y;
if(s[m])for(i=1;i<=s[c];i++)r(i,-2,"progid:DXImage"+B+".Microsoft.Blur(pixel"+l+"=2,make"+m+"=1,"+m+h+"=.3)");
for(i=1;i<=s[c];i++)r(i);
return e(o(n(),"margin",g+" 0 0 "+g,C,M),v);
},I[h]=function(t,n,e,r){
r=r[m]&&r[c]||0,t[$][k][n+r][$][$][h]=e;
};
}else a=i(r,j);
}(),H;
}();
$.fn.spin=function(n,e){
return this.each(function(){
var r=$(this),i=r.data();
i.spinner&&(i.spinner.stop(),delete i.spinner),n!==!1&&(n=$.extend({
color:e||r.css("color")
},$.fn.spin.presets[n]||n),i.spinner=new t(n).spin(this));
});
},$.fn.spin.presets={
tiny:{
lines:8,
length:2,
width:2,
radius:3
},
small:{
lines:8,
length:4,
width:3,
radius:5
},
large:{
lines:10,
length:8,
width:4,
radius:8
}
};
});define("cardticket/select_sub_merchant_table.js",["tpl/cardticket/select_sub_merchant_table.html.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","biz_web/ui/checkbox.js","page/cardticket/dialog_choose_sub_store.css","cardticket/common_template_helper.js"],function(t){
"use strict";
function e(t){
var e,a=t.opt;
e=t.$container,e.html(c({
loading:!0,
param:a.param
})),a.resetPosition&&a.resetPosition();
}
function a(t,a){
var o=a.opt,r=$.extend(!0,{
action:"list",
offset:o.pageInfo.begin,
limit:o.pageInfo.count
},o.param);
f=!0,e(a),l.get({
url:o.url||"/merchant/cardhelpmakesend",
data:r,
complete:function(){
f=!1;
}
},function(t){
if(0==t.base_resp.ret||-1==t.base_resp.ret){
var e=$.parseJSON(t.bind_list),r=$.parseJSON(t.sub_merchant_remain_quota);
if(o.data=e.List,o.remain_data=r.list,o.is_sns_card)for(var i=0;i<e.List.length;i++){
var s=e.List[i];
s.can_not_use_sns_card=!p.can_category_use_sns_card(s.PrimaryCategoryId,s.SecondaryCategoryId);
}
o.pageInfo.total_count=t.total_count||0,n(o.pageInfo,a);
}else l.show(t);
});
}
function n(t,e){
for(var a,n=e.opt,s=0;s<n.data.length;s++)$.extend(n.data[s],n.remain_data[s]);
return a=e.$container,a.html(c(n)),n.resetPosition&&n.resetPosition(),n.data.length?(e.pagebar=null,
i(n.pageInfo,e),r(e,n.data,a),o(e,a),void(n.getDataComplete&&n.getDataComplete(n.data))):(r(e,n.data,a),
void o(e,a));
}
function o(t,e){
function n(e){
o.param.keyword=e,a(o.pageInfo,t);
}
var o=t.opt,r=$(".js_search_input",e).on("keyup",function(t){
var e=$.trim($(this).val());
wx.isHotkey(t,"enter")&&n(e);
});
$(".js_search_btn",e).click(function(){
var t=$.trim(r.val());
n(t);
});
}
function r(t){
var e=t.opt;
$(".js_merchant_item").click(function(){
var t=$(this).hasClass("js_merchant_disabled");
t||($(".js_merchant_item").removeClass("selected"),$(this).addClass("selected"));
}),e.resetPosition&&e.resetPosition();
}
function i(t,e){
var n=t.total_count,o=e.$container;
if(t.count&&n>t.count){
var r=t.begin/t.count;
e.pagebar=new u({
container:$(".js_pager",o),
first:!1,
last:!1,
midRange:5,
initShowPage:r+1,
perPage:t.count,
totalItemsNum:n,
callback:function(n){
if(f)return!1;
var o=n.currentPage;
return o!=r+1&&(t.begin=(o-1)*t.count,a(t,e)),!0;
}
});
}
}
function s(t,e){
for(var a=0;a<t.length;a++)if(t[a].Id==e)return t[a];
return null;
}
{
var c=t("tpl/cardticket/select_sub_merchant_table.html.js"),l=(t("common/wx/popup.js"),
t("common/wx/Cgi.js")),u=t("common/wx/pagebar.js"),m=t("common/wx/Tips.js");
t("biz_web/ui/checkbox.js");
}
t("page/cardticket/dialog_choose_sub_store.css");
var p=t("cardticket/common_template_helper.js");
c=template.compile(c);
var _={
pageInfo:{
begin:0,
count:12,
total_count:0
},
param:{
status_list:1,
keyword:""
},
url:null,
data:null,
is_sns_card:!1,
selectComplete:$.noop,
onHide:$.noop
},d=function(t){
this.opt=$.extend(!0,{},_,t),this.init();
},f=!1;
return d.prototype={
init:function(){
var t=this.opt,e=this;
e.$container=$(t.container),t.data?n(t.pageInfo,e):a(t.pageInfo,e);
},
get:function(){
return this.$container;
},
selectedValue:function(){
var t=this.opt;
if(!t.data||!t.data.length)return!1;
var e=this.get(),a=e.find(".js_merchant_item.selected");
if(!a.length)return m.err("请选择子商户"),!1;
var n=a.attr("data-id"),o=s(t.data,n);
return o;
}
},d;
});