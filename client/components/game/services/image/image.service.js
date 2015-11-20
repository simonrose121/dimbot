(function() {
	angular
		.module('dimbot.game')
		.service('imageService', imageService);

	imageService.$Inject = ['logger'];

	function imageService(logger) {
		var vm = this;

		vm.id = '#status';
		vm.dir = '.direction';
		vm.index = 0;

		var service = {
			adjustDirectionPosition: adjustDirectionPosition,
			background: background,
			hideDirection: hideDirection,
			highlight: highlight,
			play: play,
			next: next,
			rewind: rewind,
			removeNext: removeNext,
			rotateDirection: rotateDirection,
			setIndex: setIndex,
			showDirection: showDirection,
			stop: stop,
			toggleBin: toggleBin,
			unhighlight: unhighlight
		};

		return service;

		function adjustDirectionPosition(x, y) {
			$(vm.dir).css({
			    'margin-left': x + 'px',
				'margin-top': -y + 'px'
			});
		}

		function background(callback) {
			$('html').animate({
				backgroundColor: '#fff'
			}, 1500, function() {
				$('html').animate({
					backgroundColor: '#00BFFF'
				}, 1500);
				callback();
			});
		}

		function hideDirection() {
			$(vm.dir).hide();
		}

		function highlight(ins) {
			$('#' + vm.index).addClass('highlight');
		}

		function play() {
			$(vm.id).removeClass();
			$(vm.id).addClass('play');
		}

		function rewind() {
			$(vm.id).removeClass();
			$(vm.id).addClass('rewind');
		}

		function next() {
			$('#next').show();
		}

		function removeNext() {
			$('#next').hide();
		}

		function rotateDirection(deg) {
			$('.direction').css({
				transform:'translate(-50%, -50%) rotate(-' + deg + 'deg)'
			});
		}

		function showDirection() {
			$(vm.dir).show();
		}

		function stop() {
			$(vm.id).removeClass();
			$(vm.id).addClass('stop');
		}

		function toggleBin(isVisible) {
			if (isVisible) {
				$('#bin').hide();
			} else {
				$('#bin').show();
			}
		}

		function unhighlight(ins) {
			$('#' + vm.index).removeClass('highlight');
			vm.index++;
		}

		function setIndex(val) {
			vm.index = val;
		}
	}
})();
