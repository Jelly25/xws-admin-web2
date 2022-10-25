<template>
	<a-layout-header id="page-layout_nav">
		<div class="app-topbar__left">
			<div class="trigger-fold trigger-common" @click="COLLAPSE_MENU(!menuCollapse)">
				<a-icon style="fontSize:20px" :type="menuCollapse ? 'menu-unfold' : 'menu-fold'"></a-icon>
			</div>
			<div class="trigger-fullscreen trigger-common"  @click="toggleFullscreen()">
				<a-icon style="fontSize:20px" :type="fullscreen ? 'fullscreen-exit' : 'fullscreen'"></a-icon>
			</div>
			<div class="trigger-refresh trigger-common"  @click="refresh()">
				<a-icon style="fontSize:20px" type="redo" :rotate="-45"></a-icon>
			</div>
		</div>
		<div class="app-topbar__right">
			<div class="trigger-user">
				<a-dropdown>
					<div class="userinfo">
						<a-avatar size="small" icon="user"/>
						<span class="user_name">{{userInfo.username}}</span>
					</div>
					<a-menu slot="overlay">
						<a-menu-item key="1">修改密码</a-menu-item>
						<a-menu-item key="2" @click="handleLogout">退出登录</a-menu-item>
					</a-menu>
				</a-dropdown>
			</div>
		</div>
  </a-layout-header>
</template>

<script>
import { mapGetters,mapMutations,mapActions } from "vuex";
import { api as $fullscreen } from 'vue-fullscreen';
export default {
	name:"NavBar",
	inject: ["refresh"],
	data() {
		return {
			fullscreen:false,
		}
	},
	computed:{
		...mapGetters("app",["menuCollapse"]),
		...mapGetters("user",["userInfo"]),
	},
	methods:{
		...mapMutations("app",["COLLAPSE_MENU"]),
		...mapActions("user",["userLogout"]),
		// 全屏切换
		async toggleFullscreen(){
			await $fullscreen.toggle()
      this.fullscreen = !$fullscreen.isFullscreen
		},
		// 执行退出操作
		async handleLogout(){
			await this.userLogout()
			this.$router.push("/auth")
		}
	}
}
</script>

<style lang="less" scoped>
#page-layout_nav{
	display:flex;
	justify-content:space-between;
	align-items:center;
	padding: 0 10px;
	height: 60px;
	background:#fff;

	.app-topbar__left{
		display:flex;
		align-items:center;
		height: 100%;

		.trigger-common{
			height: 100%;
			padding: 0 10px;
			cursor: pointer;
			transition: all .3s;

			/deep/ .anticon{
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			&:hover{
				background-color: #f9f9f9;
			}
		}
	}

	.app-topbar__right{
		display: flex;
		align-items: center;
		height: 100%;

		.trigger-user{
			height: 100%;
			padding: 0 10px;
			cursor: pointer;
			transition: all .3s;

			&:hover{
				background-color: #f9f9f9;
			}

			.userinfo {
				height: 100%;
				display: flex;
				align-items: center;
				cursor: pointer;

				.user_name {
					margin-left: 5px;
				}
			}
		}
	}
}
</style>
