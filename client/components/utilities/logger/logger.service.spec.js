describe('Logger Service', function() {
	beforeEach(module('dimbot'));

	var service, $log;

	beforeEach(inject(function($injector, _$log_) {
		service = $injector.get('logger');
		$log = _$log_;
	}));

	it('Logger service is initialised', function() {
		expect(service).toBeDefined();
	});

	it('Expect debug to print message', function() {
		// arrange
		var message = 'test';
		var data = {
			a: 1,
			b: 2
		};

		// act
		service.debug(message, data);

		// assert
		expect($log.debug.logs[0]).toBeDefined();
	});

	it('Expect error to print message', function() {
		// arrange
		var message = 'test';
		var data = {
			a: 1,
			b: 2
		};

		// act
		service.error(message, data);

		// assert
		expect($log.error.logs[0]).toBeDefined();
	});

	it('Expect log to print message', function() {
		// arrange
		var message = 'test';
		var data = {
			a: 1,
			b: 2
		};

		// act
		service.log(message, data);

		// assert
		expect($log.log.logs[0]).toBeDefined();
	});

	it('Expect info to print message', function() {
		// arrange
		var message = 'test';
		var data = {
			a: 1,
			b: 2
		};

		// act
		service.info(message, data);

		// assert
		expect($log.info.logs[0]).toBeDefined();
	});

	it('Expect debug to print message', function() {
		// arrange
		var message = 'test';
		var data = {
			a: 1,
			b: 2
		};

		// act
		service.warn(message, data);

		// assert
		expect($log.warn.logs[0]).toBeDefined();
	});
});
