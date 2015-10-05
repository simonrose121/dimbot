(function() {
	angular
	        .module('dimbot.game')
	        .controller('Game', Game);

	Game.$inject = ['$http', 'InstructionService'];

	function Game($http, instructionService) {
		var vm = this;

		var Instruction = instructionService.Instruction;

		// setup some default instructions using the service
		// TODO: move this to a method
		var up = new Instruction("up", "/");
		var fwd = new Instruction("fwd", "/");
		instructionService.addInstruction(up);
		instructionService.addInstruction(fwd);

		vm.ins = instructionService.getInstructionList();
	};
})();
