describe('Light Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('lightService');
	}));

	it('lightService is initialised', function() {
		expect(service).toBeDefined();
	});

	beforeEach(function() {
		var size = 100;
		var color = 0x0000FF;
		var wireframe = false;
		var geometry = new THREE.BoxGeometry(size, size, size);
		var material = new THREE.MeshBasicMaterial( { color: color, wireframe: wireframe } );
		var light = new THREE.Mesh( geometry, material );
		light.position.set(size * 0, size * 0, -100);
		service.setLight(light);
	});

	it('Can get light', function() {
		// arrange
		var x = 0;

		// act
		var light = service.getLight();

		// assert
		expect(light).toBeDefined();
		expect(light.position.x).toEqual(0);
	});

	it('Can check light status', function() {
		// arrange
		var expected = true;

		// act
		service.turnOn();
		var status = service.isLightOn();

		// assert
		expect(status).toEqual(expected);
	});

	it('Can get light colour in hex string', function() {
		// arrange
		var expected = 'ff';

		// act
		var colour = service.getColour();

		// assert
		expect(colour).toEqual(expected);
	});

	it('Can check position of light matches expected position', function() {
		// arrange
		var expected = true;
		var y = 0;
		var x = 0;

		// act
		var isMatching = service.checkPositionMatch(x, y);

		// assert
		expect(isMatching).toEqual(expected);
	});

	it('Can turn light on', function() {
		// arrange
		var expected = true;

		// act
		service.turnOn();
		var status = service.isLightOn();

		// assert
		expect(status).toEqual(expected);
	});

	it('Can turn light off', function() {
		// arrange
		var expected = false;

		// act
		service.turnOff();
		var status = service.isLightOn();

		// assert
		expect(status).toEqual(expected);
	});
});
