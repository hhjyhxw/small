//控制session超时，跳到登录页面
$.ajaxSetup({
	error: function (XMLHttpRequest, textStatus, errorThrown){
		
	},
	complete: function(XMLHttpRequest, textStatus){
		var reg = /session time out/gi; //正则
		if(XMLHttpRequest){
			if(XMLHttpRequest.responseText){
				var obj;
				try{
					obj = $.parseJSON(XMLHttpRequest.responseText);
					if(obj.error){
						if( -1 != obj.error.search(reg)){
							alert('登录超时，请重新登录！');
							window.top.location.href = GLOBAL.CONTEXT_PATH + "/index.jsp"; //跳转到登陆页面
						}	
					}
				}catch(e){

				}
			}
		}
	}
});

// 转化解析C传来的图片
var WX_VIDEO_WIDTH = 300;
var WX_VIDEO_HEIGHT = 150;
var MSG_TYPE_TEXT = 0;
var MSG_TYPE_IMG = 1;
var MSG_TYPE_AUDIO = 2;
var MSG_TYPE_VIDEO = 3;
var MSG_TYPE_FILE = 4;
var MSG_TYPE_MATERIAL = 5;
var MSG_TYPE_EMAIL = 6;
var MSG_TYPE_LINK = 7;
//正常多媒体格式
var RTN_IMG_PREFIX = "<$URL|";
var RTN_IMG_SUFFIX = "|$>";
//移动端多媒体格式
var MOBILE_IMG_PREFIX = "{$PIC|";
var MOBILE_IMG_SUFFIX = "$}";


