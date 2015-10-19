describe("Image Service", function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('imageService');

		setFixtures('<div id="status" class="play"></div>');
	}));

	it('Can change status button to rewind', function() {
		// arrange
		

		// act

		// assert
	});
});
