/**
 *
 * 内容页和列表页的权限管理
 *
 */
define("admin",["base","adminPopup","jquery","a"],function(require, exports, module) {

    var $ = require("jquery"),
        ui = require("base"),
        adminPopup = require("adminPopup"),
        a = require("a");

    function log() {
        var console = window.console;
        var args = Array.prototype.slice.call(arguments);
          args.unshift('>>>');

        if(!!console && !!console.log.apply) {
            console.log && console.log.apply(console,args)
        }
    }


    /*****管理员操作*******/
    var adminHandle = $(".j_admin_handle")
    var adminManage = $(".j_admin_manager");
    var popupLayer = new a.PopupLayer();
    //获取设置fid
    var fid = $(".admin-user-fid").attr("data-fid");
    $(".j_toggle_fid").val(fid)

    adminHandle.on("click","a",function () {//{{{

        var self = $(this)
        var type = $(this).attr("data-type")
        $(".popup-confim").remove()
        
        switch (type) {
            case 'DELETEPOST':
                DELETEPOST(self)
                log(">>" + type)
                break;
            case 'DELETECOMMENT':
                DELETECOMMENT(self)
                log(">>" + type)
                break;
            case 'DELETE':
                DELETE()
                log(">>" + type)
                break;
            case 'MOVE':
                MOVE()
                log(">>" + type)
                break;
            case 'UPDOWN':
                UPDOWN()
                log(">>" + type)
                break;
            case 'TOP':
                TOP()
                log(">>" + type)
                break;
            case 'HOT':
                HOT()
                log(">>" + type)
                break;
            case 'GOOD':
                GOOD()
                log(">>" + type)
                break;
            case 'NORELY':
                NORELY()
                log(">>" + type)
                break;
            case 'CANCELTOP':
                var cancel_API = {
                  type : type,
                  url :'/apiModerator/cancelTop'
                }
                CANCEL_Global(cancel_API)
                log(">>" + type)
                break;
            case 'CANCELHOT':
                var cancel_API = {
                  type : type,
                  url :'/apiModerator/cancelBetter'
                }
                CANCEL_Global(cancel_API)
                log(">>" + type)
                break;
            case 'CANCELGOOD':
                var cancel_API = {
                  type : type,
                  url :'/apiModerator/cancelGood'
                }
                CANCEL_Global(cancel_API)
                log(">>" + type)
                break;
            case 'CANCELNORELY':
                var cancel_API = {
                  type : type,
                  url :'/apiModerator/openThread'
                }
                CANCEL_Global(cancel_API)
                log(">>" + type)
                break;
            default:
        }
    })//}}}

    /****获取fid****/
        //function getFid () {//{{{
            //var val = "";
             //adminManage.find(".j_toggle:checked").each(function () {
                //val = ($(this).attr("data-fid"))-0
            //})
            //return val;
        //}//}}}

    /****获取tid****/
        function getTid () {//{{{
            var val = [];
            val.length = 0
                //内容页tid
            if(!adminManage.length) {
                val = $(".article_toggle").attr("data-tid")
            } else {
                 adminManage.find(".j_toggle:checked").each(function () {
                    val.push($(this).attr("data-tid"))
                })
            }
            return val;
        }//}}}

    /**alert 统一管理**/
    popupLayer.subscribe("close",function(topics,data) {//{{{
        popupLayer.destroy()
    })//}}}

    /**删除楼层**/
     function DELETEPOST (current) {//{{{
        var popupConfirm = new a.PopupConfirm()
        popupConfirm.confim({
            //必须用克隆
            title: "删除楼层",
            content: $(".delete-form-wrap").html(),
        })
        popupConfirm.subscribe("cancel",function(topics,data) { })
        popupConfirm.subscribe("send",function(topics,data) {
            var pid = current.attr("data-postid");
            var data = $(".delete-form",popupConfirm.box).serialize()+"&pid="+pid+""
                ADMINAPI({
                    data: data,
                    url:'/apiModerator/deletepost',
                    parent:popupConfirm
                })
        })
    }//}}}

    /**删除点评**/
     function DELETECOMMENT (current) {//{{{
        var popupConfirm = new a.PopupConfirm()
        popupConfirm.confim({
            title: "删除点评",
            content: $(".delete-form-wrap").html(),
        })
        popupConfirm.subscribe("cancel",function(topics,data) { })
        popupConfirm.subscribe("send",function(topics,data) {
            var cid = current.attr("data-cid")
            var tid = current.attr("data-tid")

            var data = $(".delete-form",popupConfirm.box).serialize() + "&cid="+cid+"&tid="+tid+"";
                ADMINAPI({
                    data: data,
                    url:'/apiModerator/deletecomment',
                    parent:popupConfirm
                })
        })
    }//}}}
    /**删除**/
    function DELETE () {//{{{
        var popupConfirm = new a.PopupConfirm()
        popupConfirm.confim({
            //必须用克隆
            title: "删除确认",
            content: $(".delete-form-wrap").html(),
        })
        
        
        popupConfirm.subscribe("cancel",function(topics,data) { })
        popupConfirm.subscribe("send",function(topics,data) {
            $(".j_toggle_tid").val(getTid())
            var justPageUrl = "/f/" +  $(".j_toggle_fid").val()+".html"
            var data = $(".delete-form",popupConfirm.box).serialize()
                ADMINAPI({
                    data: data,
                    url:'/apiModerator/delThread',
                    parent:popupConfirm,
                    justPage : justPageUrl
                })
        })
    }//}}}

    /**移动**/
    function MOVE ()  {//{{{
        var popupConfirm =  new a.PopupConfirm()
        popupConfirm.confim({
            content: $(".move-form-wrap").html(),
        })
        popupConfirm.subscribe("cancel",function(topics,data) { })
        popupConfirm.subscribe("send",function(topics,data) {
            $(".j_toggle_tid").val(getTid())
            var targetId = $(".j_select_pull").attr("data-targetId")
            var data = $(".move-form",popupConfirm.box).serialize() + "&target_fid="+targetId+""

            ADMINAPI({
                data: data,
                url:'/apiModerator/move',
                parent:popupConfirm
            })
        })

    }//}}}

    /*提升下沉*/
    function UPDOWN () {//{{{
        var popupConfirm =  new a.PopupConfirm()
        popupConfirm.confim({
            content: $(".updown-form-wrap").html(),
        })
        popupConfirm.subscribe("cancel",function(topics,data) { })
        popupConfirm.subscribe("send",function(topics,data) {
            $(".j_toggle_tid").val(getTid())
            var data = $(".updown-form",popupConfirm.box).serialize()
            ADMINAPI({
                data: data,
                url:'/apiModerator/upDown',
                parent:popupConfirm
            })
        })

    }//}}}

    /**好文**/
    function GOOD () {//{{{
        var popupConfirm =  new a.PopupConfirm()
            popupConfirm.confim({
                content:$(".good-form-wrap").html(),
                title: "标红帖子"
            })
            popupConfirm.subscribe("cancel",function(topics,data) {
            })
            popupConfirm.subscribe("send",function(topics,data) {
                $(".j_toggle_tid").val(getTid())
                var data = $(".good-form",popupConfirm.box).serialize()
                log(data)
                ADMINAPI({
                    data: data,
                    url:'/apiModerator/setGood',
                    parent:popupConfirm
                })
            })

    }//}}}

    /**热**/
    function HOT() {//{{{
        var popupConfirm =  new a.PopupConfirm()
            popupConfirm.confim({
                //必须用克隆
                content: $(".hot-form-wrap").html()
            })
            popupConfirm.subscribe("cancel",function(topics,data) {
            })
            popupConfirm.subscribe("send",function(topics,data) {
                $(".j_toggle_tid").val(getTid())
                var data = $(".hot-form",popupConfirm.box).serialize()
                    ADMINAPI({
                        data: data,
                        url:'/apiModerator/setBetter',
                        parent:popupConfirm
                    })
            })
        
    }//}}}

    /**TOP**/
    function TOP () {//{{{
        var popupConfirm =  new a.PopupConfirm()
        popupConfirm.confim({
                content: $(".top-form-wrap").html(),
            })
            popupConfirm.subscribe("cancel",function(topics,data) {
            })
            popupConfirm.subscribe("send",function(topics,data) {
                $(".j_toggle_tid").val(getTid())
                var data = $(".top-form",popupConfirm.box).serialize()
                    ADMINAPI({
                        data: data,
                        url:'/apiModerator/setTop',
                        parent:popupConfirm
                    })
            })
    }//}}}

    /**NORELY**/
    function NORELY  () {//{{{

       //var bb = $(".popup-ok").clone()
        var popupConfirm =  new a.PopupConfirm()
          popupConfirm.confim({
                    //必须用克隆
                    //panel:bb
                content:$(".norely-form-wrap").html(),
                title: "禁止回复"
            })
            popupConfirm.subscribe("cancel",function(topics,data) {
            })
            popupConfirm.subscribe("send",function(topics,data) {
               $(".j_toggle_tid").val(getTid())
                var data = $(".norely-form",popupConfirm.box).serialize()
                log(data)
                ADMINAPI({
                    data: data,
                    url:'/apiModerator/closeThread',
                    parent:popupConfirm
                })
            })
    }//}}}

    /**统一接口处理**/
function ADMINAPI (o) {//{{{
        $.ajax({
            url: o.url,
            type: 'POST',
            dataType: 'json',
            data: o.data,
            success: function (data) {
                // success callback
                if(data.code == 0 ) {
                    popupLayer.alert({
                        tipsStatus: "popup-success",
                        content:data.message,
                        callCloseBack: function () {
                            if(o.justPage) {
                                //window.location.replace(encodeURIComponent("o.justPage"));
                                /*
                                 * why setTimeout ?
                                 * for IE6 Bug
                                 */
                                setTimeout(function () {
                                    window.location.href = o.justPage
                                },100)
                            } else {
                                window.location.reload()
                            }
                        }
                    })
                } else {
                     popupLayer.alert({
                        tipsStatus: "popup-none",
                        content:data.message,
                    })
                }

                o.parent.destroy()
            },
            error: function () { 

                popupLayer.alert({
                    tipsStatus: "popup-none",
                    content:"网络错误",
                })
            
            }
        });
    }//}}}
/** 下拉联想 **/
    (function () {//{{{
        /**下拉**/
        var list = $("<ul class='select-pull'></ul>");
        $(document.body).append(list)

        list.on("click","li",function () {
            $(".j_select_pull").val($(this).text())
            var targetId= $(this).attr("data-fid")
            $(".j_select_pull").attr("data-targetId",targetId)
            list.hide()
        })
        $(document).click(function(event) {
            var target = $(event.target);
            if(target.hasClass("j_select_pull")) {
                //log("在")
            } else {
                list.hide()
                //log("不在")
            }
        })

        $(document).on("focus",".j_select_pull",function (event) {
            list.show()
            event.stopPropagation()
            return false;
        })

        $(document).on("keyup",".j_select_pull",debounce(function (e) {

            var target = e.target;
            var sendVal = $(this).val()

            if(sendVal == ""){
                list.hide()
            } else {
                list.show()
            }

            var getPost = ui.setPostion($(target))
            list.css(getPost)

            $.ajax({
                url: '/say/searchForum?mydomain.com/url',
                type: 'get',
                dataType: 'json',
                data: {keyword : sendVal},
                success: function (data) {
                    if(data.code == 0) {
                        var data = data.data;
                        var item = "";
                        for(var i=0;i<data.length;i++) {
                            item += "<li data-fid = "+data[i].fid+">"+data[i].name+"</li>"
                        }
                        list.html(item)
                    } else {
                        var timer = setTimeout(function (){
                            list.html("<p>对不起没有你想找的版块</p>")
                        },100)
                    }
                },
                error: function () {
                    list.html("对不起没有你想找的版块")
                }
            });

        },200))

    })();//}}}
    /**统一内容添充**/
    (function globalAddCont () {//{{{
        var popupSelect = ".popup-select";
        //var popupTextArea = $(".popup-textarea[name='reason']")

        //自动添充
        $(document).on("change",popupSelect,function (e) {
            var target = e.target;
            var selectValue = target.value
            var popupTextArea = $(target).parents("form").find(".popup-textarea");

            popupTextArea.val(selectValue)
        })
    }())//}}}

    /***列表页用户操作***/
    //ui.hoverdeLay({//{{{
        //currentObj: $(".j_hover_user"),
        //showObj: $(".admin-suspend"),
        //autoShow: true,
        //before: function (current) {
            //manageUser()
              ////$.ajax({
                ////url: 'http://localhost:3000/user',
                ////type: 'POST',
                ////success: function (data) {
                    ////manageUser()
                ////},
                ////error: function (jqXHR, textStatus, errorThrown) {
                    ////// error callback
                ////}
            ////});
        //}
    //})//}}}

    var userConfirm = new a.PopupConfirm()
    /**通过这里判断是内容页还是列表页*/
    var adminSuspend;
    if(!$(".admin-suspend-manage").length) {
        adminSuspend = $(".feed-user-handle")
            manageUser()
    } else {
        adminSuspend = $(".admin-suspend-manage") 
    }
    /**用户管理**/
    function manageUser () {//{{{
        adminSuspend.off().on("click","a",function () {
            $(".popup-confim").remove()

            var type = $(this).attr("data-type")
            var self = $(this)
            switch (type) {
                case 'SAY':
                    log("SAY")
                    SAY(self)
                    break;
                case 'IP':
                    log("IP")
                    IP()
                    break;
                case 'MESSAGE':
                    log("MESSAGE")
                    MESSAGE()
                    break;
                default:
            }
        })
    }//}}}
    /**禁止发送消息**/
    function MESSAGE() {//{{{
    }//}}}
    /**用户禁言**/
    function SAY(current) {//{{{
         var popupConfirm =  new a.PopupConfirm()
         popupConfirm.confim({
                //必须用克隆
                //panel:bb
            content:$(".forbid-form-wrap").html(),
            title: "禁言操作"
        })
        popupConfirm.subscribe("cancel",function(topics,data) {
        })
        popupConfirm.subscribe("send",function(topics,data) {
           //$(".j_toggle_tid").val(getTid())
           //这里需要获取父级的用户uid
            var uid = $(current).prev().attr("data-uid");
            $(".j_toggle_uid").val(uid)
            var data = $(".forbid-form",popupConfirm.box).serialize()
            ADMINAPI({
                data: data,
                url:'/apiModerator/forbid',
                parent:popupConfirm
            })
        })
    }//}}}
    /**查看用户IP**/
    function IP() {//{{{
        popupLayer.alert({
            content: "用户的IP为"+("192.168.1")
        })
        //userConfirm.confim({
            //isMask: true,
            //callBack: function () {
                //log("ccc")
            //}
        //})
    }//}}}

    function CANCEL_Global (API) {
      /*if(API) throw "API not defined";*/
        var API = API;
        var popupConfirm =  new a.PopupConfirm()
        popupConfirm.confim({
            content: $(".cancel-global-form-wrap").html(),
        })
        popupConfirm.subscribe("cancel",function(topics,data) { })
        popupConfirm.subscribe("send",function(topics,data) {
            $(".j_toggle_tid").val(getTid())
            /*var targetId = $(".j_select_pull").attr("data-targetId")*/
            var data = $(".cancel-global-form",popupConfirm.box).serialize();
            ADMINAPI({
                data: data,
                url:API.url,
                parent:popupConfirm
            })
        })
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

});
seajs.use("admin");
