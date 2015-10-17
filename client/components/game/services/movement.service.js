(function() {
	angular
		.module('dimbot.game')
		.service('movementService', movementService);

	movementService.$Inject = ['programService', 'levelService',
		'directionService', 'imageService', 'logger', 'timer'];

	function movementService(programService, levelService, directionService,
			imageService, logger, timer) {
		var vm = this;

		vm.mesh;
		vm.lightMesh;
		vm.startingPos = {};

		// set starting direction
		var dir = levelService.getStartingDirection();
		vm.direction = directionService.getDirectionByName(dir);
		vm.index = directionService.getIndexFromDirection(vm.direction);

		var service = {
			forward: forward,
			light: light,
			getDirection: getDirection,
			getMesh: getMesh,
			reset: reset,
			rotate: rotate,
			rotateRight: rotateRight,
			rotateLeft: rotateLeft,
			run: run,
			setDirection: setDirection,
			setIndex: setIndex,
			setLightMesh: setLightMesh,
			setMesh: setMesh,
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
			}
		}

		function light(callback) {
			logger.info('lighting up', vm.lightMesh);
			// check position
			if (vm.mesh.position.x == vm.lightMesh.position.x
				&& vm.mesh.position.y == vm.lightMesh.position.y) {
				var color = vm.lightMesh.material.color.getHex().toString(16);
				logger.info('color', color);
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

		function getDirection() {
			return vm.direction;
		}

		function getMesh() {
			return vm.mesh;
		}

		function reset() {
			// reset position
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

			// empty program
			programService.empty();
		}

		function rotate(deg, callback) {
			var rad = deg * ( Math.PI / 180 );

			var tween = new TWEEN.Tween(vm.mesh.rotation).to({ z: vm.mesh.rotation.z + rad });

			tween.onComplete(function() {
				timer.sleep(1000);
				callback();
			});

			tween.start();
		}

		function rotateRight(callback) {
			setDirection('rr');
			rotate(-90, callback);
		}

		function rotateLeft(callback) {
			setDirection('rl')
			rotate(90, callback);
		}

		function run() {
			var that = this;

			that.loop = loop;
			that.perform = perform;
			that.x = 0;

			var program = programService.getProgram();
			logger.info('running program', program);

			if (program.length > 0) {
				// start program
				that.loop(program);

				// set stop button
				imageService.stop();
			}

			// control loop execution to wait for callback from tween when complete
			function loop(arr) {
				perform(arr[that.x], function() {
					that.x++;

					// unhighlight
					imageService.unhighlight(arr[that.x]);

					if (that.x < arr.length) {
						loop(arr);
					} else {
						imageService.play();
					}
				});
			}

			function perform(ins, callback) {
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

		function setMesh(mesh, x, y, z) {
			vm.mesh = mesh;

			vm.startingPos = {
				x: mesh.position.x,
				y: mesh.position.y,
				z: mesh.position.z
			}

			logger.info('starting pos', vm.startingPos);
		}

		function setLightMesh(mesh) {
			vm.lightMesh = mesh;
		}
	};
})();
