<script setup>
import 'APlayer/dist/APlayer.min.css'
import APlayer from 'APlayer'
import { nextTick, onMounted, ref } from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import { formatDT, secondToTime } from '@/utils/useTool.js'

const aaa = ref(null)
const beginTime = ref('0:00')
onMounted(async () => {
  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    lrcType: 1,
    autoplay: true,
    audio: [{
      lrc: '[00:00.000] 作词 : 清彦\n[00:01.000] 作曲 : 李建衡\n[00:12.940]原唱：HITA\n[00:15.600]演唱：你的二智bb\n[00:17.520]\n[00:21.780]戏一折 水袖起落\n[00:27.870]唱悲欢唱离合 无关我\n[00:35.890]扇开合 锣鼓响又默\n[00:42.080]戏中情戏外人 凭谁说\n[00:49.190]惯将喜怒哀乐都融入粉墨\n[00:55.140]陈词唱穿又如何 白骨青灰皆我\n[01:03.640]乱世浮萍忍看烽火燃山河\n[01:08.879]位卑未敢忘忧国 哪怕无人知我\n[01:16.799]台下人走过 不见旧颜色\n[01:24.080]台上人唱着 心碎离别歌\n[01:31.230]情字难落墨 她唱须以血来和\n[01:38.319]戏幕起 戏幕落 谁是客\n[02:13.159]\n[02:14.719]戏一折 水袖起落\n[02:20.659]唱悲欢唱离合 无关我\n[02:28.689]扇开合 锣鼓响又默\n[02:35.180]戏中情戏外人 凭谁说\n[02:42.120]惯将喜怒哀乐都融入粉墨\n[02:47.780]陈词唱穿又如何 白骨青灰皆我\n[02:56.550]乱世浮萍忍看烽火燃山河\n[03:02.009]位卑未敢忘忧国 哪怕无人知我\n[03:09.840]台下人走过 不见旧颜色\n[03:16.970]台上人唱着 心碎离别歌\n[03:23.849]情字难落墨 她唱须以血来和\n[03:31.240]戏幕起 戏幕落 谁是客\n[03:37.819]你方唱罢我登场\n[03:45.190]莫嘲风月戏 莫笑人荒唐\n[03:52.090]也曾问青黄也曾铿锵唱兴亡\n[03:59.750]道无情 道有情 怎思量\n[04:05.979]\n[04:07.599]总策划：沈峻峻\n[04:08.509]企划：胡璇\n[04:09.509]统筹：李喆渊\n[04:10.289]混音：Wuli包子（异新音乐）\n[04:10.439]编曲：1AN（异新音乐）\n',
      url: 'https://music.163.com/song/media/outer/url?id=1377748865',
    }],
  })
  await nextTick()
  ap.on('timeupdate', () => {
    const el = document.querySelector('.aplayer-lrc-current')
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
    const currentTime = secondToTime(ap.audio.currentTime)
    if (beginTime.value !== currentTime)
      beginTime.value = currentTime
  })
  const lrcContainer = document.querySelector('.aplayer .aplayer-lrc')
  lrcContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'P') {
      const a = ap.lrc.current.find(item => item[1] === elements[i].innerHTML)
      if (a)
        ap.seek(a[0])
    }
  })
  aaa.value = ap
})
const timeCtrl = ref(0)
const format = (v) => {
  console.log(v, formatDT(v * 1000))
  return formatDT(v * 1000)
}
</script>

<template>
  <div class="player">
    <div class="player-info">
      <button @click="handdd">
        handdd
      </button>
      <span>{{ beginTime }}</span>
      <VueSlider
        v-model="timeCtrl"
        style="min-width: 200px;"
        :min="0"
        :max="~~(325868 / 1000)"
        :interval="1"
        :drag-on-click="true"
        :duration="0"
        :dot-size="12"
        :height="2"
        :lazy="true"
        :dot-options="{ tooltip: 'hover' }"
        :tooltip-formatter="format"
        :silent="true"
      />
    </div>
    <div class="player-lrc">
      <div id="aplayer" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.player{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 249;
  display: flex;
  background-color: #fff;
  &-info{
    display: flex;
    flex: 1;
    z-index: 1;
    align-items: center;
    justify-content: center;
  }
  &-lrc{
    display: flex;
    flex: 1;
    z-index: 1;
  }
}
:deep(#aplayer){
  font-family: Arial,Helvetica,sans-serif;
  margin: 0px;
  box-shadow: unset;
  border-radius: 0px;
  .aplayer-info{
    padding: 0;
    margin-left: 0;
    margin-right: 24px;
  }
  .aplayer-lrc{
    height: 100vh;
    overflow-y: auto;
    margin: 0;
    &:after{
      display: none;
    }
    p{
      font-weight: 600;
      font-size: 1.5em;
      line-height: unset!important;
      height: auto!important;
      padding: 12px 20px !important;
      margin: 4px 0 !important;
      border-radius: 12px;
      opacity: 0.6;
      transition: translate .5s ease-out;
      cursor: pointer;
      &:hover{
        background-color: var(--color-bg-gray);
      }
    }
    .aplayer-lrc-current{
      opacity: 1 !important;
    }
  }
  .aplayer-lrc::-webkit-scrollbar {
    display: none;
  }
  .aplayer-lrc-contents{
    transform: translateY(0) !important;
  }
  .aplayer-lrc-contents p{
    &:first-child{
      margin-top: 50vh!important;
    }
  }
  .aplayer-list,.aplayer-pic,.aplayer-music,.aplayer-controller,.aplayer-notice{
    display: none;
  }
}
:deep(.vue-slider){
  background: linear-gradient(to left top, rgb(21, 18, 13), rgb(29, 20, 18));
  .vue-slider-rail{
    background-color: var(--color-text);
    &:hover{
      .vue-slider-dot{
        opacity: 1;
      }
    }
  }
  .vue-slider-dot{
    opacity: 1;
    border: none;
      box-shadow: none;
  }
  .vue-slider-dot-handle{
    border: none;
    box-shadow: none;
    &:hover{
      border: none;
      box-shadow: none;
    }
  }
  .vue-slider-process{
    background-color: #fff;
  }
}
</style>
