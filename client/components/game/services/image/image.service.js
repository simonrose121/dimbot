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
		vm.dir = '.direction';

		var service = {
			adjustDirectionPosition: adjustDirectionPosition,
			backgroundTransition: backgroundTransition,
			hideDirection: hideDirection,
			highlight: highlight,
			play: play,
			rewind: rewind,
			rotateDirection: rotateDirection,
			showDirection: showDirection,
			stop: stop,
			toggleBin: toggleBin,
			unhighlight: unhighlight
		};

		return service;

		/**
		 * Adjust direction arrow position based on position of robot
		 *
		 * @param x {number} - X position of robot
		 * @param y {number} - Y position of robot
		 */
		function adjustDirectionPosition(x, y) {
			$(vm.dir).css({
			    'margin-left': x + 'px',
				'margin-top': -y + 'px'
			});
		}

		/**
		 * Animate the background transition to white and back to blue
		 *
		 * @param callback {function} - Callback to be called when first animation is complete
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
		 * Hide the direction arrow.
		 *
		 */
		function hideDirection() {
			$(vm.dir).hide();
		}

		/**
		 * Add highlight class to instruction.
		 *
		 */
		function highlight(index) {
			$('#' + index).addClass('highlight');
		}

		/**
		 * Show play button.
		 *
		 */
		function play() {
			$(vm.statusId).removeClass();
			$(vm.statusId).addClass('play');
		}

		/**
		 * Show rewind button.
		 *
		 */
		function rewind() {
			$(vm.statusId).removeClass();
			$(vm.statusId).addClass('rewind');
		}

		/**
		 * Show rotate direction arrow by degree measurement.
		 *
		 * @param deg {number} - Degree measurement to rotate from starting position
		 */
		function rotateDirection(deg) {
			$('.direction').css({
				transform:'translate(-50%, -50%) rotate(-' + deg + 'deg)'
			});
		}

		/**
		 * Show direction arrow.
		 *
		 */
		function showDirection() {
			$(vm.dir).show();
		}

		/**
		 * Show stop button.
		 *
		 */
		function stop() {
			$(vm.statusId).removeClass();
			$(vm.statusId).addClass('stop');
		}

		/**
		 * Toggle whether the bin is displayed.
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
		 * Remove highlight class from instruction.
		 *
		 */
		function unhighlight(index) {
			$('#' + index).removeClass('highlight');
		}
	}
})();
