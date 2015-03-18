/**
 * @file adminPopup.js
 * @brief   mulit popup
 * @author baozi
 * @todo 写的垃圾以后换掉用a.js
 * @version 
 * @date 2015-01-05
 */

define("adminPopup",["jquery","popup"],function(require, exports, module) {

     var $ = require("jquery"),
        Popup = require("popup");

        function AdminPopup (o) {

            Popup.call(this,o);
            this.opts.model = "<div>error</div>"
        }

        AdminPopup.prototype = new Popup;
    
        var AdminPopupProto = AdminPopup.prototype;
        AdminPopupProto.constructor = AdminPopup;

        AdminPopupProto.init = function (o) {

            this.create(o)
            this.bindEvent()

        }
        AdminPopupProto.setAttr = function (o) {

            var o = o || {},
                defaultStyle = {
                'z-index':99,
                'display':"block"
            },
            style = $.extend(defaultStyle,o.style,{})

            this.model.css(style)

            return this
        }
        AdminPopupProto.bind = function () {}

        AdminPopupProto.bindEvent = function () {

            this.conf.next && this.conf.next(this)
        }

        AdminPopupProto.create = function (o,parent) {

            this.conf = $.extend(this.opts,o);
            this.model = $(this.conf.model)
            this.model.addClass(this.conf.className)
            if(parent) {
                this.model.appendTo($(parent))
            } else {
                $(document.body).append(this.model)
            }
            if(this.opts.isMask) {
                $(document.body).append(this.mask);
            }

            this.setAttr(o)
            this.position()
            this.setup()

            return this
        }
        AdminPopupProto.setup = function (fn) {
            fn && fn(this)
        }
        AdminPopupProto.close = function (closeObj) {

            if(closeObj) {
                this.model.remove()
            } else {
                var allClass = this.conf.className
                $("."+allClass).remove();
                return false;
            }
        }
        AdminPopupProto.setPostion = function (o,val) {
          var pos = {},

            offset = o.offset(),
            height = o.height();

            pos.position = "absolute"
            pos.left = offset.left + val;
            pos.top = offset.top + height + val 

            return pos;

        }


    if (typeof module != "undefined" && module.exports) {
        module.exports = AdminPopup
    }
});
seajs.use("adminPopup");
