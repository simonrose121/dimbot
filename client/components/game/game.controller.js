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
		vm.replace = replace;
		vm.removeElem = removeElem;
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

		function replace(ins) {
			logger.info('toElement', ins.toElement);
			var id = ins.toElement.id;

			// get index
			var index = $('#' + id).attr('index');

			// remove this from array
			if (index > -1) {
				vm.instructions.splice(index, 1);
			}

			var instruction = instructionFactory.getInstruction(id);
			logger.info('instruction', instruction);
			vm.instructions.splice(index, 0, instruction);
			logger.info('instructions array', vm.instructions);
		}

		function removeElem(ins) {
			// remove from dom
			ins.toElement.remove();
		}

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
