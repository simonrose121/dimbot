describe('Log Service', function() {
	beforeEach(module('dimbot'));

	var service, instructionFactory, $httpBackend;

	beforeEach(inject(function($injector) {
		service = $injector.get('logService');
		instructionFactory = $injector.get('instructionFactory');
		$httpBackend = $injector.get('$httpBackend');
	}));

	it('Can post log and recieve response', function() {
		// arrange
		var instruction = instructionFactory.getInstruction('fw');

		// act
		service.addedInstruction(instruction, 'click', 0);

		$httpBackend
			.when('POST', 'localhost:8079/log/')
			.respond(200);

		// assert
		//expect(ins).toBeDefined();
	});
});
