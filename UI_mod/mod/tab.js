;
(function($) {
	var Tab = function(obj,option) {
			this._timer = null;
			this._i = 0;
		this.init(obj,option);
	},
	defaults = {
		eventtyle: "click",
		auto : false,
		time : 1200,
		callBack: function() {}
	};
	Tab.prototype = {
		init: function(obj,config) {
			var self = this;
			this.config = $.extend({},defaults, config);
			//tab header
			this.tabItem = $(obj).find(".tab-hd-item"),
			//tab Cont
			this.tabCont = $(obj).find(".tab-bd-item");
			this.bindEvent();
			if(this.config.auto) {
				this.autoTab();
				$(obj).hover(function () {
					clearInterval(self._timer);
				},function () {
					self.autoTab();
				})
			}
		},
		bindEvent: function() {
			var self = this;
			$(this.tabItem).each(function() {
				var _self = $(this),
				_index = _self.index();
				_self.bind(self.config.eventtyle, function() {
					_self.addClass("J_active").siblings().removeClass("J_active");
					self.tabCont.eq(_index).addClass("J_active").siblings().removeClass("J_active");
					//重置索引
					self._i = _index;
				})
			})
		},

		autoTab : function () {
			var _length = this.tabItem.length,
				_self = this;
			this._timer = setInterval(function () {
				_self._i++;
				if(_self._i >= _length) {
					_self._i = 0;
				}
				_self.tabItem.removeClass("J_active");
				_self.tabCont.removeClass("J_active");
				$(_self.tabItem[_self._i]).addClass("J_active");
				$(_self.tabCont[_self._i]).addClass("J_active");
			},_self.config.time);
		}

	}
	$.extend({
		tab : function (obj,option) {
			new Tab(obj,option);	
		}
	})
})(jQuery)

