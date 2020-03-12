<template>
  <div>
    <!-- 搜索按钮 -->
    <van-search :placeholder="searchvaluelist"
                v-model="query"
                @search="searchList" />
    <!-- 热搜列表 -->
    <div class="hot"
         v-if="!isShow">
      <h3>
        热搜榜
      </h3>
      <div class="h-desc">
        <div class="h-item"
             v-for="(item, index) in hots"
             :key="index"
             @click="searchItem(item)">
          <div class="index"
               :class="{hotIndex: index < 3}">
            {{index + 1}}
          </div>
          <div class="name">
            <div>
              {{item.first}}
            </div>
          </div>
          <div class="h-hot"
               v-if="index < 3">
            hot
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索导航 -->
    <van-tabs v-if="isShow">
      <van-tab v-model="active"
               v-for="(item,index) in searchNav"
               :title="item.title"
               :key="index.id"
               :to="(item.name)">
      </van-tab>
      <!-- 导航路由占位符 -->
    </van-tabs>
    <!-- 搜索综合结果 -->
    <van-list>
      <van-cell v-for="item in list"
                :key="item.id"
                :title="item.name" />
    </van-list>
  </div>
</template>
<script>
// import Comprehensive from './comprehensive.vue'
export default {
  data () {
    return {
      hots: [],//热搜列表
      isShow: false,
      active: 0,
      query: "",
      list: [],//搜索结果列表
      loading: false,
      searchvaluelist: "", //搜索栏默认值数据
      // 搜索导航栏路由跳转
      searchNav: [
        { title: '综合', name: '/searchList' },
        { title: '单曲', name: '/comprehensive' },
        { title: '云村', },
        { title: '视频', },
        { title: '歌手', },
        { title: '专辑', },
        { title: '歌单', },
        { title: '主播电台', },
        { title: '用户', }
      ]
      // finished: true
    };
  },
  created () {
    this.searchValue();
    this.getHots();
    //通过路由跳转判断选中的样式
    if (this.$route.name == "comprehensive")    {
      this.active = 0;
    } else if (this.$route.name == "")    {
      this.active = 1;
    }
  },
  methods: {
    // 搜索栏默认值
    searchValue () {
      var that = this;
      that.$http.get('/search/default').then(function (response) {
        // console.log(response);
        if (that.query == "")        {
          that.query = response.data.data.realkeyword
        } else        {
          that.searchvaluelist = response.data.data.realkeyword
        }
      }, function (err) {
      })
    },
    // 搜索列表
    searchList () {
      var that = this;
      that.$http.get("/search?keywords=" + this.query)
        .then(function (response) {
          console.log(response);
          that.list = response.data.result.songs;
          that.isShow = !that.isShow
        }, function (err) { })
      // this.finished=false
    },
    //获取热搜列表

    getHots () {
      var that = this;
      that.$http.get('/search/hot').then(function (response) {
        that.hots = response.data.result.hots
      }, function (err) {

      })
    },

    // 搜索导航栏
    // searchNav(){
    //   var that=this;
    //   that.$http.get('').then(function (response) {

    //   },function (err) {

    //   })
    // }
  },
}
</script>
<style scope lang="less">
.search {
  .hot,
  .history {
    h3 {
      margin: 30px;
      left: 20px;
      position: relative;
      top: 20px;
    }

    .desc {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 30px;
      flex-wrap: wrap;
      position: relative;

      .item {
        /*width: 30%;*/
        margin: 10px;
        text-align: center;

        .name {
          padding: 10px 20px;
          border-radius: 20px;
          background: #fff;
        }
      }

      .d-icon {
        position: absolute;
        top: -46px;
        right: 60px;
      }
    }
  }
}

.dialog {
  height: 100px;
  line-height: 100px;
  text-align: center;
}

// .active {
//   $color: #31c27c;
//   color: $color;
// }

.hotIndex {
  color: #c10d0d;
  font-size: 18px;
}
.history {
  background: #f9f9f9;
  .desc {
    .name {
    }
  }
}
.h-desc {
  .h-item {
    display: flex;
    align-items: center;
    margin: 10px 0 10px 10px;
    .index {
      margin-right: 20px;
      margin-left: 10px;
    }

    .name {
      margin-right: 20px;
    }

    .h-hot {
      font-style: italic;
      color: #c10d0d;
      font-size: 18px;
    }
  }
}
</style>