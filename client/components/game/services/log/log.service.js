(function() {
	angular
		.module('dimbot.game')
		.service('logService', logService);

	logService.$Inject = ['$http', 'logger', 'common'];

	/**
	 * Handle posting of logs of different actions to server side to provide
	 * analytics.
	 *
	 * @param $http
	 * @param logger
	 * @param common
	 * @returns service
	 */
	function logService($http, logger, common) {

		var vm = this;

		vm.baseUrl = '/log/';

		var service = {
			addedBlocklyInstruction: addedBlocklyInstruction,
			addedInstruction: addedInstruction,
			buttonPress: buttonPress,
			movedLevel: movedLevel,
			movedBlocklyInstruction: movedBlocklyInstruction,
			movedInstruction: movedInstruction,
			removedBlocklyInstruction: removedBlocklyInstruction,
			removedInstruction: removedInstruction,
			saveCapture: saveCapture
		};

		return service;

		/**
		 * Log that a blocky instruction is added to the program.
		 *
		 * @param ins {object} - Instruction.
		 */
		function addedBlocklyInstruction(ins) {
			logger.debug('posting instruction to db', ins);

			var message = 'Added instruction ' + ins.name +
				' to blocky program';

			var log = {
				user_id: vm.userId,
				type: 'instruction',
				summary: 'instruction add',
				message: message
			};

			postLog(log);
		}

		/**
		 * Log that an instruction has been added to the program.
		 *
		 * @param ins {object} - Instruction.
		 * @param type {string} - Type of movement (click or drag).
		 * @param index {number} - Index of position of instruction in program.
		 */
		function addedInstruction(ins, type, index) {
			logger.debug('posting instruction to db', ins);

			var message = 'Added instruction ' + ins.name +
				' to program using ' + type + ' at index: ' + index;

			var log = {
				user_id: common.userId,
				type: 'instruction',
				summary: 'instruction add ' + type,
				message: message
			};

			postLog(log);
		}

		/**
		 * Log that a button has been pressed.
		 *
		 * @param button {string} - Type of button pressed.
		 */
		function buttonPress(button) {
			var message = 'Pressed ' + button;

			var log = {
				user_id: common.userId,
				type: 'button_press',
				summary: 'button ' + button,
				message: message
			};

			postLog(log);
		}

		/**
		 * Log when next level is loaded.
		 *
		 * @param oldLevelNo {number} - Number of level just completed.
		 * @param newLevelNo {number} - Number of next level.
		 */
		function movedLevel(oldLevelNo, newLevelNo) {
			var message = 'Finished level: ' + oldLevelNo + ' Starting level: ' +
				newLevelNo;

			var log = {
				user_id: common.userId,
				type: 'new_level',
				summary: 'level ' + oldLevelNo + ' complete',
				message: message
			};

			postLog(log);
		}

		/**
		 * Log when blockly block is moved around program.
		 *
		 * @param ins {object} - Blocky instruction.
		 */
		function movedBlocklyInstruction(ins) {
			var message = 'Moved instruction ' + ins.type +
				' around blocky program';

			var log = {
				user_id: vm.userId,
				type: 'instruction',
				summary: 'instruction move',
				message: message
			};

			postLog(log);
		}

		/**
		 * Log when instruction is moved around program.
		 *
		 * @param ins {object} - Instruction moved.
		 * @param oldIndex {number} - Previous index.
		 * @param newIndex {number} - New index.
		 */
		function movedInstruction(ins, oldIndex, newIndex) {
			var message = 'Moved instruction ' + ins.name +
				' from index: ' + oldIndex + ' to index: ' + newIndex;

			var log = {
				user_id: common.userId,
				type: 'instruction',
				summary: 'instruction move',
				message: message
			};

			postLog(log);
		}

		/**
		 * Log when blockly block is removed from program.
		 *
		 * @param ins {object} - Blocky instruction moved.
		 */
		function removedBlocklyInstruction(ins) {
			var message = 'Removed instruction ' + ins.type +
				' from blocky program';

			var log = {
				user_id: vm.userId,
				type: 'instruction',
				summary: 'instruction removed',
				message: message
			};

			postLog(log);
		}

		/**
		 * Log when instruction removed from program.
		 *
		 * @param ins {object} - Instruction.
		 * @param type {string} - Type of movement (click or drag).
		 * @param index {number} - Index of position of instruction in program.
		 */
		function removedInstruction(ins, type, index) {
			var message = 'Removed instruction ' + ins.name +
				' using ' + type + ' from index: ' + index;

			var log = {
				user_id: common.userId,
				type: 'instruction',
				summary: 'instruction removed',
				message: message
			};

			postLog(log);
		}

		/**
		 * Log capture of program, in xml or png format.
		 *
		 * @param data {string} - Either xml or png representation of program.
		 */
		function saveCapture(data, type) {
			var message = '';

			if (type == 'blockly') {
				message = 'Saved ' + type +
					' to xml: ' + data;
			} else if (type == 'lightbot') {
				message = 'Saved ' + type +
					' to png: ' + data;
			}

			var log = {
				user_id: vm.userId,
				type: 'screenshot',
				summary: 'screenshot ' + type,
				message: message
			};

			postLog(log);
		}

		/* private methods */

		/**
		 * Post log to server to be handled by the database controllers.
		 *
		 * @param log {object} - Log object.
		 * @returns data {object} - Data submitted to database.
		 */
		function postLog(log) {
			$http.post(vm.baseUrl, log).success(function(data) {
				return data;
			}).error(function(data) {
				throw data;
			});
		}
	}
})();
