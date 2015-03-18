define("postlist",["base","jquery"],function(require, exports, module) {

    var ui = require("base"),
        $ = require("jquery");

    ui.placeholder(".J_focus");
   
    var owner = $(".j_owner"),
        tips = $(".j_tips");

    ui.hoverdeLay({
        currentObj :owner,
        showObj :tips,
        speed:600,
        callBack:function () {
            console.log(1)
        }
    });
        
    //关注
    var follow = $(".feed-user-follow");
    //fid 
    var followData = {"fid":follow.attr("data-follow")}

    follow.one("click",function () {
        if(!isLogin) {
            $("#login").trigger("click");
        } else {
            $.ajax({
                url: '/apiSay/follow',
                type: 'POST',
                dataType: 'json',
                data: followData,
                success: function (data) {
                    follow.text("已关注")
                    follow.addClass("follow-active")
                },
                error: function () {
                    follow.text("关注失败")
                    console.log("Error")
                }
            });
        }
    }) 
});
seajs.use("postlist");


