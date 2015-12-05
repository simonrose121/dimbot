(function() {
	angular
		.module('dimbot.game')
		.factory('instructionFactory', instructionFactory);

	instructionFactory.$Inject = ['logger'];

	function instructionFactory(logger) {

		var Instruction = function(name, src) {
			this.name = name;
			this.src = src;
		};

		var factory = {
			getInstruction: getInstruction
		};

		return factory;

		function getInstruction(type) {
			switch(type) {
				case 'fw':
					return new Instruction("fw",
						"client/assets/img/forward-instruction.png");
				case 'rr':
					return new Instruction("rr",
						"client/assets/img/right-rotate-instruction.png");
				case 'rl':
					return new Instruction("rl",
						"client/assets/img/left-rotate-instruction.png");
				case 'lt':
					return new Instruction("lt",
						"client/assets/img/lightbulb.png");
			}
		}
	}
})();
