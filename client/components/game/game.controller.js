(function() {
	angular
        .module('dimbot.game')
        .controller('Game', Game);

	Game.$inject = ['$http', '$scope', '$compile', 'logger', 'programService',
		'movementService','levelService', 'imageService',
		'instructionFactory', 'state'];

	function Game($http, $scope, $compile, logger, programService,
		movementService, levelService, imageService, instructionFactory, state) {
		var vm = this;

		levelService.setInstructions();
		levelService.resetLevel();

		vm.beingDragged = false;

		vm.addToProgram = addToProgram;
		vm.bind = bind;
		vm.instructions = levelService.getInstructions();
		vm.refresh = refresh;
		vm.replace = replace;
		vm.remove = remove;
		vm.removeFromProgram = removeFromProgram;

		// set current state
		state.current = state.COMPOSING;

		// call update to add default instructions
		vm.refresh();
		vm.bind();

		function addToProgram(ins) {
			// if instruction exists
			if (ins) {
				if (vm.beingDragged) {
					if (ins.toElement) {
						// if drag and drop
						var i = instructionFactory.getInstruction(ins.toElement.id);
						// get instruction and add
						programService.addInstruction(i);
						vm.beingDragged = false;
					}
				} else {
					// if click
					// remove instruction to prevent drags adding
					programService.addInstruction(ins);
				}
			}
			vm.refresh();
		}

		function bind() {
			// used to bind play and reset buttons
			$('#status').bind('click', function() {
				if ($('#status').hasClass('play')) {
					movementService.run();
				} else if ($('#status').hasClass('stop')) {
					movementService.stop();
				} else if ($('#status').hasClass('rewind')) {
					movementService.rewind();
					imageService.removeNext();
				}
			});
			$('#reset').bind('click', function() {
				movementService.reset();
				imageService.removeNext();
				$scope.$apply(function() {
					vm.refresh();
				});
			});
			$('#next').bind('click', function() {
				levelService.nextLevel();
				imageService.play();
				imageService.removeNext();

				$scope.$apply(function() {
					vm.refresh();
					levelService.setInstructions();
					programService.empty();

					$('.level-inner').html('');
					var newElement = $compile("<dim-grid-directive></dim-grid-directive>")($scope);
					$('.level-inner').append(newElement);
				});
			});
		}

		// ensure that DOM always matches program in program service
		function refresh() {
			vm.program = programService.getProgram();

			// set program width
			var width;
			var limit = programService.getLimit();
			if (limit <= 9) {
				width = limit * 128;
				$('.program-inner').css('width', width);
			} else {
				width = 9 * 128;
				$('.program-inner').css('width', width);
			}

			// add additional space
			if (vm.program.length > 9) {
				$('.program-inner').css('height', '256px');
			} else {
				$('.program-inner').css('height', '128px');
			}
		}

		function replace(ins) {
			vm.beingDragged = true;

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
			logger.log('removing ins', ins);
			if (ins.toElement) {
				var i = instructionFactory.getInstruction(ins.toElement.id);
				programService.removeInstruction(i);

				if (i > -1) {
					vm.program.splice(i, 1);
					vm.refresh();
				}
			}
		}

		function removeFromProgram(index) {
			logger.log('removing from program', index);
			programService.removeInstruction(index);
			vm.refresh();
		}
	}
})();
