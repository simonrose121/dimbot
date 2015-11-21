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

		

		// private
		function postLog(log) {
			$http.post('/log/', log).success(function(data) {
				return data;
			}).error(function(data) {
				console.log('Error' + data);
			});
		}
	}
})();
