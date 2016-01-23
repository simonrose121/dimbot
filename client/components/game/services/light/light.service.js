(function() {
	angular
		.module('dimbot.game')
		.service('lightService', lightService);

	lightService.$Inject = [];

	/**
	 * Handle and store information on lights (a light is a threeJS mesh that
 	 * sits in the level)
	 *
	 * @param
	 * @returns service
	 */
	function lightService() {
		var vm = this;

		/* private variables */
		vm.lights = [];
		vm.offHex = 0x183ba6;
		vm.onHex = 0xffe600;
		vm.onVal = 'ffe600';

		var service = {
			addLight: addLight,
			allLightsOn: allLightsOn,
			getColour: getColour,
			getLight: getLight,
			getOffHex: getOffHex,
			getIndexFromPosition: getIndexFromPosition,
			isLightOn: isLightOn,
			removeAllLights: removeAllLights,
			turnOff: turnOff,
			turnOffAll: turnOffAll,
			turnOn: turnOn
		};

		return service;

		/**
		 * Add light to lights array
		 *
		 * @param mesh {object} - ThreeJS mesh
		 */
		function addLight(mesh) {
			vm.lights.push(mesh);
		}

		/**
		 * Check if all lights are on
		 *
		 * @returns {boolean} - Indication of whether all lights are on or not
		 */
		function allLightsOn() {
			// iterate through lights to check if any are off
			for (var i = 0; i < vm.lights.length; i++) {
				if (!isLightOn(i)) {
					return false;
				}
			}
			return true;
		}

		/**
		 * Check if individual light is on
		 *
		 * @param index {number} - Index of light to check
		 * @returns {boolean} - Indication if light is on or off
		 */
		function isLightOn(index) {
			if (getColour(index) == vm.onVal) {
				return true;
			}
			return false;
		}

		/**
		 * Get colour of light
		 *
		 * @param index {number} - Index of light
		 * @returns {string} - Current hex of light in format 'ffffff'
		 */
		function getColour(index) {
			return vm.lights[index].material.color.getHex().toString(16);
		}

		/**
		 * Get expected off value of lights
		 *
		 * @returns {string} - Hexidecimal value in format 0xffe600
		 */
		function getOffHex() {
			return vm.offHex;
		}

		/**
		 * Get individual light mesh
		 *
		 * @param index {number} - Index of light
		 * @returns {object} - ThreeJS mesh
		 */
		function getLight(index) {
			return vm.lights[index];
		}

		/**
		 * Get index of light in lights array from world position
		 *
		 * @param x {number} - X position of light
		 * @param y {number} - Y position of light
		 * @returns index {number} - Index of light in lights array
		 */
		function getIndexFromPosition(x, y) {
			for (var i = 0; i < vm.lights.length; i++) {
				var light = vm.lights[i];

				if (x == light.position.x &&
					y == light.position.y) {
					return vm.lights.indexOf(light);
				}
			}

			return -1;
		}

		/**
		 * Remove all lights from array
		 *
		 */
		function removeAllLights() {
			vm.lights.length = 0;
		}

		/**
		 * Turn off light at index
		 *
		 * @param index {number} - Index of light
		 */
		function turnOff(index) {
			vm.lights[index].material.color.setHex(vm.offHex);
		}

		/**
		 * Turn off all lights in array
		 *
		 */
		function turnOffAll() {
			for (var i = 0; i < vm.lights.length; i++) {
				vm.lights[i].material.color.setHex(vm.offHex);
			}
		}

		/**
		 * Turn on light at index
		 *
		 * @param index {number} - Index of light
		 */
		function turnOn(index) {
			vm.lights[index].material.color.setHex(vm.onHex);
		}
	}
})();
