describe('Log Service', function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('logService');
	}));

	
});
