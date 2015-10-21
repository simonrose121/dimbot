(function() {
	angular
		.module('dimbot.game')
		.constant('state', {
			state: {
				PLAYING : 0,
				COMPLETE : 1,
				PAUSED: 2,
			}
		});
})();
