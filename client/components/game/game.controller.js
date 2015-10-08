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
		var fw = new Instruction("fw",
			"client/assets/img/up-instruction.png");
		var rr = new Instruction("rl",
			"client/assets/img/rotate-right-instruction.png");
		var rl = new Instruction("rl",
			"client/assets/img/rotate-left-instruction.png");

		function addToProgram(ins) {
			programService.addInstruction(ins);
			vm.refresh();
		};

		vm.instructions = [fw, rr, rl];

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
