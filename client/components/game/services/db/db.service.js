(function() {
	angular
		.module('dimbot.game')
		.service('dbService', dbService);

	dbService.$Inject = ['$http', 'logger', 'common'];

	/**
	 * Handle posting of logs of different action to provide analytics
	 *
	 * @param $http
	 * @param logger
	 * @param common
	 * @returns service
	 */
	function dbService($http, logger, common) {

		var vm = this;

		// urls
		vm.postUrl = '/log/';
		vm.idCheckUrl = '/idcheck/';

		var service = {
			addedBlocklyInstruction: addedBlocklyInstruction,
			addedInstruction: addedInstruction,
			buttonPress: buttonPress,
			checkId: checkId,
			finishedLevel: finishedLevel,
			movedBlocklyInstruction: movedBlocklyInstruction,
			movedInstruction: movedInstruction,
			removedBlocklyInstruction: removedBlocklyInstruction,
			removedInstruction: removedInstruction,
			saveProgram: saveProgram
		};

		return service;

		/**
		 * Log that a blocky instruction is added to the program
		 *
		 * @param ins {object} - Instruction
		 */
		function addedBlocklyInstruction(ins) {
			var message = 'Added instruction ' + ins +
				' to blocky program';

			var log = {
				user_id: common.userId,
				category: 'instruction',
				instruction: ins,
				type: 'add',
				environment: common.type,
				level: common.level,
				message: message
			};

			postLog(log, 'instruction/');
		}

		/**
		 * Log that a lightbot instruction has been added to the program
		 *
		 * @param ins {object} - Instruction
		 * @param type {string} - Type of movement (click or drag)
		 * @param index {number} - Index of position of instruction in program
		 */
		function addedInstruction(ins, type, index) {
			var message = 'Added instruction ' + ins.name +
				' to program using ' + type + ' at index: ' + index;

			var log = {
				user_id: common.userId,
				category: 'instruction',
				instruction: ins.name,
				type: 'add',
				environment: common.type,
				level: common.level,
				message: message
			};

			postLog(log, 'instruction/');
		}

		/**
		 * Log that a button has been pressed
		 *
		 * @param button {string} - Type of button pressed
		 */
		function buttonPress(button) {
			var message = 'Pressed ' + button;

			var log = {
				user_id: common.userId,
				category: 'button',
				level: common.level,
				environment: common.type,
				button: button,
				message: message
			};

			postLog(log, 'button/');
		}

		/**
		 * Check if userId is already being used in the database
		 *
		 * @param userId {number} - User id
		 * @param callback {object} - Execute when instruction is returned
		 */
		function checkId(userId, callback) {
			var req = {
				'user_id': userId
			};

			getLog(req, callback);
		}

		/**
		 * Log when next level is loaded
		 *
		 * @param levelLength {string} - Time that level took
		 * @param attemptNumber {number} - Number of attempts taken
		 */
		function finishedLevel(levelLength, attemptNumber) {
			var message = 'Finished level ' + common.level + ' in ' + attemptNumber +
				' attempt(s) in ' + levelLength;

			var log = {
				user_id: common.userId,
				category: 'level',
				level: common.level,
				attempts: attemptNumber,
				time: levelLength,
				environment: common.type,
				message: message
			};

			postLog(log, 'level/');
		}

		/**
		 * Log that a blockly block has moved around program
		 *
		 * @param ins {object} - Blocky instruction
		 */
		function movedBlocklyInstruction(ins) {
			var message = 'Moved instruction ' + ins +
				' around blocky program';

			var log = {
				user_id: common.userId,
				category: 'instruction',
				type: 'move',
				instruction: ins,
				environment: common.type,
				level: common.level,
				message: message
			};

			postLog(log, 'instruction/');
		}

		/**
		 * Log that a lightbot instruction has moved around program
		 *
		 * @param ins {object} - Instruction moved
		 * @param oldIndex {number} - Previous index
		 * @param newIndex {number} - New index
		 */
		function movedInstruction(ins, oldIndex, newIndex) {
			var message = 'Moved instruction ' + ins.name +
				' from index: ' + oldIndex + ' to index: ' + newIndex;

			var log = {
				user_id: common.userId,
				category: 'instruction',
				type: 'move',
				instruction: ins.name,
				environment: common.type,
				level: common.level,
				message: message
			};

			postLog(log, 'instruction/');
		}

		/**
		 * Log that a blockly block has been removed from program
		 *
		 * @param ins {object} - Blocky instruction moved
		 */
		function removedBlocklyInstruction(ins) {
			var message = 'Removed instruction ' + ins +
				' from blocky program';

			var log = {
				user_id: common.userId,
				category: 'instruction',
				instruction: ins,
				type: 'remove',
				environment: 'blockly',
				level: common.level,
				message: message
			};

			postLog(log, 'instruction/');
		}

		/**
		 * Log that a lightbot instruction has been removed from program
		 *
		 * @param ins {object} - Instruction
		 * @param type {string} - Type of movement (click or drag)
		 * @param index {number} - Index of position of instruction in program
		 */
		function removedInstruction(ins, type, index) {
			var message = 'Removed instruction ' + ins.name +
				' using ' + type + ' from index: ' + index;

			var log = {
				user_id: common.userId,
				category: 'instruction',
				type: 'remove',
				instruction: ins.name,
				environment: common.type,
				level: common.level,
				message: message
			};

			postLog(log, 'instruction/');
		}

		/**
		 * Log capture of program, in xml or array format
		 *
		 * @param data {string} - Either xml or array representation of program
		 */
		function saveProgram(data) {
			var log = {
				user_id: vm.userId,
				category: 'program',
				environment: common.type,
				level: common.level,
				data: data,
			};

			postLog(log, 'program/');
		}

		/* private methods */
		/**
		 * Get data from database controllers
		 *
		 * @param req {object} - Request object
		 * @param callback {object} - To be executed when data is returned
		 * @returns
		 */
		function getLog(req, callback) {
			$http.post(vm.idCheckUrl, req).success(function(data) {
				callback(data);
			}).error(function(data) {
				throw data;
			});
		}

		/**
		 * Post log to server to be handled by the database controllers
		 *
		 * @param log {object} - Log object
		 * @returns data {object} - Data submitted to database
		 */
		function postLog(log, url) {
			$http.post(vm.postUrl + url, log).success(function(data) {
				return data;
			}).error(function(data) {
				throw data;
			});
		}
	}
})();
