<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="#/" class="router-link-active">首页</a> &gt;
        <a href="#/goods" class="router-link-exact-active router-link-active">购物商城</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <div class="left-220" style="margin: 0px;">
            <div class="banner-nav">
              <ul>
                <li v-for="item in catelist" :key="item.id">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span v-for="span in item.subcates" :key="span.id">{{span.title}}&nbsp;</span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="#">{{item.title}}</a>
                      </dt>
                      <dd>
                        <a href="#" v-for="span in item.subcates" :key="span.id">{{span.title}}</a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">
              <div id="focus-box" class="focus-box elmBanner">
                <el-carousel :interval="3000" type="card" height="200px">
                  <el-carousel-item v-for="item in sliderlist" :key="item.id">
                    <h3 class="medium">
                      <img :src="item.img_url" class="mediumImg" alt />
                    </h3>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
          <!--/幻灯片-->
          <div class="left-220">
            <ul class="side-img-list">
              <li v-for="(item, index) in toplist" :key="index">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <a :href="'#/details/'+item.id">
                    <img :src="item.img_url" />
                  </a>
                </div>
                <div class="txt-box">
                  <a :href="'#/details/'+item.id">{{item.title}}</a>
                  <span>{{item.add_time | formatTime}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="section" v-for="(item, index) in classGoods" :key="index">
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <a
            href="#"
            v-for="(list, index) in item.level2catelist"
            :key="index"
          >{{list.subcatetitle}}</a>
          <a href="#">
            更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="(goods, index) in item.datas" :key="index">
              <a :href="'#/details/'+goods.artID" class>
                <div class="img-box">
                  <img :src="goods.img_url" />
                </div>
                <div class="info">
                  <h3>{{goods.artTitle}}</h3>
                  <p class="price">
                    <b>{{goods.sell_price}}</b>元
                  </p>
                  <p>
                    <strong>库存 {{goods.stock_quantity}}</strong>
                    <span>
                      市场价：
                      <s>{{goods.market_price}}</s>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goods",
  data() {
    return {
      // 分类导航
      catelist: [],
      // 轮播图
      sliderlist: [],
      // 热门排行商品
      toplist: [],
      // 分类商品
      classGoods: []
    };
  },
  created() {
    // 获取商品首页顶部的 轮播图，置顶，分类导航数据
    this.$axios.get("site/goods/gettopdata/goods").then(res => {
      // 分类导航
      this.catelist = res.data.message.catelist;
      // 轮播图
      this.sliderlist = res.data.message.sliderlist;
      // 热门排行商品
      this.toplist = res.data.message.toplist;
    });
    // 商品首页按照分类分组获取数据
    this.$axios.get("site/goods/getgoodsgroup").then(res => {
      this.classGoods = res.data.message;
    });
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 0;
  margin: 0;
}

.banner-img h3 {
  min-width: 100%;
  position: absolute;
  text-align: center;
  color: green;
  bottom: 0;
  line-height: 0;
  opacity: 1;
}

.el-carousel__item:nth-child(2n) {
  background-color: transparent;
  opacity: 1;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: transparent;
  opacity: 1;
}

.mediumImg {
  width: 100%;
  height: 100%;
}
.elmBanner {
  margin: 55px auto;
}
</style>
