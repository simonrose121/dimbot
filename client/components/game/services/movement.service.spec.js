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
		var expectedDir = {
			name: 's',
			x: 0,
			y: -100
		}

		// act
		// rotate object right
		service.setDirection(rr);
		var direction = service.getDirection();

		// assert
		expect(direction).toBeDefined();
		expect(direction).toEqual(expectedDir);
	});
});
