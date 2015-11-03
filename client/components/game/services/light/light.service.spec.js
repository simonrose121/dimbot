describe('Light Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('lightService');
	}));

	it('lightService is initialised', function() {
		expect(service).toBeDefined();
	});

	var index;

	beforeEach(function() {
		var size = 100;
		var color = 0x0000FF;
		var wireframe = false;
		var geometry = new THREE.BoxGeometry(size, size, size);
		var material = new THREE.MeshBasicMaterial( { color: color, wireframe: wireframe } );
		var light = new THREE.Mesh( geometry, material );
		var x = 0;
		var y = 0;

		light.position.set(size * x, size * y, -100);
		service.addLight(light);
		index = service.getIndexFromPosition(x, y);
	});

	it('Can add multiple lights', function() {
		// arrange
		var size = 100;
		var color = 0x0000FF;
		var wireframe = false;
		var geometry = new THREE.BoxGeometry(size, size, size);
		var material = new THREE.MeshBasicMaterial( { color: color, wireframe: wireframe } );
		var light = new THREE.Mesh( geometry, material );
		var x = 0;
		var y = 0;

		light.position.set(size * x, size * y, -100);
		service.addLight(light);

		// act
		var lights = service.getAllLights();

		// assert
		expect(lights.length).toEqual(2);
	});

	it('Can get light', function() {
		// arrange
		var x = 0;
		var y = 0;

		// act
		var light = service.getLight(index);

		// assert
		expect(light).toBeDefined();
		expect(light.position.x).toEqual(x);
		expect(light.position.y).toEqual(y);
	});

	it('Can check light status', function() {
		// arrange
		var expected = true;

		// act
		service.turnOn(index);
		var status = service.isLightOn(index);

		// assert
		expect(status).toEqual(expected);
	});

	it('Can get light colour in hex string', function() {
		// arrange
		var expected = 'ff';

		// act
		var colour = service.getColour(index);

		// assert
		expect(colour).toEqual(expected);
	});

	it('Can get off hex colour', function() {
		// arrange
		var expected = 0x183ba6;

		// act
		var colour = service.getOffHex(index);

		// assert
		expect(colour).toEqual(expected);
	});

	it('Can turn light on', function() {
		// arrange
		var expected = true;

		// act
		service.turnOn(index);
		var status = service.isLightOn(index);

		// assert
		expect(status).toEqual(expected);
	});

	it('Can turn multiple lights on', function() {
		// arrange
		var expected = true;

		var size = 100;
		var color = 0x0000FF;
		var wireframe = false;
		var geometry = new THREE.BoxGeometry(size, size, size);
		var material = new THREE.MeshBasicMaterial( { color: color, wireframe: wireframe } );
		var light = new THREE.Mesh( geometry, material );
		var x = 100;
		var y = 100;

		light.position.set(size * 1, size * 1, -100);
		service.addLight(light);

		var index2 = service.getIndexFromPosition(x, y);

		// act
		service.turnOn(index);
		service.turnOn(index2);

		var status = service.allLightsOn();

		// assert
		expect(status).toEqual(expected);
	});

	it('Can turn light off', function() {
		// arrange
		var expected = false;

		// act
		service.turnOff(index);
		var status = service.isLightOn(index);

		// assert
		expect(status).toEqual(expected);
	});
});
