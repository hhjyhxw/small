
/* 图片缩放*/
function scale(_img, max, oWidth, oHeight) {

    var img = new Image();
    img.src = $(_img).attr("src");

    var width = 0, height = 0, percent, ow = img.width || oWidth, oh = img.height || oHeight;
    if (ow > max || oh > max) {
        if (ow >= oh) {
            if (width = ow - max) {
                percent = (width / ow).toFixed(2);
                _img.height = oh - oh * percent;
                _img.width = max;
            }
        } else {
            if (height = oh - max) {
                percent = (height / oh).toFixed(2);
                _img.width = ow - ow * percent;
                _img.height = max;
            }
        }
    }

    //    img.style.display = "";
}


function ImgMiddle(_img, MaxWidth, MaxHeight) {

    $(_img).css("display", "");

    var img = new Image();
    img.src = $(_img).attr("src");

    var w = img.width;
    var h = img.height;

    var _Mw = MaxWidth / w;
    var _Mh = MaxHeight / h;
    if (_Mw > _Mh) {
        h = MaxWidth / w * h;
        $(_img).css("width", MaxWidth + "px");
        $(_img).css("height", h + "px");
        $(_img).css("margin-top", -(h - MaxHeight) / 2 + "px");
        $(_img).css("margin-left", "0");

    }
    else {
        w = MaxHeight / h * w;
        $(_img).css("height", MaxHeight + "px");
        $(_img).css("width", w + "px");
        $(_img).css("margin-left", -(w - MaxWidth) / 2 + "px");
        $(_img).css("margin-top", "0");
    }
}

function ImgScale(_img, MaxWidth, MaxHeight) {

    $(_img).css("display", "");

    var img = new Image;
    img.src = $(_img).attr("src");

    var w = img.width;
    var h = img.height;
    if (w > MaxWidth || h > MaxHeight) {
        if (MaxWidth / w * h < MaxHeight / h * w) {
            $(_img).css("width", MaxWidth + "px");
        }
        else {
            $(_img).css("height", MaxHeight + "px");
        }
    }
}