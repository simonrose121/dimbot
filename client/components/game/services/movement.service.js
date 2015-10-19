(function() {
	angular
		.module('dimbot.game')
		.service('movementService', movementService);

	movementService.$Inject = ['programService', 'levelService',
		'directionService', 'imageService', 'logger', 'timer'];

	function movementService(programService, levelService, directionService,
			imageService, logger, timer) {
		var vm = this;

		// keep track of mesh positions and colours
		vm.mesh = null;
		vm.lightMesh = null;

		vm.startingPos = {};
		vm.stopped = false;

		// set starting direction
		var dir = levelService.getStartingDirection();
		vm.direction = directionService.getDirectionByName(dir);
		vm.index = directionService.getIndexFromDirection(vm.direction);

		var service = {
			forward: forward,
			getDirection: getDirection,
			getMesh: getMesh,
			light: light,
			reset: reset,
			rewind: rewind,
			rotate: rotate,
			rotateLeft: rotateLeft,
			rotateRight: rotateRight,
			run: run,
			setDirection: setDirection,
			setIndex: setIndex,
			setLightMesh: setLightMesh,
			setMesh: setMesh,
			stop: stop
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
			logger.info('lighting up', vm.lightMesh);
			// check position
			if (vm.mesh.position.x == vm.lightMesh.position.x &&
				vm.mesh.position.y == vm.lightMesh.position.y) {
				var color = vm.lightMesh.material.color.getHex().toString(16);
				if (color != 'ffffff') {
					// change mesh colour
					vm.lightMesh.material.color.setHex(0xffffff);
				} else {
					vm.lightMesh.material.color.setHex(0x0000FF);
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

			// reset direction
			var name = levelService.getStartingDirection();
			vm.direction = directionService.getDirectionByName(name);

			// reset level array
			levelService.resetLevel();

			// set play button
			imageService.play();
		}

		function rotate(deg, callback) {
			var rad = deg * ( Math.PI / 180 );

			var tween = new TWEEN.Tween(vm.mesh.rotation).to({
				z: vm.mesh.rotation.z + rad
			});

			tween.onComplete(function() {
				timer.sleep(1000);
				callback();
			});

			tween.start();
		}

		function rotateLeft(callback) {
			setDirection('rl');
			rotate(90, callback);
		}

		function rotateRight(callback) {
			setDirection('rr');
			rotate(-90, callback);
		}

		function run() {
			var that = this;

			that.loop = loop;
			that.perform = perform;
			var x = 0;

			var program = programService.getProgram();
			logger.info('running program', program);

			// when program is started
			if (program.length > 0) {
				// make sure program isn't stopped
				vm.stopped = false;

				// set imageService index to 0
				imageService.setIndex(0);

				// start program
				that.loop(program);

				// set stop button
				imageService.stop();
			}

			// control loop execution to wait for callback from tween when complete
			function loop(arr) {
				perform(arr[x], function() {
					x++;

					// unhighlight
					imageService.unhighlight(arr[x]);

					if (!vm.stopped) {
						if (x < arr.length) {
							loop(arr);
						} else {
							imageService.rewind();
						}
					} else {
						rewind();
					}
				});
			}

			function perform(ins, callback) {
				logger.warn('executing instruction', ins);

				// highlight
				imageService.highlight(ins);

				switch(ins.name) {
					case 'fw':
						forward(callback);
						break;
					case 'rr':
						rotateRight(callback);
						break;
					case 'rl':
						rotateLeft(callback);
						break;
					case 'lt':
						light(callback);
						break;
				}
			}
		}

		function setDirection(dir) {
			if (dir == 'rl') {
				vm.index = setIndex(-1);
				logger.info('index ', vm.index);

				vm.direction = directionService.getDirectionByIndex(vm.index);
				logger.info('direction', vm.direction);
			}
			if (dir == 'rr') {
				vm.index = setIndex(1);
				logger.info('index ', vm.index);

				vm.direction = directionService.getDirectionByIndex(vm.index);
				logger.info('direction', vm.direction);
			}
		}

		function setIndex(val) {
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

		function setLightMesh(mesh) {
			vm.lightMesh = mesh;
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

		function stop() {
			vm.stopped = true;
		}
	}
})();
