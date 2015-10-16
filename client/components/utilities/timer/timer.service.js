(function() {
	angular
		.module('utils.timer')
		.factory('timer', timer)

	function timer() {
		var service = {
			sleep: sleep
		}

		return service;

		function sleep(milliseconds, callback) {
		  	var start = new Date().getTime();
		  	for (var i = 0; i < 1e7; i++) {
		    	if ((new Date().getTime() - start) > milliseconds){
					callback();
		      		break;
		    	}
		  	}
		}
	}

})();
