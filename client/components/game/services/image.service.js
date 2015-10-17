(function() {
	angular
		.module('dimbot.game')
		.service('imageService', imageService)

	imageService.$Inject = ['logger'];

	function imageService() {
		var playClass = '.play';

		var service = {
			play: play,
			rewind: rewind,
			stop: stop
		}

		return service;

		function play() {
			$(playClass).css("background-image", "url(../img/play-button.png)");
		}

		function rewind() {
			$(playClass).css("background-image", "url(../img/rewind-button.png)");
		}

		function stop() {
			$(playClass).css("background-image", "url(../img/stop-button.png)");
		}
	}
})();
