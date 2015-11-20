(function() {
	angular
        .module('dimbot.game')
        .controller('Game', Game);

	Game.$inject = ['$http', '$scope', '$compile', 'logger', 'programService',
		'movementService','levelService', 'imageService', 'logService',
		'buttonService', 'instructionFactory', 'state', 'ENV'];

	function Game($http, $scope, $compile, logger, programService,
		movementService, levelService, imageService, logService, buttonService,
		instructionFactory, state, ENV) {

		var vm = this;

		// private variables
		vm.selected = null;
		vm.max = 0;
		vm.currentIndex = null;
		vm.instructions = levelService.getInstructions();
		vm.program = programService.getProgram();

		// public methods
		vm.addToProgram = addToProgram;
		vm.logMove = logMove;
		vm.removeFromProgram = removeFromProgram;
		vm.removeFromProgramOnDrop = removeFromProgramOnDrop;
		vm.setIndex = setIndex;
		vm.setMax = setMax;
		vm.spliceProgram = spliceProgram;
		vm.toggleBin = toggleBin;

		// perform initial controller methods to setup level
		levelService.loadLevels();
		levelService.setInstructions();
		levelService.resetLevel();
		movementService.setStartingDirection();

		// set current state
		state.current = state.COMPOSING;

		// call update to add default instructions
		buttonService.bind();

		// public
		function addToProgram(ins) {
			// if instruction exists
			var i = null;
			if (ins) {
				i = instructionFactory.getInstruction(ins.name);
				logger.info('added to program', i);
				// if click
				// remove instruction to prevent drags adding
				vm.program.push(i);

				logService.addedInstruction(i, 'click', vm.program.indexOf(i));
			}
		}

		function logMove(event, index, item) {
			logService.addedInstruction(item, 'drag', index);
			return item;
		}

		function removeFromProgram(index, ins) {
			if (!index) {
				index = vm.currentIndex;
			}
			if (index > -1) {
				logService.removedInstruction(ins, 'click', index);
				vm.program.splice(index, 1);
			}
		}

		function removeFromProgramOnDrop(event, index, item) {
			index = vm.currentIndex;

			if (index > -1) {
				logService.removedInstruction(item, 'drag', index);
				vm.program.splice(index, 1);
				vm.toggleBin(true);
			}
		}

		function setIndex(index) {
			logger.info('setting index', index);
			vm.currentIndex = index;
		}

		function setMax() {
			vm.max = vm.instructions.length;
		}

		function spliceProgram(index, ins) {
			vm.program.splice(index, 1);

			logService.movedInstruction(ins, vm.currentIndex, index);
		}

		function toggleBin(isVisible) {
			imageService.toggleBin(isVisible);
		}
	}
})();
