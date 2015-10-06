describe('Game Controller', function() {
	beforeEach(module('dimbot.game'));

	// Get app controller
	var $controller;

	beforeEach(inject(function(_$controller_){
	    // The injector unwraps the underscores (_) from around the parameter names when matching
	    $controller = _$controller_;
	}));

	// Get test specific controller
	var controller;

    beforeEach(function() {
      	controller = $controller('Game');
    });

	it('Controller to be defined', function() {
		expect(controller).toBeDefined();
	});

	it('Program is initialised', function() {
		expect(controller.program).toBeDefined();
	});

	it('Instructions are intialised and populated', function() {
		expect(controller.instructions).toBeDefined();
		expect(controller.instructions.length).toBeGreaterThan(0);
		expect(controller.instructions[0].name).toBe('up');
	});
});
