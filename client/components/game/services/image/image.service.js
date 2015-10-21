(function() {
	angular
		.module('dimbot.game')
		.service('imageService', imageService);

	imageService.$Inject = ['logger'];

	function imageService(logger) {
		var vm = this;

		vm.id = '#status';
		vm.index = 0;

		var service = {
			highlight: highlight,
			play: play,
			next: next,
			rewind: rewind,
			setIndex: setIndex,
			stop: stop,
			unhighlight: unhighlight
		};

		return service;

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
			$('#next').toggle();
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
