import { defineStore } from 'pinia'

export const usePinia = defineStore('pinia', {
  state: () => {
    return {
      wyPlayer: null,
      showLyric: false,
      currentPlaying: null,
      tempCurrentPlaying: null,
      isPause: false,
      isMinSound: false,
    }
  },
})
