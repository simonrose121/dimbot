(function() {
	angular
	        .module('dimbot.game')
	        .controller('Game', Game);

	Game.$inject = ['$http'];

	function Game($http) {
		this.instructionList = [];

		this.instructionList.push("fwd");
		this.instructionList.push("light");

		this.title = "Test";
	};
})();