var emojiItems = [{tip: "[微笑]", src: "100.gif", qqcode:"[B014]", wxcode : "/::)",wbcode:"[微笑]"},
  {tip: "[伤心]", src: "101.gif", qqcode:"[B001]", wxcode : "/::~",wbcode:""},
  {tip: "[美女]", src: "102.gif", qqcode:"[B002]", wxcode : "/::B",wbcode:"[色]"},
  {tip: "[发呆]", src: "103.gif", qqcode:"[B003]", wxcode : "/::|",wbcode:"[思考]"},
  {tip: "[墨镜]", src: "104.gif", qqcode:"[B004]", wxcode : "/:8-)",wbcode:"[酷]"},
  {tip: "[哭]", src: "105.gif", qqcode:"[B005]", wxcode : "/::<",wbcode:"[泪]"},
  {tip: "[羞]", src: "106.gif", qqcode:"[B006]", wxcode : "/::$",wbcode:"[害羞]"},
  {tip: "[哑]", src: "107.gif", qqcode:"[B007]", wxcode : "/::X",wbcode:"[闭嘴]"},
  {tip: "[睡]", src: "108.gif", qqcode:"[B008]", wxcode : "/::Z",wbcode:"[睡]"},
  {tip: "[大哭]", src: "109.gif", qqcode:"[B009]", wxcode : "/::'(",wbcode:"[泪]"},
  {tip: "[囧]", src: "110.gif", qqcode:"[B010]", wxcode : "/::-|",wbcode:"[囧]"},
  {tip: "[怒]", src: "111.gif", qqcode:"[B011]", wxcode : "/::@",wbcode:"[怒]"},
  {tip: "[调皮]", src: "112.gif", qqcode:"[B012]", wxcode : "/::P",wbcode : ""},
  {tip: "[大笑]", src: "113.gif", qqcode:"[B013]", wxcode : "/::D",wbcode:"[嘻嘻]"},
  {tip: "[惊讶]", src: "114.gif", qqcode:"[B000]", wxcode : "/::O",wbcode:"[惊讶]"},
  {tip: "[难过]", src: "115.gif", qqcode:"[B050]", wxcode : "/::(",wbcode:"[悲伤]"},
  {tip: "[酷]", src: "116.gif", qqcode:"[B051]", wxcode : "/::+",wbcode:"[酷]"},
  {tip: "[汗]", src: "117.gif", qqcode:"[B096]", wxcode : "/:--b",wbcode:"[汗]"},
  {tip: "[抓狂]", src: "118.gif", qqcode:"[B053]", wxcode : "/::Q",wbcode:"[抓狂]"},
  {tip: "[吐]", src: "119.gif", qqcode:"[B054]", wxcode : "/::T",wbcode:"[吐]"},
  {tip: "[笑]", src: "120.gif", qqcode:"[B073]", wxcode : "/:,@P",wbcode:"[偷笑]"},
  {tip: "[快乐]", src: "121.gif", qqcode:"[B074]", wxcode : "/:,@-D",wbcode:"[太开心]"},
  {tip: "[奇]", src: "122.gif", qqcode:"[B075]", wxcode : "/::d",wbcode:"[白眼]"},
  {tip: "[傲]", src: "123.gif", qqcode:"[B076]", wxcode : "/:,@o",wbcode : ""},
  {tip: "[饿]", src: "124.gif", qqcode:"[B077]", wxcode : "/::g",wbcode:"[馋嘴]"},
  {tip: "[累]", src: "125.gif", qqcode:"[B078]", wxcode : "/:|-)",wbcode:"[困]"},
  {tip: "[吓]", src: "126.gif", qqcode:"[B055]", wxcode : "/::!",wbcode:""},
  {tip: "[汗]", src: "127.gif", qqcode:"[B056]", wxcode : "/::L",wbcode:"[汗]"},
  {tip: "[高兴]", src: "128.gif", qqcode:"[B057]", wxcode : "/::>",wbcode:"[哈哈]"},
  {tip: "[闲]", src: "129.gif", qqcode:"[B058]", wxcode : "/::,@",wbcode : ""},
  {tip: "[努力]", src: "130.gif", qqcode:"[B079]", wxcode : "/:,@f",wbcode : ""},
  {tip: "[骂]", src: "131.gif", qqcode:"[B080]", wxcode : "/::-S",wbcode:"[怒骂]"},
  {tip: "[疑问]", src: "132.gif", qqcode:"[B081]", wxcode : "/:?",wbcode:"[疑问]"},
  {tip: "[秘密]", src: "133.gif", qqcode:"[B082]", wxcode : "/:,@x",wbcode:"[嘘]"},
  {tip: "[乱]", src: "134.gif", qqcode:"[B083]", wxcode : "/:,@@",wbcode:"[晕]"},
  {tip: "[疯]", src: "135.gif", qqcode:"[B084]", wxcode : "/::8",wbcode:"[抓狂]"},
  {tip: "[哀]", src: "136.gif", qqcode:"[B085]", wxcode : "/:,@!",wbcode:"[衰]"},
  {tip: "[鬼]", src: "137.gif", qqcode:"[B086]", wxcode : "/:!!!",wbcode : ""},
  {tip: "[打击]", src: "138.gif", qqcode:"[B087]", wxcode : "/:xx",wbcode : ""},
  {tip: "[bye]", src: "139.gif", qqcode:"[B088]", wxcode : "/:bye",wbcode:"[拜拜]"},
  {tip: "[汗]", src: "140.gif", qqcode:"[B097]", wxcode : "/:wipe",wbcode:"[汗]"},
  {tip: "[抠]", src: "141.gif", qqcode:"[B098]", wxcode : "/:dig",wbcode:"[挖鼻]"},
  {tip: "[鼓掌]", src: "142.gif", qqcode:"[B099]", wxcode : "/:handclap",wbcode:"[鼓掌]"},
  {tip: "[糟糕]", src: "143.gif", qqcode:"[B100]", wxcode : "/:&-(",wbcode : ""},
  {tip: "[恶搞]", src: "144.gif", qqcode:"[B101]", wxcode : "/:B-)",wbcode:"[阴险]"},
  {tip: "[左哼哼]", src: "145.gif", qqcode:"[B102]", wxcode : "/:<@",wbcode:"[左哼哼]"},
  {tip: "[右哼哼]", src: "146.gif", qqcode:"[B103]", wxcode : "/:@>",wbcode:"[右哼哼]"},
  {tip: "[哈欠]", src: "147.gif", qqcode:"[B104]", wxcode : "/::-O",wbcode:"[哈欠]"},
  {tip: "[看]", src: "148.gif", qqcode:"[B105]", wxcode : "/:>-|",wbcode:"[鄙视]"},
  {tip: "[委屈]", src: "149.gif", qqcode:"[B106]", wxcode : "/:P-(",wbcode:"[委屈]"},
  {tip: "[快哭]", src: "150.gif", qqcode:"[B107]", wxcode : "/::'|",wbcode:"[失望]"},
  {tip: "[坏]", src: "151.gif", qqcode:"[B108]", wxcode : "/:X-)",wbcode:"[坏笑]"},
  {tip: "[亲]", src: "152.gif", qqcode:"[B109]", wxcode : "/::*",wbcode:"[亲亲]"},
  {tip: "[吓]", src: "153.gif", qqcode:"[B110]", wxcode : "/:@x",wbcode:"[黑线]"},
  {tip: "[可怜]", src: "154.gif", qqcode:"[B111]", wxcode : "/:8*",wbcode:"[可怜]"},
  {tip: "[刀]", src: "155.gif", qqcode:"[B112]", wxcode : "/:pd",wbcode : ""},
  {tip: "[水果]", src: "156.gif", qqcode:"[B032]", wxcode : "/:<W>",wbcode : ""},
  {tip: "[酒]", src: "157.gif", qqcode:"[B113]", wxcode : "/:beer",wbcode : ""},
  {tip: "[篮球]", src: "158.gif", qqcode:"[B114]", wxcode : "/:basketb",wbcode : ""},
  {tip: "[乒乓]", src: "159.gif", qqcode:"[B115]", wxcode : "/:oo",wbcode : ""},
  {tip: "[咖啡]", src: "160.gif", qqcode:"[B063]", wxcode : "/:coffee",wbcode : ""},
  {tip: "[美食]", src: "161.gif", qqcode:"[B064]", wxcode : "/:eat",wbcode:""},
  {tip: "[动物]", src: "162.gif", qqcode:"[B059]", wxcode : "/:pig",wbcode:"[猪头]"},
  {tip: "[鲜花]", src: "163.gif", qqcode:"[B033]", wxcode : "/:rose",wbcode : ""},
  {tip: "[枯]", src: "164.gif", qqcode:"[B034]", wxcode : "/:fade",wbcode : ""},
  {tip: "[唇]", src: "165.gif", qqcode:"[B116]", wxcode : "/:showlove",wbcode : ""},
  {tip: "[爱]", src: "166.gif", qqcode:"[B036]", wxcode : "/:heart",wbcode:"[心]"},
  {tip: "[分手]", src: "167.gif", qqcode:"[B037]", wxcode : "/:break",wbcode:"[伤心]"},
  {tip: "[生日]", src: "168.gif", qqcode:"[B038]", wxcode : "/:cake",wbcode:"[蛋糕]"},
  {tip: "[电]", src: "169.gif", qqcode:"[B091]", wxcode : "/:li",wbcode : ""},
  {tip: "[炸弹]", src: "170.gif", qqcode:"[B092]", wxcode : "/:bome",wbcode : ""},
  {tip: "[刀子]", src: "171.gif", qqcode:"[B093]", wxcode : "/:kn",wbcode : ""},
  {tip: "[足球]", src: "172.gif", qqcode:"[B029]", wxcode : "/:footb",wbcode : ""},
  {tip: "[瓢虫]", src: "173.gif", qqcode:"[B117]", wxcode : "/:ladybug",wbcode : ""},
  {tip: "[翔]", src: "174.gif", qqcode:"[B072]", wxcode : "/:shit",wbcode : ""},
  {tip: "[月亮]", src: "175.gif", qqcode:"[B045]", wxcode : "/:moon",wbcode : ""},
  {tip: "[太阳]", src: "176.gif", qqcode:"[B042]", wxcode : "/:sun",wbcode : ""},
  {tip: "[礼物]", src: "177.gif", qqcode:"[B039]", wxcode : "/:gift",wbcode : ""},
  {tip: "[抱抱]", src: "178.gif", qqcode:"[B062]", wxcode : "/:hug",wbcode:"[抱抱_旧]"},
  {tip: "[拇指]", src: "179.gif", qqcode:"[B046]", wxcode : "/:strong",wbcode:"[good]"},
  {tip: "[贬低]", src: "180.gif", qqcode:"[B047]", wxcode : "/:weak",wbcode:"[弱]"},
  {tip: "[握手]", src: "181.gif", qqcode:"[B071]", wxcode : "/:share",wbcode : ""},
  {tip: "[剪刀手]", src: "182.gif", qqcode:"[B095]", wxcode : "/:v",wbcode:"[耶]"},
  {tip: "[抱拳]", src: "183.gif", qqcode:"[B118]", wxcode : "/:@)",wbcode : ""},
  {tip: "[勾引]", src: "184.gif", qqcode:"[B119]", wxcode : "/:jj",wbcode:"[来]"},
  {tip: "[拳头]", src: "185.gif", qqcode:"[B120]", wxcode : "/:@@",wbcode : ""},
  {tip: "[小拇指]", src: "186.gif", qqcode:"[B121]", wxcode : "/:bad",wbcode : ""},
  {tip: "[拇指八]", src: "187.gif", qqcode:"[B122]", wxcode : "/:lvu",wbcode : ""},
  {tip: "[食指]", src: "188.gif", qqcode:"[B123]", wxcode : "/:no",wbcode:"[NO]"},
  {tip: "[ok]", src: "189.gif", qqcode:"[B124]", wxcode : "/:ok",wbcode:"[ok]"},
  {tip: "[情侣]", src: "190.gif", qqcode:"[B027]", wxcode : "/:love",wbcode : ""},
  {tip: "[爱心]", src: "191.gif", qqcode:"[B021]", wxcode : "/:<L>",wbcode : ""},
  {tip: "[蹦哒]", src: "192.gif", qqcode:"[B023]", wxcode : "/:jump",wbcode : ""},
  {tip: "[颤抖]", src: "193.gif", qqcode:"[B025]", wxcode : "/:shake",wbcode : ""},
  {tip: "[怄气]", src: "194.gif", qqcode:"[B026]", wxcode : "/:<O>",wbcode : ""},
  {tip: "[跳舞]", src: "195.gif", qqcode:"[B125]", wxcode : "/:circle",wbcode : ""},
  {tip: "[叩头]", src: "196.gif", qqcode:"[B126]", wxcode : "/:kotow",wbcode : ""},
  {tip: "[背着]", src: "197.gif", qqcode:"[B127]", wxcode : "/:turn",wbcode : ""},
  {tip: "[伸手]", src: "198.gif", qqcode:"[B128]", wxcode : "/:skip",wbcode : ""},
  {tip: "[耍帅]", src: "199.gif", qqcode:"[B129]", wxcode : "/:oY",wbcode : ""},
  {tip: "[吃惊]", src: "200.gif", qqcode:"", wxcode : "",wbcode :"[吃惊]"},
  {tip: "[污]", src: "202.png", qqcode:"", wxcode : "",wbcode :"[污]"},
  {tip: "[挤眼]", src: "203.gif", qqcode:"", wxcode : "",wbcode :"[挤眼]"},
  {tip: "[失望]", src: "204.gif", qqcode:"", wxcode : "",wbcode:"[失望]"},
  {tip: "[舔屏]", src:"205.png", qqcode:"", wxcode : "",wbcode:"[舔屏]"},
  {tip: "[可爱]", src: "206.gif", qqcode:"", wxcode : "", wbcode :"[可爱]"},
  {tip: "[允悲]", src: "207.png", qqcode:"", wxcode : "", wbcode :"[允悲]"},
  {tip: "[笑而不语]", src: "208.png", qqcode:"", wxcode : "", wbcode :"[笑而不语]"},
  {tip: "[费解]", src: "209.png", qqcode:"", wxcode : "", wbcode :"[费解]"},
  {tip: "[憧憬]", src: "210.png", qqcode:"", wxcode : "", wbcode :"[憧憬]"},
  {tip: "[并不简单]", src: "211.png", qqcode:"", wxcode : "", wbcode :"[并不简单]"},
  {tip: "[爱你]", src: "214.gif", qqcode:"", wxcode : "", wbcode :"[爱你]"},
  {tip: "[生病]", src: "218.gif", qqcode:"", wxcode : "", wbcode :"[生病]"},
  {tip: "[钱]", src: "237.gif", qqcode:"", wxcode : "",wbcode :"[钱]"},
  {tip: "[哼]", src: "241.gif", qqcode:"", wxcode : "", wbcode :"[哼]"},
  {tip: "[互粉]", src: "249.gif", qqcode:"", wxcode : "",wbcode :"[互粉]"},
  {tip: "[熊猫]", src: "253.gif", qqcode:"", wxcode : "",wbcode :"[熊猫]"},
  {tip: "[兔子]", src: "254.gif", qqcode:"", wxcode : "",wbcode :"[兔子]"},
  {tip: "[赞]", src: "259.gif", qqcode:"", wxcode : "", wbcode:"[赞]"},
  {tip: "[草泥马]", src: "262.gif", qqcode:"", wxcode : "",wbcode :"[草泥马]"},
  {tip: "[神马]", src: "263.gif", qqcode:"", wxcode : "", wbcode :"[神马]"},
  {tip: "[浮云]", src: "265.gif", qqcode:"", wxcode : "",wbcode :"[浮云]"},
  {tip: "[给力]", src: "266.gif", qqcode:"", wxcode : "", wbcode :"[给力]"},
  {tip: "[围观]", src: "267.gif", qqcode:"", wxcode : "", wbcode :"[围观]"},
  {tip: "[威武]", src: "268.gif", qqcode:"", wxcode : "", wbcode :"[威武]"},
  {tip: "[话筒]", src: "269.gif", qqcode:"", wxcode : "", wbcode :"[话筒]"},
  {tip: "[蜡烛]", src: "270.gif", qqcode:"", wxcode : "", wbcode :"[蜡烛]"}
]

