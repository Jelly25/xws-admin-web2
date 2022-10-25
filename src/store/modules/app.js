import { app } from "@/config/env";
import { storage, deepMerge, getBrowser } from "@/utils";
const browser = getBrowser();


const state = {
	info: {
		...app
	},
	browser,
	collapse: browser.isMini ? true : false,
	contentIsLoading: false,
	componentIsRefresh: false
}

const getters = {
	// 应用配置
	app: state => state.info,
	// 浏览器信息
	browser: state => state.browser,
	// 左侧菜单是否收起
	menuCollapse: state => state.collapse,
	// 模块区域加载
	contentIsLoading: state => state.contentIsLoading,
	// 组件刷新
	componentIsRefresh: state => state.componentIsRefresh
}

const mutations = {
	// 设置浏览器信息
	SET_BROWSER(state) {
		state.browser = getBrowser();
	},
	// 切换加载状态
	TOGGLE_LOADING(state, val = false) {
		state.contentIsLoading = val;
	},
	// 组件刷新
	REFRESH_COMPONENT(state, val = false) {
		state.contentIsLoading = val;
		state.componentIsRefresh = val;
	},
	// 收起左侧菜单
	COLLAPSE_MENU(state, val = false) {
		state.collapse = val;
	},
	// 更新应用配置
	UPDATE_APP(state, val) {
		deepMerge(state.info, val);
		storage.set("__app__", state.info);
	}
}

const actions = {
	// 应用重载
	async appLoad({ rootGetters, dispatch }) {
		const { "user/token": token } = rootGetters
		// 如果token存在则重新获取用户信息、权限列表以及菜单列表
		if (token) {
			// 获取用户信息
			dispatch("user/userInfo", { options: { needToast: false } }, { root: true });
			// 获取菜单和权限列表
			await dispatch("user/permMenus", { options: { needToast: false } }, { root: true });
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
