(function() {
	angular
		.module('utils.logger')
		.factory('logger', logger);

	logger.$inject = ['$log'];

	/**
	 * Wrap log methods to provide more information.
	 *
	 * @param $log
	 * @returns service
	 */
	function logger($log) {

		var service = {
			debug: debug,
			error: error,
			log: log,
			info: info,
			warn: warn
		};

		return service;

		/**
		 * Debug output wrapper.
		 *
		 * @param message {string} - Message to be logged.
		 * @param data {object} - Data to be logged.
		 */
		function debug(message, data) {
			$log.debug('Debug: ' + message, data);
		}

		/**
		 * Debug error wrapper.
		 *
		 * @param message {string} - Message to be logged.
		 * @param data {object} - Data to be logged.
		 */
		function error(message, data) {
			$log.error('Error: ' + message, data);
		}

		/**
		 * Debug log wrapper.
		 *
		 * @param message {string} - Message to be logged.
		 * @param data {object} - Data to be logged.
		 */
		function log(message, data) {
			$log.log('Success: ' + message, data);
		}

		/**
		 * Debug info wrapper.
		 *
		 * @param message {string} - Message to be logged.
		 * @param data {object} - Data to be logged.
		 */
		function info(message, data) {
			$log.info('Info: ' + message, data);
		}

		/**
		 * Debug warn wrapper.
		 *
		 * @param message {string} - Message to be logged.
		 * @param data {object} - Data to be logged.
		 */
		function warn(message, data) {
			$log.warn('Warning: ' + message, data);
		}
	}
})();
