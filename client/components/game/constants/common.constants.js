(function() {
	angular
		.module('dimbot.game')
		.constant('common', {
			gridSize: 150,
			userId: 1,
			imageSize: 40,
			blockColour: 230,
			speed: 700,
			robotColour: 0x7cf43c,
			type: 'blockly'
		});
})();
