(function() {
	angular
		.module('dimbot.game')
		.directive('dimGridDirective', dimGridDirective);

	dimGridDirective.$Inject = ['movementService', 'levelService',
		'lightService', 'logger', 'common'];

	function dimGridDirective(movementService, levelService, lightService,
		directionService, logger, common) {

		var directive = {
			restrict: 'E',
			link: link
		};

		return directive;

		function link(scope, elem) {
			console.log('called link');
			var vm = this;

			// variables
			vm.camera = null;
			vm.scene = null;
			vm.renderer = null;

			// methods
			vm.addGrid = addGrid;
			vm.addObjects = addObjects;
			vm.addMesh = addMesh;
			vm.addRobot = addRobot;
			vm.init = init;
			vm.render = render;

			// run these when directive is loaded
			vm.init();
			vm.addGrid();
			vm.addObjects();

			// start render loop
			vm.render();

			function addGrid() {
				var width = levelService.getWidth();
				var height = levelService.getHeight();

				// for 9 spaces x and y
				for (var x = -1; x < width-1; x++) {
					for (var y = -1; y < height-1; y++) {
						// add a box in the correct spot
						vm.addMesh(common.gridSize, 0xCCCCCC, x, y, -common.gridSize, true);
						var light = new THREE.PointLight(0xFFFFFF, 1, 1000);
						light.position.set( x, y, 800 );
						vm.scene.add(light);
					}
				}
			}

			function addObjects() {
				var level = levelService.readLevel();

				var width = levelService.getWidth();
				var height = levelService.getHeight();
				var count = 0;

				var mesh = null;

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
								mesh = vm.addMesh(common.gridSize, lightColour, x, y, -common.gridSize, false);
								lightService.addLight(mesh);
								break;
							case 3:
								break;
							case 4:
								vm.addMesh(common.gridSize, 0x000000, x, y, 0, false);
								break;
						}
						count++;
					}
				}
			}

			function addMesh(size, color, x, y, z) {
				var geometry = new THREE.BoxGeometry(size, size, size);
				var material = new THREE.MeshBasicMaterial({
					color: color
				});
				var mesh = new THREE.Mesh( geometry, material );
				mesh.position.set(size * x, size * y, z);
				var cube = new THREE.EdgesHelper( mesh, 0x0c0065 );
				vm.scene.add(cube);
				vm.scene.add(mesh);
				return mesh;
			}

			function addRobot(x, y) {
				var jsonLoader = new THREE.JSONLoader();
			   	jsonLoader.load("../../mdls/jasubot.js", function(geometry, material) {
					var material = new THREE.MeshNormalMaterial(material);
					//var material = new THREE.MeshPhongMaterial( { color: 0x2194CE, shininess: 100, shading: THREE.SmoothShading } );
					var mesh = new THREE.Mesh(geometry, material);
					mesh.rotation.x = (Math.PI / 2);

					var dirName = levelService.getStartingDirection();
					var dir = directionService.getDirectionByName(dirName);
					mesh.rotation.y = dir.rot;

					mesh.position.set(common.gridSize * x, common.gridSize * y, 0);
					vm.scene.add(mesh);
					movementService.setMesh(mesh);
				});
			}

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

				// create scene
				vm.scene = new THREE.Scene();

				// add the camera to the scene
				vm.scene.add(camera);

				// start the renderer
				vm.renderer.setSize(WIDTH, HEIGHT);

				// attach the render-supplied DOM element
				elem[0].appendChild(renderer.domElement);
			}

			function render() {
				function renderloop() {
					requestAnimationFrame(render);
					TWEEN.update();
					vm.renderer.render(scene, camera);
				}
				renderloop();
			}
		}
	}
})();
