goog.require('Blockly.JavaScript');

(function() {
	angular
		.module('dimbot.game')
		.directive('dimBlocklyDirective', dimBlocklyDirective);

	dimBlocklyDirective.$Inject = ['logger'];

	function dimBlocklyDirective(logger) {
		var directive = {
			restrict: 'E',
			link: link
		};

		return directive;

		function link(scope, elem) {
			var vm = this;

			vm.workspace = null;
			vm.code = null;

			vm.bind = bind;
			vm.customBlocks = customBlocks;
			vm.generate = generate;
			vm.generators = generators;
			vm.init = init;

			vm.bind();
			vm.customBlocks();
			vm.generators();
			vm.init();

			function bind() {
				$('#status.play').bind('click', function() {
					vm.generate();
				});
			}

			function customBlocks() {
				Blockly.Blocks.move_forward = {
				  init: function() {
				    this.appendValueInput("1")
				        .setCheck("Number")
				        .setAlign(Blockly.ALIGN_RIGHT)
				        .appendField("Forward");
					this.setOutput(true);
				    this.setColour(260);
				  }
				};
				Blockly.Blocks.lightbulb = {
				  init: function() {
				    this.appendValueInput("1")
				        .setAlign(Blockly.ALIGN_RIGHT)
				        .appendField("Lightbulb");
					this.setOutput(true);
				    this.setColour(260);
				  }
				};
			}

			function generate() {
				logger.info('code is', vm.code);
			}

			function generators() {
				Blockly.JavaScript.move_forward = function(block) {
				  return ['fw', Blockly.JavaScript.ORDER_MEMBER];
				};

				Blockly.JavaScript.lightbulb = function(block) {
				  return ['lt', Blockly.JavaScript.ORDER_MEMBER];
				};
			}

			function init() {
				vm.workspace = Blockly.inject('instructions-inner',
					{toolbox: document.getElementById('toolbox')});

				function update() {
					vm.code = Blockly.JavaScript.workspaceToCode(vm.workspace);
				}

				vm.workspace.addChangeListener(update);
			}
		}
	}
})();
