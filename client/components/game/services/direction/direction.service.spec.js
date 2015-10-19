describe('Direction Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('directionService');
	}));

	it('Direction service is initialised', function() {
		expect(service).toBeDefined();
	});

	it('Lookup method initialises correctly and works', function() {
		// arrange
		var lookup;

		var name = 'w';
		var direction;
		var expectedDirection = {
			name: 'w',
			x: -100,
			y: 0
		};

		// act
		lookup = service.directionLookup();
		direction = lookup[name];

		// assert
		expect(lookup).toBeDefined();
		expect(direction).toEqual(expectedDirection);
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

	it('Can get index from direction', function() {
		// arrange
		var expected = 2;
		var index;
		var name = 's';
		var dir;

		// act
		dir = service.getDirectionByName(name);
		index = service.getIndexFromDirection(dir);

		// assert
		expect(index).toEqual(expected);
	});
});
