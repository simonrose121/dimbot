describe('Level Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		directionService = $injector.get('directionService');
		service = $injector.get('levelService');
	}));

	it('levelService service is initialised', function() {
		expect(service).toBeDefined();
	});

	it('Can read level array', function() {
		// arrange
		var level;

		// act
		level = service.readLevel();

		// assert
		expect(level).toBeDefined();
		expect(level[0]).toEqual(3);
	});

	it('Can get level width', function() {
		// arrange
		var width;

		// act
		width = service.getWidth();

		// assert
		expect(width).toBeDefined();
		expect(width).toEqual(3);
	});

	it('Can get level height', function() {
		// arrange
		var height;

		// act
		height = service.getHeight();

		// assert
		expect(height).toBeDefined();
		expect(height).toEqual(3);
	});

	it('Update level sets the correct indexes', function() {
		// arrange
		var expectedLevel = [
			3, 3, 3, 3, 3,
		 	3, 0, 0, 0, 3,
			3, 0, 1, 2, 3,
			3, 0, 0, 0, 3,
			3, 3, 3, 3, 3
		];
		var direction = directionService.getDirectionByName('e');

		// act
		service.updateLevel(direction);
		var level = service.readLevel();

		// assert
		expect(level).toBeDefined();
		expect(level).toEqual(expectedLevel);
	});

	it('Update level sets lights to on', function() {

	});

	it('Update level sets lights to off', function() {

	});

	it('Check move allows movement inside the grid', function() {
		// arrange
		var canMove;
		var direction = directionService.getDirectionByName('e');

		// act
		canMove = service.checkMove(direction);

		// assert
		expect(canMove).toBeDefined();
		expect(canMove).toBe(true);
	});

	it('Check move restricts movement outside of grid', function() {
		// arrange
		var canMove;
		var direction = directionService.getDirectionByName('w');

		// act
		canMove = service.checkMove(direction);

		// assert
		expect(canMove).toBeDefined();
		expect(canMove).toBe(false);
	});
});
