(function() {
	angular
        .module('dimbot.game')
        .controller('Game', Game);

	Game.$inject = ['$scope', '$compile', 'programService', 'movementService',
		'levelService', 'imageService', 'logService', 'lightService',
		'instructionFactory', 'logger', 'capture', 'state', 'timer', 'ENV'];

	/**
	 * Provides central location for all game controller logic and communicates
	 * with view directly.
	 *
	 * @param $scope
	 * @param $compile
	 * @param logger
	 * @param programService
	 * @param movementService
	 * @param levelService
	 * @param imageService
	 * @param logService
	 * @param lightService
	 * @param instructionFactory
	 * @param logger
	 * @param capture
	 * @param state
	 * @param timer
	 * @param ENV
	 */
	function Game($scope, $compile, programService,
			movementService, levelService, imageService, logService,
			lightService, instructionFactory, logger, capture, state, timer,
			ENV) {

		var vm = this;

		/* private variables */
		vm.selected = null;
		vm.cursor = 0;
		vm.currentIndex = null;
		vm.instructions = levelService.getInstructions();
		vm.limit = 11;
		vm.program = programService.getProgram();
		vm.max = 4;

		/* public methods to expose to view */
		vm.addToProgram = addToProgram;
		vm.bind = bind;
		vm.logAdd = logAdd;
		vm.nextLevel = nextLevel;
		vm.removeFromProgram = removeFromProgram;
		vm.removeFromProgramOnDrop = removeFromProgramOnDrop;
		vm.setIndex = setIndex;
		vm.spliceProgram = spliceProgram;
		vm.toggleBin = toggleBin;

		// perform initial controller methods to setup level
		levelService.setInstructions();
		levelService.resetLevel();
		levelService.setStartDateTime();
		movementService.setStartingDirection();

		// set current state
		state.current = state.COMPOSING;

		// call update to add default instructions
		vm.bind();

		/**
		 * Add instruction to program.
		 *
		 * @param ins {object} - Instruction to add.
		 */
		function addToProgram(ins) {
			var i = null;
			if (ins && vm.program.length < vm.limit) {
				i = instructionFactory.getInstruction(ins.name);
				vm.program.push(i);
				logService.addedInstruction(i, 'click', vm.program.indexOf(i));
			}
		}

		/**
		 * Bind button press methods using jQuery.
		 *
		 */
		function bind() {
			$('#status').bind('click', actionButton);
			$('#reset').bind('click', resetButton);
		}

		/**
		 * Drag callback to log action of adding.
		 *
		 * @param event {object} - Current event.
		 * @param index {number} - Index of instruction.
		 * @param ins {object} - Instruction.
		 * @returns ins {object} - Instruction to be added to program.
		 */
		function logAdd(event, index, ins) {
			logService.addedInstruction(ins, 'drag', index);
			return ins;
		}

		/**
		 * Remove instruction from program.
		 *
		 * @param index {number} - Index of instruction to be removed.
		 * @param ins {object} - Instruction to remove.
		 */
		function removeFromProgram(index, ins) {
			if (!index) {
				index = vm.currentIndex;
			}
			if (index > -1) {
				logService.removedInstruction(ins, 'click', index);
				vm.program.splice(index, 1);
			}
		}

		/**
		 * Remove instruction from program when dropped on bin.
		 *
		 * @param event {object} - Current event.
		 * @param index {number} - Index of instruction to be removed.
		 * @param item {object} - Item to be removed.
		 */
		function removeFromProgramOnDrop(event, index, item) {
			index = vm.currentIndex;

			if (index > -1) {
				logService.removedInstruction(item, 'drag', index);
				vm.program.splice(index, 1);
				imageService.toggleBin(true);
			}
		}

		/**
		 * Set current index so correct instruction is removed on bin drop.
		 *
		 * @param index {number} - Instruction index.
		 */
		function setIndex(index) {
			vm.currentIndex = index;
			imageService.toggleBin(false);
		}

		/**
		 * Insert instruction at correct position in program.
		 *
		 * @param index {number} - Index of instruction moving.
		 * @param ins {object} - Instruction being moved.
		 */
		function spliceProgram(index, ins) {
			vm.program.splice(index, 1);
			logService.movedInstruction(ins, vm.currentIndex, index);
			imageService.toggleBin(true);
		}

		/**
		 * Toggles bin based on if it is already visible.
		 *
		 * @param isVisible {boolean} - If bin is already visible.
		 */
		function toggleBin(isVisible) {
			imageService.toggleBin(isVisible);
		}

		/* private methods */

		/**
		 * Action button logic for each individual type.
		 *
		 */
		function actionButton() {
			if ($('#status').hasClass('play')) {
				if (ENV.type == 'blockly') {
					// capture screenshot
					var url = capture.captureXml();

					// log screenshot data to database
					logService.saveCapture(url, 'blockly');

					// capture blockly and run generated code
					var code = Blockly.JavaScript.workspaceToCode(vm.workspace);
					eval(code);
				} else {
					// capture screenshot and save to database
					capture.capturePng('.program-inner', function(url) {
						logService.saveCapture(url, 'lightbot');
					});
				}

				// run program
				run();

				// log button press
				logService.buttonPress('play');

			} else if ($('#status').hasClass('stop')) {

				// stop program
				state.current = state.STOPPED;

				// log button press
				logService.buttonPress('stop');

			} else if ($('#status').hasClass('rewind')) {
				rewind();
			}
		}

		/**
		 * Loop through program array and perform instructions.
		 *
		 * @param program {array} - Program to be run.
		 */
		function loop(program) {
			imageService.highlight(vm.cursor);

			// control loop execution to wait for callback from tween when complete
			movementService.perform(program[vm.cursor], function() {
				imageService.unhighlight(vm.cursor);
				vm.cursor++;

				if (state.current == state.RUNNING) {
					if (vm.cursor < program.length) {
						timer.sleep(1000);
						loop(program);
					} else {
						imageService.rewind();
						timer.sleep(1000);
						rewind();
					}
				} else if (state.current == state.COMPLETE) {
					imageService.backgroundTransition(function() {
						vm.nextLevel();
					});
				} else {
					movementService.rewind();
					imageService.play();
					state.current = state.COMPOSING;
				}
			});
		}

		/**
		 * Next level logic.
		 *
		 */
		function nextLevel() {
			// set level service to next level
			levelService.nextLevel();
			levelService.setInstructions();

			// change action button to play and remove next button
			imageService.play();

			// empty program
			programService.empty();

			// empty lights
			lightService.removeAllLights();

			if (ENV.type == 'blockly') {
				// clear blockly interface
				Blockly.mainWorkspace.clear();

				// initialise start block
				var xml_text = "<xml xmlns='http://www.w3.org/1999/xhtml'><block type='start' x='100' y='50'></block></xml>";
				var xml = Blockly.Xml.textToDom(xml_text);
				Blockly.Xml.domToWorkspace(workspace, xml);
			}

			// reset the three directive to reload level
			$scope.$apply(function() {
				$('.level-inner').html('');
				var newElement = $compile("<dim-three-directive></dim-three-directive>")($scope);
				$('.level-inner').append(newElement);
			});
		}

		/**
		 * Reset button logic.
		 *
		 */
		function resetButton() {
			// rewind level movement
			movementService.rewind();

			// set play button
			imageService.play();

			// turn off light
			lightService.turnOffAll();

			// show direction
			imageService.showDirection();

			// empty program
			programService.empty();

			// log button press to db
			logService.buttonPress('reset');

			if (ENV.type == 'blockly') {
				// clear blockly interface
				Blockly.mainWorkspace.clear();

				var xml_text = "<xml xmlns='http://www.w3.org/1999/xhtml'><block type='start' x='100' y='50'></block></xml>";
				var xml = Blockly.Xml.textToDom(xml_text);
				Blockly.Xml.domToWorkspace(workspace, xml);
			}
		}

		/**
		 * Perform rewind behaviour.
		 *
		 */
		function rewind() {

			// rewind movement
			movementService.rewind();

			// set play button
			imageService.play();

			// turn off light
			lightService.turnOffAll();

			// show direction
			imageService.showDirection();

			// if blockly then empty program to be recreated later
			if (ENV.type == 'blockly') {
				programService.empty();
			}

			// log button press
			logService.buttonPress('rewind');
		}

		/**
		 * Run the program.
		 *
		 */
		function run() {
			levelService.incrementAttemptNumber();

			vm.cursor = 0;

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
				loop(program);

				// hide direction button
				imageService.hideDirection();
			}
		}
	}
})();
