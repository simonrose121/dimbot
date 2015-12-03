(function() {
	angular
		.module('dimbot.game')
		.config(config);

	config.$Inject = ['$routeProvider', 'common'];

	function config($routeProvider, common) {
		switch(common.type) {
			case 'lightbot':
				$routeProvider.when("/", {
					templateUrl: "client/components/game/views/gameview",
					controller: "Game",
					controllerAs: "vm"
				});
				break;
			case 'blockly':
				$routeProvider.when("/", {
					templateUrl: "client/components/game/views/gameviewblockly",
					controller: "Game",
					controllerAs: "vm"
				});
				break;
		}
    }
})();
