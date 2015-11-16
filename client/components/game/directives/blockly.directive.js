(function() {
	angular
		.module('dimbot.game')
		.directive('dimBlocklyDirective', dimBlocklyDirective);

	dimBlocklyDirective.$Inject = ['programService', 'movementService',
		'logService', 'instrutionFactory', 'logger'];

	function dimBlocklyDirective(programService, movementService,
		logService, instructionFactory, logger) {
		var directive = {
			restrict: 'E',
			link: link
		};

		return directive;

		function link(scope, elem) {
			var vm = this;

			vm.workspace = null;
			vm.code = null;

			// config constants
			vm.imgSize = 40;
			vm.blockColour = 230;
			vm.count = 0;
			vm.current = null;

			vm.blockCount = blockCount;
			vm.changed = changed;
			vm.checkTopLevel = checkTopLevel;
			vm.customBlocks = customBlocks;
			vm.generators = generators;
			vm.init = init;

			vm.customBlocks();
			vm.generators();
			vm.init();
			vm.blockCount();

			function blockCount() {
				vm.count = vm.workspace.getAllBlocks().length;
			}

			function changed() {
				var count = vm.count;
				vm.blockCount();
				if (count > vm.count) {
					logService.removedInstruction(vm.current);
				} else if (count == vm.count) {
					logService.movedInstruction(vm.current);
				} else if (count < vm.count) {
					logService.addedInstruction(vm.current, 'blockly')
				}
			}

			function customBlocks() {
				Blockly.Blocks.fw = {
				  	init: function() {
						this.appendDummyInput()
							.appendField(new Blockly.FieldImage(
								'../../img/blockly-forwards.png', vm.imgSize, vm.imgSize));
						this.setPreviousStatement(true);
	      				this.setNextStatement(true);
					    this.setColour(vm.blockColour);
				  	},
					onchange: function(ev) {
						vm.current = instructionFactory.getInstruction('fw');
					}
				};
				Blockly.Blocks.rr = {
				  	init: function() {
					  	this.appendDummyInput()
							.appendField(new Blockly.FieldImage(
								'../../img/blockly-rotateright.png', vm.imgSize, vm.imgSize));
  						this.setPreviousStatement(true);
  						this.setNextStatement(true);
						this.setColour(vm.blockColour);
				  	},
					onchange: function(ev) {
						vm.current = instructionFactory.getInstruction('rr');
					}
				};
				Blockly.Blocks.rl = {
				  	init: function() {
					  	this.appendDummyInput()
							.appendField(new Blockly.FieldImage(
								'../../img/blockly-rotateleft.png', vm.imgSize, vm.imgSize));
  						this.setPreviousStatement(true);
  						this.setNextStatement(true);
						this.setColour(vm.blockColour);
				  	},
					onchange: function(ev) {
						vm.current = instructionFactory.getInstruction('rl');
					}
				};
				Blockly.Blocks.lt = {
				  	init: function() {
					  	this.appendDummyInput()
							.appendField(new Blockly.FieldImage(
								'../../img/blockly-lightbulb.png', vm.imgSize, vm.imgSize));
  						this.setPreviousStatement(true);
  						this.setNextStatement(true);
						this.setColour(vm.blockColour);
				  	},
					onchange: function(ev) {
						vm.current = instructionFactory.getInstruction('lt');
					}
				};
				Blockly.Blocks.start = {
					init: function() {
						this.appendDummyInput()
							.appendField(new Blockly.FieldImage(
								'../../img/play-button.png', vm.imgSize, vm.imgSize));
						this.setPreviousStatement(false);
						this.setNextStatement(true);
						this.setColour(65);
						this.isTopLevel = true;
					},
					onchange: function(ev) {
						vm.current = {
							name: 'start'
						};
					}
				};
			}

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
					return 'movementService.hasStart(' + true + ');';
				};
			}

			function init() {
				vm.workspace = Blockly.inject('blockly-inner', {
					toolbox: document.getElementById('toolbox')
				});

				Blockly.BlockSvg.START_HAT = true;
				vm.workspace.addChangeListener(vm.changed);
			}
		}
	}
})();
