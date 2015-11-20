(function() {
	angular
		.module('dimbot.game')
		.service('buttonService', buttonService);

	buttonService.$Inject = ['movementService', 'logService', 'imageService',
		'levelService', 'programService', 'lightService', 'capture', 'logger',
		'ENV'];

	function buttonService(movementService, logService, imageService,
		levelService, programService, lightService, capture, logger, ENV) {

		var service = {
			bind: bind
		};

		return service;

		// public
		function bind() {

			$('#status').bind('click', actionButton);
			$('#reset').bind('click', resetButton);

		}

		// private
		function actionButton() {

			if ($('#status').hasClass('play')) {
				if (ENV.ins == 'blockly') {
					// capture screenshot
					var url = capture.captureXml();

					// log screenshot data to database
					logService.saveCapture(url, 'blockly');

					// capture blockly and run generated code
					var code = Blockly.JavaScript.workspaceToCode(vm.workspace);
					eval(code);
				} else {
					// capture screenshot and save to database
					capture.capturePng('.program-inner', 'file', function(url) {
						logService.saveCapture(url, 'lightbot');
					});

					// set has start if it's the lightbot version
					movementService.hasStart(true);
				}

				// run program
				movementService.run();

				// log button press
				logService.buttonPress('play');

			} else if ($('#status').hasClass('stop')) {

				// stop program
				movementService.stop();

				// log button press
				logService.buttonPress('stop');

			} else if ($('#status').hasClass('rewind')) {

				// rewind movement
				movementService.rewind();

				// if blockly then empty program to be recreated later
				if (ENV.ins == 'blockly') {
					programService.empty();
				}

				// remove next image
				imageService.removeNext();

				// log button press
				logService.buttonPress('rewind');
			}

		}

		function resetButton() {

			// reset movement
			movementService.reset();

			// remove next image
			imageService.removeNext();

			// log button press to db
			logService.buttonPress('reset');

			if (ENV.ins == 'blockly') {
				// clear blockly interface
				Blockly.mainWorkspace.clear();
			}

		}

		function nextButton() {

			// set level service to next level
			levelService.nextLevel();
			levelService.setInstructions();

			// change action button to play and remove next button
			imageService.play();
			imageService.removeNext();

			// log button press
			logService.buttonPress('next');

			// empty program
			programService.empty();

			// empty lights
			lightService.removeAllLights();

			if (ENV.ins == 'blockly') {
				// clear blockly interface
				Blockly.mainWorkspace.clear();

				// initialise start block
				var xml_text = "<xml xmlns='http://www.w3.org/1999/xhtml'><block type='start' x='100' y='50'></block></xml>";
				var xml = Blockly.Xml.textToDom(xml_text);
				Blockly.Xml.domToWorkspace(workspace, xml);
			}

			// reset the grid directive to reload level
			$scope.$apply(function() {
				$('.level-inner').html('');
				var newElement = $compile("<dim-grid-directive></dim-grid-directive>")($scope);
				$('.level-inner').append(newElement);
			});

		}
	}
})();
