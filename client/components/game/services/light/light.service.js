(function() {
	angular
		.module('dimbot.game')
		.service('lightService', lightService);

	lightService.$Inject = ['logger'];

	function lightService() {
		var service = {

		};

		return service;
	}
})();
