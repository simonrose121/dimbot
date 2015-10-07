(function() {
	angular
	        .module('dimbot.game')
	        .controller('Game', Game);

	Game.$inject = ['$http', 'programService', 'instructionFactory'];

	function Game($http, programService, Instruction) {
		var vm = this;

		vm.addToProgram = addToProgram;
		vm.instructions = [];
		vm.refresh = refresh;
		vm.removeFromProgram = removeFromProgram;

		// setup some default instructions using the service
		// TODO: move this to out to a service to be populated in as a level
		var up = new Instruction("up", "client/assets/img/up-instruction.png");
		var right = new Instruction("right",
			"client/assets/img/right-instruction.png");

		function addToProgram(ins) {
			programService.addInstruction(ins);
			vm.update();
		};

		vm.instructions = [up, right];

		function removeFromProgram(index) {
			programService.removeInstruction(index);
			vm.update();
		};

		// ensure that DOM always matches program in program service
		function refresh() {
			vm.program = programService.getProgram();
		};

		// call update to add default instructions
		vm.refresh();
	};
})();
