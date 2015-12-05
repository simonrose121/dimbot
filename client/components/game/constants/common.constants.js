(function() {
	angular
		.module('dimbot.game')
		.constant('common', {
			gridSize: 150,
			userId: 1,//null,
			imageSize: 40,
			blockColour: 230,
			speed: 700,
			robotColour: 0x757575,
			gridColour: 0xCCCCCC,
			type: 'lightbot'//null
		});
})();
