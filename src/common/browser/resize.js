import store from "@/store";

const lock = {
	menuCollapse: null,
	showAMenu: null
};

function resize() {
	// 更新数据
	store.commit("app/SET_BROWSER");
	const { "app/browser": browser, "app/menuCollapse": menuCollapse, "app/app": app } = store.getters;
	if (browser.isMini) {
		// 小屏幕下隐藏一级菜单
		if (lock.showAMenu === null) {
			lock.showAMenu = app.config.showAMenu;
			store.commit("app/UPDATE_APP", {
				config: {
					showAMenu: false
				}
			});
		}
		// 小屏幕下收起左侧菜单
		if (lock.menuCollapse === null) {
			lock.menuCollapse = menuCollapse;
			store.commit("app/COLLAPSE_MENU", true);
		}
	} else {
		// 大屏幕下显示一级菜单
		if (lock.showAMenu !== null) {
			store.commit("app/UPDATE_APP", {
				config: {
					showAMenu: lock.showAMenu
				}
			});
			lock.showAMenu = null;
		}
		// 大屏幕下展开左侧菜单
		if (lock.menuCollapse !== null) {
			store.commit("app/COLLAPSE_MENU", lock.menuCollapse);
			lock.menuCollapse = null;
		}
	}
}

window.onload = function () {
	window.addEventListener("resize", resize);
	resize();
};
