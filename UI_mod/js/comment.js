/**
 * @file editor-main.js
 * @brief   editor upload mod
 * @author baozi
 * @version
 * @date 2014-11-19
 */

define("comment",["jquery",'handlebars'],function(require, exports, module) {

    //var login = require("mf/login");
    var $ = require("jquery"),
        _h = require("handlebars");
        //emotion = require('emotion'),

    var uploader, um;

    var loginBtn = $("#login"),
        reply = $(".feed-editor-btn"),
        editorTit = $(".feed-editor-text"),
        diggerObj = $(".J_digger_cont"),
        saytext = $("#saytext");

    /** FORM **/
    var editorForm = $("#editor-form"),
        tid = $(".editor-tid"),
        pid = $(".editor-pid"),
        cont = $(".editor-cont"),
        pic = $(".editor-pic"),
        posttit = $(".post-tit");


    var arrData = [],
        editorCont = "",
        feedFlag = 0;

    //var urlBase = {
        //loginURL: defaultURL+"/account/login?more=1", // 登陆send url
        //regURL: defaultURL+"/account/register?more=1", // 注册send url
        //logoutURL: defaultURL+"/account/logout" // 退出send url
    //}

    //login.urlBase = $.extend(login.urlBase,urlBase);
    //var str = '<div class="tips" style="display:block">'+
                //'<div class="tips-hd">友情提示 <a  class="tips-close" href="javascript:;">X</a> </div>'+
                //'<div class="tips-bd">{{text}}</div> <div class="tips-ft"></div>'+
            //'</div>'
             //var str2 = '<div class="tips" style="display:block">'+
                //'<div class="tips-hd">友情提示22 <a  class="tips-close" href="javascript:;">X</a> </div>'+
                //'<div class="tips-bd">{{text}}</div> <div class="tips-ft"></div>'+
            //'</div>'

    //var tips = new Tips({
        //model : str,
        //isMask: false,
    //})
      //var tips2 = new Tips({
        //model : str2,
        //isMask: false,
    //})

    //$(".btn").click(function () {
        //tips2.init({text:"asdasd"})
    //})


    saytext.focus(function () {
        if($(this).val() == "请输入文字"){
            $(this).val("");
        }
    })
    saytext.blur(function () {
        if($.trim($(this).val()) == ""){
            $(this).val("请输入文字");
        }
    })


    /**实例化编辑器**/
    function editorInit () {//{{{
        um = UM.getEditor('myEditor',{
            toolbar:[
                ' bold italic underline |',
                'forecolor fontsize' ,
                'link unlink | image feed-emotion',
            ],
           imageScaleEnabled:false
        });

        //登录判断

         var textMask = $(".textmask");

    if(isLogin) {
        //if($.trim(saytext.val())==""){
            //saytext.val("请输入文字");
        //}
        textMask.hide();
        um.setEnabled()
        
    } else {
        
        textMask.show();
        um.setDisabled()
        
        //saytext.val("");
        $(".maskLogin").click(function () {
            loginBtn.trigger("click");
        })
        $(".maskReg").click(function() {
            $("#reg").trigger("click")
        })
    }

    }//}}}

    /**渲染用户**///{{{
    //var tpl = '<div class="feed-user">'+
                //'<span class="feed-art-user">'+
                    //'<img src="{{avatar}}" alt="">'+
                    //'<span>{{nickname}}</span>'+
                //'</span>'+
            //'</div>';

    /**** 异步登录 ******/
    //login.onLoginSuc = function (data) {
        //var userinfo = data.data;
        //var rendHelp = $(".j-usr-post");
        //render({
            //tpl:tpl,
            //data:userinfo,
            //rendhelp:rendHelp
        //});
    //}
    //************ 用户帖子信息**********//
    //$.ajax({
        //url: 'http://192.168.1.185:8099/feed/v2/user/info',
        //type: 'GET',
        //dataType: 'json',
        //data:{"uid":"1462288"},
        //success: function (data) {
            //console.log(data)
        //},
        //error: function () {
            //console.log(1)
            //// error callback
        //}
    //});
    //var userData = {
        //"message":"操作成功",
        //"data":{
            //"uid":1462288,
            //"elite_threads":1,
            //"threads":12,
            //"replies":0
        //},
        //"code":0
    //}
    //var userTie = $(".feed-user-tie");
    //var userTpl = '<ul>' +
            //'<li><a href="">{{elite_threads}}</a></li>' +
            //'<li><a href="">{{threads}}</a></li>' +
            //'<li><a href="">{{replies}}</a></li>' +
        //'</ul>';

    //if(userData.code ==0) {
         //render({
             //tpl:userTpl,
             //data:userData.data,
             //rendhelp:userTie
         //})
    //}

    /**登录检查**/
    //login.isLogin(function (status) {
        
        //if(status) {
        //isLogin = true;
        //}
    //})//}}}

    reply.on("click",function (){
       if(isLogin) {
             //$("#Overlay").hide();
             checkEditor();
       } else {
            loginBtn.trigger("click");
            return false;
       }
     })
    
   
    /***点评***/
    diggerObj.each(function(idx,obj){//{{{
        var self = $(this);
        $(obj).on("click",".J_contact",function() {
            var name = $(this).attr("data-name");
            var text = self.find(".J_text");
            text.focus().val("@" + name + "：")
        })

        self.find(".post-digg").click(function() {
            var text = self.find(".J_text");
            if(isLogin) {
                if(text.val() != "点评" && $.trim(text.val()) !="")  {
                    self.find(".dig-form").submit();
                } else {
                    alert("内容不能为空");
                    return false;
                }
            } else {
                //$("#Overlay").hide();
                loginBtn.trigger("click")
                return false;
            }
        })
    })//}}}

    /* 
     * @param tpl 模板字符串
     * @param data 数据对象
     * @param rendhelp 渲染块
     */
    function render (o) {//{{{
        var temp = _h.compile(o.tpl),
        html = temp(o.data);

        o.rendhelp.html(html);
        o.rendhelp.show();
    }//}}}
    //表情除理
    function replaceEm_ (str) {//{{{
        str = str.replace(/\[(.*)]/g, function(match,key){
            var src = mofang_face_map[key];
            if(src){
                return '<img style="width:24px;height:24px" src="'+src+'" border="0" />';
            }else{
                return match;
            }
        });
        return str;
    }//}}}
    /***标题判断***/
    function checkTitle (o) {//{{{
        $(o).focus(function () {
            $(this).css("color","#000");
        })
        //$(o).blur(function() {
            //if($.trim($(this).val()) == "") {
                //alert("标题不能为空");
            //}else if($(this).val().length > 30) {
                //alert("标题过长")
            //}
        //})
    }//}}}
    //重新赋值
    function replaceArr (arr,val) {//{{{
        var empty =[];
        for(var i=0;i<arr.length;i++) {
            if(arr[i] != val) {
                empty.push(arr[i]);
            }
        }
        return empty;
    }//}}}
    /**PHP 后端需要的数据**/
    function formSubmit (data) {//{{{
        cont.val(editorCont)
        if(posttit.length) {
            posttit.val($(".feed-editor-text").val())
        }
        $(this).serialize();
        editorForm.submit();
    }//}}}

      function rgb2hex(rgb) {//{{{
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }//}}}
    /**内容检查**/
    function checkEditor (status) {//{{{
         if(editorTit.length) {
            if($.trim(editorTit.val()) == "" || editorTit.val() == "请填写标题，限30字以内") {
                alert("标题不能空");
                editorTit.focus();
                return false;
            }else if($.trim(editorTit.val()).length > 30) {
                alert("标题过长")
                //tips.init({text:"标题过长"})
                return false;
            }

        };
         //var reg = /^(([\d]+)||([a-zA-Z]+)||(\s+)||([^u4e00-u9fa5]{0,5})
         //||([\\<>&|.?\[\]{}|'*!`~@#$^&=:;,/~！@#￥……&*（）;—{}【】‘；：”“。，、？\(\)\s]+))$/g;
         var umContText =  $.trim(um.getContent());
        if(umContText == "" ||umContText == "请输入文字") {
            alert("请输入文字")
            return false;
        } else if(umContText.length < 10) {
            alert("很抱歉,您需要输入10以上的字才能回复哦~")
            return false;
        } else {
          //return false;
            editorCont = filterSpan(umContText)
            formSubmit();
        }
        //var sayTextVal = $.trim(saytext.val());
        //if(sayTextVal == "" || sayTextVal == "请输入文字") {
             //alert("请输入内容");
            //saytext.focus()
             //return false;
        //} else if(sayTextVal.length < 10) {
            //alert("内容过短");
            //return false;
        //} else if (sayTextVal != "请输入文字") {

            //editorCont = saytext.val()//um.getPlainTxt();//getContent();
           //// if(reg.test(editorCont) || editorCont.length<=10){
           ////     alert("请按正确的发表");
            ////   } else {
                //formSubmit();
            ////}
        //}
    }//}}}

    function filterSpan (editorCont) {//{{{
    var node = $('<div></div>').html(editorCont);
    node.find('span').each(function(){
        var span = $(this);
        if(span.attr('color')||span.css("font-size")||span.css("color")){

            if(span.css("color")) {
                if(span.css("color").indexOf("rgb") > -1) {
                    span.attr('color',rgb2hex(span.css("color")));
                } else {
                    span.attr('color',span.css("color"));
                }
                span.css("color","");
            }

            if(span.css("font-size")){
                var duiying = {"10px":1, "12px":2, "16px":3, "18px":4, "24px":5, "32px":6, "48px":7};
                span.attr('size',duiying[span.css("font-size")]);
                span.css("font-size","");

            }
            span.removeAttr("style")
        }

    });
     var totalSpan = $("<div></div>").append(node).html();
        totalSpan = replaceSpan(totalSpan);
        totalSpan = replaceP2Br(totalSpan);

        function replaceSpan (html) {
            html = html.replace(/undefined/gi,'');
            html = html.replace(/<span/gi,'<font');
            html = html.replace(/<\/span>/gi,'<\/font>');
            html = html.replace(/<strong/gi,'<b');
            html = html.replace(/<\/strong>/gi,'<\/b>');
            html = html.replace(/<em>/gi,'<i>');
            html = html.replace(/<\/em>/gi,'<\/i>');
            return html;
        }
        function replaceP2Br (html) {
            var reg = /<p><br><\/p>/ig;
            html = html.replace(reg,function($1,$2){
                return '<br />';
            });
            var reg2 = /<br[ \/]*><\/p>/ig;
            html = html.replace(reg2,function($1,$2){
                return '</p>';
            });
            html = html.replace(/<\/p>/gi,'<br><\/p>');
            html = html.replace('<br>','<br />');
            return html;
        }
        return totalSpan;

    }//}}}
    $(function () {
        editorInit();
        checkTitle(editorTit)
        // 初始化表情盒子
        //$('.emotion').qqFace({
            //id: 'facebox',
            //assign: 'saytext',
            //path: '/assets/chat/img/face/'
            ////callback: function (face) {
                //////um.setContent(um.getContent()+face);
            ////}
        //});
    });

});


