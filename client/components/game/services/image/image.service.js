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
			unhighlight: unhighlight
		};

		return service;

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
				transform:'translate(-50%, -50%) rotate(' + deg + 'deg)'
			});
		}

		function showDirection() {
			$(vm.dir).show();
		}

		function stop() {
			$(vm.id).removeClass();
			$(vm.id).addClass('stop');
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
