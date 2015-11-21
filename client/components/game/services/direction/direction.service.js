(function() {
	angular
		.module('dimbot.game')
		.service('directionService', directionService);

	directionService.$Inject = ['logger', 'common'];

	/**
	 * Holds information about individual directions and the required
	 * rotations for these.
	 *
	 * @param logger
	 * @param common
	 * @return service
	 */
	function directionService(logger, common) {
		var vm = this;

		/* private variables */

		vm.directions = [
			{
				name: 'n',
				x: 0,
				y: common.gridSize,
				rot: (Math.PI)
			},
			{
				name: 'e',
				x: common.gridSize,
				y: 0,
				rot: (Math.PI / 2)
			},
			{
				name: 's',
				x: 0,
				y: -common.gridSize,
				rot: 0
			},
			{
				name: 'w',
				x: -common.gridSize,
				y: 0,
				rot: -(Math.PI / 2)
			}
		];
		vm.lookup = directionLookup();

		var service = {
			directionLookup: directionLookup,
			getDirectionByIndex: getDirectionByIndex,
			getDirectionByName: getDirectionByName,
			getIndexFromDirection: getIndexFromDirection
		};

		return service;

		/* public methods */

		/**
		 * Get a direction from an index
		 *
		 * @param {number} index - Index of direction in directions array.
		 * @returns direction - Direction object.
		 */
		function getDirectionByIndex(index) {
			return vm.directions[index];
		}

		/**
		 * Get a direction by name using a lookup
		 *
		 * @param {string} name - Name of direction.
		 * @returns direction - Direction object.
		 */
		function getDirectionByName(name) {
			return vm.lookup[name];
		}

		/**
		 * Get the index of a direction in the directions array for faster
		 * access.
		 *
		 * @param {object} dir - Direction object.
		 * @returns {number} - Direction object.
		 */
		function getIndexFromDirection(dir) {
			return vm.directions.indexOf(dir);
		}

		/* private methods */

		/**
		 * Instantiate a lookup method to retrieve direction by name.
		 *
		 * @returns {object} lookup.
		 */
		function directionLookup() {
			var lookup = {};
			for (var i = 0, len = vm.directions.length; i < len; i++) {
				lookup[vm.directions[i].name] = vm.directions[i];
			}
			return lookup;
		}
	}
})();
