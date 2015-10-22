(function() {
	angular
		.module('dimbot.game')
		.service('movementService', movementService);

	movementService.$Inject = ['programService', 'levelService',
		'directionService', 'imageService', 'lightService', 'logger', 'timer',
		'state'];

	function movementService(programService, levelService, directionService,
			imageService, lightService, logger, timer, state) {
		var vm = this;

		// keep track of mesh positions and colours
		vm.mesh = null;

		vm.startingPos = {};
		vm.x = 0;
		vm.direction = null;
		vm.index = null;

		// set starting direction
		setStartingDirection();

		var service = {
			forward: forward,
			getDirection: getDirection,
			getMesh: getMesh,
			loop: loop,
			light: light,
			perform: perform,
			reset: reset,
			rewind: rewind,
			rotate: rotate,
			rotateLeft: rotateLeft,
			rotateRight: rotateRight,
			run: run,
			setDirection: setDirection,
			setIndex: setIndex,
			setMesh: setMesh,
			setStartingDirection: setStartingDirection,
			stop: stop,
			updateIndex: updateIndex
		};

		return service;

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

				logger.info('moving mesh from', position);
				logger.info('moving mesh to', target);

				var tween = new TWEEN.Tween(position).to(target);

				tween.onUpdate(function() {
					vm.mesh.position.x = position.x;
					vm.mesh.position.y = position.y;
				});
				tween.onComplete(function() {
					timer.sleep(1000);
					callback();
				});

				tween.start();
				levelService.updateLevel(vm.direction);
			} else {
				// callback anyway to unhighlight instruction
				callback();
			}
		}

		function getDirection() {
			return vm.direction;
		}

		function light(callback) {
			var x = vm.mesh.position.x;
			var y = vm.mesh.position.y;

			// check position
			if (lightService.checkPositionMatch(x, y)) {
				if (lightService.isLightOn()) {
					// change mesh colour
					lightService.turnOff();
				} else {
					lightService.turnOn();
					state.current = state.COMPLETE;
				}
			}
			timer.sleep(1000);
			callback();
		}

		function getMesh() {
			return vm.mesh;
		}

		function reset() {
			// reset position
			rewind();

			// empty program
			programService.empty();
		}

		function rewind() {
			if (vm.mesh) {
				vm.mesh.position.x = vm.startingPos.x;
				vm.mesh.position.y = vm.startingPos.y;
				vm.mesh.position.z = 0;
			}

			// rotation
			vm.mesh.rotation.x = (Math.PI / 2);
			vm.mesh.rotation.y = (Math.PI / 2);
			vm.mesh.rotation.z = 0;

			// reset direction
			var name = levelService.getStartingDirection();
			vm.direction = directionService.getDirectionByName(name);

			// reset level array
			levelService.resetLevel();

			// set play button
			imageService.play();

			// turn off light
			lightService.turnOff();
		}

		function rotate(deg, callback) {
			var rad = deg * ( Math.PI / 180 );

			var tween = new TWEEN.Tween(vm.mesh.rotation).to({
				y: vm.mesh.rotation.y + rad
			});

			tween.onComplete(function() {
				timer.sleep(1000);
				callback();
			});

			tween.start();
		}

		function rotateLeft(callback) {
			service.setDirection('rl');
			service.rotate(90, callback);
		}

		function rotateRight(callback) {
			service.setDirection('rr');
			service.rotate(-90, callback);
		}

		function run() {
			vm.x = 0;

			var program = programService.getProgram();
			logger.info('running program', program);

			// when program is started
			if (program.length > 0) {
				state.current = state.RUNNING;

				// set imageService index to 0
				imageService.setIndex(0);

				// set rotation index back to 0
				service.setStartingDirection();

				// start program
				service.loop(program);

				// set stop button
				imageService.stop();
			}
		}

		// control loop execution to wait for callback from tween when complete
		function loop(arr) {
			service.perform(arr[vm.x], function() {
				vm.x++;

				// unhighlight
				imageService.unhighlight(arr[vm.x]);

				if (state.current == state.RUNNING) {
					if (vm.x < arr.length) {
						service.loop(arr);
					} else {
						imageService.rewind();
					}
				} else if (state.current == state.COMPLETE) {
					imageService.next();
					imageService.rewind();
				} else {
					rewind();
					state.current = state.COMPOSING;
				}
			});
		}

		function perform(ins, callback) {
			logger.warn('executing instruction', ins);

			// highlight
			imageService.highlight(ins);

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

		function setDirection(dir) {
			if (dir == 'rl') {
				vm.index = service.updateIndex(-1);
				logger.info('index ', vm.index);

				vm.direction = directionService.getDirectionByIndex(vm.index);
				logger.info('direction', vm.direction);
			}
			if (dir == 'rr') {
				vm.index = service.updateIndex(1);
				logger.info('index ', vm.index);

				vm.direction = directionService.getDirectionByIndex(vm.index);
				logger.info('direction', vm.direction);
			}
		}

		function setMesh(mesh, x, y, z) {
			vm.mesh = mesh;

			vm.startingPos = {
				x: mesh.position.x,
				y: mesh.position.y,
				z: mesh.position.z
			};

			logger.info('starting pos', vm.startingPos);
		}

		function setStartingDirection() {
			var dir = levelService.getStartingDirection();
			vm.direction = directionService.getDirectionByName(dir);
			vm.index = directionService.getIndexFromDirection(vm.direction);
		}

		function setIndex(val) {
			vm.index = val;
		}

		function stop() {
			state.current = state.STOPPED;
		}

		function updateIndex(val) {
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
