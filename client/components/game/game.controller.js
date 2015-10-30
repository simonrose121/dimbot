(function() {
	angular
        .module('dimbot.game')
        .controller('Game', Game);

	Game.$inject = ['$http', '$scope', '$compile', 'logger', 'programService',
		'movementService','levelService', 'imageService',
		'instructionFactory', 'state', 'ENV'];

	function Game($http, $scope, $compile, logger, programService,
		movementService, levelService, imageService, instructionFactory, state,
		ENV) {
		var vm = this;

		levelService.setInstructions();
		levelService.resetLevel();

		vm.beingDragged = false;
		vm.selected = null;
		vm.max = 0;
		vm.currentIndex = null;
		vm.instructions = levelService.getInstructions();
		vm.program = programService.getProgram();

		vm.addToProgram = addToProgram;
		vm.bind = bind;
		vm.removeFromProgram = removeFromProgram;
		vm.setIndex = setIndex;
		vm.setMax = setMax;
		vm.toggleBin = toggleBin;

		// set current state
		state.current = state.COMPOSING;

		// call update to add default instructions
		vm.bind();

		function addToProgram(ins) {
			// if instruction exists
			var i = null;
			if (ins) {
				if (vm.beingDragged) {
					if (ins.toElement) {
						// if drag and drop
						i = instructionFactory.getInstruction(ins.toElement.id);
						logger.info('added to program', i);

						// get instruction and add
						vm.program.push(i);
						vm.beingDragged = false;
					}
				} else {
					i = instructionFactory.getInstruction(ins.name);
					logger.info('added to program', i);
					// if click
					// remove instruction to prevent drags adding
					vm.program.push(i);
				}
			}
		}

		function bind() {
			// used to bind play and reset buttons
			$('#status').bind('click', function() {
				if ($('#status').hasClass('play')) {
					if (ENV.ins == 'blockly') {
						var code = Blockly.JavaScript.workspaceToCode(vm.workspace);
						eval(code);
					}
					movementService.run();
				} else if ($('#status').hasClass('stop')) {
					movementService.stop();
				} else if ($('#status').hasClass('rewind')) {
					movementService.reset();
					imageService.removeNext();
				}
			});
			$('#reset').bind('click', function() {
				movementService.reset();
				imageService.removeNext();
			});
			$('#next').bind('click', function() {
				levelService.nextLevel();
				imageService.play();
				imageService.removeNext();

				$scope.$apply(function() {
					levelService.setInstructions();
					programService.empty();

					$('.level-inner').html('');
					var newElement = $compile("<dim-grid-directive></dim-grid-directive>")($scope);
					$('.level-inner').append(newElement);
				});
			});
		}

		function removeFromProgram(index) {
			// if dropped on the bin
			if (!index) {
				index = vm.currentIndex;
			}
			if (index > -1) {
				vm.program.splice(index, 1);
			}
		}

		function setIndex(index) {
			logger.info('setting index', index);
			vm.currentIndex = index;


		}

		function setMax() {
			vm.max = vm.instructions.length;
		}

		function toggleBin() {
			logger.info('program is', vm.program);

			$('#bin').toggle();
		}
	}
})();
