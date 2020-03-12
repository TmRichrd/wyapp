export default  {
  detailItem: {}, // 播放详情
  isFoot: false, // 是否缩放到底部
  song: {}, // 播放歌曲
  alPic: '', // 专辑封面
  songUrl: '', // 歌曲播放地址
  playFlag: false, // 是否在播放状态
  currentIndex: -1,
  currentTime:0, // 当前播放时间
  duration: 0, // 当前歌曲时长
  slider: 0, // 当前歌曲进度条
  user: {},
  playListId: '', // 歌单id
  searchSongs: [], // 搜索结果
  searchValue: '', // 搜索关键词，
  albumId: '', // 专辑id
  sheetId: '', // 歌单id
  userId: '', // 用户id
  singerId: '', // 歌手id
  singName: '', // 歌手关键词
  singer: {}, // 歌手
  radioId: '', // 电台id
  videoId: '', // 视频id
  loginState: 0, // 登陆状态，初始值为 0 未登录，登陆成功设置为 1
}
