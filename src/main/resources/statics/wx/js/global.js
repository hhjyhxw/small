! function( userAgent ) {

    var screen_w = parseInt(window.screen.width),

        scale = screen_w / 640;

    if ( /Android (\d+\.\d+)/.test( userAgent ) ) {

        var version = parseFloat( RegExp.$1 );

        document.write( version > 2.3

            ? '<meta name="viewport" content="width=640, minimum-scale = ' + scale + ", maximum-scale = " + scale + ', target-densitydpi=device-dpi">'

            : '<meta name="viewport" content="width=640, target-densitydpi=device-dpi">' );

    } else {

        document.write( '<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">' );

    }

}( navigator.userAgent );

		function ScrollImgLeft() {
			var speed = 50;
			var scroll_begin = document.getElementById("scroll_begin");
			var scroll_end = document.getElementById("scroll_end");
			var scroll_div = document.getElementById("scroll_div");
			scroll_end.innerHTML = scroll_begin.innerHTML;

			function Marquee() {
				if(scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
					scroll_div.scrollLeft -= scroll_begin.offsetWidth;
				else
					scroll_div.scrollLeft++;
			}
			var MyMar = setInterval(Marquee, speed);
			scroll_div.onmouseover = function() {
				clearInterval(MyMar);
			}
			scroll_div.onmouseout = function() {
				MyMar = setInterval(Marquee, speed);
			}
		}