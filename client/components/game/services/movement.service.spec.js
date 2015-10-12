describe('Movement Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		directionService = $injector.get('directionService');
		service = $injector.get('movementService');
	}));

	it('Movement service is initialised', function() {
		expect(service).toBeDefined();
	});

	it('setIndex method handles edge cases', function() {
		// arrange
		// index = 1 on service start

		// act
		var lastIndex = service.setIndex(-2);
		var firstIndex = service.setIndex(3);

		// assert
		expect(lastIndex).toEqual(3);
		expect(firstIndex).toEqual(0);
	});

	it('setDirection chooses direction correctly', function() {
		// arrange
		var rr = 'rr';
		var expectedDir = directionService.getDirectionByName('s');

		// act
		// rotate object right
		service.setDirection(rr);
		var direction = service.getDirection();

		// assert
		expect(direction).toBeDefined();
		expect(direction).toEqual(expectedDir);
	});

	it('Can reset level direction', function() {
		// arrange
		var expectedDir = directionService.getDirectionByName('e');
		var direction;

		// act
		service.setDirection('rr');

		// reset level
		service.reset();
		direction = service.getDirection();

		// assert
		expect(direction).toBeDefined();
		expect(direction).toEqual(expectedDir);
	});
});
