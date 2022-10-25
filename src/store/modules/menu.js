import router from "@/router";
import { storage, revDeepTree, isArray, isEmpty } from "@/utils";
import { customMenuList } from "@/config/env";

const state = {
	// showAMenu 模式下，顶级菜单的序号
	index: 0,
	// 动态菜单
	dynamicMenus: storage.get("__dynamicMenus__") || [],
	// 左侧菜单
	sideMenus: storage.get("__dynamicMenus__") || [],
}

const getters = {
	// 树形菜单列表
	dynamicMenus: state => state.dynamicMenus,
	// 左侧菜单
	sideMenus: state => state.sideMenus,
}

const mutations = {
	// 设置树形菜单列表
	SET_DYNAMIC_MENU(state, list) {
		state.dynamicMenus = list;
		storage.set("__dynamicMenus__", list);
	},
	// 设置左侧菜单
	SET_SIDE_MENU(state, index) {
		const { "app/app": app } = this.getters
		const { showAMenu } = app.config;
		if (isEmpty(index)) index = state.index;
		if (showAMenu) {
			const { children = [] } = state.dynamicMenus[index] || {};
			state.index = index;
			state.sideMenus = children;
		} else {
			state.sideMenus = state.dynamicMenus;
		}
	},
	// 重置菜单列表
	RESET_MENULISTS(state) {
		const { "app/app": app } = this.getters
		if (!app.config.customMenu) {
			state.dynamicMenus = [];
			state.sideMenus = [];
			storage.set("__dynamicMenus__", []);
		}
	}
}

const actions = {
	// 设置菜单列表
	async menuLists({ commit, state, rootGetters }, payload) {
		const { "app/app": app } = rootGetters
		const next = menus => {
			if (!isArray(menus)) menus = [];
			// 设置动态菜单
			commit("SET_DYNAMIC_MENU", menus);
			// 设置左侧菜单
			commit("SET_SIDE_MENU", state.index);
			// 添加动态路由
			const routes = revDeepTree(menus).filter(e => e.type !== 0);
			router.addDynamicRoutes(routes)
			return Promise.resolve(menus);
		};
		// 判断是否为自定义菜单
		if (!app.config.customMenu) {
			next(payload);
		} else {
			next(customMenuList);
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
