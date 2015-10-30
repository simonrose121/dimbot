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
		vm.refresh = refresh;
		vm.removeFromProgram = removeFromProgram;
		vm.setIndex = setIndex;
		vm.setMax = setMax;
		vm.toggleBin = toggleBin;

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
						vm.program.push(i);
						vm.beingDragged = false;
					}
				} else {
					// if click
					// remove instruction to prevent drags adding
					vm.program.push(ins);
				}
			}
			vm.refresh();
		}

		function bind() {
			// used to bind play and reset buttons
			$('#status').bind('click', function() {
				if ($('#status').hasClass('play')) {
					vm.refresh();
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
