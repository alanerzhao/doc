/**用户取消关注**/
define("usermanage",["jquery","a","base"],function(require, exports, module) {
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
    var a = require("a");

    var ui = require("base");
    
   var dd = ui.tab({
        wrap: ".j_tab",
        head: ".user-tab-hd li",
        cont: ".user-tab-cont div"
    })
    
    var popupConfirm =  new a.PopupConfirm()
    var popuplayer = new a.PopupLayer();

    popuplayer.subscribe("close",function(topics,data) {//{{{
        popuplayer.destroy()
        popupConfirm.destroy()
        window.location.reload()
    })//}}}

    $(".j_user_start").on("click",".delete-follow",function () {
        $(".popup").remove()
        var self = $(this)

        popupConfirm.confim({//{{{
            content:"您真的要取消关注么?",
            isscroll: true,
            title: "取消关注"
        })//}}}
        popupConfirm.subscribe("cancel",function(topics,data) {//{{{
        })//}}}
        popupConfirm.subscribe("send",function(topics,data) {//{{{
            var data = {
                fid : self.attr("data-fid"),
                follow: 0
            }
            //debugger;
            $.ajax({//{{{
                url: '/apiSay/follow',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data, textstatus, jqxhr) {
                    if(data.code == 0) {
                        popuplayer.alert({
                            content: data.message
                        })
                    } else {
                        popuplayer.alert({
                            tipsstatus: "popup-none",
                            content: data.message
                        })
                    }
                popupConfirm.destroy()
                },
                error: function (jqxhr, textstatus, errorthrown) {
                        popuplayer.alert({
                            tipsstatus: "popup-none",
                            content:"网络错误"
                        })
                }
            });//}}}
        })//}}}

    })
});
seajs.use("usermanage");

