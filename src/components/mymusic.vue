<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="网易云音乐">
      <van-button type="default"
                  to="searchList"
                  slot="right"
                  icon="search"
                  class="noborder"></van-button>
    </van-nav-bar>
    <!-- 轮播图 -->
    <div v-if="!showBanner">
      <van-loading size="24px">加载中...</van-loading>
    </div>
    <van-swipe v-else-if="showBanner"
               :autoplay="3000"
               indicator-color="white">
      <van-swipe-item v-for="(item, index) in focus"
                      :key="item.id">
        <a :href="item.url">
          <img :src="item.pic"
               alt=""
               width="100%">
        </a>
      </van-swipe-item>
    </van-swipe>
    <!-- 九宫格导航 -->
    <van-grid :border="false"
              :gutter="10">
      <van-grid-item icon="description"
                     text="每日推荐"
                     to="reco" />
      <van-grid-item icon="service"
                     text="歌单" />
      <van-grid-item icon="bar-chart-o"
                     text="排行榜" />
      <van-grid-item icon="live"
                     text="直播" />
    </van-grid>
    <!-- 歌单 -->
    <div>
      <!-- 推荐歌单 -->
      <div class="contanier">
        <div class="top">
          <h5>推荐歌单</h5>
          <div class="song" @click="goTo('/songs')">
            歌单广场
          </div>
          <!-- 歌单 -->
        </div>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <van-grid :border="false"
              :column-num="3">
      <van-grid-item v-for="(item, index) in playlist"
                     :key="item.id"
                     @click="goToDetail(item, index)">
        <van-image class="bordra"
                   :src="item.picUrl" />
        <div class="span_title"><span>{{item.name}}</span></div>
      </van-grid-item>
    </van-grid>

    <div>
      <!-- 新歌 -->
      <div class="contanier">
        <div class="top">
          <h5>新碟</h5>
          <div class="song">
            更多新碟
          </div>
          <!-- 歌单 -->
        </div>
      </div>
    </div>
    <!--新歌单 -->
    <van-grid :border="false"
              :column-num="2">
      <van-grid-item v-for="(item, index) in newplaylist"
                     :key="item.id"
                     @click="goToDetail(item, index)">
        <van-image class="bordra"
                   :src="item.coverImgUrl" />
        <div class="span_title"><span>{{item.name}}</span></div>
      </van-grid-item>
    </van-grid>
    <!-- 电台 -->
    <div>
      <!-- 推荐电台 -->
      <div class="contanier">
        <div class="top">
          <h5>推荐电台</h5>
          <div class="song">
            更多电台
          </div>
          <!-- 歌单 -->
        </div>
      </div>
    </div>
    <!-- 推荐电台 -->
    <van-grid class="bodbottom"
              :border="false"
              :column-num="3">
      <van-grid-item v-for="(item, index) in newradio"
                     :key="item.id">
        <van-image class="bordra"
                   :src="item.picUrl" />
        <div class="span_title"><span>{{item.name}}</span></div>
      </van-grid-item>
    </van-grid>

    <!-- 底部导航栏路由 -->
    <home></home>
  </div>
</template>
<script>
import home from "../components/home.vue";  //引用组件的地址
export default {
  components: {
    'home': home
  },
  data () {
    return {
      showBanner: false, //加载中
      focus: [], //  焦点图
      playlist: [],// 推荐歌单
      newplaylist: [], // 新歌
      newradio: []//电台
    }
  },
  created () {
    this.getData(); //获取轮播图数据
    this.getPlayList();//获取热门歌单数据
    this.getNewPlaylist();  //获取新歌
    this.getNewradio();// 获取电台
  },
  methods: {
    goTo(path) {
        this.$router.push(path)
      },
    // 获取轮播图方法
    getData () {
      var that = this;
      that.$http.get('/banner?type=1').
        then(function (response) {
          // console.log(response);
          that.focus = response.data.banners;
          that.showBanner = true;
        }, function (err) {

        })
    },
    // 获取热门歌单
    getPlayList () {
      var that = this;
      that.$http.get('/personalized?limit=6').then(function (response) {
        // console.log(response);
        that.playlist = response.data.result
      }, function (err) {

      })
    },
    // 获取新歌
    getNewPlaylist () {
      var that = this;
      that.$http.get('/top/playlist?limit=6&order=new').then(function (response) {
        // console.log(response);
        that.newplaylist = response.data.playlists
        // console.log(that.newplaylist)
      }, function (err) { })
    },
    //根据相应的歌单id获取歌曲详细信息
    goToDetail (item, index) {
      this.$store.state.playListId = item.id
      this.$router.push({ name: 'playList', params: { detailItem: item } })
    },
    // 获取电台
    getNewradio () {
      var that = this;
      that.$http.get('/personalized/djprogram').then(function (response) {
        that.newradio = response.data.result
        // console.log(that.newradio)
      }, function (err) {

      })
    }
  },
}
</script>
<style scope>
.contanier {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.h5 {
  display: block;
}
.noborder {
  border: none;
}
.van-swipe-item img {
  width: 100%;
}
.van-grid-item {
  margin-top: 20px;
  border: none;
  cursor: pointer;
}
.top {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 20px;
  width: 100%;
  height: 50px;
}
.song {
  position: absolute;
  cursor: pointer;
  margin-top: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 26.97px;
  width: 68px;
  line-height: 26.97px;
  background-color: rgb(238, 238, 238);
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
  font-size: 12px;
  align-content: center;
}
.content {
  position: relative;
  align-content: center;
  color: #000;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  border: 1px solde red;
  pointer-events: auto;
}
.item {
  left: 20px;
  align-items: normal;
  color: #000;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  height: 120px;
  /* justify-content: flex-start; */
  margin-top: 10px;
  pointer-events: auto;
  /* position: relative; */
  width: 116.25px;
}
.item img {
  color: #000;
  display: block;
  font-size: 12px;
  pointer-events: auto;
  height: 79.9844px;
  width: 116.25px;
}
.span_title {
  padding-top: 5px;
  height: 36px;
  /* border: 1px solid red; */
  font-size: 6px;
  overflow: hidden;
  /* text-overflow: ellipsis; */
}
.span_title span {
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  overflow: hidden;
}
.bordra {
  border-radius: 10px;
}
.van-grid-item {
  margin-top: 0px;
}
.van-image img {
  border-radius: 5px;
}
.van-grid-item__content {
  padding-bottom: 2px;
}
.van-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 145.828px;
}
.bodbottom {
  margin-bottom: 50px;
}
</style>