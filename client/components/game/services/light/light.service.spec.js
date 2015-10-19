describe('Light Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('lightService');
	}));

	it('lightService is initialised', function() {
		expect(service).toBeDefined();
	});

	it('Light is initialised', function() {
		// arrange
		

		// act

		// assert
	});
});
