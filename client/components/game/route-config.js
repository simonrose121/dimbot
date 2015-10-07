(function() {
	angular
		.module('dimbot.game')
		.config(config)

	function config($routeProvider) {
      	$routeProvider.when("/", {
          	templateUrl: "client/components/game/gameview",
		  	controller: "Game",
          	controllerAs: "vm"
        });
    };
})();
