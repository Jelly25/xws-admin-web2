<template>
  <a-layout id="page-layout">
		<!-- 侧栏菜单 -->
		<side-bar></side-bar>
    <a-layout>
			<!-- 导航栏 -->
      <nav-bar></nav-bar>
			<!-- 页面进程 -->
			<div id="page-layout_process" v-if="app.config.showProcess">
				<process />
			</div>
			<!-- 模块主体 -->
			<a-layout-content id="page-layout_content">
				<a-spin :spinning="contentIsLoading" wrapperClassName="content-loading" tip="正在加载中..." size="large">
					<template v-if="!componentIsRefresh">
						<keep-alive>
							<router-view v-if="isKeepAlive"></router-view>
						</keep-alive>
						<router-view v-if="!isKeepAlive"></router-view>
					</template>
				</a-spin>
			</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SideBar from "./sideBar";
import NavBar from "./navBar";
import Process from "./process";
import { mapGetters,mapMutations } from "vuex";
import { isEmpty } from "@/utils";
export default {
  name:"Layout",
	provide() {
    return {
      refresh:()=> {
				this.REFRESH_COMPONENT(true)
        this.$nextTick(() => {
					this.REFRESH_COMPONENT(false)
        });
      },
    };
  },
	components:{
		SideBar,
		NavBar,
		Process
	},
	computed: {
		...mapGetters("app",["app","menuCollapse","contentIsLoading","componentIsRefresh"]),
		// 判断组件是否为缓存组件
		isKeepAlive() {
			return isEmpty(this.$route.meta.keepAlive) ? false : this.$route.meta.keepAlive;
		},
	},
	methods: {
		...mapMutations("app",["REFRESH_COMPONENT"])
	},
};
</script>

<style lang="less" scoped>
#page-layout{
	width: 100%;
	height: 100%;

	&_process{
		width: 100%;
		margin: 10px 0;
		padding: 0 10px;
	}

	&_content{
		margin: 10px;
		margin-top: 0;
		background: #fff
	}

	.content-loading{
		height: 100%;

		/deep/ .ant-spin.ant-spin-lg.ant-spin-spinning{
			top: 50%;
    	transform: translateY(-50%);
		}

		/deep/ .ant-spin-container{
			height: 100%;
		}
	}
}
</style>
