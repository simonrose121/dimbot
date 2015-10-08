(function() {
	angular
		.module('dimbot.game')
		.service('movementService', movementService);

	movementService.$Inject = ['programService', 'logger'];

	function movementService(programService, logger) {
		var vm = this;

		vm.mesh = null;

		var service = {
			animate: animate,
			getMesh: getMesh,
			forward: forward,
			reset: reset,
			rotateRight: rotateRight,
			rotateLeft: rotateLeft,
			run: run,
			setMesh: setMesh
		};

		return service;

		function animate(x, y, z, callback) {
			var position = {
				x: vm.mesh.position.x,
				y: vm.mesh.position.y,
				z: vm.mesh.position.z
			};
			var target = {
				x: vm.mesh.position.x + x,
				y: vm.mesh.position.y + y,
				z: vm.mesh.position.z + z
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

		function forward(callback) {
			//TODO: figure out how to do relative movement
			animate(0, 100, 0, callback);
		}

		function reset() {
			vm.mesh.position.x = 0;
			vm.mesh.position.y = 0;
			vm.mesh.position.z = 0;
			logger.info('level reset', vm.mesh);
		}

		function rotateRight() {

		}

		function rotateLeft() {
			
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
					case 'up':
						moveUp(callback);
						break;
					case 'down':
						moveDown(callback);
						break;
					case 'left':
						moveLeft(callback);
						break;
					case 'right':
						moveRight(callback);
						break;
				}
			}
		}

		function setMesh(mesh) {
			vm.mesh = mesh;
		}
	};
})();
