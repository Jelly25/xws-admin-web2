import Vue from "vue";
import store from "store";

import Common from "./common";
import User from "./user";

Vue.prototype.$service = store.$service = {
	Common: new Common(),
	User: new User()
};
