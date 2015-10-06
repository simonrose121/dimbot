(function() {
    var game = angular.module('dimbot.game', [
		'ngResource',
		'ngRoute'
	]);

	game.config(function($routeProvider){
      $routeProvider.when("/", {
          templateUrl: "client/components/game/gameview",
          controllerAs: "vm"
        }
      );
    });
})();