/* vim: set tabstop=4 shiftwidth=4 expandtab: */
/*jshint -W030 */
/*jshint -W021 */
//获取错误代码
/*$ jshint --verbose myfile.js */
/**
 * @file a.js
 * @brief   观察者多对一式公用弹层
 * @author baozi
 * @version 0.0.2
 * @date 2015-01-14
 */

define("a",["jquery","handlebars"],function(require, exports, module) {
    /**绑定log**/
    function log() {//{{{
        var console = window.console;
        var args = Array.prototype.slice.call(arguments);
          args.unshift('^_^! >>');

        if(!!console && !!console.log.apply) {
            console.log && console.log.apply(console,args);
        }
    }//}}}

    var $ = require("jquery");
    var _ = {};
    var ObjProto = Object.prototype,
    hasOwnProperty = ObjProto.hasOwnProperty;
// Extend a given object with all the properties in passed-in object(s).
// Shortcut function for checking if an object has a given property directly
// on itself (in other words, not on a prototype).
// Is a given variable an object?
_.has = function(obj, key) {//{{{
    return hasOwnProperty.call(obj, key);
};//}}}
_.extend = function(obj) {//{{{
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
            if (hasOwnProperty.call(source, prop)) {
                obj[prop] = source[prop];
            }
        }
    }
    return obj;
};//}}}
_.isObject = function(obj) {//{{{
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};//}}}
var extend = function(protoProps, staticProps) {//{{{
    //父类 --> Backbone.Views || Backbone.Model
    var parent = this;
    //子类 -->实例对象
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
    } else {
    // ** 子类继承父类通过改变this的指向把父类的方法都指向了child
    child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    // 静态属性添加到构造函数里
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate ();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    //返回子类
    return child;
};//}}}
//弹层基类
function Popup () {//{{{
    this.box = null;
    this.config =  {
        title: "操作信息",
        content : "",
        status: true,
        tipsStatus: "popup-success",
        isScroll: false,
        isMask: false,
        point: { },
        callCloseBack :function (){}
    };
    this.mask = $('<div class="popup-mask"></div>');

    this.isShow ="";

    this.topics = {};
    this.subUid = -1;
    this.pubsubz ={};
    //this.init.call(this)
}//}}}
Popup.prototype = {
    publish : function ( topic, args ) {//{{{
        
        var that = this;
        if (!this.topics[topic]) {
            return false;
        }

        setTimeout(function () {
            var subscribers = that.topics[topic],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
                subscribers[len].func(topic, args);
            }
        }, 0);
        return true;

    },//}}}
    subscribe : function ( topic, func ) {//{{{

        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        var token = (++this.subUid).toString();
        this.topics[topic].push({
            token: token,
            func: func
        });
        return token;
    },//}}}
    unsubscribe :function ( token ) {//{{{
        for (var m in topics) {
            if (this.topics[m]) {
                for (var i = 0, j = this.topics[m].length; i < j; i++) {
                    if (this.topics[m][i].token === token) {
                        this.topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    },//}}}
    getPubSubz : function(){//{{{
        return this.pubsubz;
    },//}}}
    //初始化
    init: function () { //{{{
        log(">>> Person >> this.init");
    },//}}}
    //渲染
    render: function (container) {//{{{

       this.init.call(this);

        if(this.config.isMask) {
            $(document.body).append(this.mask);
        }
        $(container||document.body).append(this.box);

        this.bind();
        this.position();
        this.config.isScroll ? this.scroll() : false;
        this.show();

        log(">>this.render");
    },//}}}
    scroll: function () {//{{{
        var that = this;

        $(window).scroll(function (obj) {

        var t= $(this).scrollTop();
        var h = $(this).height();

        that.box.css({
            "top" : (h - that.box.height()) / 2 + t 
        });
    });

    },//}}}
    //定位位置
    position : function () {//{{{

        var WINDOW = $(window),
            DOCUMENT = $(document);

        var point = this.config.point;

        var win = {
            T: WINDOW.scrollTop(),
            L: WINDOW.scrollLeft(),
            H: WINDOW.outerHeight(),
            W: WINDOW.width()
        },
        doc = {
            H : DOCUMENT.outerHeight(),
            W : DOCUMENT.width()
        };
        obj = {
            H: this.box.outerHeight(true),
            W: this.box.outerWidth(true),
            L: this.box.offset().left,
            T: this.box.offset().top
        };

        this.box.css({
            left: point.x || ((win.W - obj.W) / 2) + win.L,
            top: point.y || ((win.H - obj.H) / 2) + win.T
        });
        //console.log(win.H,doc.H)
        this.mask.css({
            height: Math.max(win.H ,doc.H),
            width: Math.max(win.W, doc.W)
        });
    },//}}}
    show: function () {//{{{
        this.box.show();
        this.mask.show();
        this.isShow = true;
    },//}}}
    hide: function () {//{{{
        this.box.hide();
    },//}}}
    autoHide: function (time) {//{{{
        var that = this;
        that.globalTime = setTimeout(function() {
            that.hide();
        },time || 1500);
    },//}}}
    //绑定事件
    bind: function () {//{{{
        log(">>> Person >> this.bind");
    },//}}}
    //销毁组件
    destroy: function () {//{{{

        this.destructor();
        this.box.off();
        //TODO 这里是remove也就是把元素删除，导致第二次点击元素消失这里注释
        this.box.remove();
        this.mask && this.mask.remove();
        this.isShow = false;
        log(">>> Person >> this.destroy");
    },//}}}
    //对象销毁
    destructor: function () {//{{{
        //console.log(">>> Person >> this.destructor")
    }//}}}
};
Popup.extend = PopupConfirm.extend = PopupEmpty.extend = extend;
/***alert****/
function PopupLayer (config) { }
PopupLayer = Popup.extend({//{{{

    init: function () {
        var tips = '<div class="popup-alert popup UI_animated UI_speed_fast UI_ani_bounceIn" style="display:none">'+
          '<h3 class="popup-header">'+this.config.title+'</h3>'+
          '<div class="popup-content">'+
            '<p class="'+this.config.tipsStatus+'">'+
              '<p class="popup-tips-info">'+this.config.content+'</p>'+
          '</div>'+
          '<div class="popup-footer">'+
            '<a  class="j_popup_btn popup-btn" href="javascript:;">确定</a>'+
          '</div>'+
        '</div>';
        

        this.box = $(tips);
        log(">>this.init >> alert");
    },
    
    bind: function () {
        var that = this;
        this.box.on("click",".j_popup_btn",function () {
            that.publish("close");
            that.destroy();
            that.config.callCloseBack && that.config.callCloseBack();
        });
        //console.log(">>this.bind")
    },

    alert: function (config) {

        $.extend(this.config,config);

        this.render();
    }
});//}}}
/***对话框***/
function PopupConfirm () { }
PopupConfirm = Popup.extend({//{{{
     init: function () {
          var tips = '<div class="popup popup-confim UI_animated UI_speed_fast UI_ani_bounceIn" style="display:none">'+
          '<h3 class="popup-header">'+this.config.title+'</h3>'+
          '<div class="popup-content">'+ this.config.content+ '</div>'+
          '<div class="popup-footer">'+
            '<a  class="j_popup_cancel popup-btn" data-type="CANCEL" href="javascript:;">取消</a>'+" "+
            '<a  class="j_popup_btn popup-btn"  data-type="COMMIT" href="javascript:;">确定</a>'+
          '</div>'+
        '</div>';

        this.box = $(tips);
        log(">>this.init >> confim");
    },
    
    bind: function () {
        var that = this;
        this.box.on("click",".j_popup_btn",function () {
            that.publish("send","data");
            //that.callCloseBack && that.callCloseBack()
        });
        this.box.on("click",".j_popup_cancel",function () {
            that.publish("cancel","data");
            that.destroy();
        });
        //console.log(">>this.bind")
    },

     confim: function (config) {

        $.extend(this.config,config);

        //如何模板是获取的不是生成的需要重置出始化
        //this.init()

        this.render();
    }


});//}}}

/**空的弹出**/
function PopupEmpty () {}
PopupEmpty = Popup.extend({});

    if (typeof module != "undefined" && module.exports) {
        /**对外接口**/
        module.exports = {
            PopupLayer : PopupLayer,
            PopupConfirm: PopupConfirm,
            PopupEmpty: PopupEmpty
        };
    }

});



