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
					setSpincounter.call(this, getRandomInt(0, 10000));
				}
			});
		}, 3000);

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
					.html(['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'].join('</br>')) //two copies so we can always "scroll up" to the next number
					.css('top', '0px')
				));
		}

		var value = element.attr('data-value');
		if(value === undefined) {
			value = 0;
		}

		setSpincounter.call(element[0], value);
	}

	function setSpincounter(value) {
		var element = $(this);
		var digits = element.attr('data-digits') || 2;

		for(var i = 0; i < digits; i++) {
			(function(i) {
				var placeholder = element.children().eq(i);
				var spinner = placeholder.children().first();
				//TODO: remove this and do actual animation
				var digitHeight = spinner.height() / 20;
				var digitValue = Math.floor(value / Math.pow(10, digits-i-1)) % 10;
				spinner.css('top', (-digitHeight*(digitValue+10)) + 'px');
				//when the transition is done, set us back to the top version of the digit so we can scroll down later
				setTimeout(function() {
					spinner.addClass('notransition');
					spinner.css('top', (parseFloat(spinner.css('top')) + digitHeight * 10) + 'px');
					spinner[0].offsetHeight; //trigger reflow to apply css changes
					spinner.removeClass('notransition');
				}, 1500); //this 1500 should match the css for the .spinner transition top duration
			})(i);
		}
	}

	// Returns a random integer between min (included) and max (excluded)
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	});
})(window, document)
