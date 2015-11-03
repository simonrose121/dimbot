(function() {
	angular
		.module('dimbot.game')
		.service('levelService', levelService);

	levelService.$Inject = ['$http', 'logger', 'programService',
		'instructionFactory'];

	function levelService($http, logger, programService, instructionFactory) {
		var vm = this;

		vm.level = [];
		vm.instructions = [];
		vm.maxLevel = 6;
		vm.levelNo = 1;
		vm.levels = {};

		// load levels on app init

		var service = {
			checkMove: checkMove,
			loadLevels: loadLevels,
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

		function loadLevels(callback) {
			console.log('hit outside');
			$http.get('lvls/levels.json').success(function(data) {
				console.log(data);
			   	vm.levels = data;
				callback();
			});
		}

		function getHeight() {
			return vm.levels[vm.levelNo].height;
		}

		function getInstructions() {
			return vm.instructions;
		}

		function getStartingDirection() {
			logger.log('starting dir', vm.levels[vm.levelNo].dir);
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
			programService.setLimit(vm.levels[vm.levelNo].limit);
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
