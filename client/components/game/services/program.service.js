(function() {
	angular
			.module('dimbot.game')
			.factory('ProgramService', ProgramService);

	//dependancy injection

	function ProgramService() {
		// capture "this"
		var vm = this;

		// exposed methods using function hosting
		var service = {
			getProgram: getProgram,
			addInstruction: addInstruction,
			removeInstruction: removeInstruction
		};

		// private members
		vm.program = [];

		// public methods
		function getProgram() {
			return vm.program;
		};

		function addInstruction(ins) {
			vm.program.push(ins);
		};

		function removeInstruction(ins) {
			var index = vm.program.indexOf(ins);
			if (index > -1) {
				vm.program.splice(index);
			}
		};

		return service;
	};
})();
