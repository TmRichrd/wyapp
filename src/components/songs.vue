<template>
  <div class="container">
    <div class="top-t">
      <div class="icon"
           @click="$router.back()">
        <van-icon name="arrow-left"
                  size="26" />
      </div>
      <div class="title">歌单广场</div>
    </div>
    <van-swipe :autoplay="3000">
      <van-swipe-item 
      v-for="(image, index) in songstree"
                      :key="index">
        <img v-lazy="image.coverImgUrl" />
        <div class="tit-t">
          {{image.name}}
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-grid :border="false"
              :column-num="3">
      <van-grid-item v-for="(item, index) in songsall"
                     :key="item.id">
        <van-image class="bordra"
                   :src="item.coverImgUrl" />
        <div class="span_title"><span>{{item.name}}</span></div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default {
  data () {
    return {
      songs: [],//歌单广场集合
      
    }
  },
  methods: {
    getSongs () {
      var that = this;
      that.$http.get('/top/playlist?order=hot').then(function (response) {

        that.songs = response.data.playlists
        
        console.log(that.name)
        // console.log(that.songs);
      }, function (err) {

      })
    },
  },
  computed: {
    songstree: function () {
      return this.songs.slice(0, 3)
    },
    songsall: function () {
      return this.songs.slice(4, 50)
    }
  },
  created () {
    this.getSongs();
  },
  mounted () {
  },
}
</script>

<style lang="less" scoped>

.top-t {
  position: relative;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c20c02;
  color: #fff;
}
.icon {
  position: absolute;
  left: 20px;
}
.tit-t{
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 50px;
  top:325px;
  background-color: #c20c02;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.title {
  font-size: 16px;
}
.container {
  width: 100%;
  height: 100%;
}
.swiper {
  width: 100%;
  height: 200px;
}
.van-swipe-item img {
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
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
  border-radius: 10px !important;
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