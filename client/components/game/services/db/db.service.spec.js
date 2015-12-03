describe('Db Service', function() {
	beforeEach(module('dimbot'));

	var service, instructionFactory, $httpBackend;

	beforeEach(inject(function($injector) {
		service = $injector.get('dbService');
		instructionFactory = $injector.get('instructionFactory');
		$httpBackend = $injector.get('$httpBackend');
	}));

	var mockResponse = {
		"user_id" : 5,
		"type" : "button_press",
		"summary" : "button rewind",
		"message" : "Pressed rewind",
		"timestamp" : "2015-11-17T10:45:18.511Z",
		"__v" : 0
	};

	it('Can post log and receive response', function() {
		// arrange
		var instruction = instructionFactory.getInstruction('fw');

		// act
		$httpBackend
			.whenPOST('/log/')
			.respond(200, mockResponse);

		service.addedInstruction(instruction);

		$httpBackend.flush();
		// assert
		expect(instruction).toBeDefined();
	});
});