var qdEmoji = [
  { tip: "[惊讶]", code: "[B000]", src: "B000.png" },
  { tip: "[撇嘴]", code: "[B001]", src: "B001.png" },
  { tip: "[色]", code: "[B002]", src: "B002.png" },
  { tip: "[发呆]", code: "[B003]", src: "B003.png" },
  { tip: "[得意]", code: "[B004]", src: "B004.png" },
  { tip: "[流泪]", code: "[B005]", src: "B005.png" },
  { tip: "[害羞]", code: "[B006]", src: "B006.png" },
  { tip: "[闭嘴]", code: "[B007]", src: "B007.png" },
  { tip: "[睡]", code: "[B008]", src: "B008.png" },
  { tip: "[大哭]", code: "[B009]", src: "B009.png" },
  { tip: "[尴尬]", code: "[B010]", src: "B010.png" },
  { tip: "[怒]", code: "[B011]", src: "B011.png" },
  { tip: "[调皮]", code: "[B012]", src: "B012.png" },
  { tip: "[呲牙]", code: "[B013]", src: "B013.png" },
  { tip: "[微笑]", code: "[B014]", src: "B014.png" },
  { tip: "[难过]", code: "[B015]", src: "B015.png" },
  { tip: "[酷]", code: "[B016]", src: "B016.png" },
  { tip: "[抓狂]", code: "[B018]", src: "B018.png" },
  { tip: "[吐]", code: "[B019]", src: "B019.png" },
  { tip: "[偷笑]", code: "[B020]", src: "B020.png" },
  { tip: "[可爱]", code: "[B021]", src: "B021.png" },
  { tip: "[白眼]", code: "[B022]", src: "B022.png" },
  { tip: "[傲慢]", code: "[B023]", src: "B023.png" },
  { tip: "[饥饿]", code: "[B024]", src: "B024.png" },
  { tip: "[困]", code: "[B025]", src: "B025.png" },
  { tip: "[惊恐]", code: "[B026]", src: "B026.png" },
  { tip: "[汗]", code: "[B027]", src: "B027.png" },
  { tip: "[憨笑]", code: "[B028]", src: "B028.png" },
  { tip: "[大兵]", code: "[B029]", src: "B029.png" },
  { tip: "[奋斗]", code: "[B030]", src: "B030.png" },
  { tip: "[咒骂]", code: "[B031]", src: "B031.png" },
  { tip: "[疑问]", code: "[B032]", src: "B032.png" },
  { tip: "[嘘]", code: "[B033]", src: "B033.png" },
  { tip: "[晕]", code: "[B034]", src: "B034.png" },
  { tip: "[折磨]", code: "[B035]", src: "B035.png" },
  { tip: "[衰]", code: "[B036]", src: "B036.png" },
  { tip: "[骷髅]", code: "[B037]", src: "B037.png" },
  { tip: "[敲打]", code: "[B038]", src: "B038.png" },
  { tip: "[再见]", code: "[B039]", src: "B039.png" },
  { tip: "[发抖]", code: "[B041]", src: "B041.png" },
  { tip: "[爱情]", code: "[B042]", src: "B042.png" },
  { tip: "[跳跳]", code: "[B043]", src: "B043.png" },
  { tip: "[猪头]", code: "[B046]", src: "B046.png" },
  { tip: "[拥抱]", code: "[B049]", src: "B049.png" },
  { tip: "[蛋糕]", code: "[B053]", src: "B053.png" },
  { tip: "[闪电]", code: "[B054]", src: "B054.png" },
  { tip: "[炸弹]", code: "[B055]", src: "B055.png" },
  { tip: "[刀]", code: "[B056]", src: "B056.png" },
  { tip: "[足球]", code: "[B057]", src: "B057.png" },
  { tip: "[大便]", code: "[B059]", src: "B059.png" },
  { tip: "[咖啡]", code: "[B060]", src: "B060.png" },
  { tip: "[饭]", code: "[B061]", src: "B061.png" },
  { tip: "[玫瑰]", code: "[B063]", src: "B063.png" },
  { tip: "[凋谢]", code: "[B064]", src: "B064.png" },
  { tip: "[爱心]", code: "[B066]", src: "B066.png" },
  { tip: "[心碎]", code: "[B067]", src: "B067.png" },
  { tip: "[礼物]", code: "[B069]", src: "B069.png" },
  { tip: "[太阳]", code: "[B074]", src: "B074.png" },
  { tip: "[月亮]", code: "[B075]", src: "B075.png" },
  { tip: "[强]", code: "[B076]", src: "B076.png" },
  { tip: "[弱]", code: "[B077]", src: "B077.png" },
  { tip: "[握手]", code: "[B078]", src: "B078.png" },
  { tip: "[胜利]", code: "[B079]", src: "B079.png" },
  { tip: "[飞吻]", code: "[B085]", src: "B085.png" },
  { tip: "[无视]", code: "[B086]", src: "B086.png" },
  { tip: "[西瓜]", code: "[B089]", src: "B089.png" },
  { tip: "[擦汗]", code: "[B097]", src: "B097.png" },
  { tip: "[抠鼻]", code: "[B098]", src: "B098.png" },
  { tip: "[鼓掌]", code: "[B099]", src: "B099.png" },
  { tip: "[糗大了]", code: "[B100]", src: "B100.png" },
  { tip: "[坏笑]", code: "[B101]", src: "B101.png" },
  { tip: "[左哼哼]", code: "[B102]", src: "B102.png" },
  { tip: "[右哼哼]", code: "[B103]", src: "B103.png" },
  { tip: "[哈欠]", code: "[B104]", src: "B104.png" },
  { tip: "[鄙视]", code: "[B105]", src: "B105.png" },
  { tip: "[委屈]", code: "[B106]", src: "B106.png" },
  { tip: "[快哭了]", code: "[B107]", src: "B107.png" },
  { tip: "[阴险]", code: "[B108]", src: "B108.png" },
  { tip: "[亲亲]", code: "[B109]", src: "B109.png" },
  { tip: "[吓]", code: "[B110]", src: "B110.png" },
  { tip: "[可怜]", code: "[B111]", src: "B111.png" },
  { tip: "[菜刀]", code: "[B112]", src: "B112.png" },
  { tip: "[啤酒]", code: "[B113]", src: "B113.png" },
  { tip: "[篮球]", code: "[B114]", src: "B114.png" },
  { tip: "[乒乓]", code: "[B115]", src: "B115.png" },
  { tip: "[吻]", code: "[B116]", src: "B116.png" },
  { tip: "[瓢虫]", code: "[B117]", src: "B117.png" },
  { tip: "[抱拳]", code: "[B118]", src: "B118.png" },
  { tip: "[勾引]", code: "[B119]", src: "B119.png" },
  { tip: "[拳头]", code: "[B120]", src: "B120.png" },
  { tip: "[差劲]", code: "[B121]", src: "B121.png" },
  { tip: "[爱你]", code: "[B122]", src: "B122.png" },
  { tip: "[NO]", code: "[B123]", src: "B123.png" },
  { tip: "[OK]", code: "[B124]", src: "B124.png" },
  { tip: "[转圈]", code: "[B125]", src: "B125.png" },
  { tip: "[磕头]", code: "[B126]", src: "B126.png" },
  { tip: "[回头]", code: "[B127]", src: "B127.png" },
  { tip: "[跳绳]", code: "[B128]", src: "B128.png" },
  { tip: "[挥手]", code: "[B129]", src: "B129.png" },
  { tip: "[激动]", code: "[B130]", src: "B130.png" },
  { tip: "[街舞]", code: "[B131]", src: "B131.png" },
  { tip: "[献吻]", code: "[B132]", src: "B132.png" },
  { tip: "[左太极]", code: "[B133]", src: "B133.png" },
  { tip: "[右太极]", code: "[B134]", src: "B134.png" },
  { tip: "[双喜]", code: "[B136]", src: "B136.png" },
  { tip: "[鞭炮]", code: "[B137]", src: "B137.png" },
  { tip: "[灯笼]", code: "[B138]", src: "B138.png" },
  { tip: "[K歌]", code: "[B140]", src: "B140.png" },
  { tip: "[喝彩]", code: "[B144]", src: "B144.png" },
  { tip: "[祈祷]", code: "[B145]", src: "B145.png" },
  { tip: "[爆筋]", code: "[B146]", src: "B146.png" },
  { tip: "[棒棒糖]", code: "[B147]", src: "B147.png" },
  { tip: "[喝奶]", code: "[B148]", src: "B148.png" },
  { tip: "[飞机]", code: "[B151]", src: "B151.png" },
  { tip: "[钞票]", code: "[B158]", src: "B158.png" },
  { tip: "[药丸]", code: "[B168]", src: "B168.png" },
  { tip: "[手枪]", code: "[B169]", src: "B169.png" },
  { tip: "[下面]", code: "[B171]", src: "B171.png" },
  { tip: "[泪奔]", code: "[B173]", src: "B173.png" },
  { tip: "[无聊]", code: "[B174]", src: "B174.png" },
  { tip: "[酸]", code: "[B175]", src: "B175.png" },
  { tip: "[苦笑]", code: "[B176]", src: "B176.png" },
  { tip: "[喷血]", code: "[B177]", src: "B177.png" },
  { tip: "[滑稽]", code: "[B178]", src: "B178.png" },
  { tip: "[蔑视]", code: "[B179]", src: "B179.png" },
  { tip: "[惬意]", code: "[B180]", src: "B180.png" },
  { tip: "[扑克脸]", code: "[B181]", src: "B181.png" },
  { tip: "[笑哭]", code: "[B182]", src: "B182.png" },
  { tip: "[卖萌]", code: "[B183]", src: "B183.png" },
  { tip: "[螃蟹]", code: "[B184]", src: "B184.png" },
  { tip: "[草泥马]", code: "[B185]", src: "B185.png" },
  { tip: "[栗子]", code: "[B186]", src: "B186.png" },
  { tip: "[幽灵]", code: "[B187]", src: "B187.png" },
  { tip: "[鸡蛋]", code: "[B188]", src: "B188.png" },
  { tip: "[魔方]", code: "[B189]", src: "B189.png" },
  { tip: "[菊花]", code: "[B190]", src: "B190.png" },
  { tip: "[肥皂]", code: "[B191]", src: "B191.png" },
  { tip: "[红包]", code: "[B192]", src: "B192.png" },
  {tip: "[冷汗]", code:"[B096]", src:"B096.png"},
  {tip: "[托腮]", code:"[B212]", src:"B212.png"},
  {tip: "[大笑]", code:"[B193]", src:"B193.png"},
  {tip: "[不开心]", code:"[B194]", src:"B194.png"},
  {tip: "[冷漠]", code:"[B197]", src:"B197.png"},
  {tip: "[呃]", code:"[B198]", src:"B198.png"},
  {tip: "[好棒]", code:"[B199]", src:"B199.png"},
  {tip: "[拜托]", code:"[B200]", src:"B200.png"},
  {tip: "[点赞]", code:"[B201]", src:"B201.png"},
  {tip: "[无聊]", code:"[B202]", src:"B202.png"},
  {tip: "[托脸]", code:"[B203]", src:"B203.png"},
  {tip: "[吃]", code:"[B204]", src:"B204.png"},
  {tip: "[送花]", code:"[B205]", src:"B205.png"},
  {tip: "[害怕]", code:"[B206]", src:"B206.png"},
  {tip: "[花痴]", code:"[B207]", src:"B207.png"},
  {tip: "[小样儿]", code:"[B208]", src:"B208.png"},
  {tip: "[飙泪]", code:"[B210]", src:"B210.png"},
  {tip: "[我不看]", code:"[B211]", src:"B211.png"},
  {tip: "[眨眼睛]", code:"[B172]", src:"B172.png"},
    ];
	
  function showQDEmojiMsg(msg) {
    var show_msg = msg;
    for (var i = 0; i < qdEmoji.length; i++) {
      var regCode = qdEmoji[i].code.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
  var reg = new RegExp(regCode, "g");
  show_msg = show_msg.replace(reg, "<img class='wechat-emoji' src='/static/emoji/qdemoji/" + qdEmoji[i].src + "' />");
    }
    return show_msg;
  }
  
  function showEmojiMsg(type, msg){
    var self = this;
    var show_msg = msg;
    for(var i=0; i<emojiItems.length; i++) {
      if(type == 161) {
        if(emojiItems[i].wxcode) {
          var regCode = emojiItems[i].wxcode.replace(/\)/g, "\\)").replace(/\~/g, "\\~").replace(/\|/g, "\\|")
          .replace(/\&/g, "\\&").replace(/\*/g, "\\*").replace(/\(/g, "\\(").replace(/\</g, "\\<").replace(/\>/g, "\\>").replace(/\@/g, "\\@").replace(/\!/g, "\\!")
          .replace(/\-/g, "\\-").replace(/\+/g, "\\+").replace(/\?/g, "\\?").replace(/\$/g, "\\$");
      var reg = new RegExp(regCode, "g");
      show_msg = show_msg.replace(reg, "<img class='wechat-emoji' src='/static/emoji/" + emojiItems[i].src + "' />");
    }
  } 
  if(type == 1||type == 4){
    if(emojiItems[i].qqcode) {
      var regCode = emojiItems[i].qqcode.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
      var reg = new RegExp(regCode, "g");
      show_msg = show_msg.replace(reg, "<img class='wechat-emoji' src='/static/emoji/" + emojiItems[i].src + "' />");
    }
  }
  if(type == 165 || type == 101 || type == 102) {
    if(emojiItems[i].wbcode){
      var regCode = emojiItems[i].wbcode.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
      var reg = new RegExp(regCode, "g");
      show_msg=show_msg.replace(reg, "<img class='wechat-emoji' src='/static/emoji/"+ emojiItems[i].src +"' />");
        }
      }
    }
    return show_msg;
  }


