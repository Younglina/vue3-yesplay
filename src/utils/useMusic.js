import Message from '@/components/Message'
import { getLyric, getSongDetail } from '@/api/music.js'
import { usePinia } from '@/pinia'

export const initPlayer = (wyPlayer) => {
  const pinia = usePinia()
  wyPlayer.on('listadd', () => {
    console.log('listadd')
  })
  wyPlayer.on('listswitch', () => {
    console.log('listswitch')
  })
  wyPlayer.on('ratechange', () => {
    console.log('ratechange')
  })
  wyPlayer.on('loadeddata', () => {
    wyPlayer.play()
    const list = pinia.wyPlayer.list.audios
    const idx = pinia.wyPlayer.list.index
    console.log('loadeddata', pinia.wyPlayer.list.audios, idx, list[idx])
    pinia.currentPlaying = list[idx]
  })
}

export const playMusic = (item) => {
  const pinia = usePinia()
  if (item.fee === 1) {
    Message.warning('vip 歌曲')
    return false
  }
  getSongDetail(item.id).then(async (res) => {
    const lyric = await getLyric(item.id)
    const songs = res.songs
    if (songs && songs.length > 0) {
      const cur = {
        name: songs[0].name,
        artistName: songs[0].ar[0].name,
        artistId: songs[0].ar[0].id,
        url: `https://music.163.com/song/media/outer/url?id=${item.id}`,
        picUrl: songs[0].al.picUrl,
        alName: songs[0].al.name,
        alId: songs[0].al.id,
        lrc: lyric?.lrc?.lyric,
        ...songs[0],
      }
      pinia.wyPlayer.list.add(cur)
      const len = pinia.wyPlayer.list.audios.length
      pinia.wyPlayer.list.switch(len - 1)
    }
  })
}

export const musicCtrl = (type) => {
  const pinia = usePinia()
  switch (type) {
    case 'pause' :
      if (pinia.wyPlayer.paused)
        pinia.wyPlayer.play()
      else
        pinia.wyPlayer.pause()
      pinia.isPause = !pinia.isPause.value
      break
    case 'prev':
    case 'next': {
      if (type === 'prev')
        pinia.wyPlayer.skipBack()

      else
        pinia.wyPlayer.skipForward()

      // const list = pinia.wyPlayer.list
      // const idx = list.index
      // const len = list.audios.length
      // const tIdx = idx + (type === 'prev' ? -1 : 1)
      // const switchIdx = tIdx < 0 ? len - 1 : tIdx >= len ? 0 : tIdx
      // list.switch(switchIdx)
      break
    }
  }
}
