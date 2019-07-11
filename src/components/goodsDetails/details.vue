<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="#/">购物商城</a> &gt;
        <a href="#">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box"></div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <div class="el-input-number el-input-number--small">
                          <span
                            role="button"
                            class="el-input-number__decrease"
                            ref="reduce"
                            @click="handlerInventoryReduce($event)"
                            :class="{'is-disabled':this.numGoods<=0?true:false}"
                          >
                            <i class="el-icon-minus"></i>
                          </span>
                          <span
                            role="button"
                            class="el-input-number__increase"
                            ref="increase"
                            @click="handlerInventoryIncrease($event)"
                            :class="{'is-disabled':this.numGoods > this.allGoods - 1?true:false}"
                          >
                            <i class="el-icon-plus"></i>
                          </span>
                          <div class="el-input el-input--small">
                            <!---->
                            <input
                              autocomplete="off"
                              size="small"
                              type="text"
                              rows="2"
                              :max="numGoodsMax"
                              :min="numGoodsMin"
                              class="el-input__inner"
                              v-model="numGoods"
                            />
                            <!---->
                            <!---->
                            <!---->
                          </div>
                        </div>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button @click="goCart(goodsinfo.id)" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a href="javascript:;" class="selected">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;">商品评论</a>
                  </li>
                </ul>
              </div>
              <div class="tab-content entry" style="display: block;">内容</div>
              <div class="tab-content" style="display: block;">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model.trim="commentContent"
                          @keyup.enter="setCommentContext"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="setCommentContext"
                        />
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      v-if="comments.length==0"
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="item in comments" :key="item.id">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time | formatTime}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <div class="block">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[10, 20, 30, 40 ,50 ,100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalcount"
                      ></el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(item, index) in  hotgoodslist" :key="index">
                    <div class="img-box">
                      <a :href="'#/details/'+item.id" class>
                        <img :src="item.img_url" />
                      </a>
                    </div>
                    <div class="txt-box">
                      <a :href="'#/details/'+item.id" class>{{item.title}}</a>
                      <span>{{item.add_time | formatTime('YYYY-MM-DD')}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 商品详情
  name: "detailsGoods",
  data() {
    return {
      // 商品图片
      imglist: [],
      // 商品信息
      goodsinfo: {},
      // 推荐商品
      hotgoodslist: [],
      // 商品数量最大值
      numGoodsMax: 0,
      // 商品数量最小值
      numGoodsMin: 0,
      // 选购商品数量
      numGoods: 1,
      // 总库存
      allGoods: 0,
      // 用户评论
      comments: [],
      // 评论总页数
      totalcount: 0,
      // 评论当前页数
      pageIndex: 1,
      // 评论每页显示的条数
      pageSize: 10,
      // 用户评论内容
      commentContent: ""
    };
  },
  created() {
    // 获取商品数据
    this.getData();
    // 获取评论数据
    this.getComments();
  },
  methods: {
    // 获取数据
    getData() {
      this.$axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(res => {
          // 商品图片
          this.imglist = res.data.message.imglist;
          // 商品信息
          this.goodsinfo = res.data.message.goodsinfo;
          // 推荐商品
          this.hotgoodslist = res.data.message.hotgoodslist;
          // 总库存
          this.allGoods = this.goodsinfo.stock_quantity;
          // 总选购
          this.numGoods = 0;
        });
    },
    // 库存操作
    // 减
    handlerInventoryReduce() {
      if (this.numGoods <= 0) return;
      this.numGoods--;
    },
    // 增
    handlerInventoryIncrease() {
      if (this.numGoods > this.allGoods - 1) return;
      this.numGoods++;
    },
    // 获取评论
    getComments() {
      this.$axios
        .get(`site/comment/getbypage/goods/${this.$route.params.id}`, {
          params: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          // 用户评论
          this.comments = res.data.message;
          // 评论总页数
          this.totalcount = res.data.totalcount;
          // 评论当前页数
          this.pageIndex = res.data.pageIndex;
          // 评论每页显示的条数
          this.pageSize = res.data.pageSize;
        });
    },
    // 页码条数改变触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.getComments();
    },
    // 当前页改变触发
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getComments();
    },
    // 提交评论
    setCommentContext() {
      if (this.commentContent == "") {
        return this.commentNot();
      }
      this.$axios
        .post(`site/validate/comment/post/goods/${this.$route.params.id}`, {
          commenttxt: this.commentContent
        })
        .then(() => {
          this.getComments();
          this.commentContent = "";
        });
    },
    // 评论为空警告
    commentNot() {
      this.$notify({
        title: "警告",
        message: "评论不能为空",
        type: "warning",
        duration: 2000
      });
    },
    // 加入购物车
    goCart(id) {
      if (this.numGoods <= 0) {
        return this.$notify({
          title: "警告",
          message: "请选择商品数量",
          type: "warning",
          duration: 2000
        });
      }
      this.$emit("changeCartNum", id);
    }
  },
  watch: {
    // 侦听路由的改变
    $route: function() {
      this.getData();
      this.getComments();
    }
  }
};
</script>

<style>
</style>
