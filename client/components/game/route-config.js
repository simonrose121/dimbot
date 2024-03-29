(function() {
	angular
		.module('dimbot.game')
		.config(config);

	config.$Inject = ['$routeProvider', 'common'];

	function config($routeProvider, common) {
		$routeProvider.when("/", {
			templateUrl: "client/components/game/views/game",
			controller: "Game",
			controllerAs: "vm"
		});
    }
})();
