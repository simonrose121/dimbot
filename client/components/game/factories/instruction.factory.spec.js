describe('Instruction Factory', function() {
	beforeEach(module('dimbot'));

	var factory;

	beforeEach(inject(function($injector) {
		factory = $injector.get('instructionFactory');
	}));

	it('Instruction factory is initialised', function() {
		expect(factory).toBeDefined();
	});

	it('Can instantiate foward instruction using factory', function() {
		// arrange
		var newInstruction;

		// act
		newInstruction = factory.getInstruction('fw');

		// assert
		expect(newInstruction).toBeDefined();
		expect(newInstruction.name).toEqual('fw');
		expect(newInstruction.src).toEqual('client/assets/img/up-instruction.png');
	});

	it('Can instantiate right rotate instruction using factory', function() {
		// arrange
		var newInstruction;

		// act
		newInstruction = factory.getInstruction('rr');

		// assert
		expect(newInstruction).toBeDefined();
		expect(newInstruction.name).toEqual('rr');
		expect(newInstruction.src).toEqual('client/assets/img/right-rotate-instruction.png');
	});

	it('Can instantiate left rotate instruction using factory', function() {
		// arrange
		var newInstruction;

		// act
		newInstruction = factory.getInstruction('rl');

		// assert
		expect(newInstruction).toBeDefined();
		expect(newInstruction.name).toEqual('rl');
		expect(newInstruction.src).toEqual('client/assets/img/left-rotate-instruction.png');
	});

	it('Can instantiate light instruction using factory', function() {
		// arrange
		var newInstruction;

		// act
		newInstruction = factory.getInstruction('lt');

		// assert
		expect(newInstruction).toBeDefined();
		expect(newInstruction.name).toEqual('lt');
		expect(newInstruction.src).toEqual('client/assets/img/lightbulb.png');
	});
});
