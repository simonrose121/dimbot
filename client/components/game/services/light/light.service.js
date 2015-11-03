(function() {
	angular
		.module('dimbot.game')
		.service('lightService', lightService);

	lightService.$Inject = ['logger'];

	function lightService() {
		var vm = this;

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
			turnOff: turnOff,
			turnOffAll: turnOffAll,
			turnOn: turnOn
		};

		return service;

		function addLight(mesh) {
			vm.lights.push(mesh);
		}

		function allLightsOn() {
			// iterate through lights to check if any are off
			for (var i = 0; i < vm.lights.length; i++) {
				if (!isLightOn(i)) {
					return false;
				}
			}
			return true;
		}

		function isLightOn(index) {
			if (getColour(index) == vm.onVal) {
				return true;
			}
			return false;
		}

		function getColour(index) {
			return vm.lights[index].material.color.getHex().toString(16);
		}

		function getOffHex() {
			return vm.offHex;
		}

		function getLight(index) {
			return vm.lights[index];
		}

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

		function turnOff(index) {
			vm.lights[index].material.color.setHex(vm.offHex);
		}

		function turnOffAll() {
			for (var i = 0; i < vm.lights.length; i++) {
				vm.lights[i].material.color.setHex(vm.offHex);
			}
		}

		function turnOn(index) {
			vm.lights[index].material.color.setHex(vm.onHex);
		}
	}
})();
