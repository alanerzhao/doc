/**早请吧主**/
define("userapply",["jquery","a","base"],function(require, exports, module) {
    function log() {//{{{
        var console = window.console;
        var args = Array.prototype.slice.call(arguments);
          args.unshift('>>>');
        if(!!console) {
            console.log && console.log.apply(console,args)
        }
    }//}}}

    var $ = require("jquery")
    var a = require("a");
    var ui = require("base")

    var popupLayer = new a.PopupLayer();
    var popupConfirm = new a.PopupConfirm();

    ui.placeholder(".J_focus");

    var userForm = $(".user-apply-form")
    var userInfots = $(".feed-user-infos");
    var writeFloag = true;
    var blurFloag = false;
     //输入框
     var qqReg = /^[1-9]*[1-9][0-9]*$/
     var phoneReg = /0?(13|14|15|18)[0-9]{9}/

    userForm.on("blur",".apply-text",function () {
        var self = $(this)
        blurHandle(self);
    })
    function blurHandle(obj) {//{{{
        type = obj.attr("data-type");
        if(type == "qq") {
            if(qqReg.test(obj.val())) {
                writeFloag = true;
                  userInfots.hide()
            }  else {
                userInfots.html("请添写QQ号")
                writeFloag = false;
            }
        } else if(type == "phone") {
            if(phoneReg.test(obj.val())) {
                 writeFloag = true;
                  userInfots.hide()
            }  else {
                userInfots.html("请添写手机号").show()
                    //return false;
                writeFloag = false;
            }

        
        } else if(type == "text") {
            if($.trim(obj.val()) !="描述一下游戏经历，让我们更了解你！" && $.trim(obj.val()) !="" ) {
                 writeFloag = true;
                  userInfots.hide()

            }  else {
                userInfots.html("请添写游戏经历").show()
                writeFloag = false;
            }
        }
    }//}}}
    var success= !true;

    userForm.submit(function () {//{{{
        //userInfots.html("请添写申请信息")
        $(".apply-text",this).each(function() {
            $(this).blur();
            if(!writeFloag) {
                blurFloag = false;
                return false;
            } else {
                blurFloag = true;
            }
        })
        //return false;

        if(blurFloag) {
            var applyData = {
                "fid" : $("input[name='fid']").val(),
                'qq' : $(".apply-user-qq").val(),
                'mobile' : $(".apply-user-phone").val(),
                'reason' : $(".apply-user-text").val()
            }
            $.ajax({
                url:'/apiSay/moderatorapply',
                type: 'POST',
                dataType: 'json',
                data: applyData,
                success: function (data) {
                    if(data.code == 0) {
                        popupLayer.alert({
                            content:data.message,
                            //切换状态类
                            tipsStatus:"popup-success"
                        })
                    window.location.reload()
                    } else { // 不满足条件
                        popupLayer.alert({
                            content:data.message,
                            //切换状态类
                            tipsStatus:"popup-none"
                        })
                    }

                },
                error: function () {
                    alert("网络错误")
                }
            })
        }
        return false;
    })//}}}

});
seajs.use("userapply");
