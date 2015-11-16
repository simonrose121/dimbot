(function() {
	angular
		.module('dimbot.game')
		.service('logBlocklyService', logBlocklyService);

	logBlocklyService.$Inject = ['logger', '$http', 'common'];

	function logBlocklyService(logger, $http, common) {
		var vm = this;

		vm.userId = common.userId;

		var service = {
			addedInstruction: addedInstruction,
			movedInstruction: movedInstruction,
			removedInstruction: removedInstruction,
		};

		return service;

		// blockly
		function addedInstruction(ins) {
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

		function movedInstruction(ins) {
			var message = 'Moved instruction ' + ins.name +
				' around blocky program';

			var log = {
				user_id: vm.userId,
				type: 'instruction',
				summary: 'instruction move',
				message: message
			};

			postLog(log);
		}

		function removedInstruction(ins) {
			var message = 'Removed instruction ' + ins.name +
				' from blocky program';

			var log = {
				user_id: vm.userId,
				type: 'instruction',
				summary: 'instruction removed',
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
