import{L as X,M as j,r as O,u as y,p as C,N as H,B as S}from"./entry-df607125.mjs";let se=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce((o,t)=>(t&=63,t<36?o+=t.toString(36):t<62?o+=(t-26).toString(36).toUpperCase():t>62?o+="-":o+="_",o),"");var W;const F=typeof window!="undefined",U=e=>typeof e=="function",N=e=>typeof e=="number",z=e=>typeof e=="string",G=(e,o,t)=>Math.min(t,Math.max(o,e)),T=()=>{};F&&((W=window==null?void 0:window.navigator)==null?void 0:W.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function D(e){return e}function L(e){return X()?(j(e),!0):!1}function Y(e,o,t={}){const{immediate:n=!0}=t,r=O(!1);let s=null;function c(){s&&(clearTimeout(s),s=null)}function a(){r.value=!1,c()}function f(...h){c(),r.value=!0,s=setTimeout(()=>{r.value=!1,s=null,e(...h)},y(o))}return n&&(r.value=!0,F&&f()),L(a),{isPending:r,start:f,stop:a}}function I(e){var o;const t=y(e);return(o=t==null?void 0:t.$el)!=null?o:t}const x=F?window:void 0;F&&window.document;F&&window.navigator;F&&window.location;function A(...e){let o,t,n,r;if(z(e[0])?([t,n,r]=e,o=x):[o,t,n,r]=e,!o)return T;let s=T;const c=C(()=>I(o),f=>{s(),f&&(f.addEventListener(t,n,r),s=()=>{f.removeEventListener(t,n,r),s=T})},{immediate:!0,flush:"post"}),a=()=>{c(),s()};return L(a),a}function re(e,o,t={}){const{window:n=x,ignore:r,capture:s=!0,detectIframe:c=!1}=t;if(!n)return;const a=O(!0);let f;const h=l=>{n.clearTimeout(f);const p=I(e),b=l.composedPath();!p||p===l.target||b.includes(p)||!a.value||r&&r.length>0&&r.some(E=>{const _=I(E);return _&&(l.target===_||b.includes(_))})||o(l)},u=[A(n,"click",h,{passive:!0,capture:s}),A(n,"pointerdown",l=>{const p=I(e);a.value=!!p&&!l.composedPath().includes(p)},{passive:!0}),A(n,"pointerup",l=>{if(l.button===0){const p=l.composedPath();l.composedPath=()=>p,f=n.setTimeout(()=>h(l),50)}},{passive:!0}),c&&A(n,"blur",l=>{var p;const b=I(e);((p=document.activeElement)==null?void 0:p.tagName)==="IFRAME"&&!(b!=null&&b.contains(document.activeElement))&&o(l)})].filter(Boolean);return()=>u.forEach(l=>l())}const Q=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},V="__vueuse_ssr_handlers__";Q[V]=Q[V]||{};Q[V];var $=Object.getOwnPropertySymbols,q=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable,J=(e,o)=>{var t={};for(var n in e)q.call(e,n)&&o.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&$)for(var n of $(e))o.indexOf(n)<0&&K.call(e,n)&&(t[n]=e[n]);return t};function Z(e,o,t={}){const n=t,{window:r=x}=n,s=J(n,["window"]);let c;const a=r&&"ResizeObserver"in r,f=()=>{c&&(c.disconnect(),c=void 0)},h=C(()=>I(e),i=>{f(),a&&r&&i&&(c=new ResizeObserver(o),c.observe(i,s))},{immediate:!0,flush:"post"}),u=()=>{f(),h()};return L(u),{isSupported:a,stop:u}}function ee(e,o={}){const{immediate:t=!0,window:n=x}=o,r=O(!1);let s=null;function c(){!r.value||!n||(e(),s=n.requestAnimationFrame(c))}function a(){!r.value&&n&&(r.value=!0,c())}function f(){r.value=!1,s!=null&&n&&(n.cancelAnimationFrame(s),s=null)}return t&&a(),L(f),{isActive:r,pause:f,resume:a}}function te(e,o={width:0,height:0},t={}){const n=O(o.width),r=O(o.height);return Z(e,([s])=>{n.value=s.contentRect.width,r.value=s.contentRect.height},t),C(()=>I(e),s=>{n.value=s?o.width:0,r.value=s?o.height:0}),{width:n,height:r}}function ae(e,o,t={}){const{root:n,rootMargin:r="0px",threshold:s=.1,window:c=x}=t,a=c&&"IntersectionObserver"in c;let f=T;const h=a?C(()=>({el:I(e),root:I(n)}),({el:i,root:l})=>{if(f(),!i)return;const p=new IntersectionObserver(o,{root:l,rootMargin:r,threshold:s});p.observe(i),f=()=>{p.disconnect(),f=T}},{immediate:!0,flush:"post"}):T,u=()=>{f(),h()};return L(u),{isSupported:a,stop:u}}var B;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(B||(B={}));const ue={linear:D,easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};function ne([e,o,t,n]){const r=(u,i)=>1-3*i+3*u,s=(u,i)=>3*i-6*u,c=u=>3*u,a=(u,i,l)=>((r(i,l)*u+s(i,l))*u+c(i))*u,f=(u,i,l)=>3*r(i,l)*u*u+2*s(i,l)*u+c(i),h=u=>{let i=u;for(let l=0;l<4;++l){const p=f(i,e,t);if(p===0)return i;i-=(a(i,e,t)-u)/p}return i};return u=>e===o&&t===n?u:a(h(u),o,n)}function ie(e,o={}){const{delay:t=0,disabled:n=!1,duration:r=1e3,onFinished:s=T,onStarted:c=T,transition:a=D}=o,f=S(()=>{const v=y(a);return U(v)?v:ne(v)}),h=S(()=>{const v=y(e);return N(v)?v:v.map(y)}),u=S(()=>N(h.value)?[h.value]:h.value),i=O(u.value.slice(0));let l,p,b,E,_;const{resume:k,pause:d}=ee(()=>{const v=Date.now(),m=G(1-(b-v)/l,0,1);i.value=_.map((P,R)=>{var M;return P+((M=p[R])!=null?M:0)*f.value(m)}),m>=1&&(d(),s())},{immediate:!1}),w=()=>{d(),l=y(r),p=i.value.map((v,m)=>{var P,R;return((P=u.value[m])!=null?P:0)-((R=i.value[m])!=null?R:0)}),_=i.value.slice(0),E=Date.now(),b=E+l,k(),c()},g=Y(w,t,{immediate:!1});return C(u,()=>{y(n)?i.value=u.value.slice(0):y(t)<=0?w():g.start()},{deep:!0}),S(()=>{const v=y(n)?u:i;return N(h.value)?v.value[0]:v.value})}function le(e,o){const t=O(),n=te(t),r=O([]),s=H(e),c=O({start:0,end:10}),{itemHeight:a,overscan:f=5}=o,h=d=>{if(typeof a=="number")return Math.ceil(d/a);const{start:w=0}=c.value;let g=0,v=0;for(let m=w;m<s.value.length;m++)if(g+=a(m),g>=d){v=m;break}return v-w},u=d=>{if(typeof a=="number")return Math.floor(d/a)+1;let w=0,g=0;for(let v=0;v<s.value.length;v++)if(w+=a(v),w>=d){g=v;break}return g+1},i=()=>{const d=t.value;if(d){const w=u(d.scrollTop),g=h(d.clientHeight),v=w-f,m=w+g+f;c.value={start:v<0?0:v,end:m>s.value.length?s.value.length:m},r.value=s.value.slice(c.value.start,c.value.end).map((P,R)=>({data:P,index:R+c.value.start}))}};C([n.width,n.height,e],()=>{i()});const l=S(()=>typeof a=="number"?s.value.length*a:s.value.reduce((d,w,g)=>d+a(g),0)),p=d=>typeof a=="number"?d*a:s.value.slice(0,d).reduce((g,v,m)=>g+a(m),0),b=d=>{t.value&&(t.value.scrollTop=p(d),i())},E=S(()=>p(c.value.start)),_=S(()=>({style:{width:"100%",height:`${l.value-E.value}px`,marginTop:`${E.value}px`}}));return{list:r,scrollTo:b,containerProps:{ref:t,onScroll:()=>{i()},style:{overflowY:"auto"}},wrapperProps:_}}function ce({window:e=x}={}){if(!e)return{x:O(0),y:O(0)};const o=O(e.pageXOffset),t=O(e.pageYOffset);return A("scroll",()=>{o.value=e.pageXOffset,t.value=e.pageYOffset},{capture:!1,passive:!0}),{x:o,y:t}}export{ue as T,ae as a,le as b,ie as c,se as n,re as o,ce as u};
