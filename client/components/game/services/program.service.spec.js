describe('Program Service', function() {
	beforeEach(module('dimbot.game'));

	var service, Instruction, program;

	beforeEach(inject(function($injector) {
	    service = $injector.get('ProgramService');
		Instruction = $injector.get('InstructionFactory');
	}));

	it('Program service is initialised', function() {
		expect(service).toBeDefined();
	});

	it('Program array is initialised', function() {
		// arrange

		// act
		program = service.getProgram();

		// assert
		expect(program).toBeDefined();
	});

	it('Can instantiate instructions using factory', function() {
		// arrange
		var newInstruction;

		// act
		newInstruction = new Instruction('up', '/');

		// assert
		expect(newInstruction).toBeDefined();
		expect(newInstruction.name).toEqual('up');
		expect(newInstruction.src).toEqual('/');
	});

	it('Can add instructions to program', function() {
		// arrange
		var newInstruction;

		// act
		newInstruction = new Instruction('up', '/');
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
		newInstruction = new Instruction('up', '/');
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
});
