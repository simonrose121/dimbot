(function() {
	angular
		.module('dimbot.game')
		.service('directionService', directionService);

	directionService.$Inject = ['logger', 'common'];

	function directionService(logger, common) {
		var vm = this;

		vm.directions = [
			{
				name: 'n',
				x: 0,
				y: common.gridSize,
				rot: -(Math.PI / 2)
			},
			{
				name: 'e',
				x: common.gridSize,
				y: 0,
				rot: (Math.PI)
			},
			{
				name: 's',
				x: 0,
				y: -common.gridSize,
				rot: (Math.PI / 2)
			},
			{
				name: 'w',
				x: -common.gridSize,
				y: 0,
				rot: 0
			}
		];

		// setup lookup
		var lookup = directionLookup();

		var service = {
			directionLookup: directionLookup,
			getDirectionByIndex: getDirectionByIndex,
			getDirectionByName: getDirectionByName,
			getIndexFromDirection: getIndexFromDirection
		};

		return service;

		function directionLookup() {
			var lookup = {};
			for (var i = 0, len = vm.directions.length; i < len; i++) {
			    lookup[vm.directions[i].name] = vm.directions[i];
			}
			return lookup;
		}

		function getDirectionByIndex(index) {
			return vm.directions[index];
		}

		function getDirectionByName(name) {
			return lookup[name];
		}

		function getIndexFromDirection(dir) {
			return vm.directions.indexOf(dir);
		}
	}
})();
