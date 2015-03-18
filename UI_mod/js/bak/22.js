define("postlist",["base","jquery","adminPopup"],function(require, exports, module) {

    var ui = require("base"),
        adminPopup = require("adminPopup")
        $ = require("jquery");

    ui.placeholder(".J_focus");

    /****顶部浮层*****/
    var owner = $(".j_owner"),//{{{
        tips = $(".j_tips");

    $(".j_moreCont").click(function(){
        owner.trigger("mouseenter")
    })

    ui.hoverdeLay({
        currentObj :owner,
        showObj :tips,
        speed:650,
        point: {
            left: owner.offset().left + 100,
            top: owner.offset().top - 55
        },
        content : owner.text(),
        callBack:function () {
            //console.log(1)
        }
    });//}}}
        
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
                    follow.text("已关注")
                    follow.addClass("follow-active")
                },
                error: function () {
                    follow.text("关注失败")
                    console.log("Error")
                }
            });
        }
    }) //}}}

    /*****管理弹出层******/

    var adminManage = $(".j_admin_manager");
    var adminManagePop = $(".admin-popup");
    var popLock = true;

    var AdminPop = new adminPopup({
        isMask: false
    })

    var checkToggle = $(".j_toggle");

    //列表按钮
    adminManage.on("click",".j_toggle",function() {

        totalNum = totalNumber()

        if(popLock) {
            initAdmin($(this));
            popLock = false;
        }

        $(this).trigger("total",[totalNum])
    })
    
    //获取选则的数量
    function totalNumber () {
        return $(".j_toggle:checked").length
    }
    //全选
    $("#admin-all-select").click(function() {

        var allChecked = this.checked;

        adminManage.find(".j_toggle").each(function () {
            $(this).attr("checked",allChecked)

        })
        adminManage.trigger("total",[totalNumber()])
    })

    adminManage.on("total",function(event,message) {

        $(".j_admin-num").html(message)
        //显示隐藏
        message ?  adminManagePop.show() : adminManagePop.hide() 
    })

    $(window).scroll(function (obj) {

        var t= $(this).scrollTop();
        var h = $(this).height();

        adminManagePop.css({
            "top" : (h - adminManagePop.height()) / 2 + t 
        })
    })

    //生成弹出层
    function initAdmin (clickBtn) {
        AdminPop.init({
            className: "",
            model:adminManagePop,
            next: function (current) {
                current.setAttr({
                    style:{
                        left: adminManage.offset().left + adminManage.width() - current.model.width()
                    }
                })
                $(".admin-delete-btn").click(function () {
                    current.create({
                        model :'<div class="cc">'+
                                '<form id="as" action="">'+
                                    '<select id="dd" name="cc">' +
                                        '<option value="2">23</option>' +
                                        '<option value="1">23</option>' +
                                    '</select>'+
                                    '<textarea></textarea>'+
                                    '<input class="btcc" type="submit">'+
                                    '<input type="button">'+
                                '</form>'+
                                '</div>'
                    }).setAttr({
                        style:{
                            'border':"1px solid green",
                            'background':'red',
                            'left': current.setPostion($(this),-60).left,
                            'top': current.setPostion($(this),-60).top
                        }
                    }).setup(function (current) {
                        
                        $(".btcc").click(function () {
                            var cont =  $("#as").serialize();
                            console.log(cont)
                            current.model.html("<p>操作成功<a  class='close' href='javascript:;'>关闭</a></p>")
                            $(".close").click(function () {
                                current.close(current.model)
                            })
                            return false
                        })
                    })
                })
            },
            bindCallback: function () {}
        })
    }


 //$(".btn2").click(function () {//{{{
     //if($(".POPUP").length) {
        //$(".POPUP").show()
     //} else{
        //AdminPop.init({
            //className: "POPUP",
            //model:"<div class='model1'><a href='javascript:;' class='grend'>生成</a><a  class='allCheckbox' href='javascript:;'>全选</a></div>",
            //next: function (current) {

                //$(".grend").click(function () {

                    ////var aa = current.setPostion($(this),200)
                    ////console.log(aa)

                    //current.create({
                        //model :'<div class="cc">'+
                                //'<form id="as" action="">'+
                                    //'<select id="dd" name="cc">' +
                                        //'<option value="2">23</option>' +
                                        //'<option value="1">23</option>' +
                                    //'</select>'+
                                    //'<textarea></textarea>'+
                                    //'<input class="btcc" type="submit">'+
                                    //'<input type="button">'+
                                //'</form>'+
                                //'</div>'
                    //}).setAttr({
                        //style:{
                            //'border':"1px solid green",
                            //'background':'red',
                            //'left': current.setPostion($(this),-60).left,
                            //'top': current.setPostion($(this),-60).top
                        //}
                    //}).setup(function (current) {
                            //$(".allCheckbox").click(function () {
                                //$("input[type='checkbox']").each(function () {
                                    //this.checked = !this.checked
                                //})
                            //})
                        
                        //$(".btcc").click(function () {
                            //var cont =  $("#as").serialize();
                            //console.log(cont)
                            //current.model.html("<p>操作成功<a  class='close' href='javascript:;'>关闭</a></p>")
                            //$(".close").click(function () {
                                //current.close(current.model)
                            //})
                            //return false
                        //})
                        ////$(".current").click(function () {
                            ////current.close()
                        ////})
                        ////$(".cc").click(function () {
                         ////current.create({
                                ////model :"<div class='cc2'><a href='javascript:;'>dd</a></div>"
                            ////}).setAttr({
                                ////style: {
                                    ////'background':'red',
                                    ////'fontsize':20,
                                    ////'left':100,
                                    ////'top':920
                                ////}
                            ////}).setup(function (current) {
                                 ////$(".cc2").click(function () {
                                     ////current.close($(this))
                                 ////})
                            ////})
                        ////})
                    //})
                //})
               

            //},
            //bindCallback: function () {}
        //})
        //}
    //})//}}}
    
});
seajs.use("postlist");


