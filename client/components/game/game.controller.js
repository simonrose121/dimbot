(function() {
	angular
        .module('dimbot.game')
        .controller('Game', Game);

	Game.$inject = ['$http', '$scope', '$compile', 'logger', 'programService',
		'movementService','levelService', 'imageService', 'logService',
		'lightService', 'instructionFactory', 'screenshot', 'state', 'ENV'];

	function Game($http, $scope, $compile, logger, programService,
		movementService, levelService, imageService, logService, lightService,
		instructionFactory, screenshot, state, ENV) {

		var vm = this;

		// private variables
		vm.selected = null;
		vm.max = 0;
		vm.currentIndex = null;
		vm.instructions = levelService.getInstructions();
		vm.program = programService.getProgram();

		// public methods
		vm.addToProgram = addToProgram;
		vm.bind = bind;
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
		vm.bind();

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

		function bind() {
			bindActionButton();
			bindResetButton();
			bindNextButton();
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

		// private
		function bindActionButton() {
			$('#status').bind('click', function() {
				if ($('#status').hasClass('play')) {
					if (ENV.ins == 'blockly') {
						// capture screenshot
						var url = screenshot.captureSvg('blockly-inner', 'file');

						// log screenshot data to database
						logService.saveScreenshot(url, 'blockly');

						// capture blockly and run generated code
						var code = Blockly.JavaScript.workspaceToCode(vm.workspace);
						eval(code);
					} else {
						// capture screenshot and save to database
						screenshot.capture('.program-inner', 'file', function(url) {
							logService.saveScreenshot(url, 'lightbot');
						});

						// set has start if it's the lightbot version
						movementService.hasStart(true);
					}

					// run program
					movementService.run();

					// log button press
					logService.buttonPress('play');

				} else if ($('#status').hasClass('stop')) {

					// stop program
					movementService.stop();

					// log button press
					logService.buttonPress('stop');

				} else if ($('#status').hasClass('rewind')) {

					// rewind movement
					movementService.rewind();

					// if blockly then empty program to be recreated later
					if (ENV.ins == 'blockly') {
						programService.empty();
					}

					// remove next image
					imageService.removeNext();

					// log button press
					logService.buttonPress('rewind');
				}
			});
		}

		function bindResetButton() {
			$('#reset').bind('click', function() {

				// reset movement
				movementService.reset();

				// remove next image
				imageService.removeNext();

				// log button press to db
				logService.buttonPress('reset');

				if (ENV.ins == 'blockly') {
					// clear blockly interface
					Blockly.mainWorkspace.clear();
				}
			});
		}

		function bindNextButton() {
			$('#next').bind('click', function() {

				// set level service to next level
				levelService.nextLevel();
				levelService.setInstructions();

				// change action button to play and remove next button
				imageService.play();
				imageService.removeNext();

				// log button press
				logService.buttonPress('next');

				// empty program
				programService.empty();

				// empty lights
				lightService.removeAllLights();

				if (ENV.ins == 'blockly') {
					// clear blockly interface
					Blockly.mainWorkspace.clear();
				}

				// reset the grid directive to reload level
				$scope.$apply(function() {
					$('.level-inner').html('');
					var newElement = $compile("<dim-grid-directive></dim-grid-directive>")($scope);
					$('.level-inner').append(newElement);
				});
			});
		}
	}
})();
