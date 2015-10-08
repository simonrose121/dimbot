(function() {
	angular
		.module('dimbot.game')
		.service('movementService', movementService);

	movementService.$Inject = ['programService', 'logger'];

	function movementService(programService, logger) {
		var vm = this;

		vm.mesh = null;
		vm.index = 0;
		vm.dir = [
			n = {
				x: 0,
				y: 100
			},
			e = {
				x: 100,
				y: 0
			},
			s = {
				x: 0,
				y: -100
			},
			w = {
				x: -100,
				y: 0
			}
		];

		// set starting direction
		vm.direction = vm.dir[vm.index];

		var service = {
			forward: forward,
			getMesh: getMesh,
			moveForward: moveForward,
			reset: reset,
			rotate: rotate,
			rotateRight: rotateRight,
			rotateLeft: rotateLeft,
			run: run,
			setDirection: setDirection,
			setIndex: setIndex,
			setMesh: setMesh
		};

		return service;

		function moveForward(callback) {
			//TODO: figure out which way shape is facing and send in that direction
			forward(callback);
		}

		function forward(callback) {
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
				callback();
			});

			tween.start();
		}

		function getMesh() {
			return vm.mesh;
		}

		function reset() {
			vm.mesh.position.x = 0;
			vm.mesh.position.y = 0;
			vm.mesh.position.z = 0;
			logger.info('level reset', vm.mesh);
		}

		function rotate(deg, callback) {
			var rad = deg * ( Math.PI / 180 );

			var tween = new TWEEN.Tween(vm.mesh.rotation).to({ z: vm.mesh.rotation.z + rad });

			tween.onComplete(function() {
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

				vm.direction = vm.dir[vm.index];
				logger.info('direction', vm.direction);
			}
			if (dir == 'rr') {
				vm.index = setIndex(1);
				logger.info('index ', vm.index);

				vm.direction = vm.dir[vm.index];
				logger.info('direction', vm.direction);
			}
		}

		function run() {
			var that = this;

			that.loop = loop;
			that.perform = perform;
			that.x = 0;

			var program = programService.getProgram();
			that.loop(program);

			// control loop execution to wait for callback from tween when complete
			function loop(arr) {
				perform(arr[that.x], function() {
					that.x++;

					if(that.x < arr.length) {
						loop(arr);
					};
				});
			}

			function perform(ins, callback) {
				switch(ins.name) {
					case 'fw':
						moveForward(callback);
						break;
					case 'rr':
						rotateRight(callback);
						break;
					case 'rl':
						rotateLeft(callback);
						break;
				}
			}
		}

		function setMesh(mesh) {
			vm.mesh = mesh;
		}
	};
})();
