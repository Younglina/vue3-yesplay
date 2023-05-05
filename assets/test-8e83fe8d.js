import{_,h as l,B as y,$ as v,V as b,a0 as f,c as h,i as o,t as g,k as T,u as k,Y as d,o as V,a1 as x,s as I,x as S}from"./index-4092623b.js";const w=r=>(I("data-v-9bebb6d5"),r=r(),S(),r),B={class:"player"},A={class:"player-info"},C=w(()=>o("div",{class:"player-lrc"},[o("div",{id:"aplayer"})],-1)),N={__name:"test",setup(r){const u=l(null),s=l("0:00");y(async()=>{const e=new v({container:document.getElementById("aplayer"),lrcType:1,autoplay:!0,audio:[{lrc:`[00:00.000] 作词 : 清彦
[00:01.000] 作曲 : 李建衡
[00:12.940]原唱：HITA
[00:15.600]演唱：你的二智bb
[00:17.520]
[00:21.780]戏一折 水袖起落
[00:27.870]唱悲欢唱离合 无关我
[00:35.890]扇开合 锣鼓响又默
[00:42.080]戏中情戏外人 凭谁说
[00:49.190]惯将喜怒哀乐都融入粉墨
[00:55.140]陈词唱穿又如何 白骨青灰皆我
[01:03.640]乱世浮萍忍看烽火燃山河
[01:08.879]位卑未敢忘忧国 哪怕无人知我
[01:16.799]台下人走过 不见旧颜色
[01:24.080]台上人唱着 心碎离别歌
[01:31.230]情字难落墨 她唱须以血来和
[01:38.319]戏幕起 戏幕落 谁是客
[02:13.159]
[02:14.719]戏一折 水袖起落
[02:20.659]唱悲欢唱离合 无关我
[02:28.689]扇开合 锣鼓响又默
[02:35.180]戏中情戏外人 凭谁说
[02:42.120]惯将喜怒哀乐都融入粉墨
[02:47.780]陈词唱穿又如何 白骨青灰皆我
[02:56.550]乱世浮萍忍看烽火燃山河
[03:02.009]位卑未敢忘忧国 哪怕无人知我
[03:09.840]台下人走过 不见旧颜色
[03:16.970]台上人唱着 心碎离别歌
[03:23.849]情字难落墨 她唱须以血来和
[03:31.240]戏幕起 戏幕落 谁是客
[03:37.819]你方唱罢我登场
[03:45.190]莫嘲风月戏 莫笑人荒唐
[03:52.090]也曾问青黄也曾铿锵唱兴亡
[03:59.750]道无情 道有情 怎思量
[04:05.979]
[04:07.599]总策划：沈峻峻
[04:08.509]企划：胡璇
[04:09.509]统筹：李喆渊
[04:10.289]混音：Wuli包子（异新音乐）
[04:10.439]编曲：1AN（异新音乐）
`,url:"https://music.163.com/song/media/outer/url?id=1377748865"}]});await b(),e.on("timeupdate",()=>{const n=document.querySelector(".aplayer-lrc-current");n&&n.scrollIntoView({behavior:"smooth",block:"center"});const a=f(e.audio.currentTime);s.value!==a&&(s.value=a)}),document.querySelector(".aplayer .aplayer-lrc").addEventListener("click",n=>{if(n.target.tagName==="P"){const a=e.lrc.current.find(m=>m[1]===elements[i].innerHTML);a&&e.seek(a[0])}}),u.value=e});const c=l(0),p=e=>(console.log(e,d(e*1e3)),d(e*1e3));return(e,t)=>(V(),h("div",B,[o("div",A,[o("button",{onClick:t[0]||(t[0]=(...n)=>e.handdd&&e.handdd(...n))}," handdd "),o("span",null,g(s.value),1),T(k(x),{modelValue:c.value,"onUpdate:modelValue":t[1]||(t[1]=n=>c.value=n),style:{"min-width":"200px"},min:0,max:~~(325868/1e3),interval:1,"drag-on-click":!0,duration:0,"dot-size":12,height:2,lazy:!0,"dot-options":{tooltip:"hover"},"tooltip-formatter":p,silent:!0},null,8,["modelValue","max"])]),C]))}},P=_(N,[["__scopeId","data-v-9bebb6d5"]]);export{P as default};
