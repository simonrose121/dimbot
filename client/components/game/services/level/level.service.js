(function() {
	angular
		.module('dimbot.game')
		.service('levelService', levelService);

	levelService.$Inject = ['logger', 'logService', 'instructionFactory',
		'levels'];

	/**
	 * Holds information about levels, and the underlying level array of the
	 * game.
	 *
	 * @param logger
	 * @param logService
	 * @param imageService
	 * @param instructionFactory
	 * @param levels
	 * @returns service
	 */
	function levelService(logger, logService, imageService, instructionFactory,
		levels) {

		var vm = this;

		/* private variables */
		vm.level = [];
		vm.instructions = [];
		vm.maxLevel = 8;
		vm.levelNo = 1;

		vm.blankId = 0;
		vm.robotId = 1;
		vm.lightId = 2;
		vm.edgeId = 3;
		vm.obstacleId = 4;

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

		/**
		 * Check that a movement is allowed based on level array.
		 *
		 * @param dir {object} - A direction object.
		 * @returns {boolean} - If the robot is allowed to move.
		 */
		function checkMove(dir) {
			// get index
			var index = getIndexFromObjId(vm.robotId);

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

			if (vm.level[index] == vm.edgeId) {
				return false;
			}

			if (vm.level[index] == vm.obstacleId) {
				return false;
			}

			// return bool
			return true;
		}

		/**
		 * Get height of current level.
		 *
		 * @returns {number} - Level height.
		 */
		function getHeight() {
			return levels[vm.levelNo].height;
		}

		/**
		 * Get instructions array.
		 *
		 * @returns {array} - Instructions for current level.
		 */
		function getInstructions() {
			return vm.instructions;
		}

		/**
		 * Get starting direction of current level.
		 *
		 * @returns {string} - Name of starting direction in current level.
		 */
		function getStartingDirection() {
			return levels[vm.levelNo].dir;
		}

		/**
		 * Get width of current level.
		 *
		 * @returns {number} - Level width.
		 */
		function getWidth() {
			return levels[vm.levelNo].width;
		}

		/**
		 * Increment level and load in next level array.
		 *
		 */
		function nextLevel() {
			if (vm.levelNo <= vm.maxLevel) {
				var oldLevelNo = vm.levelNo;
				vm.levelNo++;
				logService.movedLevel(oldLevelNo, vm.levelNo);
				service.resetLevel();
			}
		}

		/**
		 * Read current level array.
		 *
		 * @returns {array} - Current level array.
		 */
		function readLevel() {
			return vm.level;
		}

		/**
		 * Description of what this does.
		 *
		 */
		function resetLevel() {
			vm.level = levels[vm.levelNo].lvl.slice();
			imageService.setLevelNumber(vm.levelNo);
		}

		/**
		 * Set instructions array to instructions of current level.
		 *
		 */
		function setInstructions() {
			vm.instructions.length = 0;
			for (var i = 0; i < levels[vm.levelNo].ins.length; i++) {
				var name = levels[vm.levelNo].ins[i];
				var ins = instructionFactory.getInstruction(name);
				vm.instructions.push(ins);
			}
		}

		/**
		 * Update level array dependant on direction moved.
		 * Movement has already been checked at this point.
		 * TODO: put check in here?
		 *
		 * @param dir {object} - Direction to move.
		 */
		function updateLevel(dir) {
			// get current index
			var index = getIndexFromObjId(vm.robotId);

			// reset current
			vm.level[index] = vm.blankId;

			// change value
			switch(dir.name) {
				case 'n':
					index = index - levels[vm.levelNo].mwidth;
					break;
				case 'e':
					index = index + 1;
					break;
				case 's':
					index = index + levels[vm.levelNo].mwidth;
					break;
				case 'w':
					index = index - 1;
					break;
			}

			// update next index
			vm.level[index] = vm.robotId;
		}

		/* private methods */

		/**
		 * Get the array index of an object Id
		 *
		 * @param id {number} - Id corresponding to object.
		 * @returns index {number} - Index in array of object.
		 */
		function getIndexFromObjId(id) {
			return vm.level.indexOf(id);
		}
	}
})();
