(function() {
	angular
	        .module('dimbot.game')
	        .controller('Game', Game);

	Game.$inject = ['$http', 'ProgramService', 'InstructionFactory'];

	function Game($http, ProgramService, Instruction) {
		var vm = this;

		// setup some default instructions using the service
		// TODO: move this to a method
		var up = new Instruction("up", "client/assets/img/up-instruction.png");
		var fwd = new Instruction("fwd", "client/assets/img/up-instruction.png");
		ProgramService.addInstruction(up);
		ProgramService.addInstruction(fwd);

		// Setup page
		vm.program = ProgramService.getProgram();
	};
})();
