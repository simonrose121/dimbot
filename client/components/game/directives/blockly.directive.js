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

			vm.customBlocks = customBlocks;
			vm.init = init;

			vm.customBlocks();
			vm.init();

			function customBlocks() {
				Blockly.Blocks.move_forward = {
				  init: function() {
				    this.appendValueInput("1")
				        .setCheck("Number")
				        .setAlign(Blockly.ALIGN_RIGHT)
				        .appendField("Forward");
				    this.setColour(260);
				  }
				};
				Blockly.Blocks.lightbulb = {
				  init: function() {
				    this.appendValueInput("1")
				        .setAlign(Blockly.ALIGN_RIGHT)
				        .appendField("Lightbulb");
				    this.setColour(260);
				  }
				};
			}

			function init() {
				var workspace = Blockly.inject('instructions-inner',
					{toolbox: document.getElementById('toolbox')});
			}
		}
	}
})();
