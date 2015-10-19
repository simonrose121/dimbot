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

	it('Light is initialised', function() {
		// arrange
		var x = 0;

		// act
		var light = service.getLight();

		// assert
		expect(light).toBeDefined();
		expect(light.position.x).toEqual(0);
	});
});
