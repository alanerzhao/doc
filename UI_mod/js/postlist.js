define("postlist",["base","jquery","adminPopup"],function(require, exports, module) {
    function log() {
        var console = window.console;
        var args = Array.prototype.slice.call(arguments);
          args.unshift('^_^! >>');
         if(!!console && !!console.log.apply) {
            console.log && console.log.apply(console,args)
        }
    }

    var ui = require("base"),
        $ = require("jquery"),
        adminPopup = require("adminPopup");

    /*****管理弹出层******/
    var adminManage = $(".j_admin_manager");
    var adminManagePop = $(".admin-popup");
    var popLock = true;
    var checkToggle = $(".j_toggle");
    var AdminPop = new adminPopup({
        isMask: false
    })

    /****顶部浮层*****/
    var owner = $(".j_owner"),//{{{
        tips = $(".j_tips");
    $(".j_moreCont").click(function(){
        owner.trigger("mouseenter")
    })
    
    //如果存在吧主
    if(owner.length) {
        ui.hoverdeLay({
            currentObj :owner,
            showObj :tips,
            autoShow:false,
            a: true,
            point: {
                left: owner.offset().left + 10,
                top: owner.offset().top - tips.height() - 35
            },
            content : owner.text(),
            callBack:function () {
                //console.log(1)
            }
        });//}}}
    }
    /********关注********/
    var follow = $(".feed-user-follow");//{{{
    //fid 
    var followData = {
        "fid" : follow.attr("data-follow")
    }

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
                    if(data.code == 0 ) {
                        follow.text("已关注")
                        follow.addClass("follow-active")
                    } else {
                        follow.text("关注失败").css({"backgroundColor":"#E52121"})
                    }
                },
                error: function () {
                    follow.text("关注失败")
                }
            });
        }
    }) //}}}

/****获取选则的数量****/
    function totalNumber () {//{{{
        return $(".j_toggle:checked").length
    }
    function getValue () {
        var val = [];
        val.length = 0
         adminManage.find(".j_toggle:checked").each(function () {
            val.push($(this).val())
        })
        return val
    }//}}}
    //列表按钮
    adminManage.on("click",".j_toggle",function() {//{{{

        totalNum = totalNumber()
        if(popLock) {
            initAdmin($(this));
            popLock = false;
        }

        $(this).trigger("total",[totalNum])
    })//}}}
/*****全选*****/
    $("#admin-all-select").click(function() {//{{{

        var allChecked = this.checked;

        adminManage.find(".j_toggle").each(function () {
            $(this).attr("checked",allChecked)

        })
        adminManage.trigger("total",[totalNumber()])
    })//}}}
/****统计选择文章数****/
    adminManage.on("total",function(event,message) {//{{{

        $(".j_admin-num").html(message)
        //显示隐藏
        if(message) {
            adminManagePop.show()
        } else {
            adminManagePop.hide()
            //$(".popup").hide()
        }
    })//}}}
    $(window).scroll(function (obj) {//{{{

        var t= $(this).scrollTop();
        var h = $(this).height();

        adminManagePop.css({
            "top" : (h - adminManagePop.height()) / 2 + t 
        })
    })//}}}
/***生成弹出层***/
    function initAdmin (clickBtn) {//{{{
        AdminPop.init({
            className: "",
            model:adminManagePop,
            next: function (current) {
                current.setAttr({
                    style:{
                        left: adminManage.offset().left + adminManage.width() - current.model.width()
                    }
                })
            },
            bindCallback: function () {}
        })
    }//}}}

})

seajs.use("postlist");

