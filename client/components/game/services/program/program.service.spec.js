describe('Program Service', function() {
	beforeEach(module('dimbot'));

	var service, factory, program;

	beforeEach(inject(function($injector) {
	    service = $injector.get('programService');
		factory = $injector.get('instructionFactory');
	}));

	it('Program service is initialised', function() {
		expect(service).toBeDefined();
	});

	it('Instruction factory is initialised', function() {
		expect(factory).toBeDefined();
	});

	it('Program array is initialised', function() {
		// arrange

		// act
		program = service.getProgram();

		// assert
		expect(program).toBeDefined();
	});

	it('Can add instructions to program', function() {
		// arrange
		var newInstruction;

		// act
		service.setLimit(8);
		newInstruction = factory.getInstruction('fw');
		service.addInstruction(newInstruction);

		// assert
		var program = service.getProgram();
		expect(program).toBeDefined();
		expect(program[0]).toEqual(newInstruction);
		expect(program[1]).toBeUndefined();
	});

	it('Can remove instructions', function() {
		// arrange
		var ins = factory.getInstruction('fw');

		// act
		service.addInstruction(ins);

		// mock an index for the instruction
		service.removeInstruction(0);
		var program = service.getProgram();

		// assert
		expect(program).toBeDefined();
		expect(program[0]).toBeUndefined();
		expect(program[1]).toBeUndefined();
	});

	it('Can empty program', function() {
		// arrange
		var ins1 = factory.getInstruction('fw');
		var ins2 = factory.getInstruction('rr');
		var program;

		// act
		service.addInstruction(ins1);
		service.addInstruction(ins2);
		service.empty();
		program = service.getProgram();

		// assert
		expect(program.length).toBe(0);
	});
});
