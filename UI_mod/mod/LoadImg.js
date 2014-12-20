(function($) {
	/*
	* 
	*   // THE ACTUAL DEMO CODE
	*	$.preLoadImages('http://farm3.static.flickr.com/2066/1997997751_4eed467567.jpg',
	*	  'http://farm4.static.flickr.com/3362/3252938723_64c586a31e.jpg',
	*	  'http://farm4.static.flickr.com/3616/3522284481_a46cbc9486.jpg'
	*   );
	*
	* 图图预先加载完毕，让用户体验更友好，如果不用预加载，则在做交互的东西如果图片过大，则给用户显示会很慢
	* */
	var cache = [];
	$.preLoadImages = function() {
		var args_len = arguments.length;
		for (var i = args_len; i--;) {
			var cacheImage = document.createElement('img');
			cacheImage.src = arguments[i];
			cache.push(cacheImage);
		}
		console.log(cacheImage);
	}
})(jQuery);

