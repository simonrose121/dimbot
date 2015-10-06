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

		vm.update = function() {
			vm.program = ProgramService.getProgram();
		}

		vm.addToProgram = function(ins) {
			ProgramService.addInstruction(ins);
			vm.update();
		}

		// Setup page
		vm.instructions = [up, fwd];
	};
})();
