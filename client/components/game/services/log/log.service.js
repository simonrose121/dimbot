(function() {
	angular
		.module('dimbot.game')
		.service('logService', logService);

	logService.$Inject = ['logger', '$http'];

	function logService(logger, $http) {
		// private methods
		function postLog(log) {
			$http.post('/log/', log).success(function(data) {
				console.log(data);
				return data;
			}).error(function(data) {
				console.log('Error' + data);
			});
		}

		var service = {
			addedInstruction: addedInstruction,
			buttonPress: buttonPress,
			movedInstruction: movedInstruction,
			removedInstruction: removedInstruction,
			saveScreenshot: saveScreenshot
		};

		return service;

		function addedInstruction(ins, type, index) {
			logger.debug('posting instruction to db', ins);

			var message = 'Added instruction ' + ins.name +
				' to program using ' + type + ' at index: ' + index;

			var log = {
				type: 'instruction',
				message: message
			};

			postLog(log);
		}

		function buttonPress(button) {
			var message = 'Pressed ' + button;

			var log = {
				type: 'button_press',
				message: message
			};

			postLog(log);
		}

		function movedInstruction(ins, oldIndex, newIndex) {
			var message = 'Moved instruction ' + ins.name +
				' from index: ' + oldIndex + ' to index: ' + newIndex;

			var log = {
				type: 'instruction',
				message: message
			};

			postLog(log);
		}

		function removedInstruction(ins, index) {
			var message = 'Removed instruction ' + ins.name +
				' from index: ' + index;

			var log = {
				type: 'instruction',
				message: message
			};

			postLog(log);
		}

		function saveScreenshot(url, type) {
			var message = 'Saved ' + type +
				' with url: ' + url;

			var log = {
				type: 'screenshot',
				message: message
			};

			postLog(log);
		}
	}
})();
