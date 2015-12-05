(function() {
	angular
		.module('dimbot.game')
		.constant('common', {
			gridSize: 150,
			userId: null,
			imageSize: 40,
			blockColour: 230,
			speed: 700,
			robotColour: 0x757575,
			gridColour: 0xCCCCCC,
			type: null,
			level: 1
		});
})();
