import Cookies from 'js-cookie'
import dayjs from 'dayjs'

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
  let url = item.picUrl || item.coverImgUrl;
  return `${url}?param=512y512`;
}