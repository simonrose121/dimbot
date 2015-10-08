(function() {
	angular
			.module('dimbot.game')
			.service('programService', programService);

	programService.$inject = ['logger'];

	function programService(logger) {
		// capture "this"
		var vm = this;

		// private members
		vm.program = [];
		// exposed methods using function hoisting
		var service = {
			getProgram: getProgram,
			addInstruction: addInstruction,
			removeInstruction: removeInstruction
		};

		return service;

		// public methods
		function getProgram() {
			return vm.program;
		};

		function addInstruction(ins) {
			logger.info('pushing instruction to program', ins);
			vm.program.push(ins);
		};

		function removeInstruction(index) {
			if (index > -1) {
				vm.program.splice(index, 1);
			}
		};
	};
})();
