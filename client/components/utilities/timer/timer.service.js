(function() {
	angular
		.module('utils.timer')
		.factory('timer', timer);

	/**
	 * Provide timer utility methods.
	 *
	 */
	function timer() {

		var service = {
			sleep: sleep
		};

		return service;

		/**
		 * Sleep program for a length of time.
		 *
		 * @param milliseconds {number} - Time length.
		 */
		function sleep(milliseconds) {
		  	var start = new Date().getTime();
		  	for (var i = 0; i < 1e7; i++) {
		    	if ((new Date().getTime() - start) > milliseconds){
		      		break;
		    	}
		  	}
		}
	}
})();
