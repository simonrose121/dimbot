(function() {
	angular
		.module('dimbot.game')
		.service('imageService', imageService);

	imageService.$Inject = ['logger'];

	/**
	 * Provides methods to manipulate DOM elements using jQuery
	 *
	 * @param logger
	 * @returns service
	 */
	function imageService(logger) {
		var vm = this;

		/* private variables */
		vm.statusId = '#status';
		vm.levelNumId = '#level-no';

		var service = {
			backgroundTransition: backgroundTransition,
			highlight: highlight,
			play: play,
			rewind: rewind,
			setLevelNumber: setLevelNumber,
			stop: stop,
			toggleBin: toggleBin,
			unhighlight: unhighlight
		};

		return service;

		/**
		 * Animate the background transition to white and back to blue
		 *
		 * @param callback {function} - Callback to be called when animation is complete
		 */
		function backgroundTransition(callback) {
			$('html').animate({
				backgroundColor: '#fff'
			}, 1500, function() {
				$('html').animate({
					backgroundColor: '#00BFFF'
				}, 1500);
				callback();
			});
		}

		/**
		 * Add highlight class to instruction
		 *
		 */
		function highlight(index) {
			$('#' + index).addClass('highlight');
		}

		/**
		 * Show play button
		 *
		 */
		function play() {
			$(vm.statusId).removeClass();
			$(vm.statusId).addClass('play');
		}

		/**
		 * Show rewind button
		 *
		 */
		function rewind() {
			$(vm.statusId).removeClass();
			$(vm.statusId).addClass('rewind');
		}

		/**
		 * Set the current level number
		 *
		 * @param levelNo {number} - Number to be set
		 */
		function setLevelNumber(levelNo) {
			$(vm.levelNumId).html(levelNo);
		}

		/**
		 * Show stop button
		 *
		 */
		function stop() {
			$(vm.statusId).removeClass();
			$(vm.statusId).addClass('stop');
		}

		/**
		 * Toggle whether the bin is displayed
		 *
		 * @param isVisible {boolean}
		 */
		function toggleBin(isVisible) {
			if (isVisible) {
				$('#bin').hide();
			} else {
				$('#bin').show();
			}
		}

		/**
		 * Remove highlight class from instruction
		 *
		 */
		function unhighlight(index) {
			$('#' + index).removeClass('highlight');
		}
	}
})();
