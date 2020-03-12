<template>
  <div>
    <van-cell
    v-for="(item,index) in recoList"
    :key="index"
    :title="item.name"
  />
  </div>
</template>
<script>
export default {
  name: "PlayList",
  components: {},
  props: {},
  data () {
    return {
      recoList: [], // 播放列表
      load: '',
      isLogin: +localStorage.getItem('loginState') || 0
      // picUrl: '',//背景图
      // picName: '',//歌单标题
    }
  },
  methods: {
    _getRecSongs () {
      if (this.isLogin !== 0)      {
        this.$http.get('recommend/songs')
          .then(res => {
            const data = res.data
            if (data.code === 200)            {
              this.recoList = data.recommend
              console.log(this.recoList)
              this.load = false
            }
          })
          .catch(err => {
            if (err)            {
              this.load = false
            }
          })
      } else      {
        this.load = false
      }
    },
    //获取登录状态
    // getloginstatus () {
    //   this.$http.get('/login/status').then(res => {
    //     if (res)        {
    //       console.log("获取登录状态成功！")
    //     }

    //   }).catch(err => {
    //     if (err)        {
    //       this.$toast.fail('请先登录！')
    //     }
    //   })
    // },
    //
    getRecoList () {
      this.$http.get('/recommend/songs').then(function (res) {
        this.recoList = res;
        console.log(this.recoList)
      }, function (err) {

      })
    }
  },
  created () {
    this.getRecoList();
    this._getRecSongs();
    // this.getloginstatus();
  },
  mounted () {

  },
  computed: {
    detailItem () {
      return this.$store.state.detailItem
    },
    userId () {
      return this.$store.state.userId
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
  top: 6%;
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