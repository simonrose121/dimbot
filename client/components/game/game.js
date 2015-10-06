(function() {
	angular
	        .module('dimbot.game')
	        .controller('Game', Game);

	Game.$inject = ['$http', 'InstructionService', 'InstructionFactory'];

	function Game($http, InstructionService, Instruction) {
		var vm = this;

		// setup some default instructions using the service
		// TODO: move this to a method
		var up = new Instruction("up", "client/assets/img/up-instruction.png");
		var fwd = new Instruction("fwd", "client/assets/img/up-instruction.png");
		InstructionService.addInstruction(up);
		InstructionService.addInstruction(fwd);

		// Setup page
		vm.ins = InstructionService.getInstructionList();
	};
})();
