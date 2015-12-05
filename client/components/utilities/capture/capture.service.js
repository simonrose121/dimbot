(function() {
	angular
		.module('utils.capture')
		.factory('capture', capture);

	capture.$Inject = ['logger'];

	/**
	 * Capture current state of program.
	 *
	 * @param logger
	 * @returns service
	 */
	function capture(logger) {

		var service = {
			capturePng: capturePng,
			captureXml: captureXml
		};

		return service;

		/**
		 * Capture png from DOM element.
		 *
		 * @param id {string} - Id of DOM element.
		 */
		function capturePng(id) {
			html2canvas($(id), {
	            onrendered: function(canvas) {
					var img = canvas.toDataURL("image/png");
					logger.info('Program url', img);
	            }
	        });
		}

		/**
		 * Capture xml of Blockly workspace.
		 *
		 * @returns {string} - XML representation of workspace.
		 */
		function captureXml() {
			var xml = Blockly.Xml.workspaceToDom(workspace);
			var xmlText = Blockly.Xml.domToText(xml);
			logger.info('Blockly xml', Blockly.Xml.domToPrettyText(xml));
			return xmlText;
		}
	}
})();
