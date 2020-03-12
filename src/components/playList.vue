<template>
  <div class="container">
    <!-- 标题 -->
    <div class="top-t">
      <div class="icon"
           @click="$router.back()">
        <van-icon name="arrow-left"
                  size="26" />
      </div>
      <div class="title">歌单</div>
    </div>
    <!-- 主体 -->
    <div class="wapper">
      <!-- 背景图 -->
      <div class="img">
        <img :src="picUrl"
             alt="">
      </div>
      <!-- 描述 -->
      <div class="name-n">
        {{picName}}
      </div>
      <!-- 列表主体 -->
      <div class="content">
        <div class="c-top">
          <!-- 播放图标 -->
          <div class="c-icon">
            <van-icon name="play-circle-o"
                      size="20" />
          </div>
          <!-- 播放全部 -->
          <div class="play">播放全部（共{{playList.length}}首）</div>
          <!-- 收藏 -->
          <div class="col">+收藏（{{subscribedCount}}）</div>
        </div>
        <!-- 歌曲列表 -->
        <div class="item"
             v-for="(item, index) in playList"
             :key="index"
             @click="goToPlay(item, index)">
          <div class="index">
            {{index + 1}}
          </div>
          <!-- 歌曲主体 -->
          <div class="i-desc">
            <!-- 歌曲名 -->
            <div class="i-name">
              <div class="item0">{{item.name}}</div>
              <div class="item1"
                   v-for="(item1, index1) in item.alia"
                   v-if="item.alia.length > 0"
                   :key="index1">
                ({{item1}})
              </div>
            </div>
            <!-- 歌手 -->
            <div class="i-singer">
              <div class="singer"
                   v-for="(item2, index2) in item.ar"
                   :key="index2">
                {{item2.name}} <span v-if="index2 !== item.ar.length - 1">&nbsp;/&nbsp;</span>
                <span v-if="index2 === item.ar.length - 1">-&nbsp;</span>
              </div>
              <div class="al">
                {{item.al.name}}
              </div>
              <div class="icon-icon">
                <van-icon name="play-circle-o"
                          size="20px"></van-icon>
              </div>
            </div>
            <!-- 播放图标 -->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlayList",
  components: {},
  props: {},
  data () {
    return {
      playList: [], // 播放列表
      picUrl: '',//背景图
      picName: '',//歌单标题
      subscribedCount: 0,//收藏次数
    }
  },
  methods: {
    goToPlay (item, index) {
      this.$store.state.detailItem.name = item.ar
      this.$http.get(`/song/detail?ids=${item.id}`).then(res => {
        if (res.code = 200)        {
          let song = res.data.songs[0]
          console.log(song)
          this.$router.push({            name: 'player',
            params: {
              item: song, index: index, songs: this.playList
            }
          })
        }
      })
    }
  },
  created () {
  },
  mounted () {
    this.$http.get(`/playlist/detail?id=${this.playListId}`).then(res => {
      this.playList = res.data.playlist.tracks
      this.picUrl = res.data.playlist.coverImgUrl
      this.picName = res.data.playlist.name
      this.subscribedCount = res.data.playlist.subscribedCount
      // console.log(this.playList)
    })
  },
  computed: {
    detailItem () {
      return this.$store.state.detailItem
    },
    playListId () {
      return this.$store.state.playListId
    }
  },
}
</script>
<style  lang="less">
html,
body {
  height: 100%;
  width: 100%;
}
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
.title {
  font-size: 16px;
}
.wapper {
  height: auto;
  position: relative;
}
.wapper .img {
  width: 100%;
  height: auto;
}
.img img {
  width: 100%;
  height: 100%;
}
.name-n {
  font-size: 24px;
  color: #fff;
  position: absolute;
  width: 80%;
  top: 185px;
  left: 50%;
  transform: translateX(-50%);
}
.c-top {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 12px;
  border-bottom: 1px solid #eee;
}
.c-icon {
  margin: 20px;
}
.play {
  font-size: 0.9rem;
  height: 24px;
  float: left;
}
.col {
  cursor: pointer;
  background: #c10d0d;
  color: #fff;
  font-size: 14px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: -4px;
  height: 44px;
}
.content {
  position: relative;
}
.item {
  // position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 37px;
  margin: 10px 10px;
}
.index {
  position: absolute;
  left: 10px;
  color: #ccc;
  font-size: 14px;
}
.i-desc {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.i-name {
  max-width: 284px;
  font-size: 14px;
  height: 20px;
  overflow: hidden;
}
.item1 {
  float: left;
}
.i-singer {
  display: flex;
  align-items: center;
  color: #ccc;
}
.icon-icon {
  position: absolute;
  right: 20px;
  color: black;
}
.item0 {
  float: left;
  margin-right: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>