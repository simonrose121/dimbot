(function() {
	angular
		.module('dimbot.game')
		.service('programService', programService);

	programService.$inject = ['logger', 'dbService'];

	/**
	 * Handle program logic and data storage.
	 *
	 * @param logger
	 * @param dbService
	 * @returns service
	 */
	function programService(logger, dbService) {
		var vm = this;

		/* private variables */
		vm.program = [];

		var service = {
			addInstruction: addInstruction,
			empty: empty,
			getProgram: getProgram,
			removeInstruction: removeInstruction,
		};

		return service;

		/**
		 * Add instruction to the program
		 *
		 * @param ins {object} - Instruction to be added
		 */
		function addInstruction(ins) {
			if (ins) {
				vm.program.push(ins);
			}
		}

		/**
		 * Empty the program
		 *
		 */
		function empty() {
			vm.program.length = 0;
		}

		/**
		 * Get the program
		 *
		 * @returns {array} - Program array
		 */
		function getProgram() {
			return vm.program;
		}

		/**
		 * Remove instruction at index
		 *
		 * @param index {number} - Index of instruction to remove
		 */
		function removeInstruction(index) {
			if (index > -1) {
				vm.program.splice(index, 1);
			}
		}
	}
})();
