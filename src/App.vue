<template>
  <div>
    <myhead ref="myhead"></myhead>
    <router-view ref="contentRouterView" @changeCartNum="cartNum"></router-view>
    <myfloor></myfloor>
  </div>
</template>

<script>
// 头部
import myhead from "./components/index/HeadC";
// 尾部
import myfloor from "./components/index/FloorC";
export default {
  name: "App",
  components: {
    myhead,
    myfloor
  },
  methods: {
    // 加入购物车
    cartNum(id) {
      this.$refs.myhead.cartShoppingList.push(id)
    }
  }
};
</script>

<style>
</style>
