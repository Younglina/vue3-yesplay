import { useStore } from '@/store'
import { getSongUrl, getPlaylistById } from '@/api/song.js'
import { formatTime, formatSongs } from '@/utils/useTool.js'

export default class {
  constructor(player) {
    this._store = useStore()
    this._playing = false
    this._currentIdx = 0
    this._currentSongList = []
    this._currentSong = null
    this.progress = 0
    this.duration = 0

    player.value.addEventListener(
      'ended',
      () => {
        this.playNext()
      },
      false,
    )
    this.player = player
    this._init()
  }

  _init() {
    window.vueplayer = this
    window.vueplayer.player = this.player
  }

  _switchSong(id) {
    const songList = this._store.getters.currentSongList
    if (!songList.length) return
    if (id) {
      id = id.id || id
      this._currentIdx = songList.findIndex(item => item.id === id)
    }
    const currentSong = songList[this._currentIdx]
    this._currentSong = currentSong
    this._store.commit('SET_CURRENT_SONG', currentSong)
    getSongUrl({ id: currentSong.id }).then(({ data }) => {
      this.player.value.src = data[0].url
      this._playing = true
      this._setDuration()
      this._setProgress()
    })
  }

  async getSonglist(id) {
    this._store.commit('SET_CURRENT_SONGLIST', [])
    this._currentSongList = []
    const { songs } = await getPlaylistById({ id: id })
    const songlist = formatSongs(songs)
    this._currentSongList = songlist
    this._store.commit('SET_CURRENT_SONGLIST', songlist)
    return songlist
  }

  _setDuration() {
    const trackDuration = this._currentSong.dt || 1000
    let duration = ~~(trackDuration / 1000)
    this.duration = duration > 1 ? duration - 1 : duration
    this._store.commit('SET_DURATION', this.duration)
  }

  _setProgress() {
    setInterval(() => {
      if (this.player === null) return
      this.progress = this.player.value.currentTime
      this._store.commit('SET_PROGRESS', this.progress)
    }, 1000)
  }

  playNext() {
    if (++this._currentIdx >= this._currentSongList.length) {
      this._currentIdx = 0
    }
    this._switchSong()
  }
  playPrev() {
    if (--this._currentIdx <= 0) {
      this._currentIdx = 0
    }
    this._switchSong()
  }

  play() {
    this.player.value.play()
  }

  pause() {
    this.player.value.pause()
  }

  fastSeek(val) {
    this.player.value.currentTime = val
  }

  playSong(id) {
    this._switchSong(id)
  }

  switchSong(type) {
    switch (type) {
      case 'prev':
        this.playPrev()
        this._playing = true
        break
      case 'next':
        this.playNext()
        this._playing = true
        break
      case 'play':
        if (this._playing === true) {
          this.pause()
        } else {
          this.play()
        }
        this._playing = !this._playing
        break
      default:
        break
    }
    return this._playing
  }
}
