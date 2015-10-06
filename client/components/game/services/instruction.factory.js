(function() {
	angular
		.module('dimbot.game')
		.factory('InstructionFactory', InstructionFactory)

	// inject

	function InstructionFactory() {

		var Instruction = function(id, src) {
			this.id = id;
			this.src = src;
		}

		return Instruction;
	};
})();
