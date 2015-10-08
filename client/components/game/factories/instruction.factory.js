(function() {
	angular
		.module('dimbot.game')
		.factory('instructionFactory', instructionFactory)

	// inject

	function instructionFactory() {

		var Instruction = function(name, src) {
			this.name = name;
			this.src = src;
		}

		return Instruction;
	};
})();
