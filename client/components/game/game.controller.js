(function() {
	angular
        .module('dimbot.game')
        .controller('Game', Game);

	Game.$inject = ['$http', '$scope', '$compile', 'logger', 'programService',
		'movementService','levelService', 'imageService', 'logService',
		'instructionFactory', 'screenshot', 'state', 'ENV'];

	function Game($http, $scope, $compile, logger, programService,
		movementService, levelService, imageService, logService,
		instructionFactory, screenshot, state, ENV) {
		var vm = this;

		levelService.setInstructions();
		levelService.resetLevel();

		vm.selected = null;
		vm.max = 0;
		vm.currentIndex = null;
		vm.instructions = levelService.getInstructions();
		vm.program = programService.getProgram();

		vm.addToProgram = addToProgram;
		vm.bind = bind;
		vm.logMove = logMove;
		vm.removeFromProgram = removeFromProgram;
		vm.setIndex = setIndex;
		vm.setMax = setMax;
		vm.spliceProgram = spliceProgram;
		vm.toggleBin = toggleBin;

		// set current state
		state.current = state.COMPOSING;

		// call update to add default instructions
		vm.bind();

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

		function bind() {
			// used to bind play and reset buttons
			$('#status').bind('click', function() {
				if ($('#status').hasClass('play')) {
					if (ENV.ins == 'blockly') {
						var code = Blockly.JavaScript.workspaceToCode(vm.workspace);
						eval(code);
					} else {
						screenshot.capture('.program-inner', 'file');
						// set has start if it's the lightbot version
						movementService.hasStart(true);	
					}
					movementService.run();
					logService.buttonPress('play');
				} else if ($('#status').hasClass('stop')) {
					movementService.stop();
					logService.buttonPress('stop');
				} else if ($('#status').hasClass('rewind')) {
					movementService.reset();
					imageService.removeNext();
					logService.buttonPress('rewind');
					if (ENV.ins == 'blockly') {
						// clear blockly interface
						Blockly.mainWorkspace.clear();
					}
				}
			});
			$('#reset').bind('click', function() {
				movementService.reset();
				imageService.removeNext();
				logService.buttonPress('reset');
				if (ENV.ins == 'blockly') {
					// clear blockly interface
					Blockly.mainWorkspace.clear();
				}
			});
			$('#next').bind('click', function() {
				levelService.nextLevel();
				imageService.play();
				imageService.removeNext();
				logService.buttonPress('next');
				if (ENV.ins == 'blockly') {
					// clear blockly interface
					Blockly.mainWorkspace.clear();
				}

				$scope.$apply(function() {
					levelService.setInstructions();
					programService.empty();

					$('.level-inner').html('');
					var newElement = $compile("<dim-grid-directive></dim-grid-directive>")($scope);
					$('.level-inner').append(newElement);
				});
			});
		}

		function logMove(event, index, item) {
			logService.addedInstruction(item, 'drag', index);
			return item;
		}

		function removeFromProgram(event, index, item, aindex) {
			// if dropped on the bin
			if (!aindex) {
				aindex = vm.currentIndex;
			}
			if (aindex > -1) {
				logService.removedInstruction(item, aindex);
				vm.program.splice(aindex, 1);
				vm.toggleBin();
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

		function toggleBin() {
			logger.info('program is', vm.program);

			$('#bin').toggle();
		}
	}
})();
