(function() {
	angular
	        .module('dimbot.game')
	        .controller('Game', Game);

	Game.$inject = ['$http', 'InstructionService'];

	function Game($http, InstructionService) {
		var vm = this;

		var Instruction = InstructionService.Instruction;

		// setup some default instructions using the service
		// TODO: move this to a method
		var up = new Instruction("up", "/");
		var fwd = new Instruction("fwd", "/");
		InstructionService.addInstruction(up);
		InstructionService.addInstruction(fwd);

		vm.ins = InstructionService.getInstructionList();
	};
})();
