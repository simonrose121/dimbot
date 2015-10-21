(function() {
	angular
		.module('dimbot.game')
		.constant('state', {
			states: {
				COMPOSING : 0,
				RUNNING: 1,
				STOPPED: 2,
				COMPLETE : 3,
				PAUSED: 4,
			},
			currentState: null
		});
})();
