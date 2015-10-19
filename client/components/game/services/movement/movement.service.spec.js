describe('Movement Service', function() {
	beforeEach(module('dimbot'));

	var service, directionService, programService, factory, imageService;

	beforeEach(inject(function($injector) {
		service = $injector.get('movementService');
		directionService = $injector.get('directionService');
		programService = $injector.get('programService');
		imageService = $injector.get('imageService');
		levelService = $injector.get('levelService');
		factory = $injector.get('instructionFactory');
	}));

	var mesh;

	beforeEach(function() {
		var geometry = new THREE.BoxGeometry(50, 50, 50);
		var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set(100 * 1, 100 * 1, 0);
		service.setMesh(mesh);
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

	});

	it('Can rotate right', function() {

	});

	it('Can rotate left', function() {

	});

	it('Can rewind program', function() {

	});

	it('Can reset program', function() {

	});
});
