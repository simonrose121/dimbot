describe('Movement Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('movementService');
	}));

	it('Movement service is initialised', function() {
		expect(service).toBeDefined();
	});
});
