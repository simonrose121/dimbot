(function() {
	angular
		.module('dimbot.game')
		.service('levelService', levelService);

	levelService.$Inject = ['logger', 'instructionFactory'];

	function levelService(logger, instructionFactory) {
		var vm = this;

		vm.level = [];
		vm.instructions = [];
		vm.maxLevel = 2;
		vm.levelNo = 3;

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
				],
				'dir': 'e',
				'width': 3,
				'height': 3,
				'mwidth': 5,
				'mheight': 5
			},
			2: {
				'lvl': [
					3, 3, 3, 3, 3,
				 	3, 0, 0, 2, 3,
					3, 1, 0, 0, 3,
					3, 0, 0, 0, 3,
					3, 3, 3, 3, 3
				],
				'ins': [
					'fw',
					'rr',
					'lt'
				],
				'dir': 'e',
				'width': 3,
				'height': 3,
				'mwidth': 5,
				'mheight': 5
			},
			3: {
				'lvl': [
					3, 3, 3, 3, 3,
				 	3, 1, 4, 0, 3,
					3, 0, 4, 2, 3,
					3, 0, 0, 0, 3,
					3, 3, 3, 3, 3
				],
				'ins': [
					'fw',
					'rl',
					'lt'
				],
				'dir': 's',
				'width': 3,
				'height': 3,
				'mwidth': 5,
				'mheight': 5
			},
			4: {
				'lvl': [
					3, 3, 3, 3, 3, 3,
				 	3, 1, 4, 0, 2, 3,
					3, 0, 4, 0, 4, 3,
					3, 0, 0, 0, 0, 3,
					3, 3, 3, 3, 3, 3
				],
				'ins': [
					'fw',
					'rl',
					'rr',
					'lt'
				],
				'dir': 'n',
				'width': 4,
				'height': 3,
				'mwidth': 6,
				'mheight': 5
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
					index = index - vm.levels[vm.levelNo].mwidth;
					break;
				case 'e':
					index = index + 1;
					break;
				case 's':
					index = index + vm.levels[vm.levelNo].mwidth;
					break;
				case 'w':
					index = index - 1;
					break;
			}

			if (vm.level[index] == 3) {
				return false;
			}

			if (vm.level[index] == 4) {
				return false;
			}

			// return bool
			return true;
		}

		function getHeight() {
			return vm.levels[vm.levelNo].height;
		}

		function getInstructions() {
			return vm.instructions;
		}

		function getStartingDirection() {
			return vm.levels[vm.levelNo].dir;
		}

		function getWidth() {
			return vm.levels[vm.levelNo].width;
		}

		function nextLevel() {
			if (vm.levelNo <= vm.maxLevel) {
				vm.levelNo++;
				service.resetLevel();
			}
		}

		function readLevel() {
			return vm.level;
		}

		function resetLevel() {
			vm.level = vm.levels[vm.levelNo].lvl.slice();
			$('#level-no').html('Level ' + vm.levelNo);
		}

		function setInstructions() {
			vm.instructions.length = 0;
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
			switch(dir.name) {
				case 'n':
					index = index - vm.levels[vm.levelNo].mwidth;
					break;
				case 'e':
					index = index + 1;
					break;
				case 's':
					index = index + vm.levels[vm.levelNo].mwidth;
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
