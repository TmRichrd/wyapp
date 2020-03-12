<template>
  <div class="wapper">
    <van-nav-bar :title="song.name"
                 left-arrow
                 @click-left="onClickLeft"
                  />
                 <div class="zjimg">
                   <img :src="alPic+'?param=420y420'" alt="">
                 </div>
    <!-- <div class="audio">
      <audio ref="audio"
             :src="url"
             alt=""
             autoplay></audio>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      song: {},
      currentIndex: 0,
      songs: [],
      url: '',
      slider: 0,
      start: '0:00',
      duration: 0,
      alPic: '', // 专辑封面
      isPlay: true, // 是否播放
      isCollection: false, // 是否收藏
      loop: 1, // 播放模式 1代表顺序播放 2代表单曲循环 3代表随机播放
      isFoot: false, // 是否缩放到底部
      lyricL: '', // 歌词
      changeIndex: 0
    }
  },
  methods: {
    // 返回
    onClickLeft () {
      this.$router.back()
    },
    getAlPic() {
        if (this.song.al) {
          this.$http.get(`/album?id=${this.song.al.id}`).then(res => {
            this.alPic = res.data.songs[0].al.picUrl
            console.log(this.alPic)
          })
        } else if (this.song.album) {
          this.$http.get(`/album?id=${this.song.album.id}`).then(res => {
            this.alPic = res.data.album.picUrl
          })
        }
        else {
          this.alPic = this.song.blurCoverUrl
        }

      },
    //获取歌曲播放链接
    getSongUrl () {
      this.$http.get(`/song/url?id=${this.song.id}`)
        .then(res => {
          this.url = res.data.data[0].url
          // console.log(res)
          // console.log(this.url)
          // console.log(this.alPic)
        })
    },

  },
  computed: {
    detailItem () {
      return this.$store.state.detailItem
    }
  },
  created () {

  },
  mounted () {
    this.song = this.$route.params.item
    this.currentIndex = this.$route.params.index
    this.songs = this.$route.params.songs
    this.getSongUrl()
    this.getAlPic()
  },
}
</script>
<style lang="less" scoped>
.wapper{
  width: 100%;
  height: 1000px;
  background: rgba(0, 0, 0, .3);
}
.van-nav-bar{
  border: none;
  background-color: #2c3e50;
  opacity: .4;
  color:#fff;
}
.van-icon-arrow-left{
  color: #fff;
  font-size: 28px;
}
.van-nav-bar__title{
  color: #fff;
}
.zjimg{
  position: absolute;
  left: 10%;
  width: 80%;
  top: 10%;
  height: 300px;
}
.zjimg img{
  border-radius: 10px;
  width: 100%;
  height:100%;
  opacity: .9;
}
</style>