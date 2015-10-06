(function() {
	angular
	        .module('dimbot.game')
	        .controller('Game', Game);

	Game.$inject = ['$http', 'programService', 'instructionFactory'];

	function Game($http, programService, Instruction) {
		var vm = this;

		// setup some default instructions using the service
		// TODO: move this to a method
		var up = new Instruction("up", "client/assets/img/up-instruction.png");
		var right = new Instruction("right", "client/assets/img/right-instruction.png");

		// ensure that DOM always matches program in program service
		vm.update = function() {
			vm.program = programService.getProgram();
		};

		vm.addToProgram = function(ins) {
			programService.addInstruction(ins);
			vm.update();
		};

		vm.removeFromProgram = function(index) {
			programService.removeInstruction(index);
			vm.update();
		};

		// Setup page
		vm.update();
		vm.instructions = [up, right];
	};
})();
