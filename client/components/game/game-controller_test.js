describe('Game Controller', function() {
	beforeEach(module('dimbot.game'));

	var $controller;

	beforeEach(inject(function(_$controller_){
	    // The injector unwraps the underscores (_) from around the parameter names when matching
	    $controller = _$controller_;
	}));
});
