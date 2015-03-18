/**
 * @require Popup Model
 * @name Tips Model
**/
define("tips",["jquery","popup"],function(require, exports, module) {
     var $ = require("jquery"),
        Popup = require("popup");

        function Tips (o) {
            Popup.call(this,o);
            var _model = this.opts.model.replace("{{text}}",o.text);
            this.model = $(_model);
            $(document.body).append(this.model);
        }
        Tips.prototype = new Popup;
        Tips.prototype.constructor = Tips;
        var TipsProto = Tips.prototype;

        TipsProto.init = function (o) {
            var _me = this;
            this.timer = null
            this.setting(o);
            $(".tips-close").on("click",function () {
                _me.close(o)
            })
        },
        TipsProto.setting =  function (o) {
            this.position();
            this.show();
            var _me = this;
            clearTimeout(_me.timer)

            _me.timer = setTimeout(function () {
                _me.close(o);
            },2000)
        },
        TipsProto.close = function (o) {
            var _me = this;
            _me.model.fadeOut("",function () {
                o.callback && o.callback()
            }).hide()
        }

        //var tips = new Tips({
            //model:str,
            //isMask: false,
            //text:"aa"
        //})
        //$(".btn").click(function () {
            //tips.init()
            //$(".tips-close").click(function () {
                //tips.hide();
            //})
            //tips.autoHide(1500);
        //})

    //function Tips (o) {
        //Popup.call(this,o);
    //}
    //Tips.prototype = new Popup;
    //Tips.prototype.constructor = Tips;

    if (typeof module != "undefined" && module.exports) {
        module.exports = Tips;
    }
});


