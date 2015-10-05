(function() {
	angular
			.module('dimbot.game')
			.factory('DataService', DataService);

	//dependancy injection

	function DataService() {
		var vm = this;

		var service = {
			getInstructionList: getInstructionList
		};

		//private members
		vm.instructionList = [];

		//default values -- TO BE removed
		vm.instructionList.push("fwd");
		vm.instructionList.push("light");

		function getInstructionList() {
			return vm.instructionList;
		}

		return service;
	};
})();
