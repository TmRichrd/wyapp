import {SET_CURRENTTIME, SET_SLIDER, SET_CURRENTINDEX, SET_PLAYFLAG, SET_USER,LOGIN_STATE} from './mutation-types'
export default {
  [SET_CURRENTTIME] (state, data) {
    state.currentTime = data
  },
  [SET_CURRENTINDEX] (state, data) {
    state.currentIndex = data
  },
  [SET_SLIDER] (state, data) {
    state.slider = data
  },
  [SET_PLAYFLAG] (state, data) {
    state.playFlag = data
  },
  [SET_USER] (state, data) {
    state.user = data
  },
  // 设置用户登陆状态
  [LOGIN_STATE] (state, num) {
    state.loginState = num
  },
}