//解析消息记录里多张图片等
function processImgNew(msg, msgType, useOnClick){
	var exist = true;
	var count = 0;
	while(exist){
		if(msg.indexOf(RTN_IMG_PREFIX) != -1){
			msg = processImg(msg, msgType, useOnClick)
		}else{
			exist = false;
		}
		/*
		 * 加上这个判断是为了怕消息内出现奇特的内容导致死循环，
		 * 所以判断若是超过了15次循环就退出循环。（一般来说一条记录里面不会有这个多个图片等）
		 */
		if(count > 15){
			exist = false;
		}else{
			count++;
		}
	}
	return msg;
}

//处理正常的图片
function processImg(msg, msgType, useOnClick){
	var imgstart = msg.indexOf(RTN_IMG_PREFIX);
	if(imgstart != -1){
		var imgend = msg.indexOf(RTN_IMG_SUFFIX, imgstart);
		var pretext = msg.substring(0, imgstart);
		var suftext = msg.substring(imgend + RTN_IMG_SUFFIX.length, msg.length);
		var src = msg.substring(imgstart + RTN_IMG_PREFIX.length, imgend);
		//special process .mp3,.amr,.mp4
		var medias = {
				".mp3" : "7", 
				".amr" : "7", 
				".mp4" : "10"
			};
		if(msgType*1 == 6){ //默认是图片，对于图片再进行一次检验，看是否有视频和语音
			for(var key in medias){
				if(src.indexOf(key, src.length - 5) != -1){
					msgType = medias[key];
					break;
				}
			}
		}
		var imgstr = "";
		switch(msgType*1){
		case 6:
			imgstr = "<img class='my-gallery tupian' style='width:100px;' src='" + src + "' ";
			if(!useOnClick){
				imgstr += " data-toggle='modal'  data-target='#tan' ";
			}else{
				imgstr += " onclick='palyImage(this)' ";
			}
			imgstr += " />";
			break;
		case 7:
			imgstr += '<button class="btn-voice" ';
			if(useOnClick){
				imgstr += ' onclick="palyVoice(this)" ';
			}
			imgstr += ' ></button>';
			imgstr += '<audio src="' + src + '.mp3' + '"></audio>';
			break;
		case 10:
			imgstr += '<span class="icon-box">';
			imgstr += '   <i class="icon icon-play-circle-o" ';
			if(useOnClick){
				imgstr += ' onclick="palyVideo(this)" ';
			}
			imgstr += ' ></i>';
			imgstr += '</span>';
			imgstr += '<video src="' + src + '" width="' + WX_VIDEO_WIDTH + '" height="' + WX_VIDEO_HEIGHT + '" ></video>';
			break;
		default: break;
		}
		return pretext + imgstr + suftext;
	}
	return msg;
}
//处理移动端图片
function processMobileImg(msg, msgType, useOnClick){
	var picstart = msg.indexOf(MOBILE_IMG_PREFIX);
	if(picstart != -1){
		var imgend = msg.indexOf(MOBILE_IMG_SUFFIX, picstart + MOBILE_IMG_PREFIX.length);
		var pretext = msg.substring(0, picstart);
		var suftext = msg.substring(imgend + MOBILE_IMG_SUFFIX.length, msg.length);
		var src = msg.substring(picstart + MOBILE_IMG_PREFIX.length, imgend);
		var imgstr = "<img class='my-gallery tupian' style='width:100px;' src='" + src + "' ";
		if(!useOnClick){
			imgstr += " data-toggle='modal'  data-target='#tan' ";
		}else{
			imgstr += " onclick='palyImage(this)' ";
		}
		imgstr += " />";
		return pretext + imgstr + suftext;
	}
	return msg;
}
//处理素材消息
function processMaterial(msg, msgType, useOnClick){
	// 特别处理是否为
	var regex = /<yx>text<\/yx><Articles><item><Title><!\[CDATA\[(.+?)\]\]><\/Title>.+<\/Articles>/g;
	var arr = msg.split(regex);
	var content = arr[1];
	return '<i class="icon-tubiao"></i>' + content;
}
function processWxFile(msg) {
    var result = [];
    var reg_wx_file = /<weixin><file>(.+)<\/file><name>(.+)<\/name><\/weixin>/g;
    var arr = msg.split(reg_wx_file);
    if(arr[0]) {
      result.push({type: MSG_TYPE_TEXT, content: arr[0]});
    }
    for(var i=1; i<arr.length; i=i+3) {
      var url = arr[i];
      //if(url.indexOf("http") != 0) {
      //  url = Global.weixinImageAddr + arr[i];
      // }
      result.push({type: MSG_TYPE_FILE, content: url, name: arr[i+1]});
      if(arr[i+2]) {
        result.push({type: MSG_TYPE_TEXT, content: arr[i+2]});
      }
    }
    var msg="";
    for(var i=0;i<result.length;i++){
    	var userInfo=JSON.parse(localStorage.getItem("USER_INFO"));
    	var content=result[i].content;
    	if(result[i].content.indexOf("http")!=0){
    		content=userInfo.downloadUrl+content;
    	}
    	msg+= '<span class="file">' +
         '      <i class="icon icon-folder fl"></i>' +
         '      <span class="fl"><a style="color:blue;" href="'+content+'" download="'+result[i].name+'" title="'+result[i].name+'">'+result[i].name+'</a></span>' +
         '    </span>';
    }
    return msg;
  }

