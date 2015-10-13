describe('Instruction Factory', function() {
	beforeEach(module('dimbot'));

	var factory;

	beforeEach(inject(function($injector) {
		factory = $injector.get('instructionFactory');
	}));

	it('Instruction factory is initialised', function() {
		expect(factory).toBeDefined();
	});

	it('Can instantiate instructions using factory', function() {
		// arrange
		var newInstruction;

		// act
		newInstruction = factory.getInstruction('fw');

		// assert
		expect(newInstruction).toBeDefined();
		expect(newInstruction.name).toEqual('fw');
		expect(newInstruction.src).toEqual('client/assets/img/up-instruction.png');
	});
});
