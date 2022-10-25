<template>
	<div class="page-iframe">
		<iframe :src="url" frameborder="0"></iframe>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
	data() {
		return {
			url: ""
		};
	},
	mounted() {
		this.url = this.$route.meta.iframeUrl;
		const iframe = this.$el.querySelector("iframe");
		this.TOGGLE_LOADING(true)
		iframe.onload = () => {
			this.TOGGLE_LOADING(false)
		};
	},
	methods: {
		...mapMutations("app",["TOGGLE_LOADING"])
	},
	beforeDestroy(){
		this.TOGGLE_LOADING(false)
	},
};
</script>

<style lang="less" scoped>
.page-iframe {
	height: 100%;

	iframe {
		height: 100%;
		width: 100%;
	}
}
</style>
