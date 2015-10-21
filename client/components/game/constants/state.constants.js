(function() {
	angular
		.module('dimbot.game')
		.constant('state', {
			states: {
				PLAYING : 0,
				COMPLETE : 1,
				PAUSED: 2,
			},
			currentState: null
		});
})();
