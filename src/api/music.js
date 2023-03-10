import axios from '@/utils/axios.js'

/**
 * 推荐歌单
 * 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
 * 接口地址 : /personalized
 * 调用例子 : /personalized?limit=1
 */
export function getPersonalized(limit=10) {
  return axios({
    method: 'get',
    url: '/personalized',
    params: { limit },
  })
}

/**
 * 推荐歌单
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 */
export function getAlbumNew({limit=10, offset=0, area='all'}) {
  return axios({
    method: 'get',
    url: '/album/new',
    params: { limit, offset, area },
  })
}

/**
 * 歌手榜
 * 可选参数 : type : 地区
 * 1: 华语
 * 2: 欧美
 * 3: 韩国
 * 4: 日本
 */
export function getToplistArtist(params) {
  return axios({
    method: 'get',
    url: '/toplist/artist',
    params: params,
  })
}

/**
 * 所有榜单
 */
export function getToplist(params) {
  return axios({
    method: 'get',
    url: '/toplist',
    params: params,
  })
}


