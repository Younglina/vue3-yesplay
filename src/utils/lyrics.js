// copy from https://github.com/sl1673495/vue-netease-music/blob/master/src/utils/lrcparse.js

export function lyricFormat(lrc) {
  return {
    lyricuser: lrc.lyricUser,
    tlyric: FormatParseLyric(lrc?.tlyric?.lyric || ''),
    transuser: lrc.transUser,
    lyric: FormatParseLyric(lrc?.lrc?.lyric || ''),
  }
}

export function FormatParseLyric(lrc) {
  const lrcObjs = []
  const lyrics = lrc.split('\n')
  for (let i = 0; i < lyrics.length; i++) {
    const lyric = lyrics[i]
    const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
    const timeRegExp = lyric.match(timeReg)
    if (!timeRegExp) continue
    const content = lyric.replace(timeReg, '')
    for (let j = 0, h = timeRegExp.length; j < h; j++) {
      const t = timeRegExp[j]
      const sec = Number(String(t.match(/:\d*/i)).slice(1))
      const min = Number(String(t.match(/\[\d*/i)).slice(1))
      const ms = Number(t.match(/\d*\]/i)[0].slice(0, 2)) / 100
      const time = min * 60 + sec + ms
      if (content !== '') {
        lrcObjs.push({ time: time, rawTime: timeRegExp[0], content })
      }
    }
  }
  return lrcObjs
}
