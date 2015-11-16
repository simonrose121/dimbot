(function() {
	angular
		.module('dimbot.game')
		.service('logService', logService);

	logService.$Inject = ['logger', '$http', 'common'];

	function logService(logger, $http, common) {
		var vm = this;

		vm.userId = common.userId;

		var service = {
			addedInstruction: addedInstruction,
			buttonPress: buttonPress,
			movedLevel: movedLevel,
			movedInstruction: movedInstruction,
			removedInstruction: removedInstruction,
			saveCapture: saveCapture
		};

		return service;

		function addedInstruction(ins, type, index) {
			logger.debug('posting instruction to db', ins);

			var message = 'Added instruction ' + ins.name +
				' to program using ' + type + ' at index: ' + index;

			var log = {
				user_id: vm.userId,
				type: 'instruction',
				summary: 'instruction add ' + type,
				message: message
			};

			postLog(log);
		}

		function buttonPress(button) {
			var message = 'Pressed ' + button;

			var log = {
				user_id: vm.userId,
				type: 'button_press',
				summary: 'button ' + button,
				message: message
			};

			postLog(log);
		}

		function movedLevel(level) {
			var newLevel = level + 1;

			var message = 'Finished level: ' + level + ' Starting level: ' +
				newLevel;

			var log = {
				user_id: vm.userId,
				type: 'new_level',
				summary: 'level ' + level + ' complete',
				message: message
			};

			postLog(log);
		}

		function movedInstruction(ins, oldIndex, newIndex) {
			var message = 'Moved instruction ' + ins.name +
				' from index: ' + oldIndex + ' to index: ' + newIndex;

			var log = {
				user_id: vm.userId,
				type: 'instruction',
				summary: 'instruction move',
				message: message
			};

			postLog(log);
		}

		function removedInstruction(ins, type, index) {
			var message = 'Removed instruction ' + ins.name +
				' using ' + type + ' from index: ' + index;

			var log = {
				user_id: vm.userId,
				type: 'instruction',
				summary: 'instruction removed',
				message: message
			};

			postLog(log);
		}

		function saveCapture(url, type) {
			var message = '';

			if (type == 'blockly') {
				message = 'Saved ' + type +
					' to xml: ' + url;
			} else if (type == 'lightbot') {
				message = 'Saved ' + type +
					' to png: ' + url;
			}

			var log = {
				user_id: vm.userId,
				type: 'screenshot',
				summary: 'screenshot ' + type,
				message: message
			};

			postLog(log);
		}

		// private
		function postLog(log) {
			$http.post('/log/', log).success(function(data) {
				console.log(data);
				return data;
			}).error(function(data) {
				console.log('Error' + data);
			});
		}
	}
})();