//处理邮件渠道消息
function processEmail(msg, msgType, useOnClick){
	msg = msg.replace(/\n/g, "<br>");
	//var reg_email = /<weixin><html>(.+)<\/html><name>(.*)<\/name><\/weixin>/g;
	var reg_email = /<weixin><html>(.+?)<\/html><name>(.*?)<\/name><\/weixin>/g;
	var arr = msg.split(reg_email);
    var content = arr[3];
    var title = arr[2];
    var rest = arr[1];
    var baseUrl = "";
    var loginUser = JSON.parse(localStorage.getItem("USER_INFO"));
    if(loginUser) {
    	baseUrl = loginUser.downloadUrl;
    }
    
    var attaches = processEmailFile(content);
    if(attaches && attaches.length > 0) {
      var tmp = attaches[attaches.length-1];
      if(tmp && tmp.content) title = tmp.content.substr(0, 200);
    }
    var reg_wx_file = /<weixin><file>.+?<\/file><name>.+?<\/name><\/weixin>/g;
    if(reg_wx_file.test(content)){
      title = title + "【附件】";
    }
    
    if(title != null && title.length > 0){
    	title = title.substr(0, 200);
    }
    /*
    if(content != null && content.length > 0){
  	  content = content.substr(0, 200);
    }
    */
    var emailUrl = baseUrl + rest;
    return title + '<div class="text-right"><span data-toggle="modal" data-target="#emailchat" class="details" data-url="'+emailUrl+'" style="position:static">【详情】</span></div>';
}

