import{_ as N}from"./LinkTo-9134ca92.js";import{_ as w,Q as x,h as V,B as F,V as P,o as s,c as o,u as l,i as _,D as B,t as m,H as b,F as g,a as $,f as L,K as U,W as z,X as D,m as E,N as H,L as W,k,q as A,Y as O,z as R}from"./index-4092623b.js";const S={key:0,class:"context-menu__info"},X=["src"],Y={class:"context-menu__name"},q={class:"context-menu__subname"},K=["onClick"],Q={__name:"menu",props:{data:{default:null},onClose:{type:Function,default:()=>{}}},setup(u){const r=u,a=x(()=>{const t={},e=r.data;return e&&(t.name=e.name,t.id=e.id,t.menuType=e.menuType,e.menuType==="playlist"&&(t.subname=e.ar[0].name,t.picUrl=e.al.picUrl)),t}),c=V(null);F(async()=>{await P(),c.value.focus()});const i=()=>{r.onClose()},p=["",{label:"播放",type:"play"},{label:"添加到队列",type:"添加到队列"},"",{label:"添加到我喜欢的音乐",type:"添加到我喜欢的音乐"},{label:"添加到歌单",type:"添加到歌单",menuType:"play"},{label:"复制链接",type:"复制链接",menuType:"play"}],d=x(()=>r.data&&r.data.menuType==="play"?p.filter(t=>t.menuType&&t.menuType.includes("play")):p);return(t,e)=>{const y=U;return s(),o("div",{ref_key:"contextMenu",ref:c,class:"context-menu",tabindex:"-1",onBlur:e[0]||(e[0]=(...n)=>u.onClose&&u.onClose(...n))},[l(a).name?(s(),o("div",S,[_("img",{class:"context-menu__img",src:l(B)(l(a)),alt:""},null,8,X),_("div",null,[_("div",Y,m(l(a).name),1),_("div",q,m(l(a).subname),1)])])):b("",!0),(s(!0),o(g,null,$(l(d),(n,f)=>(s(),o("div",{key:f},[n?(s(),o("div",{key:1,class:"context-menu__item",onClick:v=>i(n.type)},m(n.label),9,K)):(s(),L(y,{key:0,margin:"0"}))]))),128))],544)}}},j=w(Q,[["__scopeId","data-v-a66911fc"]]);let h=null,G=1;const J=(u,r)=>{h&&h.destroy(),h=null;const a=G++,c=document.createElement("div"),i=document.body,d=z(j,{data:r,onClose:()=>{h.destroy()}});D(d,c),i.appendChild(c.firstElementChild||c);const t=d.el,{offsetWidth:e,offsetHeight:y}=t,{clientWidth:n}=i,{clientX:f,clientY:v}=u,C=n-f>e?"left":"right",T=window.innerHeight-v>y?"top":"bottom",I=Math.abs(n-f);t.style[C]=C==="left"?`${f+20}px`:`${I}px`,t.style[T]=T==="bottom"?"2px":`${v}px`;const M={id:a,destroy:()=>{D(null,c)}};return h=M,M};const Z={class:"pl-list"},ee=["onContextmenu","onDblclick"],te=["src","onClick"],ne={key:1,class:"pl-list__playidx"},se={class:"pl-list__idx"},oe={class:"pl-list__name"},le={class:"pl-list__title"},ae={key:0},ce={key:2,class:"pl-list__al"},ie={class:"pl-list__dt"},_e={__name:"PlList",props:{list:{default:()=>[]}},setup(u){const r=E(),a=x(()=>r.name!=="album"),c=(i,p)=>{i.preventDefault(),p.menuType="playlist",J(i,p)};return(i,p)=>{const d=R,t=N;return s(),o("div",Z,[(s(!0),o(g,null,$(u.list,(e,y)=>(s(),o("div",{key:e.id,class:"pl-list__warp",onContextmenu:H(n=>c(n,e),["right"]),onDblclick:n=>l(W)(e)},[l(a)?(s(),o("img",{key:0,src:e.picUrl||l(B)(e.al),class:"pl-list__img",loading:"lazy",alt:"图片",onClick:n=>i.$router.push(`/album/${e.al.id}`)},null,8,te)):(s(),o("div",ne,[_("div",se,m(y+1),1),k(d,{class:"pl-list__play",name:"play",size:"1em",color:"var(--color-primary)"})])),_("div",oe,[_("div",le,[A(m(e.name)+" ",1),_("span",null,m(e.tns?`(${e.tns[0]})`:""),1)]),l(a)?(s(),o("div",ae,[(s(!0),o(g,null,$(e.ar,n=>(s(),L(t,{key:n.id,link:{...n,type:"artist"}},null,8,["link"]))),128))])):b("",!0)]),l(a)?(s(),o("div",ce,[k(t,{link:{...e.al,type:"album"}},null,8,["link"])])):b("",!0),k(d,{class:"pl-list__heart",name:"heart",color:"var(--color-primary)"}),_("div",ie,m(l(O)(e.dt)),1)],40,ee))),128))])}}},pe=w(_e,[["__scopeId","data-v-c8fbf6e3"]]);export{pe as P,J as c};
