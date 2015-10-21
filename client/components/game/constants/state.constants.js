(function() {
	angular
		.module('dimbot.game')
		.constant('state', {
			COMPOSING : 0,
			RUNNING: 1,
			STOPPED: 2,
			COMPLETE : 3,
			PAUSED: 4,
			current: null
		});
})();
