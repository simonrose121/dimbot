(function() {
	angular
		.module('dimbot.game')
		.service('levelService', levelService)

	levelService.$Inject = ['logger'];

	function levelService(logger) {
		var vm = this;

		vm.width = 3;
		vm.height = 3;

		vm.testLevel = [
		 	0, 0, 0,
			1, 0, 2,
			0, 0, 0
		];

		var service = {
			checkMove: checkMove,
			getWidth: getWidth,
			getHeight: getHeight,
			readLevel: readLevel,
			updateLevel: updateLevel
		};

		return service;

		function checkMove(dir) {

		}

		function getWidth() {
			return vm.width;
		}

		function getHeight() {
			return vm.height;
		}

		function readLevel() {
			return vm.testLevel;
		}

		function updateLevel() {

		}
	}
})();
