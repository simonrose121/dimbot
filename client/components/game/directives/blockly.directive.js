(function() {
	angular
		.module('dimbot.game')
		.directive('dimBlocklyDirective', dimBlocklyDirective);

	dimBlocklyDirective.$Inject = ['programService', 'movementService', 'instrutionFactory', 'logger'];

	function dimBlocklyDirective(programService, movementService, instructionFactory, logger) {
		var directive = {
			restrict: 'E',
			link: link
		};

		return directive;

		function link(scope, elem) {
			var vm = this;

			vm.workspace = null;
			vm.code = null;

			vm.customBlocks = customBlocks;
			vm.generators = generators;
			vm.init = init;

			vm.customBlocks();
			vm.generators();
			vm.init();

			function customBlocks() {
				Blockly.Blocks.fw = {
				  	init: function() {
						this.appendDummyInput()
        					.appendField('Forward');
						this.setPreviousStatement(true);
	      				this.setNextStatement(true);
					    this.setColour(260);
				  	}
				};
				Blockly.Blocks.rr = {
				  	init: function() {
					  	this.appendDummyInput()
  							.appendField('Rotate right');
  						this.setPreviousStatement(true);
  						this.setNextStatement(true);
						this.setColour(260);
				  	}
				};
				Blockly.Blocks.rl = {
				  	init: function() {
					  	this.appendDummyInput()
  							.appendField('Rotate left');
  						this.setPreviousStatement(true);
  						this.setNextStatement(true);
						this.setColour(260);
				  	}
				};
				Blockly.Blocks.lt = {
				  	init: function() {
					  	this.appendDummyInput()
  							.appendField('Lightbulb');
  						this.setPreviousStatement(true);
  						this.setNextStatement(true);
						this.setColour(260);
				  	}
				};
			}

			function generators() {
				Blockly.JavaScript.fw = function(block) {
				  	return 'programService.addInstruction(instructionFactory.getInstruction(\x27' + block.type + '\x27));';
				};
				Blockly.JavaScript.rr = function(block) {
				  	return 'programService.addInstruction(instructionFactory.getInstruction(\x27' + block.type + '\x27));';
				};
				Blockly.JavaScript.rl = function(block) {
				  	return 'programService.addInstruction(instructionFactory.getInstruction(\x27' + block.type + '\x27));';
				};
				Blockly.JavaScript.lt = function(block) {
					return 'programService.addInstruction(instructionFactory.getInstruction(\x27' + block.type + '\x27));';
				};
			}

			function init() {
				vm.workspace = Blockly.inject('blockly-inner',
					{toolbox: document.getElementById('toolbox')});
			}
		}
	}
})();
