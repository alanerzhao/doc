/**
 * @file base.js
 * @brief   ui dom handle
 * @author baozi
 * @version 
 * @date 2014-11-19
 */

define("base",["jquery"],function(require, exports, module) {

    var $ = require("jquery");
    var base = {
        //占位符处理
        placeholder : function (dom,txt) {//{{{
            $(dom).on('focus', function() {
                $(this).css("color","#000")
                if(txt) {
                     $(this).data('defaultText', txt);
                }
               if (!$(this).data('defaultText')) {
                     $(this).data('defaultText', $(this).val());
                }
                if ($(this).val()==$(this).data('defaultText')) {
                    $(this).val('');
                }

            });
            $(dom).on('blur', function() {
                 $(this).css("color","#ccc")
                if ($(this).val()=='') {
                    $(this).val($(this).data('defaultText')); 
                }
            });
        },//}}}
        //hash处理
        itemActive: function (dom,child,cur) {//{{{
            var hash = location.hash;
            $(dom).on("click",child,function(event) {
                $(this).parent().siblings().find(child).removeClass(cur);
                $(this).addClass(cur);
            });
            $(dom).find(child).each(function(idx,obj) {
                if ($(obj).attr("href") == hash) {
                    $(obj).addClass(cur)
                }
            })
        },//}}}
        //滚动处理
        anchor: function (_startElem, _endElem, _speed) {//{{{
            var item = $(_endElem);
            $(_startElem).each(function(){
                var that = $(this);
                that.click(function () {
                    index = that.index();
                    $('html,body').animate({
                        scrollTop: item.eq(index).offset().top
                    },_speed || 0);
                })
            })
        },//}}}
        //返回顶部
        scrollTop: function () {//{{{
             var linkTop = $("<a class='feed-scroll-top' href='javascript:;'></a>");
            $("body").append(linkTop);
            var winHeight = $(window).height();
            $(window).on("scroll",debounce(function () {
                var top = $(this).scrollTop();
                if(top > winHeight) {
                    linkTop.fadeIn();
                } else {
                    linkTop.fadeOut();
                }
                //if($('html,body').scrollTop() == 0) {
                     //$(".J_navbar").css("position","relative");
                //}
            },200))
            linkTop.click(function(){
                $('html,body').animate({scrollTop : 0},200);
                return false;
            });
        },//}}}
        //延时hover
        hoverdeLay : function (o) {//{{{
                
            var def = o.speed || 300,
                timer = null,
                proxy = o.proxy || $(this),
                point = o.point || {},
                content = o.content || "";
                before = o.before || function () {}



            o.currentObj.on("mouseenter",o.proxy,function(e) {
                var _this = $(this),
                post = setPostion(_this);
                $.extend(post,o.point,{})

                clearTimeout(timer);
                o.showObj.css(post)

                o.showObj.find("hover-tips-cont").html(content)
                if(o.a) {
                 o.showObj.css({"top": _this.offset().top - o.showObj.height() -35})
                }

                 var scrollTop = $(window).scrollTop(),
                    objTop = _this.offset().top,
                    showObjHeight = o.showObj.height();

                var minHeight = objTop - scrollTop
                //TODO 自适应显示
                var autoShow = o.autoShow || false;
                if(autoShow) {
                    if(minHeight > showObjHeight) {
                        o.showObj.removeClass("arrow-top")
                        o.showObj.css({
                            "top":objTop - showObjHeight - 10
                        })

                    } else {
                        o.showObj.addClass("arrow-top")
                        o.showObj.css({
                            "top":objTop + _this.height() + 10
                        })
                    }
                }


                timer = setTimeout(function () {
                    o.before && o.before(o.showObj)
                    o.showObj.show();
                },def)

            }).on("mouseleave",o.proxy,function() {

                clearTimeout(timer);
                timer = setTimeout(function() {
                    o.oneBack && o.oneBack()
                    o.showObj.hide()
                },def);
            });

            o.showObj.on("mouseenter",function() {

                clearTimeout(timer);

            }).on("mouseleave",function() {

                var _this = $(this);

                clearTimeout(timer)
                timer = setTimeout(function() {
                    _this.hide();
                    o.callBack && o.callBack(_this)
                },def);
            });
        },//}}}
        /**
         * djescription
         * @example 
         * tab({
         *     wrap: ".j_tab", //父级
         *     head: ".user-tab-hd li",//头块
         *     cont: ".user-tab-cont div" //内容块
         * }).trigger("change:tab",1) //索引值
         * @trigger 链式触发
         */
        tab: function (o){
            //TODO 更改模式
            var tabWrap = $(o.wrap),
                itemHead = o.head,
                itemContent = $(o.cont);

            tabWrap.on("click",itemHead,function () {

                var self = $(this),
                    tabIndex = self.index();
                
                tabWrap.trigger("change:tab",tabIndex)

            })

            tabWrap.on("change:tab",function (e,tabIndex) {

                var self = $(this);

                $(itemHead).eq(tabIndex).addClass("itemActive").siblings().removeClass("itemActive")
                itemContent.eq(tabIndex).show().siblings().hide()
            })

            return tabWrap

        },
        //计算位置
        setPostion : function (o) {//{{{
            var pos = {},
                offset = o.offset(),
                height = o.height();

            pos.position = "absolute"
            pos.left = offset.left;
            pos.top = offset.top + height

            return pos;
        },//}}}


    };
    // help 
    function setPostion () {
      var pos = {},
        offset = o.offset(),
        height = o.height();

    pos.position = "absolute"
    pos.left = offset.left;
    pos.top = offset.top + height

    return pos;

    }
    function debounce(func, wait, immediate) {//{{{
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }//}}}
    //计算位置
    function setPostion (o) {//{{{
        var pos = {},
            offset = o.offset(),
            height = o.height();

        pos.position = "absolute"
        pos.left = offset.left;
        pos.top = offset.top + height

        return pos;
    }//}}}
     //定位当前对象位置
        function point(o) {//{{{
            var showObj = o.showObj;
            var currObj = o.currObj;
            var currLeft = o.currObj.offset().left,
                currTop = o.currObj.offset().top,
                showHeight = o.showObj.height(),
                showWidth = o.showObj.width(),
                position = o.point || "top";
                showObj.css({"position":"absolute"})
                //判断箭头
                switch(position) {
                    case 'right':
                        showObj.css("top", currTop + showHeight - 10);
                        showObj.css("left",currLeft+currObj.width()+ 10);
                        break;
                    case 'top':
                         showObj.css("top",currTop - showHeight - 30);
                         showObj.css("left",currLeft);
                        break;
                    case 'bottom':
                        showObj.css("top",currTop+showHeight+currObj.height());
                         showObj.css("left",currLeft);
                        break;
                    case 'left':
                        showObj.css("top",currTop + showHeight);
                        showObj.css("left",currLeft - currObj.width());
                        break;
                    default:
                       alert(1);
                }
        }//}}}


    if (typeof module != "undefined" && module.exports) {
        module.exports = base;
    }
});
