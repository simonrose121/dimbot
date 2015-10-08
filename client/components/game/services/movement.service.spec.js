describe('Movement Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('movementService');
	}));

	it('Movement service is initialised', function() {
		expect(service).toBeDefined();
	});

	it('setIndex method handles edge cases', function() {
		// arrange
		var index = 0;

		// act
		var lastIndex = service.setIndex(-1);
		var firstIndex = service.setIndex(4);

		// assert
		expect(lastIndex).toEqual(3);
		expect(firstIndex).toEqual(0);
	});

	// it('setDirection chooses direction correctly', function() {
	// 	// arrange
	// 	var rl = 'rl';
	//
	// 	// act
	// 	service.setDirection(rl);
	//
	// 	// assert
	// 	expect(service.vm.direction).toBeDefined();
	// });
});
