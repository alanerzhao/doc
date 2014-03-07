var exports = this;
//var mod = {};
(function($) {
	var mod = {};
	mod.create = function(includes) {
		var result = function() {
            //执行第个实例的init构造属性
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

var exports = this;

jQuery(function($) {
	exports.SearchView = Controller.create({
        //把对应的key通过$传换成jquery对象存起来
		elements: {
			"input[type=search]": "searchInput",
			"form": "searchForm"
		},

		init: function(element) {
            console.log(element)
			this.el = $(element);
			this.refreshElements();
			this.searchForm.submit(this.proxy(this.search));
		},

		search: function() {
			alert("Searching: " + this.searchInput.val());
			return false;
		},

		// Private
		$: function(selector) {
			return $(selector, this.el);
		},

        //映射elements表
		refreshElements: function() {
			for (var key in this.elements) {
				this[this.elements[key]] = this.$(key);
			}
		}
	});

    
	console.dir(new SearchView("#users"));
});

