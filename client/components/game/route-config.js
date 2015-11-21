(function() {
	angular
		.module('dimbot.game')
		.config(config);

	config.$Inject = ['$routeProvider', 'ENV'];

	function config($routeProvider, ENV) {
		switch(ENV.type) {
			case 'lightbot':
				$routeProvider.when("/", {
					templateUrl: "client/components/game/gameview",
					controller: "Game",
					controllerAs: "vm"
				});
				break;
			case 'blockly':
				$routeProvider.when("/", {
					templateUrl: "client/components/game/gameviewblockly",
					controller: "Game",
					controllerAs: "vm"
				});
				break;
		}
    }
})();
