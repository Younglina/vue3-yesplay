import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

export function formatDate(v, format = 'YYYY-MM-DD') {
  return dayjs(v).format(format)
}

export function setCookies(string) {
  const cookies = string.split(';;')
  cookies.map((cookie) => {
    document.cookie = cookie
    const cookieKeyValue = cookie.split(';')[0].split('=')
    localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1])
  })
}

export function getCookie(key) {
  return Cookies.get(key) ?? localStorage.getItem(`cookie-${key}`)
}

export const withInstallFunction = (fn, name) => {
  fn.install = (app) => {
    fn._context = app._context
    app.config.globalProperties[name] = fn
  }

  return fn
}

export const getImgUrl = (item) => {
  const url = item.picUrl || item.imgurl || item.coverImgUrl
  return `${url}?param=512y512`
}

export const formatDT = (dt) => {
  dayjs.extend(duration)
  const time = dayjs.duration(dt)
  const hours = time.hours().toString()
  const mins = time.minutes().toString()
  const seconds = time.seconds().toString().padStart(2, '0')
  return `${hours > 0 ? `${hours}:` : ''}${mins}:${seconds}`
}

export const secondToTime = (second) => {
  const add0 = num => (num < 10 ? `0${num}` : `${num}`)
  const hour = Math.floor(second / 3600)
  const min = Math.floor((second - hour * 3600) / 60)
  const sec = Math.floor(second - hour * 3600 - min * 60)
  return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':')
}

export const formatData = (da, f) => {
  return dayjs(da).format(f || 'YYYY年MM月DD日')
}
