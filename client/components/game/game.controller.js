(function() {
	angular
        .module('dimbot.game')
        .controller('Game', Game);

	Game.$inject = ['$http', '$scope', '$compile', 'logger', 'programService',
		'movementService','levelService', 'imageService', 'logService',
		'lightService', 'instructionFactory', 'capture', 'state', 'timer', 'ENV'];

	function Game($http, $scope, $compile, logger, programService,
		movementService, levelService, imageService, logService, lightService,
		instructionFactory, capture, state, timer, ENV) {

		var vm = this;

		// private variables
		vm.selected = null;
		vm.max = 0;
		vm.x = 0;
		vm.currentIndex = null;
		vm.instructions = levelService.getInstructions();
		vm.program = programService.getProgram();

		// public methods
		vm.addToProgram = addToProgram;
		vm.bind = bind;
		vm.logMove = logMove;
		vm.loop = loop;
		vm.nextButton = nextButton;
		vm.removeFromProgram = removeFromProgram;
		vm.removeFromProgramOnDrop = removeFromProgramOnDrop;
		vm.run = run;
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
			$('#status').bind('click', actionButton);
			$('#next').bind('click', nextButton);
		}

		function logMove(event, index, item) {
			logService.addedInstruction(item, 'drag', index);
			return item;
		}

		// control loop execution to wait for callback from tween when complete
		function loop(arr) {
			movementService.perform(arr[vm.x], vm.x, function() {
				
				imageService.unhighlight(vm.x);

				vm.x++;

				if (state.current == state.RUNNING) {
					if (vm.x < arr.length) {
						timer.sleep(1000);
						vm.loop(arr);
					} else {
						imageService.rewind();
					}
				} else if (state.current == state.COMPLETE) {
					imageService.backgroundTransition(function() {
						vm.nextButton();
					});
				} else {
					movementService.rewind();
					state.current = state.COMPOSING;
				}
			});
		}

		function run() {
			vm.x = 0;

			var program = programService.getProgram();
			logger.info('running program', program);

			// when program is started
			if (program.length > 0) {
				state.current = state.RUNNING;

				// set rotation index back to 0
				movementService.setStartingDirection();

				// set stop button
				imageService.stop();

				// start program
				vm.loop(program);

				// hide direction button
				imageService.hideDirection();
			}
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

		// private
		function actionButton() {
			if ($('#status').hasClass('play')) {
				if (ENV.ins == 'blockly') {
					// capture screenshot
					var url = capture.captureXml();

					// log screenshot data to database
					logService.saveCapture(url, 'blockly');

					// capture blockly and run generated code
					var code = Blockly.JavaScript.workspaceToCode(vm.workspace);
					eval(code);
				} else {
					// capture screenshot and save to database
					capture.capturePng('.program-inner', 'file', function(url) {
						logService.saveCapture(url, 'lightbot');
					});
				}

				// run program
				vm.run();

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

				// log button press
				logService.buttonPress('rewind');
			}
		}

		function resetButton() {
			// reset movement
			movementService.reset();

			// log button press to db
			logService.buttonPress('reset');

			if (ENV.ins == 'blockly') {
				// clear blockly interface
				Blockly.mainWorkspace.clear();
			}
		}

		function nextButton() {
			// set level service to next level
			levelService.nextLevel();
			levelService.setInstructions();

			// change action button to play and remove next button
			imageService.play();

			// log button press
			logService.buttonPress('next');

			// empty program
			programService.empty();

			// empty lights
			lightService.removeAllLights();

			if (ENV.ins == 'blockly') {
				// clear blockly interface
				Blockly.mainWorkspace.clear();

				// initialise start block
				var xml_text = "<xml xmlns='http://www.w3.org/1999/xhtml'><block type='start' x='100' y='50'></block></xml>";
				var xml = Blockly.Xml.textToDom(xml_text);
				Blockly.Xml.domToWorkspace(workspace, xml);
			}

			// reset the grid directive to reload level
			$scope.$apply(function() {
				$('.level-inner').html('');
				var newElement = $compile("<dim-grid-directive></dim-grid-directive>")($scope);
				$('.level-inner').append(newElement);
			});
		}
	}
})();
