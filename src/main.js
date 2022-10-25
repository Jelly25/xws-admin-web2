import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from 'store'
import "api"
import bootstrap from "@/common";
import "./antd/antd"

Vue.config.productionTip = false

// 应用启动程序
bootstrap()
	.then(async () => {
		// 加载菜单、用户信息
		await store.dispatch("app/appLoad");
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount("#app");
	})
	.catch(err => {
		Vue.prototype.$message.error(`应用程序启动失败:${err}`)
	});
