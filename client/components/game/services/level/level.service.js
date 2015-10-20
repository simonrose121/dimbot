(function() {
	angular
		.module('dimbot.game')
		.service('levelService', levelService);

	levelService.$Inject = ['logger', 'instructionFactory'];

	function levelService(logger, instructionFactory) {
		var vm = this;

		vm.width = 3;
		vm.height = 3;
		vm.mapWidth = 5;
		vm.mapHeight = 5;
		vm.startingDirection = 'e';
		vm.level = null;
		vm.instructions = [];

		vm.startingLevel = [
			3, 3, 3, 3, 3,
		 	3, 0, 0, 0, 3,
			3, 1, 0, 2, 3,
			3, 0, 0, 0, 3,
			3, 3, 3, 3, 3
		];

		vm.level = [];

		var service = {
			checkMove: checkMove,
			getHeight: getHeight,
			getInstructions: getInstructions,
			getStartingDirection: getStartingDirection,
			getWidth: getWidth,
			readLevel: readLevel,
			resetLevel: resetLevel,
			setStartingInstructions: setStartingInstructions,
			updateLevel: updateLevel
		};

		return service;

		function checkMove(dir) {
			logger.info('level when checking move', vm.level);

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

			if (vm.level[index] == 3) {
				return false;
			}

			// return bool
			return true;
		}

		function getHeight() {
			return vm.height;
		}

		function getInstructions() {
			return vm.instructions;
		}

		function getStartingDirection() {
			return vm.startingDirection;
		}

		function getWidth() {
			return vm.width;
		}

		function readLevel() {
			return vm.level;
		}

		function resetLevel() {
			logger.info('startingLevel', vm.startingLevel);
			logger.info('level', vm.level);
			vm.level = vm.startingLevel.slice();
		}

		function setStartingInstructions() {
			var fw = instructionFactory.getInstruction('fw');
			var rr = instructionFactory.getInstruction('rr');
			var rl = instructionFactory.getInstruction('rl');
			var lt = instructionFactory.getInstruction('lt');

			vm.instructions.push(fw);
			vm.instructions.push(rr);
			vm.instructions.push(rl);
			vm.instructions.push(lt);
		}

		function updateLevel(dir) {
			// get current index
			var index = getIndexOfObj(1);

			// reset current
			vm.level[index] = 0;

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
			vm.level[index] = 1;
			logger.info('index is', index);
		}

		// private
		function getIndexOfObj(id) {
			return vm.level.indexOf(id);
		}
	}
})();
