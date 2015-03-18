/**
 * 模块入口
 * require的是别名不是目录看到/
 **/
define('index',function(require, exports, module) {

    var $ = require("jquery"),
        fixed = require("fixed"),
        base = require("base"),
        LoadNewCont = require("load");
        //user = require("user");

    function fixedSidebar() {
    var fixedObj =  $(".J_fixed");
        //todo 改了源代码记录一下偏移值为60
        if($.browser.version < 9) {
            return;
        } else {
            fixedObj.stick_in_parent({recalc_every: 1})
        }
    }
    fixedSidebar();

    var load = new LoadNewCont({
      "wrapper": $("#postswrapper"),
      "url":"/site/getpost?page=",
      "tipsText" : "点击加载更多",
      "triggerType" : "click"
    });

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

    base.placeholder(".J_focus");
    hover.init();

    //无接口提供 入口模块
    /*if (typeof module != "undefined" && module.exports) {
        module.exports = ModuleName;
    }*/
});
seajs.use("index");

