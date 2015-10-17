(function() {
	angular
		.module('dimbot.game')
		.service('imageService', imageService)

	imageService.$Inject = ['logger'];

	function imageService(logger) {
		var vm = this;

		vm.playClass = '.play';
		vm.index = 0;

		var service = {
			highlight: highlight,
			play: play,
			rewind: rewind,
			stop: stop,
			unhighlight: unhighlight
		}

		return service;

		function highlight(ins) {
			$('#' + vm.index).css('border', 'solid thick #FFF');
		}

		function play() {
			$(vm.playClass).css('pointer-events', 'auto');
			$(vm.playClass).css('background-image', 'url(../img/play-button.png)');
		}

		function rewind() {
			$(vm.playClass).css('background-image', 'url(../img/rewind-button.png)');
		}

		function stop() {
			$(vm.playClass).css('pointer-events', 'none');
			$(vm.playClass).css('background-image', 'url(../img/stop-button.png)');
		}

		function unhighlight(ins) {
			$('#' + vm.index).css('border', 'none');
			vm.index++;
		}
	}
})();
