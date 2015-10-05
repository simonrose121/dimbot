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

	it('Instruction list is initialised', function() {
		expect(controller.instructionList).toBeDefined();
		expect(controller.instructionList[0]).toEqual('fwd');
	});
});
