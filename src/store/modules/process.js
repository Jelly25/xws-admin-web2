const initProcess = { label: "工作台", value: "/scene", active: true };

const ignore = ["/terms", "/privacy", "/403", "/404", "/500"]


const state = {
	list: [initProcess]
}

const getters = {
	// 页面进程列表
	processList: state => state.list
}

const mutations = {
	// 添加进程
	ADD_PROCESS(state, item) {
		const index = state.list.findIndex(e => e.value.split("?")[0] === item.value.split("?")[0]);
		state.list.map(e => { e.active = e.value == item.value });
		if (index < 0) {
			if (item.value == "/") {
				return false
			}
			if (!ignore.some(e => item.value.includes(e)) && item.label) {
				state.list.push({ ...item, active: true });
			}
		} else {
			state.list[index].active = true;
			state.list[index].label = item.label;
			state.list[index].value = item.value;
		}
	},
	// 删除进程
	DEL_PROCESS(state, index) {
		if (index != 0) {
			state.list.splice(index, 1);
		}
	},
	// 设置进程
	SET_PROCESS(state, list) {
		state.list = list;
	},
	// 重置进程
	RESET_PROCESS(state) {
		state.list = [initProcess];
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations
}
