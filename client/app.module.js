var app = angular.module('dimbot', [
    'ngResource',
    'ngRoute'
]);

app.config(function($routeProvider){
  $routeProvider.when("/", {
      templateUrl: "client/components/game/game-view",
      controller: "dimbot.game",
      controllerAs: "dimbot"
    }
  );
});
