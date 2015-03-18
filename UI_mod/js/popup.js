/**
 * @file popup.js
 * @brief   
 * @author baozi
 * @version 
 * @date 2014-12-03
 */
define("popup",["jquery"],function(require, exports, module) {

    var $ = require("jquery");

    var defaults = {
        text : "tips",
        model: "",
        isMask: true,
        callback : function () {}
    }
    //模板
    defaults.model = '<div class="popup">'+//{{{
            '<h3 class="popup-header"> 奖励 </h3>'+
            '<form action="" class="popup-form-post">'+
            '<div class="popup-content1">'+
                '<span class="popup-tips">提示信息</span>'+
                '<div class="popup-text">'+
                    '<label for="first-money">魔币 </label>'+
                    '<input id="first-money" name="coin" autofocus="autofocus" type="text">'+
                '</div>'+
                '<div class="popup-text">'+
                    '<label for="last-jewel">魔钻 </label>'+
                    '<input id="last-jewel" name="diamond" type="text">'+
                '</div>'+
                '<input type="hidden" name="viper_uid" id="popup-uid">'+
                '<input type="hidden" name="fid" id="popup-fid">'+
                '<div class="popup-textarea1 clearfix">'+
                    '<label for="">奖励原因</label>'+
                    '<textarea name="content"></textarea>'+
                '</div>'+
                '<div class="popup-btn1 clearfix">'+
                    '<input class="J-cancel popup-cancel" value="取消" type="button">'+
                    '<input class="J-commit popup-commit" value="确认" type="submit">'+
                '</div>'+
            '</div>'+
        '</form>'+
    '</div>'//}}}

    function Popup (o) {
        this.opts = $.extend({},defaults, o);
        this.mask = $('<div class="popup-mask"></div>');
    }

    Popup.prototype = {
        init: function (id,next) {//{{{
            this.uid = id;
            this.next = next || function () {};
            this.model = $(this.opts.model);
            $(document.body).append(this.model);
            
            if(this.opts.isMask) {
                $(document.body).append(this.mask);
            }
            this.position()
        },//}}}
        position: function () {
             var winObj = $(window),
                doc = $(document),
                win = {
                    T: winObj.scrollTop(),
                    L: winObj.scrollLeft(),
                    H: winObj.height(),
                    W: winObj.width()
                },
                doc = {
                    H : doc.height(),
                    W : doc.width()
                };
                obj = {
                    H: this.model.outerHeight(true),
                    W: this.model.outerWidth(true),
                    L: this.model.offset().left,
                    T: this.model.offset().top
                };

                this.model.css({
                    left: ((win.W - obj.W) / 2) + win.L,
                    top: ((win.H - obj.H) / 2) + win.T
                });
                this.mask.css({
                    height: Math.max(win.H ,doc.H),
                    width: Math.max(win.W, doc.W)
                });
            this.show();
            this.bind();
        },
        bind: function () {//{{{
            var self = this;
            self.next && self.next(self);
        },//}}}
        show: function () {//{{{
            this.mask.fadeIn();
            this.model.fadeIn();
        },//}}}
        hide: function (type) {//{{{
            this.model.fadeOut().remove();
            this.mask.fadeOut().remove();
        },//}}}
        autoHide: function (time) {//{{{
            var self = this;
           self.globalTime = setTimeout(function() {
                self.hide();
            },time || 1500)
        },//}}}
        send: function () {},
        close: function () {}
    }
    
    if (typeof module != "undefined" && module.exports) {
        module.exports = Popup;
    }
});




