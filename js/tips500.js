(function ($) {
	$(function () {

		$('span.ttt').each(function () {
			var el = $(this);
			var title = el.attr('title');


			if ($(window).width() <= '500') {
				// здесь код вычисления границ и замены стиля элемента для мобильного вида
				el.attr('title', '').append('<div class="ttt_div" style="left: -100px; right: -100px; position: initial; min-width: fit-content; font-size: 1em; box-shadow: 0.1px 0.1px 75px 50px;">' + title + '</div>');

			} else {
				el.attr('title', '').append('<div>' + title + '</div>');
			}

			if (title != "") {
				var width = el.find('div').width(); // получение ширины
				var height = el.find('div').height(); // получение высоты
				el.hover(
					function () {

						el.find('div')
							.clearQueue()
							.delay(200)
							.animate({ width: width + 20, height: height + 20 }, 50).show(150)
							.animate({ width: width, height: height }, 100);

					},
					function () {
						el.find('div')
							.animate({ width: width + 20, height: height + 20 }, 100)
							.animate({ width: 'hide', height: 'hide' }, 150);
					}
				).mouseleave(function () {
					if (el.children().is(':hidden')) el.find('div').clearQueue();
				});
			}
		})

	})
})(jQuery)
