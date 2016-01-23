(function() {
	angular
		.module('dimbot.game')
		.factory('instructionFactory', instructionFactory);

	instructionFactory.$Inject = ['logger'];

	/**
	 * Used to create instruction objects
	 *
	 * @param logger
	 * @return factory
	 */
	function instructionFactory(logger) {

		/**
		 * Instruction object constructor
		 *
		 * @param {string} name - Name of instruction
		 * @param {string} src - Source of image file
		 * @returns {object} Instruction
		 */
		var Instruction = function(name, src) {
			this.name = name;
			this.src = src;
		};

		var factory = {
			getInstruction: getInstruction
		};

		return factory;

		/**
		 * Instruction builder
		 *
		 * @param {string} type - Type of instruction to be returned
		 * @returns {object} Instruction
		 */
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
