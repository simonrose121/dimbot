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
		vm.levelStartTime = null;
		vm.attemptNumber = 0;

		vm.blankId = 0;
		vm.robotId = 1;
		vm.lightId = 2;
		vm.edgeId = 3;

		var service = {
			checkMove: checkMove,
			getHeight: getHeight,
			getInstructions: getInstructions,
			getMHeight: getMHeight,
			getMWidth: getMWidth,
			getStartingDirection: getStartingDirection,
			getWidth: getWidth,
			incrementAttemptNumber: incrementAttemptNumber,
			nextLevel: nextLevel,
			readLevel: readLevel,
			resetLevel: resetLevel,
			setInstructions: setInstructions,
			setStartDateTime: setStartDateTime,
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

			if (vm.level[index] == vm.edgeId) {
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
		 * Get map height of current level.
		 *
		 * @returns {number} - Level map height.
		 */
		function getMHeight() {
			return levels[vm.levelNo].mheight;
		}

		/**
		 * Get map width of current level.
		 *
		 * @returns {number} - Level map height.
		 */
		function getMWidth() {
			return levels[vm.levelNo].mwidth;
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
		 * Incremement the attempt number.
		 *
		 */
		function incrementAttemptNumber() {
			vm.attemptNumber++;
		}

		/**
		 * Increment level and load in next level array.
		 *
		 */
		function nextLevel() {
			if (vm.levelNo <= vm.maxLevel) {
				var oldLevelNo = vm.levelNo;
				vm.levelNo++;
				var levelLength = calculateDateTimeDifference(vm.levelStartTime, new Date());

				// log the result of the level
				logService.movedLevel(oldLevelNo, vm.levelNo, levelLength, vm.attemptNumber);

				// reset the level
				service.resetLevel();
				service.setStartDateTime();
				vm.attemptNumber = 0;
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
			vm.level = levels[vm.levelNo].map.slice();
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
		 * Set the start date time of the level.
		 *
		 */
		function setStartDateTime() {
			vm.levelStartTime = new Date();
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

		function calculateDateTimeDifference(startDateTime, endDateTime) {
			console.log(startDateTime);
			console.log(endDateTime);
			return moment.utc(moment(endDateTime,"DD/MM/YYYY HH:mm:ss").diff(moment(startDateTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
		}

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
