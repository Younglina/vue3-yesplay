import{_ as M}from"./CardList-5de5af78.js";import{_ as $}from"./LinkTo-9134ca92.js";import{_ as x,h as i,w as z,G as C,c as f,i as s,u as k,t as c,k as e,n as y,F as N,a as V,f as F,m as U,A as E,o as m,D as L,L as R,N as j,s as G,x as J,O,J as P,E as S,M as I,P as T,z as W}from"./index-4092623b.js";import{_ as q}from"./ContentLoader-9f254cf6.js";const d=u=>(G("data-v-d9a3c987"),u=u(),J(),u),H={key:0,class:"playlist"},K={class:"pl-info"},Q={class:"pl-info__img"},X=["src"],Z={class:"pl-info__data"},ss={class:"pl-info__name"},as=d(()=>s("div",{class:"pl-info__creator"}," 艺人 ",-1)),ts={class:"pl-info__count"},os={class:"pl-info__desc"},es={class:"pl-info__btns"},ls=d(()=>s("span",null,"播放",-1)),ns={class:"list-warp"},is=d(()=>s("div",{class:"list-warp-title"}," 热门歌曲 ",-1)),cs={class:"hot-songs"},_s=["onDblclick"],rs=["src","onClick"],ds={class:"hot-songs__name"},us={class:"hot-songs__subname"},ps={class:"list-warp"},ms=d(()=>s("div",{class:"list-warp-title"}," 专辑 ",-1)),vs={class:"list-warp"},hs=d(()=>s("div",{class:"list-warp-title"}," MVs ",-1)),gs={__name:"artist",setup(u){const o=i(null),b=i([]),w=i([]),v=i(!1),h=i(!0),g=i(!0),D=U(),Y=z(()=>D.params,async _=>{o.value=null;const p=await O(_.id);p.hotSongs=p.hotSongs.map(a=>({id:a.id,name:a.name,picUrl:a.al.picUrl,alId:a.al.id,alName:a.al.name})),o.value=p,P({id:_.id}).then(a=>{b.value=a.hotAlbums.map(({id:l,name:r,picUrl:n,publishTime:t})=>({id:l,name:r,picUrl:n,subname:`${S(t,"YYYY")}`})),h.value=!1}).catch(a=>{I.error(a.message),h.value=!1}),T(_.id).then(a=>{w.value=a.mvs.map(({id:l,name:r,imgurl:n,publishTime:t})=>({id:l,name:r,imgurl:n,subname:`${S(t,"YYYY")}`})),g.value=!1}).catch(a=>{g.value=!1,I.error(a.message)})},{immediate:!0});C(()=>{Y()});const A=()=>{v.value=!v.value};return(_,p)=>{const a=W,l=E,r=$,n=M;return o.value?(m(),f("div",H,[s("div",K,[s("div",Q,[s("img",{src:k(L)(o.value.artist),alt:"图片"},null,8,X)]),s("div",Z,[s("div",ss,c(o.value.artist.name),1),as,s("div",ts,c(o.value.artist.musicSize)+"首歌 · "+c(o.value.artist.albumSize)+"张专辑 · "+c(o.value.artist.mvSize)+"张专辑 ",1),s("div",os,c(o.value.artist.briefDesc),1),s("div",es,[e(l,{class:"pl-info__play"},{default:y(()=>[e(a,{name:"play",color:"var(--color-primary)"}),ls]),_:1}),e(l,{onClick:A},{default:y(()=>[e(a,{name:v.value?"heartFill":"heart"},null,8,["name"])]),_:1}),e(l,null,{default:y(()=>[e(a,{name:"more",color:"var(--color-text)"})]),_:1})])])]),s("div",ns,[is,s("div",cs,[(m(!0),f(N,null,V(o.value.hotSongs.slice(0,12),t=>(m(),f("div",{key:t.id,class:"hot-songs__items",onDblclick:B=>k(R)(t)},[s("img",{src:k(L)(t),loading:"lazy",alt:"hotsong",onClick:j(B=>_.$router.push(`/album/${t.alId}`),["stop"])},null,8,rs),s("div",null,[s("div",ds,c(t.name),1),s("div",us,[e(r,{link:{id:t.alId,name:t.alName,type:"album"}},null,8,["link"])])])],40,_s))),128))])]),s("div",ps,[ms,e(n,{cards:b.value,loading:h.value,type:"album"},null,8,["cards","loading"])]),s("div",vs,[hs,e(n,{cards:w.value,loading:g.value,type:"mv"},null,8,["cards","loading"])])])):(m(),F(q,{key:1}))}}},ws=x(gs,[["__scopeId","data-v-d9a3c987"]]);export{ws as default};
