<template>
  <div>
    <myhead></myhead>
    <!-- <router-view></router-view> -->
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
  }
};
</script>

<style>
</style>
