(function() {
	angular
			.module('dimbot.game')
			.factory('InstructionService', InstructionService);

	//dependancy injection

	function InstructionService() {
		var vm = this;

		// exposed methods
		var service = {
			getInstructionList: getInstructionList,
			addInstruction: addInstruction,
			removeInstruction: removeInstruction,
			Instruction: Instruction
		};

		// private members
		vm.instructionList = [];

		// public methods
		function Instruction(id, img) {
			this.id = id;
			this.img = img;
		}

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
