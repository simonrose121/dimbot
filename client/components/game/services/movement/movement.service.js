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

		vm.arrow = null;
		vm.mesh = null;
		vm.startingPos = {};
		vm.direction = null;
		vm.index = null;

		var service = {
			forward: forward,
			getDirection: getDirection,
			getMesh: getMesh,
			getUpdatedIndex: getUpdatedIndex,
			light: light,
			perform: perform,
			noMove: noMove,
			rewind: rewind,
			rotate: rotate,
			rotateLeft: rotateLeft,
			rotateRight: rotateRight,
			setArrow: setArrow,
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

					vm.arrow.position.x = position.x;
					vm.arrow.position.y = position.y;
				});
				tween.onComplete(function() {
					callback();
				});

				tween.start();
				levelService.updateLevel(vm.direction);
			} else {
				service.noMove(callback);
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

		/**
		 * Light up the current block if in correct position.
		 *
 		 * @param callback {object} - Callback to signal when tween is complete.
		 */
		function light(callback) {

			var originalColour = vm.mesh.material.color.getHSL();

			vm.mesh.material.color.setHex(0xffe600);

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

			setTimeout(function() {
				vm.mesh.material.color.setHSL(originalColour.h, originalColour.s, originalColour.l);
				callback();
			}, 200);

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
		 * Show that mesh cannot perform move.
		 *
		 * @param callback {object} - Callback to signal when tween is complete.
		 */
		function noMove(callback) {
			var distance = 10;
			var speed = 250;

			var radLeft = distance * ( Math.PI / 180 );

			var tweenLeft = new TWEEN.Tween(vm.mesh.rotation).to({
				y: vm.mesh.rotation.y + radLeft
			}, speed);

			var tweenArrowLeft = new TWEEN.Tween(vm.arrow.rotation).to({
				z: vm.arrow.rotation.z + radLeft
			}, speed);

			var tweenLeftAgain = new TWEEN.Tween(vm.mesh.rotation).to({
				y: vm.mesh.rotation.y + radLeft
			}, speed);

			var tweenArrowLeftAgain = new TWEEN.Tween(vm.arrow.rotation).to({
				z: vm.arrow.rotation.z + radLeft
			}, speed);

			var radRight = -distance * ( Math.PI / 180 );

			var tweenRight = new TWEEN.Tween(vm.mesh.rotation).to({
				y: vm.mesh.rotation.y + radRight
			}, speed);

			var tweenArrowRight = new TWEEN.Tween(vm.arrow.rotation).to({
				z: vm.arrow.rotation.z + radRight
			}, speed);

			var radCenter = 0 * ( Math.PI / 180 );

			var tweenCenter = new TWEEN.Tween(vm.mesh.rotation).to({
				y: vm.mesh.rotation.y + radCenter
			}, speed);

			var tweenArrowCenter = new TWEEN.Tween(vm.arrow.rotation).to({
				z: vm.arrow.rotation.z + radCenter
			}, speed);

			tweenCenter.onComplete(function() {
				callback();
			});

			// control execution
			tweenLeft.chain(tweenRight);
			tweenRight.chain(tweenLeftAgain);
			tweenLeftAgain.chain(tweenCenter);

			tweenArrowLeft.chain(tweenArrowRight);
			tweenArrowRight.chain(tweenArrowLeftAgain);
			tweenArrowLeftAgain.chain(tweenArrowCenter);

			tweenArrowLeft.start();
			tweenLeft.start();
		}

		/**
		 * Reset all movements and rotations to starting position.
		 *
		 */
		function rewind() {
			// reset direction
			var name = levelService.getStartingDirection();
			vm.direction = directionService.getDirectionByName(name);

			if (vm.arrow) {
				vm.arrow.position.x = vm.startingPos.x;
				vm.arrow.position.y = vm.startingPos.y;
				vm.arrow.position.z = common.gridSize;

				// rotation
				new TWEEN.Tween(vm.arrow.rotation).to({
					z: vm.direction.rot
				}, 0).start();
			}

			if (vm.mesh) {
				vm.mesh.position.x = vm.startingPos.x;
				vm.mesh.position.y = vm.startingPos.y;
				vm.mesh.position.z = 0;

				// rotation
				vm.mesh.rotation.x = (Math.PI / 2);
				vm.mesh.rotation.y = vm.direction.rot;
				vm.mesh.rotation.z = 0;
			}

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

			var arrowTween = new TWEEN.Tween(vm.arrow.rotation).to({
				z: vm.arrow.rotation.z + rad
			}, common.speed);

			tween.onComplete(function() {
				callback();
			});

			tween.start();
			arrowTween.start();
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

		function setArrow(arrow) {
			vm.arrow = arrow;
		}

		/**
		 * Set current direction of mesh using index manipulation.
		 *
		 * @param dir {string} - Direction indicator.
		 */
		function setDirection(dir) {
			var newIndex = null;

			if (dir == 'rl') {
				newIndex = service.getUpdatedIndex(-1);
				service.setIndex(newIndex);
				vm.direction = directionService.getDirectionByIndex(vm.index);
			}
			if (dir == 'rr') {
				newIndex = service.getUpdatedIndex(1);
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
	}
})();
