(function() {
	angular
		.module('dimbot.game')
		.service('imageService', imageService)

	imageService.$Inject = ['logger'];

	function imageService() {
		var playClass = '.play';

		var service = {
			loopInstructions: loopInstructions,
			play: play,
			rewind: rewind,
			stop: stop
		}

		return service;

		function loopInstructions() {

		}

		function play() {
			$(playClass).css("pointer-events", "auto");
			$(playClass).css("background-image", "url(../img/play-button.png)");
		}

		function rewind() {
			$(playClass).css("background-image", "url(../img/rewind-button.png)");
		}

		function stop() {
			$(playClass).css("pointer-events", "none");
			$(playClass).css("background-image", "url(../img/stop-button.png)");
		}
	}
})();
