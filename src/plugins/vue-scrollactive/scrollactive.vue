<template>
	<nav class="scrollactive-nav">
		<slot></slot>
	</nav>
</template>

<script>
	export default {
		props: {
			/**
			 * Class that will be applied in the menu item.
			 *
			 * @default  'is-active'
			 * @type {String}
			 */
			activeClass: {
				type: String,
				default: 'is-active'
			},

			/**
			 * Amount of space between top of screen and the section to
			 * highlight. (Usually your fixed header's height)
			 *
			 * @default 20
			 * @type {Number}
			 */
			offset: {
				type: Number,
				default: 20
			},

			/**
			 * Enables/disables the scrolling when clicking in a menu item.
			 * Disable if you'd like to handle the scrolling by your own.
			 *
			 * @default true
			 * @type {Boolean}
			 */
			clickToScroll: {
				type: Boolean,
				default: true
			},

			/**
			 * The duration of the scroll animation when clicking to scroll
			 * is activated.
			 *
			 * @default 600
			 * @type {Number}
			 */
			duration: {
				type: Number,
				default: 600
			},

			/**
			 * Defines if the plugin should track the section change when
			 * clicking an item to scroll to its section. If set to true,
			 * it will always keep track and change the active class to the
			 * current section while scrolling, if false, the active class
			 * will be immediately applied to the clicked menu item, ignoring
			 * the passed sections until the scrolling is over.
			 *
			 * @default false
			 * @type {Boolean}
			 */
			alwaysTrack: {
				type: Boolean,
				default: false
			},

			/**
			 * Your custom easing value for the click to scroll functionality.
			 * It must be a string with 4 values separated by commas in a
			 * cubic bezier format.
			 *
			 * @default '.5,0,.35,1'
			 * @type {String}
			 */
			bezierEasingValue: {
				type: String,
				default: '.5,0,.35,1'
			},

			scrollactiveItems: {
				default: null
			},

		},

		data() {
			return {
				//scrollactiveItems: null,
				bezierEasing: require('bezier-easing')
			}
		},

		computed: {
			/**
			 * Transforms the bezier easing string value into an array.
			 *
			 * @return {Array}
			 */
			cubicBezierArray() {
				return this.bezierEasingValue.split(',');
			}
		},

		methods: {
			onScroll() {
				for (let scrollactiveItemId = 0; scrollactiveItemId < this.scrollactiveItems.length; ++scrollactiveItemId) {
					let scrollactiveItem = this.scrollactiveItems[scrollactiveItemId];
					let target = document.getElementById(scrollactiveItem.hash.substr(1));

					let nextScrollactiveItem = this.scrollactiveItems[scrollactiveItemId + 1];
					let nextTarget = nextScrollactiveItem !== undefined ? document.getElementById(nextScrollactiveItem.hash.substr(1)) : null;

					if (this.isWindowInsideTarget(target, nextTarget)) {
						scrollactiveItem.classList.add(this.activeClass);
					} else {
						scrollactiveItem.classList.remove(this.activeClass);
					}
				}
			},

			/**
			 * Verifies if the window is inside the target section.
			 *
			 * @param target [Section element]
			 * @return {Boolean}
			 */
			isWindowInsideTarget(target, nextTarget) {
				let distanceFromTop = window.scrollY;
				let targetDistanceFromTop = target.offsetTop;
				let nextTargetDistanceFromTop = nextTarget ? nextTarget.offsetTop : 2e10;
				//let targetHeight = target.offsetHeight;
				let targetHeight = target.offsetHeight;

		        //if (targetDistanceFromTop - this.offset <= distanceFromTop && targetDistanceFromTop + targetHeight - this.offset > distanceFromTop) {
		        if (targetDistanceFromTop - this.offset <= distanceFromTop && nextTargetDistanceFromTop - this.offset > distanceFromTop) {
		        	return true;
		        }

				return false;
			},

			/*
			setScrollactiveItems() {
				let scrollactiveItems = document.querySelectorAll('.scrollactive-item');

				if (scrollactiveItems.length < 1) {
					//throw new Error("You must give your menu items a class of 'scrollactive-item' in order to track them.");
				}

				for (let scrollactiveItem of scrollactiveItems) {
					if (!document.querySelector(scrollactiveItem.hash)) {
						throw new Error("Element '" + scrollactiveItem.hash + "' was not found. Make sure it is set in the DOM.");
					}
				}

				this.scrollactiveItems = scrollactiveItems;
			},
			*/

			scrollToTargetElement(event) {
				event.preventDefault();

				if (!this.alwaysTrack) {
					window.removeEventListener('scroll', this.onScroll);
					window.cancelAnimationFrame(window.AFRequestID);

					for (let scrollactiveItem of this.scrollactiveItems) {
						scrollactiveItem.classList.remove(this.activeClass);
					}

					event.target.classList.add(this.activeClass);
				}

				let vm = this;
				let targetDistanceFromTop = document.querySelector(event.target.hash).offsetTop;
				let startingY = window.pageYOffset;
				let difference = targetDistanceFromTop - startingY;
				let start = null;
				let easing = vm.bezierEasing(this.cubicBezierArray[0], this.cubicBezierArray[1],this.cubicBezierArray[2],this.cubicBezierArray[3]);

				function step(timestamp) {
					if (!start) start = timestamp;

					let progress = timestamp - start;
					let progressPercentage = progress / vm.duration;
					let distanceFromTop = window.scrollY;

					if (progress >= vm.duration) progress = vm.duration;
					if (progressPercentage >= 1) progressPercentage = 1;

					let perTick = startingY + easing(progressPercentage) * (difference - vm.offset);

					window.scrollTo(0, perTick);

					if (progress < vm.duration) {
						window.AFRequestID = window.requestAnimationFrame(step);
					} else {
						window.addEventListener('scroll', vm.init);
					}
				}

				window.requestAnimationFrame(step);
			}
		},

		mounted() {
			//this.setScrollactiveItems();
			//this.onScroll();
			window.addEventListener('scroll', this.onScroll);

			if (this.clickToScroll) {
				for (let scrollactiveItem of this.scrollactiveItems) {
					scrollactiveItem.addEventListener('click', this.scrollToTargetElement);
				}
			}
		},

		beforeDestroy () {
			window.removeEventListener('scroll', this.onScroll);
			window.cancelAnimationFrame(window.AFRequestID);
		}
	}
</script>
