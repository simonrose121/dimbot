describe('Movement Service', function() {
	beforeEach(module('dimbot'));

	var service,
		directionService,
		programService,
		factory,
		imageService,
		levelService,
		lightService;

	beforeEach(inject(function($injector) {
		service = $injector.get('movementService');
		directionService = $injector.get('directionService');
		programService = $injector.get('programService');
		imageService = $injector.get('imageService');
		levelService = $injector.get('levelService');
		lightService = $injector.get('lightService');
		factory = $injector.get('instructionFactory');
	}));

	var mesh, light;

	beforeEach(function() {
		var geometry = new THREE.BoxGeometry(50, 50, 50);
		var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set(100 * 1, 100 * 1, 0);
		service.setMesh(mesh);
	});

	beforeEach(function() {
		var size = 100;
		var color = 0x0000FF;
		var wireframe = false;
		var geometry = new THREE.BoxGeometry(size, size, size);
		var material = new THREE.MeshBasicMaterial( { color: color, wireframe: wireframe } );
		light = new THREE.Mesh( geometry, material );
		light.position.set(size * 0, size * 0, -100);
		lightService.setLight(light);
	});

	it('Movement service is initialised', function() {
		expect(service).toBeDefined();
	});

	it('Can get starting direction', function() {
		// arrange
		var expected = directionService.getDirectionByName('e');
		var direction;

		// act
		direction = service.getDirection();

		// assert
		expect(direction).toBeDefined();
		expect(direction).toEqual(expected);
	});

	it('Can set and get mesh', function() {
		// arrange
		var object;

		// act
		service.setMesh(mesh);
		object = service.getMesh();

		// assert
		expect(object).toBeDefined();
		expect(object).toBe(mesh);
	});

	it('Cannot run program with empty program list', function() {
		// arrange
		spyOn(service, 'loop').and.callThrough();
		spyOn(service, 'perform').and.callThrough();

		// act
		var program = programService.getProgram();
		service.run();

		// assert
		expect(program.length).toEqual(0);
		expect(service.loop).not.toHaveBeenCalled();
		expect(service.perform).not.toHaveBeenCalled();
	});

	it('Can run program with populated program list', function() {
		// arrange
		var ins = factory.getInstruction('fw');
		spyOn(service, 'loop').and.callThrough();
		spyOn(service, 'perform').and.callThrough();
		spyOn(imageService, 'stop');

		// act
		programService.addInstruction(ins);
		var program = programService.getProgram();

		service.run();

		// assert
		expect(program.length).toEqual(1);
		expect(service.loop).toHaveBeenCalled();
		expect(service.perform).toHaveBeenCalled();
		expect(imageService.stop).toHaveBeenCalled();
	});

	it('Forward method and update level called when moving forwards', function() {
		// arrange
		spyOn(service, 'forward').and.callThrough();
		spyOn(levelService, 'updateLevel').and.callThrough();

		var ins = factory.getInstruction('fw');

		// act
		service.perform(ins);

		// assert
		expect(service.forward).toHaveBeenCalled();
		expect(levelService.updateLevel).toHaveBeenCalled();
	});

	it('Mesh moves forward', function() {
		// arrange
		var expectedPosition = {
			x: 200,
			y: 100,
			z: 0
		};
		var ins = factory.getInstruction('fw');
		var mesh;

		// act
		service.perform(ins);

		mesh = service.getMesh();

		// assert
		//expect(mesh.position).toEqual(expectedPosition);
	});

	it('Mesh rotates right', function() {
		// arrange


		// act

		// assert
	});

	it('Mesh rotates left', function() {
		// arrange


		// act

		// assert
	});

	it('Can rewind program', function() {
		// arrange
		var expectedPosition = {
			x: 100,
			y: 100,
			z: 0
		};
		var expectedDirection = directionService.getDirectionByName('e');
		var expectedLevel = [
			3, 3, 3, 3, 3,
		 	3, 0, 0, 0, 3,
			3, 1, 0, 2, 3,
			3, 0, 0, 0, 3,
			3, 3, 3, 3, 3
		];

		// act
		service.rewind();
		var direction = service.getDirection();
		var level = levelService.readLevel();

		// assert
		expect(mesh.position.x).toEqual(expectedPosition.x);
		expect(mesh.position.y).toEqual(expectedPosition.y);
		expect(mesh.position.z).toEqual(expectedPosition.z);
		expect(direction).toEqual(expectedDirection);
		expect(level).toEqual(expectedLevel);
	});

	it('Can reset program', function() {
		// arrange
		var program;
		var ins = factory.getInstruction('fw');

		// act
		programService.addInstruction(ins);
		service.reset();
		program = programService.getProgram();

		// assert
		expect(program).toBeDefined();
		expect(program.length).toEqual(0);
	});
});