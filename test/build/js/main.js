$(function () {
	var click = $(".click");
	click.on("click",function () {
		alert(1);
	})
	$(".swipe").tap(function () {
		alert(2);
	})
})
