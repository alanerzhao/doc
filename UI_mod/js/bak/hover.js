define("hover",["jquery"],function(require, exports, module) {

        var $ = require("jquery");

        var hover = (function () {
            function init () {
                var _item = $(".J_list");
                _item.on("mouseenter","dl",function(){
                    var _self = $(this);
                    _self.addClass("J_hover").siblings().removeClass("J_hover");
                });
            }
            return {
                init: init
            }
        })()

    if (typeof module != "undefined" && module.exports) {
        module.exports = hover;
    }
});
