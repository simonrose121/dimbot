(function() {
	angular
		.module('dimbot.game')
		.service('lightService', lightService);

	lightService.$Inject = ['logger'];

	function lightService() {
		var vm = this;

		vm.light = null;
		vm.offHex = 0x0000FF;
		vm.onHex = 0xFFFFFF;
		vm.onVal = 'ffffff';

		var service = {
			checkPositionMatch: checkPositionMatch,
			checkOff: checkOff,
			getColour: getColour,
			getLight: getLight,
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

		function checkOff() {
			if (getColour() != vm.onVal) {
				return true;
			}
			return false;
		}

		function getColour() {
			return vm.light.material.color.getHex().toString(16);
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
