$(document).ready(function () {
	$(window).scroll(function() {
		setTimeout(function () {
			if($(this).scrollTop() > 0) {
				$(".header").addClass('header--move');
			} else {
				$(".header").removeClass('header--move');
			}
		}, 200);
	});
});