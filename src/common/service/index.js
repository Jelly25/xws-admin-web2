import store from "store";
import Vue from "vue";

/**
 * @description: 将service api挂载到vue实例和store模块上
 * @author: jelly25
 * @date: 2022-10-24
 */
export default async function () {
	// 解析出来的api模块
	let parsedModules = {};
	// 引入所有api模块
	const ApiFiles = require.context('../../api', true, /\.js$/)
	// 找到所有导出的模块
	let epModules = ApiFiles.keys().map(item => ApiFiles(item))
	for (let i = 0; i < epModules.length; i++) {
		if (epModules[i].default) {
			parsedModules[epModules[i].default.name] = new epModules[i].default()
		} else {
			return Promise.reject(`'${ApiFiles.keys()[i]}':模块必须使用'export default'进行导出`);
		}
	}
	Vue.prototype.$service = store.$service = parsedModules;
}
