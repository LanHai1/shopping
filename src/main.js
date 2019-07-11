import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

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

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
