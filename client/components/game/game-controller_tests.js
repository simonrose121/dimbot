describe('Game Controller', function() {
	beforeEach(module('dimbot'));

	// Get app controller
	var $controller;

	beforeEach(inject(function(_$controller_){
	    // The injector unwraps the underscores (_) from around the parameter names when matching
	    $controller = _$controller_;
	}));

	// Get test specific controller
	var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('dimbot.game', { $scope: $scope });
    });

	it('Instruction list is initialised on app start', function() {
		expect($scope.instructionList).toBeDefined();
		expect($scope.instructionList[0]).toEqual('fwd');
	});
});
