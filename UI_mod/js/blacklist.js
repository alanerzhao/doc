/**
 * 小黑屋业务层
 * require a.js
 * require jquery.js
 **/
define("blacklist",["a","jquery"],function(require, exports, module) {

    var a = require("a");
    var $ = require("jquery");

    var popupconfirm =  new a.PopupConfirm()
    var popuplayer = new a.PopupLayer();
    var adminManageWrap = $(".j_admin_manage")
    

     popuplayer.subscribe("close",function(topics,data) {//{{{
        popuplayer.destroy()
        popupconfirm.destroy()
        window.location.reload()
    })//}}}

    adminManageWrap.on("click","a",function () {
        $(".popup").remove()
        var self = $(this)
        var type = $(this).attr("data-type");

        if(type == "CANCEL-SAY") {
            popupconfirm.confim({//{{{
                content:"您真的要取消禁言么?",
                isscroll: true,
                title: "取消禁言"
            })//}}}
            popupconfirm.subscribe("cancel",function(topics,data) {//{{{
            })//}}}
            popupconfirm.subscribe("send",function(topics,data) {//{{{
                var cancelData = {
                    fid : self.attr("data-fid"),
                    uid: self.attr("data-uid")
                }
                $.ajax({//{{{
                    url: '/apiModerator/relieve',
                    type: 'post',
                    dataType: 'json',
                    data: cancelData,
                    success: function (data) {
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
                        popupconfirm.destroy()
                    },
                    error: function (jqxhr, textstatus, errorthrown) {
                            popuplayer.alert({
                                tipsstatus: "popup-none",
                                content:"网络错误"
                            })
                    }
                });//}}}
            })//}}}
        }
    })
});
seajs.use("blacklist");