function processEmailFile(msg) {
    var result = [];
    var reg_wx_file = /<weixin><file>(.+?)<\/file><name>(.+?)<\/name><\/weixin>/g;
    var arr = msg.split(reg_wx_file);
    if(arr[0]) {
      result.push({type: MSG_TYPE_TEXT, content: arr[0]});
    }
    for(var i=1; i<arr.length; i=i+3) {
      var url = arr[i];
      if(url.indexOf("http") != 0) {
    	  //url = baseUrl + arr[i];
      }
      result.push({type: MSG_TYPE_FILE, content: url, name: arr[i+1]});
      if(arr[i+2]) {
        result.push({type: MSG_TYPE_TEXT, content: arr[i+2]});
      }
    }
    return result;
}

/**
 * 解析电话留言内容
 * @param msg
 * @param msgType
 * @param useOnClick
 * @returns
 */
function processPhoneLeaveWordFile(msg ,msgType, useOnClick) {
    var result = [];
    var reg_wx_file = /<weixin><file>(.+?)<\/file><\/weixin>/g;
    var arr = msg.split(reg_wx_file);
    if(arr[0]) {
      result.push({type: MSG_TYPE_TEXT, content: arr[0]});
    }
    for(var i=1; i<arr.length; i=i+3) {
      var url = arr[i];
      result.push({type: MSG_TYPE_FILE, content: url, name: arr[i+1]});
      if(arr[i+2]) {
        result.push({type: MSG_TYPE_TEXT, content: arr[i+2]});
      }
    }
    var rtnMsg = '';
    var userInfo=JSON.parse(localStorage.getItem("USER_INFO"));
    var medias = {
			".mp3" : "7", 
			".amr" : "7", 
			".mp4" : "10",
			".jpg" : "6",
			".png" : "6",
	};
    if(result.length > 0){
    	for(var i=0;i<result.length;i++){
        	var msgType = "0";
        	var content = result[i].content;
        	if(content != null){
        		for(var key in medias){
        			if(content.toLowerCase().indexOf(key) >= 0){
        				msgType = medias[key];
        				if(content.indexOf("http") != 0){
        		    		content = userInfo.downloadUrl + content;
        		    	}
        				break;
        			}
        		}
        	}
        	var imgstr = "";
    		switch(msgType*1){
    		case 6:
    			imgstr = "<img class='my-gallery tupian' style='width:100px;' src='" + content + "' ";
    			if(!useOnClick){
    				imgstr += " data-toggle='modal'  data-target='#tan' ";
    			}else{
    				imgstr += " onclick='palyImage(this)' ";
    			}
    			imgstr += " />";
    			break;
    		case 7:
    			imgstr += '<button class="btn-voice" ';
    			if(useOnClick){
    				imgstr += ' onclick="palyVoice(this)" ';
    			}
    			imgstr += ' ></button>';
    			//imgstr += '<audio src="' + content + '.mp3' + '"></audio>';
    			imgstr += '<audio src="' + content + '"></audio>';
    			break;
    		case 10:
    			imgstr += '<span class="icon-box">';
    			imgstr += '   <i class="icon icon-play-circle-o" ';
    			if(useOnClick){
    				imgstr += ' onclick="palyVideo(this)" ';
    			}
    			imgstr += ' ></i>';
    			imgstr += '</span>';
    			imgstr += '<video src="' + content + '" width="' + WX_VIDEO_WIDTH + '" height="' + WX_VIDEO_HEIGHT + '" ></video>';
    			break;
    			default: 
    				imgstr = content;
    				break;
    		}
    		rtnMsg += imgstr;
        }
    	return rtnMsg;
    }else{
    	return msg;
    }
    
  }

