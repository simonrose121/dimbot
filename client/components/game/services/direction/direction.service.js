(function() {
	angular
		.module('dimbot.game')
		.service('directionService', directionService);

	directionService.$Inject = ['logger'];

	function directionService(logger) {
		var vm = this;

		vm.directions = [
			{
				name: 'n',
				x: 0,
				y: 100
			},
			{
				name: 'e',
				x: 100,
				y: 0
			},
			{
				name: 's',
				x: 0,
				y: -100
			},
			{
				name: 'w',
				x: -100,
				y: 0
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