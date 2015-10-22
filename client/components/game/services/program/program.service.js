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
		vm.limit = null;
		// exposed methods using function hoisting
		var service = {
			addInstruction: addInstruction,
			empty: empty,
			getLimit: getLimit,
			getProgram: getProgram,
			removeInstruction: removeInstruction,
			setLimit: setLimit
		};

		return service;

		// public methods
		function addInstruction(ins) {
			if (vm.program.length < vm.limit) {
				logger.info('adding instruction in programService', ins);
				if (ins) {
					logger.info('pushing instruction to program', ins);
					vm.program.push(ins);
				}
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

		function setLimit(limit) {
			vm.limit = limit;
		}
	}
})();
