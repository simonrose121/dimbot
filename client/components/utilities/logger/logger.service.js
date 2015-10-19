(function() {
	angular
		.module('utils.logger')
		.factory('logger', logger);

	logger.$inject = ['$log'];

	function logger($log) {
		var service = {
			debug: debug,
			error: error,
			log: log,
			info: info,
			warn: warn
		};

		return service;

		function debug(message, data) {
			$log.debug('Debug: ' + message, data);
		}

		function error(message, data) {
			$log.error('Error: ' + message, data);
		}

		function log(message, data) {
			$log.log('Success: ' + message, data);
		}

		function info(message, data) {
			$log.info('Info: ' + message, data);
		}

		function warn(message, data) {
			$log.warn('Warning: ' + message, data);
		}
	}
})();
