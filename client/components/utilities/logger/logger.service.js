(function() {
	angular
		.module('utils.logger')
		.factory('logger', logger);

	logger.$inject = ['$log'];

	function logger($log) {
		var service = {
			error: error,
			info: info,
			success: success,
			warning: warning
		};

		return service;

		function error(message, data) {
			$log.error('Error: ' + message, data);
		}

		function info(message, data) {
			$log.info('Info: ' + message, data);
		}

		function success(message, data) {
			$log.success('Success: ' + message, data);
		}

		function warning(message, data) {
			$log.warning('Warning: ' + message, data);
		}
	}
})();
