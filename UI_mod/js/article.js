/**
 * @file article.js
 * @brief 详情页相关
 * @author baozi
 * @version 
 * @date 2014-12-02
 */
define("article",["jquery","base","popup","adminPopup","handlebars"],function(require, exports, module) {

    var $ = require("jquery"),
        base = require("base"),
        Popup = require("popup"),
        _h = require("handlebars");

    var AdminPopup = require("adminPopup")

    var diggHand = $(".digg-hand-btn"),
        diggTotal = $(".digg-hand-total"),
        artDigger = $(".art-digger"),
        loginBtn = $("#login"),
        diggerNtm = $(".art-digger-num");


    /*
     * https://bugs.webkit.org/show_bug.cgi?id=33604
     */
    var postvideo = $(".postvideo")
    var video = postvideo.html()
    postvideo.html("")
    window.onload = function () {
        setTimeout(function () {
            postvideo.html(video)
        },800)
    }

    var popup = new Popup()

    $(function () {

        base.placeholder(".J_focus","点评");
        digger(".J_digger",".J_digger_cont");

        /**点赞楼主**/
        var isClick = false;
        $(document).on("click",".digg-hand-btn",function(e) {//{{{
            /**
             * ISSUE 用户重复点赞
             */
            if(isClick)  return

            var self = $(this),
                tid = self.attr("data-tid"),
                is_support = self.attr("data-support");
                if(is_support == 1) {
                    return false;
                }
            if(isLogin) {

                clickSupport({
                    url: '/apiSay/dianzan',
                    data: "tid="+tid,
                    next: function (data) {
                        if(data.code == 0) {
                            var numebr = data.data.add
                            numebr = numebr > 0 ? "+" + numebr : numebr
                            addNumber(numebr,e)
                            self.parent().addClass("admin-hover");
                            var curNumber =  parseInt(self.find(".top-num").text()) + data.data.add
                            self.find(".top-num").text(curNumber);
                            isClick = true;
                        }
                    }
                })

            } else {
                loginBtn.trigger("click")
            }
            e.stopPropagation();
        })//}}}
        /**奖励用户**/
        $(".art-jiangli").click(function() {//{{{

          var uid  = $(this).attr("data-uid");
          handleAward(uid);

        })//}}}
        /**点赞用户**/
        artDigger.one('click',function () {//{{{

            if(isLogin) {
                var self = $(this),
                    postid = self.attr('data-id'),
                    is_support = self.attr("data-support");
                    if(is_support == 1) {
                        return false;
                    }
                clickSupport({
                    url:'/apiSay/dianzanLouceng',
                    data: "pid="+postid,
                    next: function (data) {
                        self.parent().addClass("admin-hover");
                        var digger_num = self.find('.art-digger-num');
                        var curData = data.data.add;
                        digger_num.text(parseInt(digger_num.text()) + curData )
                    }
                })

            } else {
                loginBtn.trigger("click");
            }
        })//}}}
        /**奖励用户公用**/
        function handleAward(uid) {//{{{
            
            popup.init(uid,function (o) {

                var self = o,
                    tips = "";

                var succTpl = $("<p class='popup-succ'>奖励成功！</p>"),
                    errorTpl = $("<p class='popup-error'>网络错误！</p>");

                var firstMoney = $("#first-money"),
                    lastMoney = $("#last-jewel"),
                    textArea = $(".popup-textarea1 textarea"),
                    popupTips = $(".popup-tips"),
                    popFlag = false,
                    commit = $(".J-commit"),
                    cancel =$(".J-cancel");
                    popupFid = $("#popup-fid");
                    //TODO和admin的fid一样
                    var fid = $(".admin-user-fid").attr("data-fid")
                    popupFid.val(fid)
                var popupId = $("#popup-uid");
                    popupId.val(self.uid);

            clearTimeout(self.globalTime);
            
            //输入框
            $(firstMoney,lastMoney).blur(function () {
                var self = $(this);
                var reg = /^-?[1-9]\d*$/;
                if(!reg.test($.trim(self.val()))) {
                    popupTips.text("请输入有效数字").show();
                    popFlag = false;
                }else {
                    popupTips.text("").show();
                    popFlag = true;
                }
            })//}}}
        //取消
            cancel.on("click",function () {//{{{
                $(".popup-form-post")[0].reset();
                popupTips.hide();
                self.hide();
            })//}}}
        //提交
            commit.on("click",function () {//{{{
                 if($.trim(firstMoney.val()) =="" && $.trim(lastMoney.val()) == "") {
                    popFlag = false;
                    tips = "请添写魔币或魔钻"
                 } else if($.trim(textArea.val()) == "") {
                    popFlag = false;
                    tips = "请添写奖励原因"
                 } else {
                    popFlag = true;
                 }
                if(popFlag) {
                    var replaceContent =  self.model.find(".popup-content1");
                    $.ajax({
                        url: '/apiModerator/award',
                        type: 'POST',
                        data: $(".popup-form-post").serialize(),
                        dataType: 'json',
                        success: function (data) {
                            //错误处理
                            if(data.code == 0) {
                                replaceContent.html(succTpl);
                            } else {
                                    replaceContent.html(errorTpl.text(data.message));
                            }
                            self.autoHide();
                            $(".popup-form-post")[0].reset();
                        },
                        error: function (error) {
                            self.model.find(".popup-content1").html(errorTpl);
                            self.autoHide();
                        }
                    });

                    } else{
                        popupTips.text(tips).show()
                    }
                 return false;

                })
            })
        }//}}}
        /**点赞公用**/
        function clickSupport (o) {//{{{
            $.ajax({
                url: o.url,
                type: 'post',
                dataType: 'json',
                data: o.data,
                success: function (data) {
                    var next = o.next;
                    next && next(data);
                },
                error: function (error) {
                    alert("网络错误")
                }
            });
        }//}}}
        /**点击查看更多**/
        (function () {//{{{
            /**
             * description
             * 恶心的办法
             */
            var clickmore = $(".clickmore");
            var commentList = $(".article-pinglun-list");
            var pageMaxNumber = 5;
            var pageStartNumber = 0;
            var tid = clickmore.attr("data-tid")
            var isLock = clickmore.attr("data-isclosed");

            _h.registerHelper("isLock",function (options) {

                if(isLock == 1) {
                    return "";
                } else {
                 return options.fn(this);
                }
            })

            var tpl = '{{#data}}'+
                        '{{#each commentlist}}'+
                            '<div class="article-pinglun-li clearfix">'+
                                '<a href="/user/centerThreads?uid={{uid}}" class="fl">'+
                                    '<img src="{{avatar}}" alt="{{nickname}}" title="{{nickname}}">'+
                                '</a>'+
                                '<h3><span class="fr">{{ctime}}</span><a href="/user/centerThreads?uid={{uid}}">{{nickname}}</a></h3>'+
                                '<div class="article-dianping-con">'+
                                '{{#if ../isDelete}}'+
                                    '<a data-type="DELETECOMMENT" data-tid='+tid+' data-cid="{{cid}}" href="javascript:;" data-name="{{nickname}}" class=" dianping-btn fr">删除</a>'+
                                '{{/if}}'+
                                '{{#isLock}}'+
                                    '<a href="javascript:;" data-name="{{nickname}}" class="J_contact dianping-btn fr">点评</a>'+
                                '{{/isLock}}'+
                                '<p>{{content}}</p>'+
                            '</div>'+
                        '</div>'+
                        '{{/each}}'+
                    '{{/data}}'
            
            $(".article-detail-right").each(function () {
                var parent = $(this);
                var clickmore = parent.find(".clickmore");
                    clickmore.click(function () {
                        var postId= $(this).attr("data-postid");
                        var self = $(this);
                            pageStartNumber++;
                            $.ajax({
                                url: '/say/getComment?page='+pageStartNumber+'&pagesize='+pageMaxNumber+'',
                                type: 'get',
                                dataType: "json",
                                data: {postid:postId},
                                success: function (data) {
                                    var result = data.data
                                    var temp = "";
                                    var html = "";
                                    if(data.data == 0){
                                        clickmore.html("已经没有更多了")
                                        self.unbind()
                                    }
                                    else if (data.code == 0) {
                                        temp = _h.compile(tpl);
                                        html = temp(data)
                                        $(".article-pinglun-list",parent).append(html)
                                    }

                                },
                                error: function () {
                                }
                            });
                    })
            })

            /*clickmore.click(function () {

            })*/

            //handlebars help fun
            //_h.registerHelper('isDelete', function() {
                //if(isDelete) {
                    //return "bb"
                //} else {
                   //return  '<a data-type="DELETECOMMENT" data-tid="366362" data-cid="2580252" href="javascript:;" data-name="mmmmmm" class=" dianping-btn fr">删除</a>'
                    ////return "aa"
                //}
            //});

            _h.registerHelper("debug", function(optionalValue) {
              console.log("Current Context");
              console.log("====================");
              console.log(this);
              if (optionalValue) {
                console.log("Value");
                console.log("====================");
                console.log(optionalValue);
              }
            });
        }())//}}}

        function addNumber(num,e){//{{{
            var n= num || 1,//Math.round(Math.random()*10);
                i= $("<b>").text(n),
                x=e.pageX,
                y=e.pageY;
            i.css({
                top:y-20,
                left:x,
                position:"absolute",
                color:"#E94F06"
            });
            
            $("body").append(i);
                i.animate({
                    top:y-180,
                    opacity:0,
                    "font-size":"1.6em"
                },1500,function(){
                i.remove();
            });
        }//}}}
        //顶处理
        function digger (obj,dis) {//{{{
            var artbtn = ".article-admin-opts";//art-pinglun-btn";
            var diggercont = ".J_digger_cont";
            //debugger;
            $(obj).on("click",".art-dianping",function() {
                $(this).parents(artbtn).siblings(diggercont).addClass("J_cont_show");
            })
        }//}}}
        //管理员面板
        (function () {//{{{
            var adminPanle = $(".admin-list-panle .admin-list-tips");
            $(".j-article-man").hover (function () {
                adminPanle.show().stop().animate({
                    opacity:1,
                    top:-10
                },300);
            },function () {
                adminPanle.stop().animate({
                    opacity:0,
                    top:10
                },300,function(){
                    $(this).hide()
                })
            })
        }())//}}}
    })
  });

seajs.use("article");



