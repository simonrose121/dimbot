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
			checkPositionMatch: checkPositionMatch,
			getColour: getColour,
			getLight: getLight,
			getOffHex: getOffHex,
			isLightOn: isLightOn,
			setLight: setLight,
			turnOff: turnOff,
			turnOn: turnOn
		};

		return service;

		function checkPositionMatch(x, y) {
			if (x == vm.light.position.x &&
				y == vm.light.position.y) {
				return true;
			}
			return false;
		}

		function isLightOn() {
			if (getColour() == vm.onVal) {
				return true;
			}
			return false;
		}

		function getColour() {
			return vm.light.material.color.getHex().toString(16);
		}

		function getOffHex() {
			return vm.offHex;
		}

		function getLight() {
			return vm.light;
		}

		function setLight(mesh) {
			vm.light = mesh;
		}

		function turnOff() {
			vm.light.material.color.setHex(vm.offHex);
		}

		function turnOn() {
			vm.light.material.color.setHex(vm.onHex);
		}
	}
})();
