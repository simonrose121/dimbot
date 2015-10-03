describe('Game Controller', function() {
	beforeEach(module('dimbot'));

	// Get app controller
	var $controller;

	beforeEach(inject(function(_$controller_){
	    // The injector unwraps the underscores (_) from around the parameter names when matching
	    $controller = _$controller_;
	}));

	// Get test specific controller
	var controller;

    beforeEach(function() {
      controller = $controller('dimbot.game');
    });

	it('Instruction list is initialised on app start', function() {
		expect(controller.instructionList).toBeDefined();
		expect(controller.instructionList[0]).toEqual('fwd');
	});
});
