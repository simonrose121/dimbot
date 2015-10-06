describe('Instruction Service', function() {
	beforeEach(module('dimbot.game'));

	var service, Instruction, instructions;

	beforeEach(inject(function($injector) {
	    service = $injector.get('InstructionService');
		Instruction = $injector.get('InstructionFactory');
	}));

	it('Instruction service is initialised', function() {
		expect(service).toBeDefined();
	});

	it('Instructions list array is initialised', function() {
		// arrange

		// act
		instructions = service.getInstructionList();

		// assert
		expect(instructions).toBeDefined();
	});

	it('Can instantiate instructions using factory', function() {
		// arrange
		var newInstruction;

		// act
		newInstruction = new Instruction('up', '/');

		// assert
		expect(newInstruction).toBeDefined();
		expect(newInstruction.id).toEqual('up');
		expect(newInstruction.src).toEqual('/');
	});

	it('Can add instructions', function() {
		// arrange
		var newInstruction;

		// act
		newInstruction = new Instruction('up', '/');
		service.addInstruction(newInstruction);

		// assert
		var instructions = service.getInstructionList();
		expect(instructions).toBeDefined();
		expect(instructions[0]).toEqual(newInstruction);
		expect(instructions[1]).toBeUndefined();
	});

	it('Can remove instructions', function() {
		// arrange
		var newInstruction;

		// act
		newInstruction = new Instruction('up', '/');
		service.removeInstruction(newInstruction);

		// assert
		var instructions = service.getInstructionList();
		expect(instructions).toBeDefined();
		expect(instructions[0]).toBeUndefined();
		expect(instructions[1]).toBeUndefined();
	});
});
