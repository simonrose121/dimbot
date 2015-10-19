describe('Direction Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('directionService');
	}));

	it('Direction service is initialised', function() {
		expect(service).toBeDefined();
	});

	it('Can get direction by index', function() {
		// arrange
		var index = 0;
		var direction;
		var expectedDirection = {
			name: 'n',
			x: 0,
			y: 100
		};

		// act
		direction = service.getDirectionByIndex(index);

		// assert
		expect(direction).toBeDefined();
		expect(direction).toEqual(expectedDirection);
	});

	it('Can get direction by name', function() {
		// arrange
		var name = 'e';
		var direction;
		var expectedDirection = {
			name: 'e',
			x: 100,
			y: 0
		};

		// act
		direction = service.getDirectionByName(name);

		// assert
		expect(direction).toBeDefined();
		expect(direction).toEqual(expectedDirection);
	});
});
