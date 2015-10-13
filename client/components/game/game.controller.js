(function() {
	angular
	        .module('dimbot.game')
	        .controller('Game', Game);

	Game.$inject = ['$http', 'logger', 'programService', 'levelService',
					'instructionFactory'];

	function Game($http, logger, programService, levelService,
			instructionFactory) {
		var vm = this;

		levelService.setStartingInstructions();

		vm.addToProgram = addToProgram;
		vm.instructions = levelService.getInstructions();
		vm.refresh = refresh;
		vm.removeFromProgram = removeFromProgram;

		function addToProgram(ins) {
			if (ins.toElement) {
				var i = instructionFactory.getInstruction(ins.toElement.id);
				programService.addInstruction(i);
			} else {
				programService.addInstruction(ins);
			}
			vm.refresh();
		};

		function removeFromProgram(index) {
			programService.removeInstruction(index);
			vm.refresh();
		};

		// ensure that DOM always matches program in program service
		function refresh() {
			vm.program = programService.getProgram();
		};

		// call update to add default instructions
		vm.refresh();
	};
})();
