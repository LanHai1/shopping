import Vue from "vue";
import App from "./App.vue";

// 导入axios
import axios from "axios";
// 配置基地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";
// 挂载全局
Vue.prototype.$axios = axios;

// 导入moment
import moment from "moment";
Vue.prototype.$moment = moment;

// 导入路由模块
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入饿了么ui
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUi);

// 商品列表
import goods from "./components/goods/ShoppingListC.vue";
// 创建路由规则
const routes = [
  {
    path: "/goods",
    component: goods
  },
  {
    path: "/",
    redirect: "/goods"
  }
];
// 创建路由对象
const router = new VueRouter({
  routes
});

// 全局样式
import "./assets/css/style.css";

Vue.config.productionTip = false;

// 全局过滤器
Vue.filter("formatTime", (time, formate = "YYYY-MM-DD HH:mm:ss") => {
  return moment(time).format(formate);
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
