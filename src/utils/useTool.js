import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';

export function formatDate(v, format = 'YYYY-MM-DD') {
  return dayjs(v).format(format)
}

export function setCookies(string) {
  const cookies = string.split(';;')
  cookies.map(cookie => {
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
  let url = item.picUrl || item.imgurl || item.coverImgUrl;
  return `${url}?param=512y512`;
}


export const formatDT = (dt) => {
  dayjs.extend(duration);
  let time = dayjs.duration(dt);
  let hours = time.hours().toString();
  let mins = time.minutes().toString();
  let seconds = time.seconds().toString().padStart(2, '0');
  return `${hours > 0 ? hours + ':' : ''}${mins}:${seconds}`
}

export const formatData = (da, f) => {
  return dayjs(da).format(f || 'YYYY年MM月DD日')
}