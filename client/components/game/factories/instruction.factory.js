(function() {
	angular
		.module('dimbot.game')
		.factory('InstructionFactory', InstructionFactory)

	// inject

	function InstructionFactory() {

		var Instruction = function(name, src) {
			this.name = name;
			this.src = src;
		}

		return Instruction;
	};
})();
