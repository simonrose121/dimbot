describe('Db Service', function() {
	beforeEach(module('dimbot'));

	var service, instructionFactory, $httpBackend;

	beforeEach(inject(function($injector) {
		service = $injector.get('dbService');
		instructionFactory = $injector.get('instructionFactory');
		$httpBackend = $injector.get('$httpBackend');
	}));

	var mockResponse = {
		"user_id" : 12321,
		"category" : "instruction",
		"type" : "add",
		"instruction" : "fw",
		"environment" : "lightbot",
		"level" : 1,
		"message" : "Added instruction fw to program using click at index: 0",
		"timestamp" : "2015-12-06T16:45:20.190Z",
		"__v" : 0
	};

	it('Can post log and receive response', function() {
		// arrange
		var instruction = instructionFactory.getInstruction('fw');

		// act
		$httpBackend
			.whenPOST('/log/instruction/')
			.respond(200, mockResponse);

		service.addedInstruction(instruction);

		$httpBackend.flush();
		// assert
		expect(instruction).toBeDefined();
	});
});
