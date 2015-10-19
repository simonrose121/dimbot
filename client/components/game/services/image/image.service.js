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
			rewind: rewind,
			setIndex: setIndex,
			stop: stop,
			unhighlight: unhighlight
		};

		return service;

		function highlight(ins) {
			$('#' + vm.index).css('border', 'solid thick #FFF');
		}

		function play() {
			$(vm.id).css('background-image', 'url(../img/play-button.png)');
			$(vm.id).removeClass();
			$(vm.id).addClass('play');
		}

		function rewind() {
			$(vm.id).css('background-image', 'url(../img/rewind-button.png)');
			$(vm.id).removeClass();
			$(vm.id).addClass('rewind');
		}

		function stop() {
			$(vm.id).css('background-image', 'url(../img/stop-button.png)');
			$(vm.id).removeClass();
			$(vm.id).addClass('stop');
		}

		function unhighlight(ins) {
			$('#' + vm.index).css('border', 'none');
			vm.index++;
		}

		function setIndex(val) {
			vm.index = val;
		}
	}
})();
