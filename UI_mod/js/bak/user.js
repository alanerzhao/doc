/**
 * @file user.js
 * @brief   async login render mod
 * @author baozi
 * @version 0.0.1
 * @date 2014-11-05
 */

define("user",["mf/login","jquery","handlebars"],function(require, exports, module) {

    var login = require("mf/login"),
        $ = require("jquery"),
        _h = require("handlebars");

    function User (param) {//{{{
        this.param = param || {};
        var urlBase = {
            loginURL: defaultURL+"/account/login?more=1", // 登陆send url
            regURL: defaultURL+"/account/register?more=1", // 注册send url
            logoutURL: defaultURL+"/account/logout"// 退出send url
        };
        //todo 优化
        var tpl =   this.param.tpl || '<h3 class="sidebar-tit">我的游戏</h3>'+
                        ' <div class="user-info clearfix">' +
                            '<a href=""><img src="{{avatar}}" alt=""></a>' +
                            '<ul class="user-info-list">' +
                                '<li>{{nickname}}</li>' +
                                '<li><span class="sidbar-gold">{{coin}}</span></li>' +
                                '<li class="new-hand"></li>' +
                            '</ul>' +
                        '</div>';

        login.urlBase = $.extend(login.urlBase,urlBase);

        this.tpl = tpl;
        this.init();
    }//}}}

    User.prototype = {
        init :　function () {//{{{
            this.fetch();
        },//}}}
        fetch : function () {//{{{
            var self = this;
            login.onLoginSuc = function (data) {
                //console.dir(data);
                var userinfo = data.data;
                self.render(userinfo);
            }
        },//}}}
        render : function (data) {//{{{

            var rendHelp = this.param.obj || $(".j-user"),
            sayBar = $(".j-saybar"),
            temp = _h.compile(this.tpl),
            html = temp(data);

            rendHelp.html(html);
            rendHelp.show();
            sayBar.show();
        }//}}}
    }


    var user = new User();

    if (typeof module != "undefined" && module.exports) {
        module.exports = User;
    }

});

