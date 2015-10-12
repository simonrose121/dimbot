(function() {
	angular
		.module('dimbot.game')
		.service('levelService', levelService)

	levelService.$Inject = ['logger'];

	function levelService(logger) {
		var vm = this;

		vm.width = 3;
		vm.height = 3;
		vm.mapWidth = 5;
		vm.mapHeight = 5;
		vm.startingDirection = 'e';
		vm.level;

		vm.testLevel = [
			3, 3, 3, 3, 3,
		 	3, 0, 0, 0, 3,
			3, 1, 0, 2, 3,
			3, 0, 0, 0, 3,
			3, 3, 3, 3, 3
		];

		var service = {
			checkMove: checkMove,
			getHeight: getHeight,
			getStartingDirection: getStartingDirection,
			getWidth: getWidth,
			readLevel: readLevel,
			resetLevel: resetLevel,
			updateLevel: updateLevel
		};

		return service;

		function checkMove(dir) {
			// get index
			var index = getIndexOfObj(1);

			// get projected movement
			switch(dir.name) {
				case 'n':
					index = index - vm.mapWidth;
					break;
				case 'e':
					index = index + 1;
					break;
				case 's':
					index = index + vm.mapWidth;
					break;
				case 'w':
					index = index - 1;
					break;
			}

			if (vm.testLevel[index] == 3) {
				return false;
			}

			// return bool
			return true;
		}

		function getHeight() {
			return vm.height;
		}

		function getStartingDirection() {
			return vm.startingDirection;
		}

		function getWidth() {
			return vm.width;
		}

		function readLevel() {
			return vm.testLevel;
		}

		function resetLevel(level) {
			vm.level = vm.testLevel;
		}

		function updateLevel(dir) {
			// get current index
			var index = getIndexOfObj(1);

			// reset current
			vm.testLevel[index] = 0;

			// change value
			// east
			switch(dir.name) {
				case 'n':
					index = index - vm.mapWidth;
					break;
				case 'e':
					index = index + 1;
					break;
				case 's':
					index = index + vm.mapWidth;
					break;
				case 'w':
					index = index - 1;
					break;
			}

			// update next index
			vm.testLevel[index] = 1;
			logger.info('index is', index);
		}

		// private
		function getIndexOfObj(id) {
			return vm.testLevel.indexOf(id);
		}
	}
})();
