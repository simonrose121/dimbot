(function() {
	angular
	        .module('dimbot.game')
	        .controller('Game', Game);

	Game.$inject = ['$http'];

	function Game($http) {
		var vm = this;

		vm.instructionList = [];

		vm.instructionList.push("fwd");
		vm.instructionList.push("light");

		vm.title = "Test";
	};
})();
