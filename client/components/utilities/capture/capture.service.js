(function() {
	angular
		.module('utils.capture')
		.factory('capture', capture);

	capture.$Inject = ['logger'];

	function capture(logger) {
		var service = {
			capturePng: capturePng,
			captureXml: captureXml
		};

		return service;

		function capturePng(id, filename, callback) {
			html2canvas($(id), {
	            onrendered: function(canvas) {
					var img = canvas.toDataURL("image/png");
					logger.info('Program url', img);
					callback(img);
	            }
	        });
		}

		function captureXml() {
			var xml = Blockly.Xml.workspaceToDom(workspace);
			var xml_text = Blockly.Xml.domToText(xml);
			logger.info('Blockly xml', Blockly.Xml.domToPrettyText(xml));
			return xml_text;
		}
	}
})();
