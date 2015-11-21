(function() {
	angular
		.module('dimbot.game')
		.service('movementService', movementService);

	movementService.$Inject = ['levelService', 'directionService', 'lightService',
		'logger', 'state', 'common'];

	/**
	 * Handle movement and animations of robot.
	 *
	 * @param levelService
	 * @param directionService
	 * @param lightService
	 * @param logger
	 * @param common
	 * @param state
	 * @returns service
	 */
	function movementService(levelService, directionService, lightService,
			logger, common, state) {

		var vm = this;

		vm.mesh = null;
		vm.startingPos = {};
		vm.direction = null;
		vm.index = null;

		var service = {
			forward: forward,
			getDirection: getDirection,
			getMesh: getMesh,
			light: light,
			perform: perform,
			rewind: rewind,
			rotate: rotate,
			rotateLeft: rotateLeft,
			rotateRight: rotateRight,
			setDirection: setDirection,
			setIndex: setIndex,
			setMesh: setMesh,
			setStartingDirection: setStartingDirection
		};

		return service;

		/**
		 * Move mesh forward and animate the movement.
		 *
		 * @param callback {object} - Callback to signal when tween is complete.
		 */
		function forward(callback) {
			if (levelService.checkMove(vm.direction)) {
				var position = {
					x: vm.mesh.position.x,
					y: vm.mesh.position.y,
					z: vm.mesh.position.z
				};
				var target = {
					x: vm.mesh.position.x + vm.direction.x,
					y: vm.mesh.position.y + vm.direction.y,
					z: vm.mesh.position.z
				};

				var tween = new TWEEN.Tween(position).to(target, common.speed);

				tween.onUpdate(function() {
					vm.mesh.position.x = position.x;
					vm.mesh.position.y = position.y;
				});
				tween.onComplete(function() {
					callback();
				});

				tween.start();
				levelService.updateLevel(vm.direction);
			} else {
				// callback anyway to unhighlight instruction
				callback();
			}
		}

		/**
		 * Get current direction.
		 *
		 * @returns {object} - Current direction of mesh.
		 */
		function getDirection() {
			return vm.direction;
		}

		/**
		 * Get mesh.
		 *
		 * @returns {object} - ThreeJS mesh.
		 */
		function getMesh() {
			return vm.mesh;
		}

		/**
		 * Light up the current block if in correct position.
		 *
 		 * @param callback {object} - Callback to signal when tween is complete.
		 */
		function light(callback) {
			var x = vm.mesh.position.x;
			var y = vm.mesh.position.y;

			var index = lightService.getIndexFromPosition(x, y);

			// check position
			if (index > -1) {
				if (lightService.isLightOn(index)) {
					// change mesh colour
					lightService.turnOff(index);
				} else {
					lightService.turnOn(index);

					if (lightService.allLightsOn()) {
						state.current = state.COMPLETE;
					}
				}
			}

			callback();
		}

		/**
		 * Reset all movements and rotations to starting position.
		 *
		 */
		function rewind() {
			if (vm.mesh) {
				vm.mesh.position.x = vm.startingPos.x;
				vm.mesh.position.y = vm.startingPos.y;
				vm.mesh.position.z = 0;
			}

			// reset direction
			var name = levelService.getStartingDirection();
			vm.direction = directionService.getDirectionByName(name);

			// rotation
			vm.mesh.rotation.x = (Math.PI / 2);
			vm.mesh.rotation.y = vm.direction.rot;
			vm.mesh.rotation.z = 0;

			// reset level array
			levelService.resetLevel();
		}

		/**
		 * Rotate mesh by degree of rotation.
		 *
		 * @param deg {number} - Desired rotation in degrees.
		 * @param callback {object} - Callback to signal when tween is complete.
		 */
		function rotate(deg, callback) {
			var rad = deg * ( Math.PI / 180 );

			var tween = new TWEEN.Tween(vm.mesh.rotation).to({
				y: vm.mesh.rotation.y + rad
			}, common.speed);

			tween.onComplete(function() {
				callback();
			});

			tween.start();
		}

		/**
		 * Rotate left and set new direction.
		 *
		 * @param callback {object} - Callback to signal when tween is complete.
		 */
		function rotateLeft(callback) {
			service.setDirection('rl');
			service.rotate(90, callback);
		}

		/**
		 * Rotate right and set new direction.
		 *
		 * @param callback {object} - Callback to signal when tween is complete.
		 */
		function rotateRight(callback) {
			service.setDirection('rr');
			service.rotate(-90, callback);
		}

		/**
		 * Handle instruction and pass it off to correct method.
		 *
		 * @param ins {object} - Instruction to be executed.
		 * @param callback {object} - Callback to signal when tween is complete.
		 */
		function perform(ins, callback) {
			switch(ins.name) {
				case 'fw':
					service.forward(callback);
					break;
				case 'rr':
					service.rotateRight(callback);
					break;
				case 'rl':
					service.rotateLeft(callback);
					break;
				case 'lt':
					service.light(callback);
					break;
			}
		}

		/**
		 * Set current direction of mesh using index manipulation.
		 *
		 * @param dir {string} - Direction indicator.
		 */
		function setDirection(dir) {
			var newIndex = null;

			if (dir == 'rl') {
				newIndex = getUpdatedIndex(-1);
				service.setIndex(newIndex);
				vm.direction = directionService.getDirectionByIndex(vm.index);
			}
			if (dir == 'rr') {
				newIndex = getUpdatedIndex(1);
				service.setIndex(newIndex);
				vm.direction = directionService.getDirectionByIndex(vm.index);
			}
		}

		/**
		 * Set mesh so it can be accessed in other methods.
		 *
		 * @param mesh {object} - ThreeJS mesh.
		 */
		function setMesh(mesh) {
			vm.mesh = mesh;

			vm.startingPos = {
				x: mesh.position.x,
				y: mesh.position.y,
				z: mesh.position.z
			};
		}

		/**
		 * Set starting direction from level.
		 *
		 */
		function setStartingDirection() {
			var dir = levelService.getStartingDirection();
			vm.direction = directionService.getDirectionByName(dir);

			var index = directionService.getIndexFromDirection(vm.direction);
			service.setIndex(index);
		}

		/**
		 * Set index of direction.
		 *
		 * @param index {number} - Index of direction.
		 */
		function setIndex(index) {
			vm.index = index;
		}

		/* private methods */

		/**
		 * Update index by incrementing or decrementing value.
		 *
		 * @param val {number} - Number to adjust index by.
		 * @returns index
		 */
		function getUpdatedIndex(val) {
			var index = vm.index + val;
			// handle edge cases
			if (index == -1) {
				index = 3;
			}
			if (index == 4) {
				index = 0;
			}
			return index;
		}
	}
})();
