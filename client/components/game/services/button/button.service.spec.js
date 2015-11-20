describe('Button Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('buttonService');
	}));

	it('Button service is initialised', function() {
		expect(service).toBeDefined();
	});
});
