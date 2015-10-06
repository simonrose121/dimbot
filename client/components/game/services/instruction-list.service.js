(function() {
	angular
			.module('dimbot.game')
			.factory('InstructionService', InstructionService);

	//dependancy injection

	function InstructionService() {
		// capture "this"
		var vm = this;

		// exposed methods using function hoisting
		var service = {
			getInstructionList: getInstructionList,
			addInstruction: addInstruction,
			removeInstruction: removeInstruction
		};

		// private members
		vm.instructionList = [];

		// public methods


		function getInstructionList() {
			return vm.instructionList;
		};

		function addInstruction(ins) {
			vm.instructionList.push(ins);
		};

		function removeInstruction(ins) {
			var index = vm.instructionList.indexOf(ins);
			if (index > -1) {
				vm.instructionList.splice(index);
			}
		};

		return service;
	};
})();