// 获取cookie中的数据
function getHyxCookie(name){
	var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    var cookieStr = document.cookie;
    while (i < clen) {
        j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            var endstr = cookieStr.indexOf(";", j);
            if (endstr == -1) endstr = cookieStr.length;
            return unescape(cookieStr.substring(j, endstr));

        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0)
            break;
    }
    return "";
}

/**
 * msg ： 待转换的消息内容<br/>
 * msgType ： 消息类型，默认为空<br/>
 * useOnClick : 是否使用onclick事件进行播放图片语音视频，true 是 || false 否，默认false
 */
function convertImage(msg, msgType, useOnClick, imtype) {
	if(!msg){
		return msg;
	}
	if(!msgType){
		msgType = 6; //默认是图片		
	}
	if(imtype == 5) {
		msg = showQDEmojiMsg(msg);
	} else {
		msg = showEmojiMsg(imtype, msg)
	}
	if("boolean" != typeof useOnClick){ //默认false
		useOnClick = false;
	}
	//策略模式
	var imgstart = msg.indexOf(RTN_IMG_PREFIX);
	var mobilestart = msg.indexOf(MOBILE_IMG_PREFIX);
	var reg_material = /<yx>text<\/yx><Articles><item><Title><!\[CDATA\[(.+?)\]\]><\/Title>.+<\/Articles>/g;
	var reg_wx_file = /<weixin><file>.+<\/file><name>.+<\/name><\/weixin>/g;
	//var reg_email = /<weixin><html>.+<\/html><name>.*<\/name><\/weixin>/g;
	var reg_email = /<weixin><html>(.+)<\/html><name>(.*)<\/name><\/weixin>/g;
    var reg_wx_link = /<weixin><link><title>.+?<\/title><description>.+?<\/description><url>.+?<\/url><\/link><\/weixin>/g;
    var reg_phone_leaveWord_file = /<weixin><file>(.+?)<\/file><\/weixin>/g;
    if(reg_email.test(msg)){
    	return processEmail(msg, msgType, useOnClick);
    }else if(reg_wx_file.test(msg)) {
        return processWxFile(msg);
    }else if(reg_phone_leaveWord_file.test(msg)){
    	return processPhoneLeaveWordFile(msg, msgType, useOnClick);
    }
    else if (imgstart != -1){
		return processImgNew(msg, msgType, useOnClick);//processImg(msg, msgType, useOnClick);
	}else if(mobilestart != -1){
		return processMobileImg(msg, msgType, useOnClick);
	}else if(reg_material.test(msg)){
    	return processMaterial(msg, msgType, useOnClick);
    }
    msg = replaceUrlText(msg);
	return msg;
}

