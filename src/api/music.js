import axios from '@/utils/axios.js'

/**
 * 推荐歌单
 * 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
 * 接口地址 : /personalized
 * 调用例子 : /personalized?limit=1
 */
export function getPersonalized(limit = 10) {
  return axios({
    method: 'get',
    url: '/personalized',
    params: { limit },
  })
}

/**
 * 推荐专辑
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 */
export function getAlbumNew() {
  return axios({
    method: 'get',
    url: '/album/new',
    params: { limit: 10, offset: 0, area: 'all' },
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
    params,
  })
}

/**
 * 所有榜单
 */
export function getToplist(params) {
  return axios({
    method: 'get',
    url: '/toplist',
    params,
  })
}

/**
  网友精选碟歌单
  说明 : 调用此接口 , 可获取网友精选碟歌单
  可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
  cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
  limit: 取出歌单数量 , 默认为 50
  offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export function getTopPlayList(params) {
  return axios({
    method: 'get',
    url: '/top/playlist',
    params,
  })
}

/**
 * 精品歌单
 说明 : 调用此接口 , 可获取精品歌单
 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 limit: 取出歌单数量 , 默认为 50
 before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 */
export function getHighqualityList(params) {
  return axios({
    method: 'get',
    url: '/top/playlist/highquality',
    params,
  })
}

/**
 * 歌单详情
 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 ,
 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，
 但是返回的 trackIds 是完整的，tracks 则是不完整的，
 可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
 */
export function getPlayListDetail(id) {
  return axios({
    method: 'get',
    url: '/playlist/detail',
    params: { id },
  })
}

/**
 * 专辑详情
 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 */
export function getAlbumDetail(id) {
  return axios({
    method: 'get',
    url: '/album',
    params: { id },
  })
}

/**
 * 歌手专辑
  说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
  必选参数 : id: 歌手 id
  可选参数 : limit: 取出数量 , 默认为 30
  offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 */
export function getAlbumByArtist(params) {
  return axios({
    method: 'get',
    url: '/artist/album',
    params,
  })
}

/**
 * 歌手详情
  说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
 */
export function getArtist(id) {
  return axios({
    method: 'get',
    url: '/artists',
    params: { id },
  })
}

/**
 * 获取歌手 mv
  说明 : 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息
  具体 mv 播放地址可调 用/mv传入此接口获得的 mvid 来拿到 , 如 : /artist/mv?id=6452,/mv?mvid=5461064
 */
export function getArtistMV(id) {
  return axios({
    method: 'get',
    url: '/artist/mv',
    params: { id },
  })
}

/**
 * 获取歌手 mv
  说明 : 调用此接口 , 传入音乐 ids(支持多个 ids, 用 , 隔开), 可获得歌曲详情(dt为歌曲时长)
  必选参数 : ids: 音乐 id, 如 ids=347230
  fee: enum,
  0: 免费或无版权
  1: VIP 歌曲
  4: 购买专辑
  8: 非会员可免费播放低音质，会员可播放高音质及下载
 */
export function getSongDetail(ids) {
  return axios({
    method: 'get',
    url: '/song/detail',
    params: { ids },
  })
}

/**
 * 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 */
export function getLyric(id) {
  return axios({
    method: 'get',
    url: '/lyric',
    params: { id },
  })
}

export const getApiByType = {
  personalized: getPersonalized,
  highquality: getHighqualityList,
  toplist: getToplist,
  playList: getTopPlayList,
}
