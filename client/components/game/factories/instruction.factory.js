(function() {
	angular
		.module('dimbot.game')
		.factory('instructionFactory', instructionFactory)

	function instructionFactory() {
		var Instruction = function(name, src) {
			this.name = name;
			this.src = src;
		};

		var factory = {
			getInstruction: getInstruction
		}

		return factory;

		function getInstruction(type) {
			switch(type) {
				case 'fw':
					return new Instruction("fw",
						"client/assets/img/up-instruction.png");
					break;
				case 'rr':
					return new Instruction("rr",
						"client/assets/img/right-rotate-instruction.png");
					break;
				case 'rl':
					return new Instruction("rl",
						"client/assets/img/left-rotate-instruction.png");
					break;
			}
		}
	};
})();
