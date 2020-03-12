<template>
  <div class="wapper">
    <!-- 登录按钮 -->
    <div class="con"
         v-if="!userId">
      <van-button type="primary"
                  to="login"
                  color="linear-gradient(to right, #4bb0ff, #6149f6)"
                  size="normal">登录</van-button>
    </div>
    <!-- 个人主页 -->
    <div v-else>
      <!-- 背景图 -->
      <div class="bcg">
        <img :src="user.profile.backgroundUrl"
             alt="">
      </div>
      <!-- 头像 -->
      <div class="usericon">
        <img :src="user.profile.avatarUrl"
             alt="">
      </div>
      <div class="userinfo">
        <!-- 名字等级 -->
        <div class="nickname">
          {{user.profile.nickname}} LV:{{user.level}}
        </div>
        <div class="follows">
          关注 {{follow}}&nbsp;|&nbsp;粉丝 {{fans}}
        </div>
      </div>
      <!-- 个人主页 -->
      <van-tabs v-model="activeName">
        <van-tab title="主页"
                 name="a">
          <!-- 个人主页内容 -->
          <!-- 听歌排行 -->
          <van-card :desc="'累计听歌'+user.listenSongs"
                    title="听歌排行"
                    thumb="https://s2.ax1x.com/2019/12/13/QgD4ET.png" />
          <!-- 我喜欢的音乐 -->
          <van-card :desc="playlist.trackCount+'首,累计听歌'+playlist.playCount"
                    title="我喜欢的音乐"
                    thumb="https://s2.ax1x.com/2019/12/13/QgrUG4.png" />
          <!-- 创建的歌单 -->
          <div class="createm">
            创建的歌单<span>（16个,被收藏0次）</span>
          </div>
          <van-card v-for="item in filteredItems"
                    :key="item.id"
                    :desc="item.trackCount+'首，播放'+item.playCount+'次'"
                    :title="item.name"
                    :thumb="item.coverImgUrl" />
          <!-- 收藏的歌单 -->
          <div class="createm">
            收藏的歌单
          </div>
          <van-card v-for="item in filteredShou"
                    :key="item.id"
                    :desc="item.trackCount+'首，播放'+item.playCount+'次'"
                    :title="item.name"
                    :thumb="item.coverImgUrl" />
        </van-tab>

        <!-- 个人动态 -->
        <van-tab :title="'动态'+dynamic"
                 name="b">
          <!-- 个人动态内容 -->
        </van-tab>

      </van-tabs>
      <!-- 退出登录按钮 -->
      <div class="btn1">
        <van-button type="warning"
                    plain
                    size="large"
                    @click="logout()">退出登录</van-button>
      </div>
    </div>

    <!-- 底部路由 -->
    <home></home>
  </div>
</template>
<script>
import home from '../components/home.vue'
export default {
  components: {
    'home': home
  },
  data () {
    return {
      activeName: 'a',//标签页
      user: {},//个人详细信息数据
      loginActive: false, //
      userInfo: {},//个人详细信息数据
      userId: '', // 用户id
      dynamic: 0, // 动态
      follow: 0, // 关注
      fans: 0, // 粉丝
      playlist: [], // 喜欢歌曲数量
      createlist: [],//创建的歌单
      creatednum: 0,//创建的歌单数量
      collectnum: 0,//收藏的歌单数量
    }
  },
  created () {
  },
  methods: {
    //获取个人详细信息
    getUser () {
      this.$http.get(`/user/detail?uid=${this.userId}`).then(res => {
        if (res)        {
          this.user = res.data
          // console.log(this.user)
        }
      })
    },
    // 获取关注数量
    getFollow () {
      this.$http.get(`/user/follows?uid=${this.userId}`).then(res => {
        if (res.code = 200)        {
          this.follow = res.data.follow.length
        }
      })
    },
    // 获取粉丝数量
    getFans () {
      this.$http.get(`/user/followeds?uid=${this.userId}`).then(res => {
        if (res.code = 200)        {
          this.fans = res.data.followeds.length
        }
      })
    },
    //获取我喜欢的音乐数量
    // getlovem(){
    //   this.$http.get(`/likelist?uid=${this.userId}`).then(res=>{
    //     if (res.code=200) {
    //       this.lovem=res.data.ids.length
    //     }
    //   })
    // },
    //获取我创建的歌单
    getPlayList () {
      this.$http.get(`/user/playlist?uid=${this.userId}&limit=66`).then(res => {
        if (res.code = 200)        {
          this.playlist = res.data.playlist[0]
          this.createlist = res.data.playlist
          this.creatednum = res.data.playlist.length
          // console.log(this.createlist)
        }

      })
    },

    //获取动态数量
    getDynamic () {
      this.$http.get(`/user/event?uid=${this.userId}`).then(res => {
        if (res.code = 200)        {
          this.dynamic = res.data.events.length
        }
      })
    },
    //获取创建和收藏的歌单数量
    // getsongSheet () {
    //   this.$http.get('/user/subcount').then(res => {
    //     this.creatednum = res.data.createdPlaylistCount
    //     // console.log(this.creatednum)
    //   })
    // },
    // 退出登录
    logout () {
      this.$http.get('/logout').then(res => {
        if (res.code = 200)        {
          localStorage.removeItem('user')
          localStorage.removeItem('userId')
          window.sessionStorage.clear();
          this.$router.push('/')
          this.$toast.success('退出成功')
        }
      })

    },
  },
  mounted () {
    if (localStorage.userId)    {
      //从localStorage提取出保存的userId
      this.userId = localStorage.userId
      this.getDynamic()
      this.getFollow()
      this.getFans()
      this.getUser()
      this.getPlayList()
    }
  },
  computed: {
    // 筛选出创建的歌单
    filteredItems: function () {
      return this.createlist.slice(0, 16)
    },
    // 筛选出收藏的歌单
    filteredShou:function () {
      return this.createlist.slice(16,66)
    }
  },
}
</script>
<style scope>
/* html,
body {
  height: 100%;
} */
#app{
  height: 500px;
}
.con {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wapper {
  height: 100%;
}
.btn1 {
  /* display: flex; */
  position: absolute;
  margin-bottom: 13%;
  height: 50px;
  width: 100%;
}
.bcg {
  position: relative;
  width: 100%;
  height: 375px;
  background-color: #95afc0;
}
.bcg img {
  width: 100%;
  height: 100%;
  opacity: 0.7;
}
.usericon {
  position: absolute;
  width: 100px;
  top: 13%;
  left: 15px;
  height: 100px;
  border-radius: 50%;
}
.userinfo{
  height: auto;
}
.usericon img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.btn1 .van-button {
  border: none;
  /* opacity: 0.7; */
  background-color: #f1f2f6;
}
.nickname {
  position: absolute;
  top: 27%;
  left: 15px;
  color: #2c3e50;
  font-family: "Fira Code Medium";
  font-weight: 900;
}
.nickname {
  display: block;
}
.follows {
  position: absolute;
  font-size: 14px;
  top: 31%;
  left: 12px;
  color: #fff;
  font-weight: 900;
  font-family: "KaiTi";
}
.van-card__title {
  margin: 10px;
  height: 19px;
  line-height: 19px;
  font-size: 18px;
  overflow: hidden;
}
.van-card__desc {
  margin-left: 10px;
  height: 28px;
  opacity: 0.7;
}
.van-card {
  margin-top: 0px !important;
  background-color: #fff;
}
.van-tab__pane {
  margin-top: 10px;
}
.createm {
  margin-left: 16px;
  margin-top: 30px;
  font-weight: 900;
}
.createm span {
  font-size: 12px;
  font-weight: 500;
}
</style>