import{u as B}from"./useNavBarHide-08234085.mjs";import{a as g,e as y,o as l,b as p,y as C,z as H,u as s,A as M,B as T,c as L,i as V,C as e,D as i,E as b,F as D,G as z,H as E,I as R,J as $,r as _,p as k,K as A}from"./entry-c084ffd1.mjs";import{n as F,a as j,b as G}from"./index-f45ed35e.mjs";const J=y({__name:"index",setup(t){const c=B();return(n,o)=>(l(),p("div",{class:H(["IndexPageContainter",{NavBarMoveTop:s(c)}])},[C(n.$slots,"default",{},void 0,!0)],2))}});var de=g(J,[["__scopeId","data-v-211eff0f"]]);const h=t=>(R("data-v-55d534f0"),t=t(),$(),t),K={class:"MainItem"},O={class:"ItemHeader"},q={class:"link"},Q=h(()=>e("div",{class:"TitleRow"},[e("a",{href:""}," xxxxxxxxx ")],-1)),U={class:"Describe"},W={class:"actionList"},X={class:"view"},Y=h(()=>e("i",null,null,-1)),Z={class:"like"},ee=h(()=>e("i",null,null,-1)),te={class:"comment"},se=h(()=>e("i",null,null,-1)),ae=h(()=>e("div",{class:"line"},null,-1)),ne=y({__name:"index",props:{height:null,item:null,AllPostId:null},setup(t){const c=t;M();const n=c.AllPostId,o=(r,m)=>Math.floor(Math.random()*(m-r))+r,d=T(()=>o(0,n.length)),u=!1;return(r,m)=>{const x=E;return l(),L(x,{style:z({height:t.height+"px"}),class:"ItemBox",to:s(u)?"/post/"+s(n)[s(d)].params.id:"http://www.huancaibingxi.online/post/"+s(n)[s(d)].params.id,target:"_blank"},{default:V(()=>[e("div",K,[e("div",O,[e("span",q,i(t.item.name),1),e("span",null,i(t.item.day.toDateString()),1),(l(!0),p(D,null,b(t.item.tags,I=>(l(),p("div",{key:s(F)(),class:"tag"},i(I),1))),128))]),Q,e("div",U,i(t.item.Describe),1),e("ul",W,[e("li",X,[Y,e("span",null,i(t.item.actionList.view),1)]),e("li",Z,[ee,e("span",null,i(t.item.actionList.like),1)]),e("li",te,[se,e("span",null,i(t.item.actionList.comment),1)])])]),ae]),_:1},8,["style","to"])}}});var oe=g(ne,[["__scopeId","data-v-55d534f0"]]);const ie=y({__name:"index",props:{AllPostId:null},setup(t){const c=t,n=_(),o=_(!1),d=_(),u=_(!1);j(d,([{isIntersecting:a}],v)=>{u.value=a});const r=()=>({name:"test",tags:["tag1","tag2"],title:"title",day:new Date,Describe:"Describe",actionList:{view:22,like:22,comment:22}}),m=_(Array.from(Array(99).keys()).map(a=>r())),{list:x,containerProps:I,wrapperProps:P}=G(m,{itemHeight:130}),w=B(),N=c.AllPostId;return k(()=>P.value.style.marginTop,(a,v)=>{const f=parseInt(a),S=parseInt(v);!o.value&&f-S>0?w.value=!0:w.value=!1}),k(u,async()=>{u.value&&o.value===!1&&(o.value=!0,await new Promise((a,v)=>{setTimeout(()=>{a(1)},500)}),m.value.push(...Array.from(Array(50).keys()).map(a=>r())),o.value=!1)}),(a,v)=>(l(),p("div",A({class:"container"},s(I),{style:{}}),[e("ul",A({ref_key:"ulBoxList",ref:n},s(P),{class:"wrapper"}),[(l(!0),p(D,null,b(s(x),f=>(l(),L(oe,{key:f.index,height:130,item:f.data,AllPostId:s(N)},null,8,["item","AllPostId"]))),128)),e("li",{ref_key:"targetBottomLi",ref:d,style:{height:"130px"}},null,512)],16)],16))}});var ue=g(ie,[["__scopeId","data-v-96e29058"]]);export{de as I,ue as a};