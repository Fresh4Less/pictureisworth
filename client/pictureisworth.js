(function(window, document) {
	$(document).ready(function() {
		var submitLabel = $('#image-submit').next('label');
		var imageInputLabel = $('#image-input').next('label');
		$('#image-upload-form').submit(function(event) {
			event.preventDefault();
			$('#image-upload-error').text('');
			submitLabel.find('span').text('Uploading...');
			submitLabel.attr('disabled', true);
			var formData = new FormData($(this)[0])
			$.ajax({
				type: "POST",
				url: "/api/evaluate",
				data: formData,
				contentType: false,
				processData: false
			}).done(function(data) {
				submitLabel.find('span').text('Upload');
				setSpincounter.call($('#image-word-count')[0], parseInt(data))
			}).fail(function(data) {
				submitLabel.find('span').text('Upload');
				submitLabel.attr('disabled', false);
				$('#image-upload-error').text('Error: ' + data.responseText);
			});
		});

		$('#image-input').change(function(event) {
			// set label to filename
			var fileName = '';
			if(event.target.value) {
				fileName = event.target.value.split('\\').pop();
			}

			if(fileName) {
				imageInputLabel.html(fileName);
			}
			else {
				imageInputLabel.html('Choose image');
			}

			submitLabel.css('visibility', 'visible');
			submitLabel.attr('disabled', false);
			$('#image-preview').attr('src', URL.createObjectURL(event.target.files[0]));
		});

		$('.spincounter').each(initializeSpincounter);

		var randomChangeInterval = setInterval(function() {
			$('.spincounter').each(function() {
				if($(this).attr('data-random')) {
					setSpincounter.call(this, getRandomInt(0, 10000));
				}
			});
		}, 5000);

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

			if(!element.attr('data-spinoninit')) {
				var spinner = element.children().eq(i).children().first();
				var digitHeight = spinner.height() / 20;
				spinner.addClass('notransition');
				spinner.css('top', (-digitHeight * 10) + 'px');
				spinner[0].offsetHeight; //trigger reflow to apply css changes
				spinner.removeClass('notransition');
			}
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
