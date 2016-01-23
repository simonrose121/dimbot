(function() {
	angular
		.module('dimbot.game')
		.service('levelService', levelService);

	levelService.$Inject = ['logger', 'dbService', 'instructionFactory',
		'levels', 'common'];

	/**
	 * Holds information about levels, and the underlying level array of the
	 * game.
	 *
	 * @param logger
	 * @param dbService
	 * @param imageService
	 * @param instructionFactory
	 * @param levels
	 * @param common
	 * @returns service
	 */
	function levelService(logger, dbService, imageService, instructionFactory,
			levels, common) {
		var vm = this;

		/* private variables */
		vm.level = [];
		vm.instructions = [];
		vm.maxLevel = 16;
		vm.levelStartTime = null;
		vm.attemptNumber = 0;
		vm.pausedTime = null;

		// Object ID numbers
		vm.blankId = 0;
		vm.robotId = 1;
		vm.lightId = 2;
		vm.edgeId = 3;

		var service = {
			canGoNextLevel: canGoNextLevel,
			checkMove: checkMove,
			getHeight: getHeight,
			getInstructions: getInstructions,
			getMHeight: getMHeight,
			getMWidth: getMWidth,
			getStartingDirection: getStartingDirection,
			getWidth: getWidth,
			endPausedTime: endPausedTime,
			incrementAttemptNumber: incrementAttemptNumber,
			nextLevel: nextLevel,
			readLevel: readLevel,
			resetLevel: resetLevel,
			setInstructions: setInstructions,
			setStartDateTime: setStartDateTime,
			startPausedTime: startPausedTime,
			updateLevel: updateLevel
		};

		return service;

		/**
		 * Return indication of whether game next level is possible
		 *
		 * @returns {boolean} - Can next level be loaded
		 */
		function canGoNextLevel() {
			return common.level < vm.maxLevel;
		}

		/**
		 * Check that a movement is allowed based on level array
		 *
		 * @param dir {object} - A direction object
		 * @returns {boolean} - If the robot is allowed to move
		 */
		function checkMove(dir) {
			// get index
			var index = getIndexFromObjId(vm.robotId);

			// get projected movement
			switch(dir.name) {
				case 'n':
					index = index - levels[common.level].mwidth;
					break;
				case 'e':
					index = index + 1;
					break;
				case 's':
					index = index + levels[common.level].mwidth;
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
		 * Set amount of time the game was paused for
		 *
		 */
		function endPausedTime() {
			vm.pausedTime = new Date() - vm.pausedTime;
		}

		/**
		 * Get height of current level
		 *
		 * @returns {number} - Level height
		 */
		function getHeight() {
			return levels[common.level].height;
		}

		/**
		 * Get instructions array
		 *
		 * @returns {array} - Instructions for current level
		 */
		function getInstructions() {
			return vm.instructions;
		}

		/**
		 * Get map height of current level
		 *
		 * @returns {number} - Level map height
		 */
		function getMHeight() {
			return levels[common.level].mheight;
		}

		/**
		 * Get map width of current level
		 *
		 * @returns {number} - Level map height
		 */
		function getMWidth() {
			return levels[common.level].mwidth;
		}

		/**
		 * Get starting direction of current level
		 *
		 * @returns {string} - Name of starting direction in current level
		 */
		function getStartingDirection() {
			return levels[common.level].dir;
		}

		/**
		 * Get width of current level
		 *
		 * @returns {number} - Level width
		 */
		function getWidth() {
			return levels[common.level].width;
		}

		/**
		 * Increment the attempt number
		 *
		 */
		function incrementAttemptNumber() {
			vm.attemptNumber++;
		}

		/**
		 * Increment level and load in next level array
		 *
		 */
		function nextLevel() {
			// add paused times
			var newStartTime = addFormattedDateTime(vm.pausedTime, vm.levelStartTime);
			levelLength = calculateDateTimeDifference(newStartTime, new Date());

			// log the result of the level
			dbService.finishedLevel(levelLength, vm.attemptNumber);

			// increase level number
			common.level++;

			// reset the new level
			service.resetLevel();
			service.setStartDateTime();
			vm.attemptNumber = 0;
			vm.pausedTime = null;
		}

		/**
		 * Read current level array
		 *
		 * @returns {array} - Current level array
		 */
		function readLevel() {
			return vm.level;
		}

		/**
		 * Description of what this does
		 *
		 */
		function resetLevel() {
			vm.level = levels[common.level].map.slice();
			imageService.setLevelNumber(common.level);
		}

		/**
		 * Set instructions array to instructions of current level
		 *
		 */
		function setInstructions() {
			vm.instructions.length = 0;
			for (var i = 0; i < levels[common.level].ins.length; i++) {
				var name = levels[common.level].ins[i];
				var ins = instructionFactory.getInstruction(name);
				vm.instructions.push(ins);
			}
		}

		/**
		 * Set the start date time of the level
		 *
		 */
		function setStartDateTime() {
			vm.levelStartTime = new Date();
		}

		/**
		 * Start paused timer
		 *
		 */
		function startPausedTime() {
			vm.pausedTime = new Date();
		}

		/**
		 * Update level array dependent on direction moved
		 * Movement has already been checked at this point
		 *
		 * @param dir {object} - Direction to move
		 */
		function updateLevel(dir) {
			// get current index
			var index = getIndexFromObjId(vm.robotId);

			// reset current
			vm.level[index] = vm.blankId;

			// change value
			switch(dir.name) {
				case 'n':
					index = index - levels[common.level].mwidth;
					break;
				case 'e':
					index = index + 1;
					break;
				case 's':
					index = index + levels[common.level].mwidth;
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
		 * Calculate difference between two datetimes
		 *
		 * @param startDate {object} - Starting time
		 * @param endDate {object} - Ending time
		 * @returns {string} - Formatted time difference
		 */
		function calculateDateTimeDifference(startDateTime, endDateTime) {
			var startDate = moment(startDateTime,"DD/MM/YYYY HH:mm:ss");
			var endDate = moment(endDateTime,"DD/MM/YYYY HH:mm:ss").add(1, 'hours');
			return moment.utc(moment(endDate).diff(startDate)).format("HH:mm:ss");
		}

		/**
		 * Add two datetimes
		 *
		 * @param pausedTime {object} - Time the game was paused
		 * @param endDateTime {object} - When the game was started
		 * @returns
		 */
		function addFormattedDateTime(pausedTime, levelStartTime) {
			var levelStartTimeMoment = moment(levelStartTime);
			var totalTime = levelStartTimeMoment.add(pausedTime, 'milliseconds');
			var totalTimeMoment = moment(totalTime);
			return totalTimeMoment;
		}

		/**
		 * Get the array index of an object Id
		 *
		 * @param id {number} - Id corresponding to object
		 * @returns index {number} - Index in array of object
		 */
		function getIndexFromObjId(id) {
			return vm.level.indexOf(id);
		}
	}
})();
