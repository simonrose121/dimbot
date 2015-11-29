(function() {
	angular
		.module('dimbot.game')
		.directive('dimThreeDirective', dimThreeDirective);

	dimThreeDirective.$Inject = ['movementService', 'levelService',
		'lightService', 'logger', 'common'];

	/**
	 * Directive holding ThreeJS world and initialisation logic.
	 *
	 * @param movementService
	 * @param levelService
	 * @param lightService
	 * @param directionService
	 * @param imageService
	 * @param logger
	 * @param common
	 * @returns directive
	 */
	function dimThreeDirective(movementService, levelService, lightService,
		directionService, imageService, logger, common) {

		var directive = {
			restrict: 'E',
			link: link
		};

		return directive;

		/**
		 * Initialise ThreeJS world and logic.
		 *
		 * @param scope {object} - Current angular scope.
		 * @param elem {object} - Directive DOM element.
		 */
		function link(scope, elem) {
			var vm = this;

			/* private variables */
			vm.camera = null;
			vm.scene = null;
			vm.renderer = null;

			/* methods available in scope */
			vm.addGrid = addGrid;
			vm.addObjects = addObjects;
			vm.addMesh = addMesh;
			vm.addRobot = addRobot;
			vm.init = init;
			vm.render = render;

			// run when directive is loaded
			vm.init();
			vm.addGrid();
			vm.addObjects();
			// start render loop
			vm.render();

			/**
			 * Add grid to world.
			 *
			 */
			function addGrid() {
				var width = levelService.getWidth();
				var height = levelService.getHeight();

				// for 9 spaces x and y
				for (var x = -1; x < width-1; x++) {
					for (var y = -1; y < height-1; y++) {
						// add a box in the correct spot
						vm.addMesh(common.gridSize, 0xCCCCCC, x, y, -common.gridSize, true);
					}
				}
			}

			/**
			 * Add individual objects to world in correct positions.
			 *
			 */
			function addObjects() {
				var level = levelService.readLevel();

				var width = levelService.getWidth();
				var height = levelService.getHeight();
				var count = 0;

				// for 9 spaces x and y
				for (var y = 2; y > -height; y--) {
					for (var x = -2; x < width; x++) {
						switch(level[count]) {
							case 0:
								break;
							case 1:
								vm.addRobot(x, y);
								break;
							case 2:
								// add test object
								var lightColour = lightService.getOffHex();
								var mesh = vm.addMesh(common.gridSize, lightColour, x, y, -common.gridSize, false);
								lightService.addLight(mesh);
								break;
							case 3:
								break;
							case 4:
								vm.addMesh(common.gridSize, 0x00BFFF, x, y, 0, false);
								break;
						}
						count++;
					}
				}
			}

			/**
			 * Add mesh to world (either light or obstacle)
			 *
			 * @param size {number} - Size of mesh.
			 * @param colour {string} - Hex of colour.
			 * @param gridX {number} - X grid position.
		 	 * @param gridY {number} - Y grid position.
			 * @param z {number} - z coordinate in world space.
			 * @returns mesh
			 */
			function addMesh(size, colour, gridX, gridY, z) {
				var geometry = new THREE.BoxGeometry(size, size, size);
				var material = new THREE.MeshBasicMaterial({
					color: colour
				});
				var mesh = new THREE.Mesh( geometry, material );
				mesh.position.set(size * gridX, size * gridY, z);
				var cube = new THREE.EdgesHelper( mesh, 0x0c0065 );
				vm.scene.add(cube);
				vm.scene.add(mesh);
				return mesh;
			}

			/**
			 * Add robot to world.
			 *
			 * @param x {number} - X grid position.
			 * @param y {number} - Y grid position.
			 */
			function addRobot(x, y) {
				var jsonLoader = new THREE.JSONLoader();
			   	jsonLoader.load("../../mdls/jasubot.js", function(geometry) {
					//var material = new THREE.MeshNormalMaterial(material);
					var material = new THREE.MeshPhongMaterial({
						color: common.robotColour,
						shininess: 100,
						shading: THREE.SmoothShading
					});
					var mesh = new THREE.Mesh(geometry, material);
					mesh.rotation.x = (Math.PI / 2);

					var dirName = levelService.getStartingDirection();
					var dir = directionService.getDirectionByName(dirName);
					mesh.rotation.y = dir.rot;

					var fullX = common.gridSize * x;
					var fullY = common.gridSize * y;

					mesh.position.set(fullX, fullY, 0);
					vm.scene.add(mesh);
					movementService.setMesh(mesh);

					// calculate required position of arrow
					var deg = dir.rot * (180/Math.PI);
					imageService.rotateDirection(deg);
					imageService.adjustDirectionPosition(fullX, fullY);
					imageService.showDirection();
				});
			}

			/**
			 * Render loop to keep world updating in real time.
			 *
			 */
			function render() {
				function renderloop() {
					requestAnimationFrame(render);
					TWEEN.update();
					vm.renderer.render(scene, camera);
				}
				renderloop();
			}

			/**
			 * Initialise ThreeJS world.
			 *
			 * @param
			 * @returns
			 */
			function init() {
				container = $('#level');

				// set the scene size
				var WIDTH = container.width() - 10,
				  HEIGHT = container.height() - 10;

				// set some camera attributes
				var NEAR = -1000, FAR = 1000;

				vm.renderer = new THREE.WebGLRenderer({ alpha: true });
				vm.camera =
				  new THREE.OrthographicCamera(
					WIDTH/-2,
					WIDTH/2,
					HEIGHT/2,
					HEIGHT/-2,
					NEAR,
					FAR
				);

				// add ambient light
				var light = new THREE.HemisphereLight(0xFFFFFF, 0x616161, 1);

				// create scene
				vm.scene = new THREE.Scene();

				// add the camera to the scene
				vm.scene.add(camera);

				// add light to scene
				vm.scene.add(light);

				// start the renderer
				vm.renderer.setSize(WIDTH, HEIGHT);

				// attach the render-supplied DOM element
				elem[0].appendChild(renderer.domElement);
			}
		}
	}
})();
