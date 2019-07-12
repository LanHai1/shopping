<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="#/">首页</a> &gt;
        <a href>购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden" />
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <a>选择</a>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-if="cartList==[]">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>
                          您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-for="(item) in cartList" :key="item.id">
                  <th width="48" align="center">
                    <el-switch v-show="1" v-model="item.isSelected" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                  </th>
                  <th align="left" class="shoppingTrTitle" colspan="2">
                    <img :src="item.img_url" alt />
                    <a>{{item.title}}</a>
                  </th>
                  <th width="84" align="left">{{item.sell_price}}</th>
                  <th width="104" align="center">
                    <el-input-number size="small" v-model="item.buycount" :min="1"></el-input-number>
                  </th>
                  <th width="104" align="left">{{item.sell_price * item.buycount}}(元)</th>
                  <th width="54" align="center">
                    <a href>删除</a>
                  </th>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{allCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{allMoney}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
              <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      // 购物车商品
      cartList: []
      // 总元
    };
  },
  created() {
    this.$axios
      .get(`site/comment/getshopcargoods/${this.$route.params.cartList}`)
      .then(res => {
        // 添加选中商品
        res.data.message.forEach(val => {
          val.isSelected = true;
        });
        // 处理商品数据
        console.log(this.$route.params.cartList)
        this.cartList = res.data.message;
      });
  },
  computed: {
    // 所有的钱
    allMoney() {
      let sum = 0;
      this.cartList.forEach(val => {
        sum += val.buycount * val.sell_price;
      });
      return sum;
    },
    // 所有的商品数量
    allCount() {
      let countSun = 0;
      this.cartList.forEach(val => {
        countSun += val.buycount;
      });
      return countSun;
    }
  }
};
</script>

<style>
.shoppingTrTitle {
  position: relative;
}
.shoppingTrTitle > img {
  width: 40px;
  float: left;
  margin-right: 10px;
}
.shoppingTrTitle > a {
  float: left;
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  cursor: pointer;
}
</style>
