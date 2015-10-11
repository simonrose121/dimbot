describe('Level Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
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
		expect(level[0]).toEqual(0);
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
});
