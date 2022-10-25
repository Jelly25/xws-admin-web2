import Vue from 'vue'

import {
	Message,
	Icon,
	Spin,
	Button,
	Layout,
	Menu,
	Avatar,
	Dropdown,
	Tooltip,
	Tabs,
	FormModel,
	Input,
	Checkbox,
	Modal,
	Statistic,
	Result
} from "ant-design-vue";

// 创建自定义icon
const customIcon = Icon.createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/c/font_3720998_hw01nj69gus.js',
});

Vue.component("custom-icon", customIcon)

Vue.prototype.$message = Message
Vue.use(Icon)
Vue.use(Spin)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(Tooltip)
Vue.use(Tabs)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Modal)
Vue.use(Statistic)
Vue.use(Result)


