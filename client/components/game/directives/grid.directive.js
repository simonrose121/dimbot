(function() {
	angular
		.module('dimbot.game')
		.directive('dimGridDirective', dimGridDirective);

	dimGridDirective.$Inject = ['movementService', 'levelService',
		'lightService', 'logger'];

	function dimGridDirective(movementService, levelService, lightService,
		logger) {

		var directive = {
			restrict: 'E',
			link: link,
			template: "<div id='scene'></div>",
		};

		return directive;

		function link(element) {
			var vm = this;

			// variables
			vm.camera = null;
			vm.scene = null;
			vm.renderer = null;

			// methods
			vm.addGrid = addGrid;
			vm.addObjects = addObjects;
			vm.addMesh = addMesh;
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
						vm.addMesh(100, 0x000000, x, y, -100, true);
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
				for (var y = -2; y < height; y++) {
					for (var x = -2; x < width; x++) {
						switch(level[count]) {
							case 0:
								break;
							case 1:
								// add test object
								var geometry = new THREE.BoxGeometry(50, 50, 50);
								var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
								mesh = new THREE.Mesh( geometry, material );
								mesh.position.set(100 * x, 100 * y, 0);
								movementService.setMesh(mesh);
								vm.scene.add(mesh);
								break;
							case 2:
								// add test object
								mesh = vm.addMesh(100, 0x0000FF, x, y, -100, false);
								lightService.setLight(mesh);
								break;
							case 3:
								break;
						}
						count++;
					}
				}
			}

			function addMesh(size, color, x, y, z, wireframe) {
				var geometry = new THREE.BoxGeometry(size, size, size);
				var material = new THREE.MeshBasicMaterial( { color: color, wireframe: wireframe } );
				var mesh = new THREE.Mesh( geometry, material );
				mesh.position.set(size * x, size * y, z);
				vm.scene.add(mesh);
				return mesh;
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
				$('#scene').append(renderer.domElement);
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
