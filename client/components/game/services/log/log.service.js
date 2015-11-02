(function() {
	angular
		.module('dimbot.game')
		.service('logService', logService);

	logService.$Inject = ['logger', '$http'];

	function logService(logger, $http) {
		var service = {
			instructionMovement: instructionMovement
		};

		return service;

		function instructionMovement(ins) {
			logger.debug('posting instruction to db', ins);

			var message = 'Moved instruction ' + ins.name + ' to program';

			var log = {
				type: 'instruction',
				message: message
			};

			$http.post('/log/', log).success(function(data) {
				// do nothing
			}).error(function(data) {
				console.log('Error: ' + data);
			});
		}
	}
})();
