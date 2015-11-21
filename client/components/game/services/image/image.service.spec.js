describe("Image Service", function() {
	beforeEach(module('dimbot'));

	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('imageService');

		setFixtures('<div id="status"></div>');
	}));

	it('Fixtures are set up correctly', function() {
		// arrange
		var expected = 'play';

		// act
		service.play();

		// assert
		expect($('#status')).toBeDefined();
		expect($('#status')).toBeInDOM();
		expect($('#status')).toHaveClass(expected);
	});

	it('Can change status button to play', function() {
		// arrange
		var expectedClass = 'play';

		// act
		service.play();

		// assert
		expect($('#status')).toHaveClass(expectedClass);
	});

	it('Can change status button to rewind', function() {
		// arrange
		var expectedClass = 'rewind';

		// act
		service.rewind();

		// assert
		expect($('#status')).toHaveClass(expectedClass);
	});

	it('Can change status button to stop', function() {
		// arrange
		var expectedClass = 'stop';

		// act
		service.stop();

		// assert
		expect($('#status')).toHaveClass(expectedClass);
	});

	it('Can highlight instruction', function() {
		// arrange
		var ins = {
			index: 0
		};
		setFixtures('<img id="' + ins.index + '">');

		// act
		service.highlight(ins.index);

		// assert
		expect($('#' + ins.index)).toBeInDOM();
		expect($('#' + ins.index)).toHaveClass('highlight');
	});

	it('Can unhighlight instruction', function() {
		// arrange
		var ins = {
			index: 0
		};
		setFixtures('<img id="' + ins.index + '">');

		// act
		service.unhighlight(ins.index);

		// assert
		expect($('#' + ins.index)).toBeInDOM();
		expect($('#' + ins.index)).not.toHaveClass('highlight');
	});
});
