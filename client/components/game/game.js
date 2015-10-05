(function() {
	angular
	        .module('dimbot.game')
	        .controller('Game', Game);

	Game.$inject = ['$http', 'DataService'];

	function Game($http, dataService) {
		var vm = this;

		vm.ins = dataService.getInstructionList();
	};
})();
