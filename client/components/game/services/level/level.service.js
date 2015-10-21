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
		vm.level = [];
		vm.instructions = [];
		vm.levelNo = 1;

		vm.levels = {
			1: {
				'lvl': [
					3, 3, 3, 3, 3,
				 	3, 0, 0, 0, 3,
					3, 1, 0, 2, 3,
					3, 0, 0, 0, 3,
					3, 3, 3, 3, 3
				],
				'ins': [
					'fw',
					'lt'
				]
			},
			2: {
				'lvl': [
					3, 3, 3, 3, 3,
				 	3, 0, 0, 0, 3,
					3, 1, 0, 0, 3,
					3, 0, 2, 0, 3,
					3, 3, 3, 3, 3
				],
				'ins': [
					'fw',
					'rr',
					'lt'
				]
			}
		};

		var service = {
			checkMove: checkMove,
			getHeight: getHeight,
			getInstructions: getInstructions,
			getStartingDirection: getStartingDirection,
			getWidth: getWidth,
			nextLevel: nextLevel,
			readLevel: readLevel,
			resetLevel: resetLevel,
			setInstructions: setInstructions,
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

		function nextLevel() {
			vm.levelNo++;
			service.resetLevel();
		}

		function readLevel() {
			return vm.level;
		}

		function resetLevel() {
			vm.level = vm.levels[vm.levelNo].lvl.slice();
			logger.info('level', vm.level);
		}

		function setInstructions() {
			for (var i = 0; i < vm.levels[vm.levelNo].ins.length; i++) {
				var name = vm.levels[vm.levelNo].ins[i];
				var ins = instructionFactory.getInstruction(name);
				vm.instructions.push(ins);
			}
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
