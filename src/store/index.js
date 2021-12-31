import { createStore } from 'vuex'

export const store = createStore({
  state: {
    userInfo: null,
    currentSong: null,
    currentSongList: null,
    player: null,
    progress: 0,
    duration: 0,
    showLyrics: false,
    dailySong: [],
  },
  mutations: {
    SET_USERINFO(state, data) {
      state.userInfo = data
      localStorage.setItem('userInfo', JSON.stringify(data))
    },
    SET_CURRENT_SONG(state, data) {
      state.currentSong = data
    },
    SET_CURRENT_SONGLIST(state, data) {
      state.currentSongList = data
    },
    SET_PLAYER(state, data) {
      state.player = data
    },
    SET_PROGRESS(state, data) {
      state.progress = data
    },
    SET_DURATION(state, data) {
      state.duration = data
    },
    SET_SHOWLYRICS(state, data) {
      state.showLyrics = data
    },
    SET_DAILYSONG(state, data) {
      state.dailySong = data
    },
  },
  getters: {
    userInfo(state) {
      return state.userInfo
    },
    currentSong(state) {
      return state.currentSong
    },
    currentSongList(state) {
      return state.currentSongList
    },
    player(state) {
      return state.player
    },
  },
})

export function useStore() {
  return store
}
