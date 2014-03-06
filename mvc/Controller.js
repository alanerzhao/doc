var exports = this;
//var mod = {};
(function($) {
    var mod = {};
    mod.create = function (includes){
		var result = function() {
			this.init.apply(this, arguments);
		};
		result.fn = result.prototype;
		result.fn.init = function() {}
		result.proxy = function(func) {
			return $.proxy(func, this);
		}
		result.fn.proxy = result.proxy;
		result.include = function(obj) {
			$.extend(this.fn, obj);
		}
		result.extend = function(obj) {
			$.extend(this, obj);
		}
		if (includes) result.include(includes);
		return result;

	}
	exports.Controller = mod;

})(jQuery);

$(function() {
	var ToggleView = Controller.create({
		init: function(view) {
			this.view = $(view);
			this.view.hover(this.proxy(this.toggleClass));
		},
		toggleClass:function(e) {
			this.view.toggleClass("active",e.data);
		}
	});
    console.dir(new ToggleView)
    window.ToggleView = ToggleView;
	new ToggleView("#view");
});

