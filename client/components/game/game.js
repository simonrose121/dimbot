(function() {
	angular
	        .module('dimbot.game')
	        .controller('Game', Game);

	Game.$inject = ['$http', 'InstructionService', 'InstructionFactory'];

	function Game($http, InstructionService, Instruction) {
		var vm = this;

		// setup some default instructions using the service
		// TODO: move this to a method
		var up = new Instruction("up", "/");
		var fwd = new Instruction("fwd", "/");

		console.log("adding " + up);
		console.log("adding " + fwd);

		InstructionService.addInstruction(up);
		InstructionService.addInstruction(fwd);

		vm.ins = InstructionService.getInstructionList();
	};
})();
