(function(window, document) {
	var spincounters = document.getElementsByClassName('spincounter');
	for(var i = 0; i < spincounters.length; i++) {
		initializeSpincounter(spincounters[i]);
	}

	var randomChangeInterval = setInterval(function() {
		for(var i = 0; i < spincounters.length; i++) {
			var spincounter = spincounters[i];
			if(spincounter.getAttribute('data-random')) {
				//setSpincounter(spincounter, getRandomInt(50, 2500));
			}
		}
	}, 2000);

function initializeSpincounter(element) {
	var digits = element.getAttribute('data-digits') || 2;
	for(var i = 0; i < digits; i++) {
		var digitElement = document.createElement('span');
		digitElement.appendChild(document.createTextNode('0'));
		digitElement.classList.add('placeholder');

		var spinner = document.createElement('span');
		spinner.classList.add('spinner');
		spinner.innerHTML = ['0','1','2','3','4','5','6','7','8','9'].join('</br>');
		//spinner.appendChild(document.createTextNode(['0','1','2','3','4','5','6','7','8','9'].join('</br>')));
		spinner.style.top = '0px';

		digitElement.appendChild(spinner);
		element.appendChild(digitElement);
	}

	var value = element.getAttribute('data-value');
	if(!value && value !== 0) {
		value = 0;
	}

	setSpincounter(element, value);
}

function setSpincounter(spincounter, count) {
	var digits = spincounter.getAttribute('data-digits') || 2;
	for(var i = 0; i < digits; i++) {
		var spinner = spincounter.children[i].children[0];
		//TODO: remove this and do actual animation
		(function(s) {
			setInterval(function() {
				s.style.top = (parseFloat(s.style.top, 10) - 1) + 'px';
			}, 1/60);
		})(spinner);
	}
}

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
})(window, document)
