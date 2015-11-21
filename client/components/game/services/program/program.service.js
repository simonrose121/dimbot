(function() {
	angular
			.module('dimbot.game')
			.service('programService', programService);

	programService.$inject = ['logger', 'logService'];

	function programService(logger, logService) {
		// capture "this"
		var vm = this;

		// private members
		vm.program = [];
		// exposed methods using function hoisting
		var service = {
			addInstruction: addInstruction,
			empty: empty,
			getLimit: getLimit,
			getProgram: getProgram,
			removeInstruction: removeInstruction,
		};

		return service;

		// public methods
		function addInstruction(ins) {
			logger.info('adding instruction in programService', ins);
			if (ins) {
				logger.info('pushing instruction to program', ins);
				vm.program.push(ins);
			}
		}

		function empty() {
			vm.program.length = 0;
		}

		function getLimit() {
			return vm.limit;
		}

		function getProgram() {
			return vm.program;
		}

		function removeInstruction(index) {
			if (index > -1) {
				vm.program.splice(index, 1);
			}
		}

		function setProgram(program) {
			vm.program = program;
		}
	}
})();
