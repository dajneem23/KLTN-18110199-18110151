<style src="./SideBar.scss" lang="scss" scoped></style>

<template>
	<!-- Left div because b-navbar does not trigger on mouseenter / mouseleave events -->
	<div
		class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs side-bar--custom"
		:data="backgroundColor"
	>
		<div class="scrollbar-inner h-100" ref="sidebarScrollArea">
			<div class="sidenav-header d-flex align-items-center">
				<b-navbar-brand class="d-flex align-items-center justify-content-center w-100">
					<img
						src="../../../../client/src/assets/Logo/ComodeIcon.svg"
						class="side-bar-logo"
					/>
				</b-navbar-brand>
			</div>
			<slot></slot>
			<div class="navbar-inner">
				<b-navbar-nav>
					<slot name="links">
						<sidebar-item
							v-for="(link, index) in sidebarLinks"
							:key="link.name + index"
							:link="link"
						>
						</sidebar-item>
					</slot>
				</b-navbar-nav>
				<slot name="links-after"></slot>
			</div>
		</div>
	</div>
</template>

<script>
const breakpoint = 1200;
export default {
	name: 'sidebar',
	data() {
		return {
			width: window.innerWidth,
		};
	},
	props: {
		backgroundColor: {
			type: String,
			default: 'vue',
			validator: (value) => {
				let acceptedValues = ['', 'vue', 'blue', 'green', 'orange', 'red', 'primary'];
				return acceptedValues.indexOf(value) !== -1;
			},
			description: 'Sidebar background color (vue|blue|green|orange|red|primary)',
		},
		sidebarLinks: {
			type: Array,
			default: () => [],
			description:
				"List of sidebar links as an array if you don't want to use components for these.",
		},
		autoClose: {
			type: Boolean,
			default: true,
			description: 'Whether sidebar should autoclose on mobile when clicking an item',
		},
	},
	provide() {
		return {
			autoClose: this.autoClose,
		};
	},
	methods: {
		minimizeSidebar() {
			if (this.$sidebar) {
				this.$sidebar.toggleMinimize();
			}
		},
		update: function () {
			this.width = window.innerWidth;
			let docClasses = document.body.classList;
			if (this.width > breakpoint) {
				console.log('HOOHOHOHOHOHOHOHOHOHOHOOHo');
				docClasses.add('g-sidenav-pinned');
				docClasses.add('g-sidenav-show');
			}
		},
	},
	mounted() {
		this.$sidebar.isMinimized = this.$sidebar.breakpoint < window.innerWidth;
		this.minimizeSidebar();
		window.addEventListener('resize', this.update);
	},
	beforeDestroy() {
		if (this.$sidebar.showSidebar) {
			this.$sidebar.showSidebar = false;
		}
		window.removeEventListener('resize', this.update);
	},
};
</script>
