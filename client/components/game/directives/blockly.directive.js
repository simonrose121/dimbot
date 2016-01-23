(function() {
	angular
		.module('dimbot.game')
		.directive('dimBlocklyDirective', dimBlocklyDirective);

	dimBlocklyDirective.$Inject = ['programService', 'dbService',
	 	'instructionFactory', 'logger', 'common'];

	/**
	 * Directive including Blockly workspace and logic
	 *
	 * @param programService
	 * @param dbService
	 * @param instructionFactory
	 * @param logger
	 * @returns directive
	 */
	function dimBlocklyDirective(programService, dbService, instructionFactory,
			logger, common) {

		var directive = {
			restrict: 'E',
			link: link
		};

		return directive;

		/**
		 * Initialise Blockly workspace and logic
		 *
		 * @param scope {object} - Current angular scope
		 * @param elem {object} - Directive DOM element
		 */
		function link(scope, elem) {
			var vm = this;

			/* private variables */
			vm.workspace = null;
			vm.code = null;
			vm.count = 0;
			vm.current = null;
			vm.initialised = false;

			/* methods available in scope */
			vm.blockCount = blockCount;
			vm.changed = changed;
			vm.checkTopLevel = checkTopLevel;
			vm.customBlocks = customBlocks;
			vm.generators = generators;
			vm.init = init;

			// run when directive is loaded
			vm.customBlocks();
			vm.generators();
			vm.init();
			vm.blockCount();

			/**
			 * Set count of blocks in workspace to current count
			 *
			 */
			function blockCount() {
				vm.count = vm.workspace.getAllBlocks().length;
			}

			/**
			 * Log program additions/moves/deletions dependent on counts
			 *
			 */
			function changed() {
				// get current count
				var count = vm.count;

				// set new count
				vm.blockCount();

				if (vm.initialised) {
					// compare counts to figure out what's been done
					if (count > vm.count) {
						dbService.removedBlocklyInstruction(vm.current);
					} else if (count == vm.count) {
						dbService.movedBlocklyInstruction(vm.current);
					} else if (count < vm.count) {
						dbService.addedBlocklyInstruction(vm.current);
					}
				} else {
					vm.initialised = true;
				}
			}

			/**
			 * Check if the block is connected to start block
			 *
			 * @param block {object} - Block to check
			 * @returns {boolean} - If block is connected to start block
			 */
			function checkTopLevel(block) {
				while (true) {
					var lastBlock = block;
					block = block.getSurroundParent();
					if (!block) {
						// Ran off the top.
						// We need to check the block at the top of the stack
						while (lastBlock.previousConnection !== null &&
							lastBlock.previousConnection.targetConnection !== null) {
							lastBlock = lastBlock.previousConnection.targetConnection.sourceBlock_;
						}
						return (lastBlock.isTopLevel || lastBlock.isInFlyout);
					}
				}
			}

			/**
			 * Initialise custom Blocky blocks
			 *
			 */
			function customBlocks() {
				Blockly.Blocks.fw = {
				  	init: function() {
						this.appendDummyInput()
							.appendField(new Blockly.FieldImage(
								'../../img/blockly-forwards.png',
								common.imageSize, common.imageSize));
						this.setPreviousStatement(true);
	      				this.setNextStatement(true);
					    this.setColour(common.blockColour);
				  	},
					onchange: function(ev) {
						vm.current = 'fw';
					}
				};
				Blockly.Blocks.rr = {
				  	init: function() {
					  	this.appendDummyInput()
							.appendField(new Blockly.FieldImage(
								'../../img/blockly-rotateright.png', common.imageSize, common.imageSize));
  						this.setPreviousStatement(true);
  						this.setNextStatement(true);
						this.setColour(common.blockColour);
				  	},
					onchange: function(ev) {
						vm.current = 'rr';
					}
				};
				Blockly.Blocks.rl = {
				  	init: function() {
					  	this.appendDummyInput()
							.appendField(new Blockly.FieldImage(
								'../../img/blockly-rotateleft.png', common.imageSize, common.imageSize));
  						this.setPreviousStatement(true);
  						this.setNextStatement(true);
						this.setColour(common.blockColour);
				  	},
					onchange: function(ev) {
						vm.current = 'rl';
					}
				};
				Blockly.Blocks.lt = {
				  	init: function() {
					  	this.appendDummyInput()
							.appendField(new Blockly.FieldImage(
								'../../img/blockly-lightbulb.png', common.imageSize, common.imageSize));
  						this.setPreviousStatement(true);
  						this.setNextStatement(true);
						this.setColour(common.blockColour);
				  	},
					onchange: function(ev) {
						vm.current = 'lt';
					}
				};
				Blockly.Blocks.start = {
					init: function() {
						this.appendDummyInput()
							.appendField(new Blockly.FieldImage(
								'../../img/play-button.png', common.imageSize, common.imageSize));
						this.setPreviousStatement(false);
						this.setNextStatement(true);
						this.setColour(65);
						this.isTopLevel = true;
						this.setDeletable(false);
					},
					onchange: function(ev) {
						vm.current = 'start';
					}
				};
			}

			/**
			 * Code generators for each block
			 *
			 */
			function generators() {
				Blockly.JavaScript.fw = function(block) {
					if (checkTopLevel(block)) {
						return 'programService.addInstruction(instructionFactory.getInstruction(\x27' + block.type + '\x27));';
					} else {
						return '';
					}
				};
				Blockly.JavaScript.rr = function(block) {
					if (checkTopLevel(block)) {
						return 'programService.addInstruction(instructionFactory.getInstruction(\x27' + block.type + '\x27));';
					} else {
						return '';
					}
				};
				Blockly.JavaScript.rl = function(block) {
					if (checkTopLevel(block)) {
						return 'programService.addInstruction(instructionFactory.getInstruction(\x27' + block.type + '\x27));';
					} else {
						return '';
					}
				};
				Blockly.JavaScript.lt = function(block) {
					if (checkTopLevel(block)) {
						return 'programService.addInstruction(instructionFactory.getInstruction(\x27' + block.type + '\x27));';
					} else {
						return '';
					}
				};
				Blockly.JavaScript.start = function(block) {
					return '';
				};
			}

			/**
			 * Initialise Blockly workspace
			 *
			 */
			function init() {
				vm.workspace = Blockly.inject('blockly-inner', {
					toolbox: document.getElementById('toolbox')
				});

				Blockly.BlockSvg.START_HAT = true;
				vm.workspace.addChangeListener(vm.changed);

				// initialise start block
				var xml_text = "<xml xmlns='http://www.w3.org/1999/xhtml'><block type='start' x='100' y='50'></block></xml>";
				var xml = Blockly.Xml.textToDom(xml_text);
				Blockly.Xml.domToWorkspace(workspace, xml);
			}
		}
	}
})();
