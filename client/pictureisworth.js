(function(window, document) {
	$(document).ready(function() {
		$('#image-upload-form').submit(function(event) {
			event.preventDefault();
			var formData = new FormData($(this)[0])
			$.ajax({
				type: "POST",
				url: "/api/evaluate",
				data: formData,
				contentType: false,
				processData: false
			}).done(function(data) {
				console.log(data);
			}).fail(function(data) {
				console.error(data.responseText);
			});
		});

		$('.spincounter').each(initializeSpincounter);

		var randomChangeInterval = setInterval(function() {
			$('.spincounter').each(function() {
				if($(this).attr('data-random')) {
					//setSpincounter(spincounter, getRandomInt(50, 2500));
				}
			});
		}, 2000);

	function initializeSpincounter() {
		var element = $(this);
		var digits = element.attr('data-digits') || 2;
		for(var i = 0; i < digits; i++) {
			element.append(
				$('<span></span>')
					.addClass('placeholder')
					.text('0')
					.append(
				$('<span></span>')
					.addClass('spinner')
					.html(['0','1','2','3','4','5','6','7','8','9'].join('</br>'))
					.css('top', '0px')
				));
		}

		var value = element.attr('data-value');
		if(value === undefined) {
			value = 0;
		}

		setSpincounter.call(element[0], value);
	}

	function setSpincounter(count) {
		var element = $(this);
		var digits = element.attr('data-digits') || 2;
		for(var i = 0; i < digits; i++) {
			var spinner = element.children().eq(i).children().first();
			//TODO: remove this and do actual animation
			(function(s) {
				setInterval(function() {
					s.css('top', (parseFloat(s.css('top'), 10) - 1) + 'px');
				}, 1/60);
			})(spinner);
		}
	}

	// Returns a random integer between min (included) and max (excluded)
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	});
})(window, document)
