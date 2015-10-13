describe('Instruction Family', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		factory = $injector.get('instructionFactory');
	}));

	it('Instruction factory is initialised', function() {
		expect(factory).toBeDefined();
	});
});
