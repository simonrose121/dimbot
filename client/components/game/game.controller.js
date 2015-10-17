(function() {
	angular
        .module('dimbot.game')
        .controller('Game', Game);

	Game.$inject = ['$http', '$scope', 'logger', 'programService', 'movementService',
	'levelService',	'instructionFactory'];

	function Game($http, $scope, logger, programService, movementService,
		levelService, instructionFactory) {
		var vm = this;

		levelService.setStartingInstructions();

		vm.addToProgram = addToProgram;
		vm.bind = bind;
		vm.instructions = levelService.getInstructions();
		vm.refresh = refresh;
		vm.replace = replace;
		vm.remove = remove;
		vm.removeFromProgram = removeFromProgram;

		// call update to add default instructions
		vm.refresh();
		vm.bind();

		function addToProgram(ins) {
			// if instruction exists
			if (ins) {
				if (ins.toElement) {
					// if drag and drop
					var i = instructionFactory.getInstruction(ins.toElement.id);
					// get instruction and add
					//programService.addInstruction(i);
				} else {
					// if click
					// remove instruction to prevent drags adding
					programService.addInstruction(ins);
				}
			}
			vm.refresh();
		};

		function bind() {
			// used to bind play and reset buttons
			$('#status').bind('click', function() {
				if ($('#status').hasClass('play')) {
					movementService.run();
				} else if ($('#status').hasClass('stop')) {
					movementService.stop();
				} else if ($('#status').hasClass('rewind')) {
					movementService.rewind();
				}
			});
			$('.reset').bind('click', function() {
				movementService.reset();
				$scope.$apply(function() {
					vm.refresh();
				});
			});
		}

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

		function remove(ins) {
			if (ins.toElement) {
				var i = instructionFactory.getInstruction(ins.toElement.id);
				programService.removeInstruction(i);

				if (i > -1) {
					vm.program.splice(i, 1);
				}
			}
		}

		function removeFromProgram(index) {
			programService.removeInstruction(index);
			vm.refresh();
		};

		// ensure that DOM always matches program in program service
		function refresh() {
			vm.program = programService.getProgram();
		};
	};
})();
