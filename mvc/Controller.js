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
        //给实例继承属性或方法
		result.include = function(obj) {
			$.extend(this.fn, obj);
		}

		result.extend = function(obj) {
			$.extend(this, obj);
		}
		if (includes) result.include(includes);

        //返回对象
		return result;

	}
    //暴露接口
	exports.Controller = mod;

})(jQuery);

var exports = this;

jQuery(function($) {
	exports.SearchView = Controller.create({
        //把jquery对象映射成js对象
		elements: {
			"input[type=search]": "searchInput",
			"form": "searchForm"
		},
        
        //要绑定的事件
		events: {
			"submit form": "search"
		},

		init: function(element) {

            this.el = $(element); 
            this.refreshElements();
			this.delegateEvents();
		},

		search: function() {
			alert("Searching: " + this.searchInput.val());
			return false;
		},

		// Private
        //映射helper
		$: function(selector) {
			return $(selector, this.el);
		},

        //映射
		refreshElements: function() {
			for (var key in this.elements) {
				this[this.elements[key]] = this.$(key);
			}
		},

		eventSplitter: /^(\w+)\s*(.*)$/,

		delegateEvents: function() {
			for (var key in this.events) {
				var methodName = this.events[key];
				var method = this.proxy(this[methodName]);

				var match = key.match(this.eventSplitter);
				var eventName = match[1],
				selector = match[2];

				if (selector === '') {
					this.el.bind(eventName, method);
				} else {
                    //事件委托
					this.el.delegate(selector, eventName, method);
				}
			}
		}
	});



    /* 写代码的思想好牛b */
	console.dir(new SearchView("#users"));
});