function replaceUrlText(msg) {
	var reg_url = /((http|ftp|https):\/\/)[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/g;
    return msg.replace(reg_url, function(match){
    	return "<a href='" + match + "' target='_blank'>" + match + "</a>";
    });
}

function convert2Txt(msg) {
	if(!msg){
		return msg;
	}
	//过滤掉所有的表情图片 begin
	var emojiReg = /<img\s*class="wechat-emoji".*?>/g;
	msg = msg.replace(emojiReg, '');
	//过滤掉所有的表情图片 end
	var prefix = RTN_IMG_PREFIX;
	var suffix = RTN_IMG_SUFFIX;
	var imgstart = msg.indexOf(RTN_IMG_PREFIX);
	var picstart = msg.indexOf(MOBILE_IMG_PREFIX);
	if (imgstart == -1 && picstart == -1){
		return msg;
	}
	if(picstart != -1){
		imgstart = picstart;
		prefix = MOBILE_IMG_PREFIX;
		suffix = MOBILE_IMG_SUFFIX;
	}
	var imgend = msg.indexOf(suffix, imgstart + prefix.length);
	var pretext = msg.substring(0, imgstart);
	var suftext = msg.substring(imgend + suffix.length, msg.length);
	return pretext + suftext;
}
//单独播放语音视频
function palyVoice(thiz){
	if(!$(thiz).hasClass('playing')){
        $(thiz).addClass('playing').siblings('audio').get(0).play();
    }else{
        $(thiz).removeClass('playing').siblings('audio').get(0).pause();
    }
}
function palyVideo(thiz){
	$(thiz).parent().hide();
    $(thiz).parent().next()[0].play();
    $(thiz).parent().siblings('video').attr('controls', 'controls');
}
function palyImage(thiz){ //".tupian" 对象上
    var browserName=navigator.userAgent.toLowerCase();
    if(/firefox/i.test(browserName)||/msie/i.test(browserName)){   //兼容火狐/IE浏览器
    	var p=$(thiz).attr("src");
    	$("#tan .modal-content").find("img").attr("src",p).outerWidth($(thiz).outerWidth()*1);
    }else{   //兼容Opera chrome safari 等主流浏览器
        var p=$(thiz).attr("src");
        $("#tan .modal-content").find("img").attr("src",p).css('zoom','100%');
    }
    $("#tan").modal("show");
}
//放大图片begin，还需要HTML中有“图片放大”的模态框，id="tan"
jQuery(document).ready(function($) {
		var browserName=navigator.userAgent.toLowerCase();
        if(/firefox/i.test(browserName)||/msie/i.test(browserName)){   //兼容火狐/IE浏览器
            $('#tan .close').hide();
            $("body").on("click",".tupian",function(){
                var p=$(this).attr("src");
                $("#tan .modal-content").find("img").attr("src",p).outerWidth($(this).outerWidth()*1);
            })
            $('.fd').on('click',function(){
                var w=$('#tan .modal-content').find('img').outerWidth();
                w+=100;
                if(w>=1200) return false;
                $('#tan .modal-content').find('img').outerWidth(w);
                $(this).parents('.modal').find('.txt').text(w+'px').show();
            }).on('mouseleave',function(){
                $(this).parents('.modal').find('.txt').outerWidth();
            });
            $('.sx').on('click',function(){
                var w=$('#tan .modal-content').find('img').outerWidth();
                w-=100;
                if(w<=200) return false;
                $('#tan .modal-content').find('img').outerWidth(w);
                $(this).parents('.modal').find('.txt').text(w+'px').show();
            }).on('mouseleave',function(){
                $(this).parents('.modal').find('.txt').outerWidth();
            });

            //鼠标滚轮控制图片的放缩
            if (window.addEventListener){
                $('#tan img')[0].addEventListener('DOMMouseScroll', wheel);
            }
            $('#tan img')[0].onmousewheel = wheel;
            function wheel(event){
                var delta = 0;
                if (!event) event = window.event;
                if (event.wheelDelta) {
                    delta = event.wheelDelta/120;
                    if (window.opera) delta = -delta;
                } else if (event.detail) {
                    delta = -event.detail/3;
                }
                if (delta)
                    handle(delta);
            }
            function handle(delta) {
                var w=$('#tan img').outerWidth();
                if(w>=1200){
                    if(delta<0){
                        w-=100;
                    }else{
                        return false;
                    }
                }else if(w<=200){
                    if(delta>0){
                        w+=100;
                    }else{
                        return false;
                    }
                }else{
                    if(delta>0){
                        w+=100;
                    }else{
                        w-=100;
                    }
                }
                $('#tan img').outerWidth(w);
                $('#tan').find('.txt').text(w+'px').show();
            }
              $('#tan img').on('mouseleave',function(){
                $(this).parents('.modal').find('.txt').hide();
            })
        }else{   //兼容Opera chrome safari 等主流浏览器
            $("body").on("click",".tupian",function(){
                var p=$(this).attr("src");
                $("#tan .modal-content").find("img").attr("src",p).css('zoom','100%');
            })
            $('.fd').on('click',function(){
                var  w = parseInt($(this).parents('.modal-content').find('img')[0].style.zoom)+30;
                if(w>=1000){
                    return false;
                }
                $(this).parents('.modal-content').find('img').css('zoom',w+'%');
                $(this).parents('.modal').find('.txt').text(w+'%').show();
            }).on('mouseleave',function(){
                $(this).parents('.modal').find('.txt').hide();
            })
            $('.sx').on('click',function(){
                var  w = parseInt($(this).parents('.modal-content').find('img')[0].style.zoom)-30;
                if(w<=50){
                    return false;
                }
                $(this).parents('.modal-content').find('img').css('zoom',w+'%');
                $(this).parents('.modal').find('.txt').text(w+'%').show();
            }).on('mouseleave',function(){
                $(this).parents('.modal').find('.txt').hide();
            })
            //滚轮实现图片放缩
            $('#tan img').on('mousewheel',function(){
                var zoom=parseInt(this.style.zoom);
                zoom+=event.wheelDelta/4;
                if(zoom<=50){
                    return false;
                }else if(zoom>=1000){
                    return false;
                } else{
                    $(this).css('zoom',zoom+'%');
                }
                $(this).parents('.modal').find('.txt').text(zoom+'%').show();
                return false;
            }).on('mouseleave',function(){
                $(this).parents('.modal').find('.txt').hide();
            })
        }
        $('#tan .close span').on('click',function(){
            $(this).parents('.modal').modal('hide');
        })
        $('#tan .modal-content').on('click',function(){
            return false;
        })
        $('#tan .modal-dialog').on('click',function(){
            $(this).parent().modal('hide');
        })
//放大图片end
});
// 根据下拉框id取得选中的text值
function getSelText(id){
   	var obj = document.getElementById(id);
   	var index = obj.options.selectedIndex;
   	var text = "";
   	if(index >= 0){
   		text = obj.options[index].text;
   	}
   	return text;
}

// 根据下拉框id取得选中的value值
function getSelValue(id){
 	var obj = document.getElementById(id);
 	var index = obj.options.selectedIndex;
 	var value = "";
 	if(index >= 0){
 		value = obj.options[index].value;
 	}
 	return value;
}

// 判断是否为空
function isBlank(str){
	return (str.replace(/\s*/,"").length===0);
}

// 判断是否是正整数
function isNumber(obj){
	var reg =  /^([1-9]\d*|[0]{1,1})$/;
	return reg.test(obj);
}

/*只有两个小数点*/
function isTwoPoint(obj){
	var reg =  /^([1-9]\d*|[0]{1,1})(.[0-9]{1,2})?$/;
	return reg.test(obj);
}

// 邮箱验证
function emailCheck(email) {  
	    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
	    if (!pattern.test(email)) {  
	        alert("请输入正确的邮箱地址。");  
	        return false;  
	    }  
	    return true;  
}  

// 根据class命名遍历选中的checkbox
function traverseCheckBox(name){
		var rtnStr = "";
		var boxArray = $("."+name);
		for(var i=0;i<boxArray.length;i++){
			if(boxArray[i].checked){
				if(rtnStr == ""){
					rtnStr = boxArray[i].value;
				}else{
					rtnStr += "," + boxArray[i].value;
				}
			}
		}
		return rtnStr;
}

Date.prototype.format = function(fmt) {
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  
