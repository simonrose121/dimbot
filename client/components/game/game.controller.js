(function() {
	angular
        .module('dimbot.game')
        .controller('Game', Game);

	Game.$inject = ['$scope', '$compile', 'programService', 'movementService',
		'levelService', 'imageService', 'dbService', 'lightService',
		'instructionFactory', 'logger', 'capture', 'state', 'timer', 'common'];

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
	 * @param dbService
	 * @param lightService
	 * @param instructionFactory
	 * @param logger
	 * @param capture
	 * @param state
	 * @param timer
	 * @param common
	 */
	function Game($scope, $compile, programService,
			movementService, levelService, imageService, dbService,
			lightService, instructionFactory, logger, capture, state, timer,
			common) {

		var vm = this;

		/* private variables */
		vm.selected = null;
		vm.cursor = 0;
		vm.currentIndex = null;
		vm.instructions = levelService.getInstructions();
		vm.limit = 12;
		vm.program = programService.getProgram();
		vm.maxInstructions = 4;
		vm.userId = common.userId;
		vm.type = common.type;
		vm.gameStart = true;

		// form inputs
		vm.userIdField = null;
		vm.typeField = null;

		/* public methods to expose to view */
		vm.addToProgram = addToProgram;
		vm.bind = bind;
		vm.logAdd = logAdd;
		vm.nextLevel = nextLevel;
		vm.register = register;
		vm.removeFromProgram = removeFromProgram;
		vm.removeFromProgramOnDrop = removeFromProgramOnDrop;
		vm.setIndex = setIndex;
		vm.spliceProgram = spliceProgram;
		vm.start = start;
		vm.toggleBin = toggleBin;

		initialiseGame();

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
				dbService.addedInstruction(i, 'click', vm.program.indexOf(i));
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
			dbService.addedInstruction(ins, 'drag', index);
			return ins;
		}

		/**
		 * Register userId and environment type before game begins.
		 *
		 */
		function register() {
			if (isNormalInteger(vm.userIdField) && vm.typeField !== null) {
				if (dbService.checkId(vm.userIdField, function(exists) {
					if (!exists) {
						vm.userId = vm.userIdField;
						vm.type = vm.typeField;
						common.userId = vm.userIdField;
						common.type = vm.typeField;

						vm.message = '';
					} else {
						vm.message = 'Id already exists';
					}
				}));
			} else {
				vm.message = 'Inputs not valid';
			}
		}

		/**
		 * Remove instruction from program.
		 *
		 * @param index {number} - Index of instruction to be removed.
		 * @param ins {object} - Instruction to remove.
		 */
		function removeFromProgram(index, ins) {
			if (index === null) {
				index = vm.currentIndex;
			}

			if (index > -1) {
				dbService.removedInstruction(ins, 'click', index);
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
				dbService.removedInstruction(item, 'drag', index);
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
			dbService.movedInstruction(ins, vm.currentIndex, index);
			imageService.toggleBin(true);
		}

		/**
		 * Start the game once videos have been watched but first countdown 3 seconds.
		 *
		 */
		function start() {
			$('.start').prop('disabled', true);
			$('.start').val('3');

			setTimeout(function() {
				$('.start').val('2');
				setTimeout(function() {
					$('.start').val('1');
					setTimeout(function() {
						$scope.$apply(function() {
							vm.gameStart = true;
						});
						initialiseGame();
					}, 1000);
				}, 1000);
			}, 1000);
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
				if (common.type == 'blockly') {
					// capture screenshot
					var xml = capture.captureXml();

					// log screenshot data to database
					dbService.saveProgram(xml);

					// capture blockly and run generated code
					var code = Blockly.JavaScript.workspaceToCode(vm.workspace);
					eval(code);
				} else {
					// capture screenshot and save to database
					capture.capturePng('.program-inner');

					// convert program in to list of instructions
					var program = [];

					for (var i = 0; i < vm.program.length; i++) {
						var ins = vm.program[i];
						program.push(ins.name);
					}

					dbService.saveProgram(program);
				}

				// run program
				run();

				// log button press
				dbService.buttonPress('play');

			} else if ($('#status').hasClass('stop')) {

				// stop program
				state.current = state.STOPPED;

				if (common.type == 'blockly') {
					vm.program.length = 0;
				}

				// log button press
				dbService.buttonPress('stop');

			} else if ($('#status').hasClass('rewind')) {
				rewind();
			}
		}

		/**
		 * Initialise the game once settings have been set.
		 *
		 */
		function initialiseGame() {
			// happens after delay to ensure digest cycle has completed
			setTimeout(function() {
				$scope.$apply(function() {

					// perform initial controller methods to setup level
					levelService.setStartDateTime();
					movementService.setStartingDirection();

					// set current state
					state.current = state.COMPOSING;

					levelService.setInstructions();
					levelService.resetLevel();
					vm.bind();

					var newElement = $compile("<dim-three-directive></dim-three-directive>")($scope);
					$('.level-inner').append(newElement);

				});
			}, 100);
		}

		/**
		 * Check if string is an integer.
		 *
		 * @param str {string} - String to be checked.
		 * @returns {boolean} - Indicating if string is integer or not.
		 */
		function isNormalInteger(str) {
		    var n = ~~Number(str);
		    return String(n) === str && n >= 0;
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
						// more instructions to run
						timer.sleep(500);
						loop(program);
					} else {
						// end of program
						imageService.rewind();
						timer.sleep(500);
						rewind();
					}
				} else if (state.current == state.COMPLETE) {
					timer.sleep(500);
					if (levelService.canGoNextLevel()) {
						// next level
						imageService.backgroundTransition(function() {
							vm.nextLevel();
						});
					} else {
						// end game
						$('body').empty();
					}
				} else {
					movementService.rewind();
					imageService.play();
					lightService.turnOffAll();
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

			if (common.type == 'blockly') {
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

			// empty program
			programService.empty();

			// log button press to db
			dbService.buttonPress('reset');

			if (common.type == 'blockly') {
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

			// if blockly then empty program to be recreated later
			if (common.type == 'blockly') {
				programService.empty();
			}
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
			}
		}
	}
})();
