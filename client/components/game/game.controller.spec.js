describe('Game Controller', function() {
	beforeEach(module('dimbot'));

	// Get app controller
	var $controller;

	beforeEach(inject(function(_$controller_){
	    // The injector unwraps the underscores (_) from around the parameter names when matching
	    $controller = _$controller_;
	}));

	// Get test specific controller
	var controller, $scope;

    beforeEach(function() {
      	controller = $controller('Game', { $scope: $scope });
    });

	it('Controller to be defined', function() {
		expect(controller).toBeDefined();
	});

	it('Program is initialised', function() {
		expect(controller.program).toBeDefined();
	});
});
