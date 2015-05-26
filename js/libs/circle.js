
(function($){
	$.fn.svgCircle = function(options){
			options = $.extend({
				parent : null,
				w : 75,
				R : 30,// 鍗婂緞,
				sW : 20,
				color : ["#000", "#000"], // 鍦嗗湀棰滆壊,
				perent : [100, 100],
                speed : 0,
                delay: 1000
			}, options);
			
		return this.each(function(){
			var parent = options.parent;
			if(!parent) return false;
			var w = options.w;		   
            var r = Raphael(parent, w, w),
                R = options.R, // 鍗婂緞
                init = true,
                param = {stroke: "#ff6666"},
                hash = document.location.hash,
                marksAttr = {fill: hash || "#444", stroke: "none"};
            // Custom Attribute
            r.customAttributes.arc = function (value, total, R) {

                var alpha = 360 / total * value,
                    a = (90 - alpha) * Math.PI / 180,
                    x = w/2 + R * Math.cos(a),
                    y = w/2 - R * Math.sin(a),
                    color = options.color,
                    path;
               
                if (total == value) {
                    path = [["M", w/2, w/2 - R], ["A", R, R, 0, 1, 1, w/2-0.01, w/2 - R]];
                } else {
                    path = [["M", w/2, w/2 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
                }

                return {path: path};
            };

            //var baseCircle = r.path().attr({stroke: "#f0f0f0", "stroke-width": options.sW}).attr({arc: [100, 100, R]});
            var myCircle = r.path().attr({stroke: "#ff6666","stroke-width": options.sW}).attr(param).attr({arc: [0.01, options.speed, R]});
            var text;
            
            if(options.perent[1] > 0){
                setTimeout(function(){
                    myCircle.animate({stroke: options.color[1], arc: [options.perent[1], 100, R]}, 900, ">");
                }, options.delay);
            }else{
                myCircle.hide();
            }
		});
	}
})(jQuery);
