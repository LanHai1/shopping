import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// const routes = [
//   {
//     path: "/",
//     redirect: "/"
//   },
//   {
//     path: "/",
//     redirect: "/"
//   }
// ];

// 全局样式
import "./assets/css/style.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
