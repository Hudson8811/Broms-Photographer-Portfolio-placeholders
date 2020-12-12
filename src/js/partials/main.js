$(document).ready(function () {
	$("input[name='phone']").mask("+7-000-000-00-00");

	$('[data-fancybox]').fancybox({
		touch: false,
		scrolling: 'no',
		beforeShow: function(){
			$("body").css({'overflow-y':'hidden'});
		},
		afterClose: function(){
			$("body").css({'overflow-y':'visible'});
		}
	});

	$('.first-screen__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: $('.first-screen__arrow--prev'),
		nextArrow: $('.first-screen__arrow--next'),
		dots: true,
		fade: true,
		dotsClass: 'custom-dots',
		appendDots: $('.first-screen__nav'),
		customPaging: function(val, index) {
			return '<button class="custom-dot">' + (index + 1).toString().padStart(2,0) + '.</button>';
		},
	});

	$('.services__slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
			  breakpoint: 1023,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			  }
			},
			{
				breakpoint: 568,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1,
				}
			  }
		  ]
	});

	$('.cases__slider').on('afterChange init', function () {
		var current = $(this).find('.slick-current');

		$('.cases__bg img').hide().attr('src', current.find('.cases__pic img.current').attr('src')).fadeIn(300);
	});

	$('.cases__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button class="slider-arrow slider-arrow--prev" aria-hidden="true"><svg width="100" height="13" viewBox="0 0 100 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
		'<path fill-rule="evenodd" clip-rule="evenodd" d="M99.344 13C100.607 13 99.7254 11.5832 99.344 11.163L89.1279 0.315165C88.7464 -0.105054 88.128 -0.105054 87.7465 0.315165C87.3651 0.735383 87.3651 1.41669 87.7465 1.83691L96.2952 10.8479H0.976766C0.437313 10.8479 0 11.3296 0 11.9239C0 12.5182 0.437313 12.9999 0.976766 12.9999H96.2952C96.2952 12.9999 99.1417 13 99.344 13Z" fill="white"/>\n' +
		'</svg></button>',
		nextArrow: '<button class="slider-arrow slider-arrow--next" aria-hidden="true"><svg width="100" height="13" viewBox="0 0 100 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
		'<path fill-rule="evenodd" clip-rule="evenodd" d="M99.344 13C100.607 13 99.7254 11.5832 99.344 11.163L89.1279 0.315165C88.7464 -0.105054 88.128 -0.105054 87.7465 0.315165C87.3651 0.735383 87.3651 1.41669 87.7465 1.83691L96.2952 10.8479H0.976766C0.437313 10.8479 0 11.3296 0 11.9239C0 12.5182 0.437313 12.9999 0.976766 12.9999H96.2952C96.2952 12.9999 99.1417 13 99.344 13Z" fill="white"/>\n' +
		'</svg></button>',
	});

	$('.reviews__slider').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: false,
		centerMode: true,
		variableWidth: true,
		infinite: true
	});

	// Video preview
	$('.video__preview').click(function () {
		$(this).next().show();
	});

	// Portfolio tabs
	$('.portfolio__tab-item').click(function () {
		if (!$(this).hasClass('active')) {
			$('.portfolio__tab-item').removeClass('active');
			$(this).addClass('active');
			$('.portfolio__content-item').hide().eq($(this).index()).fadeIn(300);
		}
	});

	  $('.about-professionals__slider').on( 'ready.flickity', function() {
		$(`.flickity-slider .services__slide:nth-child(1)`).addClass('is-selected')
		$(`.flickity-slider .services__slide:nth-child(2)`).addClass('is-selected')
		$(`.flickity-slider .services__slide:last-child()`).addClass('is-selected')
		console.log('Flickity ready');
	  });

	  $('.about-professionals__slider').flickity({
		// options
		cellAlign: 'center',
		contain: true,
		wrapAround: true,
		prevNextButtons: true,
		pageDots: false
	  });

	  $('.about-professionals__slider').on( 'change.flickity', function( event, index ) {
		$(`.flickity-slider .services__slide`).removeClass('removes')
		$(`.flickity-slider .services__slide`).removeClass('is-selected')
		$(`.flickity-slider .services__slide:nth-child(${index})`).addClass('is-selected')
		$(`.flickity-slider .services__slide:nth-child(${index + 1})`).addClass('is-selected')
		$(`.flickity-slider .services__slide:nth-child(${index + 2})`).addClass('is-selected')
		const activeIndex = $('.services__slide').length - 1
		if(index == activeIndex - 1){
			$(`.flickity-slider .services__slide:nth-child(1)`).addClass('removes')
		}
		if(index == activeIndex){
			$(`.flickity-slider .services__slide:nth-child(1)`).addClass('is-selected')
		}
		if(index == 0){
			$(`.flickity-slider .services__slide:last-child()`).addClass('is-selected')
		}
	  });


	  $('#booking').monthly({
		  mode:'event',
		  xmlUrl:'events.xml'
		});

		
			$('.header__burger').click(function(){
				if($(window).width() < 1024){
					$(this).toggleClass('is-active')
					$('.header__menu').slideToggle(200)
				}
				
			})

			$('.header__menu > li:nth-child(2) > a').click(function(e){
				if($(window).width() < 1024){
					e.preventDefault()
					$(this).toggleClass('is-active')
					$('.header__sub-menu').slideToggle(200)
				}
				
			})
		
			setTimeout(function () {
				$('body').removeClass('is-loading'); 
			}, 1000);
});