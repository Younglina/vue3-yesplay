import{_ as Y}from"./CardList-5de5af78.js";import{_ as x,h as d,w as B,G as D,c as g,i as s,u as p,t as e,q as y,k as t,n as v,H as w,f as S,m as $,A as C,o as b,D as N,E as f,I as T,J as V,M,z as P,K as E,s as R,x as j}from"./index-4092623b.js";import{P as q}from"./PlList-e7c8c90d.js";import{_ as z}from"./LinkTo-9134ca92.js";import{_ as F}from"./ContentLoader-9f254cf6.js";const G=_=>(R("data-v-831dc58f"),_=_(),j(),_),H={key:0,class:"playlist"},J={class:"pl-info"},K={class:"pl-info__img"},U=["src"],W={class:"pl-info__data"},O={class:"pl-info__name"},Q={class:"pl-info__creator"},X={class:"pl-info__count"},Z={class:"pl-info__desc"},aa={class:"pl-info__btns"},sa=G(()=>s("span",null,"播放",-1)),ta={class:"album-copyright"},ea={key:0},oa={class:"album-more"},la={__name:"album",setup(_){const a=d(null),h=d([]),c=d(!1),k=$(),A=B(()=>k.params,async i=>{a.value=null;const u=await T(`${i.id}`);a.value=u,V({id:u.album.artist.id,limit:5}).then(o=>{h.value=o.hotAlbums.map(({id:l,name:n,picUrl:m,publishTime:r})=>({id:l,name:n,picUrl:m,subname:`Album · ${f(r,"YYYY")}`}))}).catch(o=>{M.error(o.message)})},{immediate:!0});D(()=>{A()});const I=()=>{c.value=!c.value};return(i,u)=>{const o=z,l=P,n=C,m=q,r=E,L=Y;return a.value?(b(),g("div",H,[s("div",J,[s("div",K,[s("img",{src:p(N)(a.value.album),alt:"图片"},null,8,U)]),s("div",W,[s("div",O,e(a.value.album.name),1),s("div",Q,[y(" Album by "),t(o,{link:{name:a.value.album.artist.name,type:i.$route.name,id:a.value.album.artist.id}},null,8,["link"])]),s("div",X,e(p(f)(a.value.album.publishTime,"YYYY"))+" · "+e(a.value.songs.length)+"首歌 ",1),s("div",Z,e(a.value.album.description),1),s("div",aa,[t(n,{class:"pl-info__play"},{default:v(()=>[t(l,{name:"play",color:"var(--color-primary)"}),sa]),_:1}),t(n,{onClick:I},{default:v(()=>[t(l,{name:c.value?"heartFill":"heart"},null,8,["name"])]),_:1}),t(n,null,{default:v(()=>[t(l,{name:"more",color:"var(--color-text)"})]),_:1})])])]),t(m,{class:"album-list",list:a.value.songs},null,8,["list"]),s("div",ta,[y(" 发行于 "+e(p(f)(a.value.album.publishTime))+" ",1),a.value.album.company?(b(),g("div",ea," © "+e(a.value.album.company),1)):w("",!0)]),t(r),s("div",null,[s("div",oa," More by "+e(a.value.album.artist.name),1),t(L,{cards:h.value,type:"album"},null,8,["cards"])])])):(b(),S(F,{key:1}))}}},ma=x(la,[["__scopeId","data-v-831dc58f"]]);export{ma as default};
