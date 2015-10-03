(function() {
	app.controller('dimbot.game', ['$http', function($http) {
		this.instructionList = [];

		this.instructionList.push("fwd");
		this.instructionList.push("light");
	}]);
})();
