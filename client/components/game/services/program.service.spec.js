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
		var newInstruction;

		// act
		newInstruction = factory.getInstruction('fw');
		service.addInstruction(newInstruction);
		var program = service.getProgram();

		// check that instruction has been added
		expect(program[0]).toBeDefined();

		// mock an index for the instruction
		service.removeInstruction(0);

		// assert
		var program = service.getProgram();
		expect(program).toBeDefined();
		expect(program[0]).toBeUndefined();
		expect(program[1]).toBeUndefined();
	});

	it('Can empty program', function() {
		// arrange

		// act

		// assert
	});
});
