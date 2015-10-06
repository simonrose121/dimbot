(function() {
	angular
		.module('dimbot.game')
		.factory('InstructionFactory', InstructionFactory)

	// inject

	function InstructionFactory() {

		var Instruction = function(id, img) {
			this.id = id;
			this.img = img;
		}

		return Instruction;
	};
})();
