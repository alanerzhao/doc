/**
 * @file load.js
 * @brief  Pull Load
 * @author baozi
 * @version 0.0.2
 * @date 2014-12-22
 */
define('load',["jquery","handlebars"],function (require,exports,module){

    var $ = require("jquery"),
        _h = require("handlebars"),
        pageNum = 1;

    /********** 数据格式 ********/
    /* avatar: "http://pic0.mofang.com/avatar/b27/292/b2729204da451911a497d1358d7527557e3230d8_80.png"
     * create_time: "2014-11-11 17:58"
     * fid: 370
     * icon: "http://pic2.mofang.com/423/183/8d6e8eb20ab1766f272bfd2b2c027e5533005016"
     * name: "测试版块图标"
     * nickname: "小小木"
     * replies: 0
     * subject: "ceshi"
     * tid: 13909
     * pic:[]
     */
    /**** handlebars模板块 ****/
    var tpl = '<dt class="feed-hotbar-tit">' +//{{{
                '<span><a href="/f/{{fid}}.html"><img src="{{icon}}" alt=""></a></span>' +
                    '<a href="/f/{{fid}}.html">{{name}}</a>'+
              '</dt>'+
                '<dd>'+
                    '<p class="hotbar-item-tit"><a href="/p/{{fid}}-{{tid}}.html">{{subject}}</a></p>' +
                    '{{#if videoImg}}'+
                        '<p class="index-hotbar hotbar-item-img clearfix">'+
                            '<a class="video-link" href="/p/{{fid}}-{{tid}}.html" target="_blank">'+
                                '<img class="video-img" src="{{videoImg}}" />'+
                                '<b class="video-img-btn"></b>'+
                                '<span class="fade-bg"></span>'+
                            '</a>'+
                        '</p>'+
                    '{{/if}}' +
                    '{{#if pic}}'+
                        '<p class="index-hotbar hotbar-item-img clearfix">'+
                            '<a href="/p/{{fid}}-{{tid}}.html" target="_blank">'+
                            '{{#each pic}}' +
                                '<img src="{{this}}" />'+
                            '{{/each}}'+
                            '</a>'+
                        '</p>'+
                    '{{/if}}' +
                    '<a class="hotbar-mess" href="/p/{{fid}}-{{tid}}.html">{{replies}}</a>'+
                    '<ul class="hotbar-game-type">'+
                        '<li>{{message}}</li>'+
                    '</ul>' +
                    '</p>' +
                    '<p class="hotbar-author">'+
                        '{{#if nickname}}'+
                            '<span class="one-left"><a class="author-name" href="/user/centerThreads?uid={{uid}}" target="_blank">{{nickname}}</a></span>'+
                        '{{/if}}'+
                        '<span>{{create_time}}</span>'+
                    '</p>'+
                '</dd>';//}}}

    function LoadNewCont(o) {//{{{
        var o = o || {};
        this.url = o.url;
        this.data = "";
        this.pullType = o.triggerType;
        this.tipsText = o.tipsText || "加载更多";
        this.doc_view = $(document);
        this.win_view = $(window);
        this.up_wrap = $(o.wrapper) || $(document);
        this.loadMoreBtn = $(".feed-load-more");
        this.load_gif = $("<div>load……</div>").hide();
        this.init();
        this.load();
    }//}}}

    LoadNewCont.prototype = {
        init : function () {//{{{
            this.loadMoreBtn.text(this.tipsText).css("cursor","pointer");
            this.bind();
        },//}}}
        bind : function () {//{{{
            var self = this,
                _type = self.pullType;

            //加载方式
            if(_type) {
                self.loadMoreBtn.bind(_type,function () {
                    self.clickLoad();
                });
            } else {
                self.pullLoad();
            }
        },//}}}
        //点击加载
        clickLoad : function () {//{{{
            this.fetch();
        },//}}}
        //下拉加载
        pullLoad : function () {//{{{
            var self = this,
            // TODO 只有内容窗口超过可视区才执行bind
            isView = (this.win_view.height() < this.up_wrap.height());
            _loadFlog = false;
            if(isView) {
                 this.win_view.bind('scroll',debounce(function() {
                    var _scrollTop = self.win_view.scrollTop(),
                        _docHeight = self.doc_view.height() - self.win_view.height();

                    if(_scrollTop == _docHeight) {
                        if(self.url) {
                            self.fetch();
                        } else {
                            throw "url not define param is undefined"
                            return ;
                        }
                    }
                },300));
            }

        },//}}}
        load : function () {//{{{
            this.up_wrap.after(this.load_gif);
        },//}}}
        fetch : function () {//{{{
            var self = this;
             if(pageNum >= 6) {
                return ;
             }

            this.loadMoreBtn.text("正在加载……");
            $.ajax({
                url:self.url+(++pageNum),
                dataType: "json",
                success: function (data) {
                    self.update(data);
                     //TODO Fix fuck sidebar
                    $(".J_fixed").trigger("sticky_kit:detach");
                    $(".J_fixed").stick_in_parent({recalc_every: 1})
                },
                error: function () {
                    alert("网络错误")
                    //console.log(error)
                }
            })
        },//}}}
        update : function (o) {//{{{
            var self = this,
                html ="",
                temp ="";
            $.each(o,function(idx,item) {
                //debugger;
                temp = _h.compile(tpl);
                html += temp(item);

            })
            if (o.length == 0 || pageNum >= 6) {
                 this.win_view.unbind();
                 this.loadMoreBtn.text("没有更多内容了");
            } else {
                //渲染模板
                this.up_wrap.append(html).hide().fadeIn();
                this.loadMoreBtn.text(this.tipsText)
            }
            return false;
        }
    }//}}}

    // helper
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

    if (typeof module != "undefined" && module.exports) {
        module.exports = LoadNewCont;
    }
})



