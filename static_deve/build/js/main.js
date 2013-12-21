$(function() {
	var bullets = $(".top-position > li"),
	slider = Swipe(document.getElementById('Top-swipe'), {
		startSlide: 0,
		speed: 400,
		// data.time || 400,
		auto: 3000,
		//data.auto || 3000,
		continuous: true,
		disableScroll: false,
		stopPropagation: true,
		callback: function(pos) {
			var i = bullets.length;
			while (i--) {
				bullets[i].className = ' ';
			}
			bullets[pos].className = 'on';
		}
	});
})

