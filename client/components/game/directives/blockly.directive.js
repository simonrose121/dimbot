(function() {
	angular
		.module('dimbot.game')
		.directive('dimBlocklyDirective', dimBlocklyDirective);

	dimBlocklyDirective.$Inject = ['logger'];

	function dimBlocklyDirective(logger) {
		var directive = {
			restrict: 'E',
			link: link,
			//templateUrl: "<div id='blocklyDiv'></div>"
		};

		return directive;

		function link(scope, elem) {
			var workspace = Blockly.inject('blocklyDiv',
				{toolbox: document.getElementById('toolbox')});
		}
	}
})();
