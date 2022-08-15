import { f as useNavBarHide, b as useRoute, _ as _export_sfc, o as onClickOutside, e as useState, h as __nuxt_component_0$2 } from './server.mjs';
import { v as vue_cjs_prod, s as serverRenderer } from '../handlers/renderer.mjs';
import { nanoid } from 'nanoid';
import 'ufo';
import 'fs';
import 'path';
import 'gray-matter';
import 'remark';
import 'remark-html';
import 'remark-gfm';
import 'pinia/dist/pinia.mjs';
import '../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'h3';
import 'ohmyfetch';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'unstorage';
import 'pathe';
import 'url';
import 'unenv/runtime/mock/proxy';
import 'stream';

const useDynamicBlackMenu = () => useState("DynamicBlackMenu", () => ["/post", "/pins", "/live"], "$wpR9cjk6IT");
const SubsetArrayIndex = [
  {
    name: "\u7EFC\u5408",
    path: "/main"
  },
  {
    name: "\u5173\u6CE8",
    path: "/main/following"
  },
  {
    name: "\u540E\u7AEF",
    path: "/main/backend"
  },
  {
    name: "\u524D\u7AEF",
    path: "/main/frontend"
  },
  {
    name: "Android",
    path: "/main/android"
  },
  {
    name: "iOS",
    path: "/main/ios"
  },
  {
    name: "\u4EBA\u5DE5\u667A\u80FD",
    path: "/main/ai"
  },
  {
    name: "\u5F00\u53D1\u5DE5\u5177",
    path: "/main/freebie"
  },
  {
    name: "\u4EE3\u7801\u4EBA\u751F",
    path: "/main/career"
  },
  {
    name: "\u9605\u8BFB",
    path: "/main/article"
  }
];
const SubsetArrayCourse = [
  {
    name: "\u7EFC\u5408",
    path: "/course"
  },
  {
    name: "\u5173\u6CE8",
    path: "/course/following"
  },
  {
    name: "\u540E\u7AEF",
    path: "/course/backend"
  },
  {
    name: "\u524D\u7AEF",
    path: "/course/frontend"
  },
  {
    name: "Android",
    path: "/course/android"
  },
  {
    name: "iOS",
    path: "/course/ios"
  },
  {
    name: "\u4EBA\u5DE5\u667A\u80FD",
    path: "/course/ai"
  },
  {
    name: "\u5F00\u53D1\u5DE5\u5177",
    path: "/course/freebie"
  },
  {
    name: "\u4EE3\u7801\u4EBA\u751F",
    path: "/course/career"
  },
  {
    name: "\u9605\u8BFB",
    path: "/course/article"
  }
];
const SubsetArrayNews = [
  {
    name: "\u5168\u90E8",
    path: "/news"
  },
  {
    name: "\u884C\u4E1A\u52A8\u6001",
    path: "/news/category"
  },
  {
    name: "\u8F6F\u4EF6\u66F4\u65B0",
    path: "/news/category"
  },
  {
    name: "\u7F16\u7A0B\u8BED\u8A00",
    path: "/news/category"
  }
];
const SubsetArrayEvents = [
  {
    path: "/events/all",
    name: "\u5168\u90E8"
  }
];
const useReducerDynamic = (path) => {
  switch (path) {
    case "/main":
      return SubsetArrayIndex;
    case "/course":
      return SubsetArrayCourse;
    case "/news":
      return SubsetArrayNews;
    case "/events/all":
      return SubsetArrayEvents;
    default:
      return [];
  }
};
const useDynamicRouterArr = () => {
  const initRouterarray = useState("useDynamicRouterArr", () => SubsetArrayIndex, "$gtARBGrqY4");
  return initRouterarray;
};
const useWhichActiveClass = () => {
  return useState("useWhichActiveClass", () => "/main", "$UO8q9cCUGX");
};
const useRouterArrayAll = () => {
  return useState("RouterArray", () => [
    { name: "\u9996\u9875", to: "/main", isOuter: false, hasSubset: true },
    { name: "\u6CB8\u70B9", to: "/pins", isOuter: false, hasSubset: false },
    { name: "\u8BFE\u7A0B", to: "/course", isOuter: false, hasSubset: true },
    { name: "\u76F4\u64AD", to: "/live", isOuter: false, hasSubset: false },
    { name: "\u8D44\u8BAF", to: "/news", isOuter: false, hasSubset: true },
    { name: "\u6D3B\u52A8", to: "/events/all", isOuter: false, hasSubset: true },
    {
      name: "\u5546\u57CE",
      to: "https://detail.youzan.com/show/goods/newest?kdt_id=104340304",
      isOuter: true,
      hasSubset: false
    }
  ], "$cbtDyplFY5");
};
const _sfc_main$d = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isNavBarHide = useNavBarHide();
    const currentPathArray = useDynamicRouterArr();
    const route = useRoute();
    const isRouterNavbarShow = vue_cjs_prod.computed(() => {
      let result = true;
      useDynamicBlackMenu().value.forEach((item) => {
        route.path.indexOf(item) >= 0 ? result = false : null;
      });
      return result;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      if (vue_cjs_prod.unref(isRouterNavbarShow)) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "NavBarOuter" }, _attrs))} data-v-4eba6966><nav class="${serverRenderer.exports.ssrRenderClass([{ NavBarMoveTop: vue_cjs_prod.unref(isNavBarHide) }, "NavBarComponents"])}" data-v-4eba6966><ul class="NavBarComponentsContent" data-v-4eba6966><!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(currentPathArray), (item) => {
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            key: "nanoid()",
            to: item.path,
            "exact-active-class": "MYexactActiveClass",
            exact: ""
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${serverRenderer.exports.ssrInterpolate(item.name)}`);
              } else {
                return [
                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></ul></nav></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavPageBar/index.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-4eba6966"]]);
const _sfc_main$c = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isNavBarHide = useNavBarHide();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "OuterBox" }, _attrs))} data-v-0dfc1881><div class="${serverRenderer.exports.ssrRenderClass([{ NavBarHide: vue_cjs_prod.unref(isNavBarHide) }, "NavBarContainer"])}" data-v-0dfc1881><img class="logoImg" src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg" alt="" data-v-0dfc1881><nav class="navbar" data-v-0dfc1881>`);
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</nav></div></div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/index.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const NavBarContainer = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-0dfc1881"]]);
const _sfc_main$b = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    name: null,
    to: null,
    isOuter: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const currentPathArray = useDynamicRouterArr();
    const LinkActiveClass = useWhichActiveClass();
    function ClickItem() {
      currentPathArray.value = useReducerDynamic(props.to);
      LinkActiveClass.value = props.to;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<li${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "LinkItem" }, _attrs))} data-v-4d372dc7>`);
      if (!__props.isOuter) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: __props.to,
          onClick: ($event) => ClickItem(),
          class: { LinkActiveClass: vue_cjs_prod.unref(LinkActiveClass) == __props.to }
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${serverRenderer.exports.ssrInterpolate(__props.name)}`);
            } else {
              return [
                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<a${serverRenderer.exports.ssrRenderAttr("href", __props.to)} data-v-4d372dc7>${serverRenderer.exports.ssrInterpolate(__props.name)}</a>`);
      }
      _push(`</li>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/NavBarList/NavLinkItem/index.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const NavLinkItem = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-4d372dc7"]]);
const _sfc_main$a = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const LinkItem = useRouterArrayAll();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "ulList" }, _attrs))} data-v-4efbcd8a><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(LinkItem), (item) => {
        _push(serverRenderer.exports.ssrRenderComponent(NavLinkItem, {
          key: "nanoid()",
          name: item.name,
          to: item.to,
          isOuter: item.isOuter
        }, null, _parent));
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/NavBarList/index.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const NavBarList = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-4efbcd8a"]]);
const _sfc_main$9 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<ul${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "rightSideBar" }, _attrs))} data-v-14c7be8b>`);
  serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</ul>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/RightSideBar/index.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const RightSideBar = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-14c7be8b"]]);
const _sfc_main$8 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    isHiddenWrap: null
  },
  setup(__props) {
    const props = __props;
    const isHidden = props.isHiddenWrap();
    const LaterHidden = vue_cjs_prod.ref(isHidden.value);
    vue_cjs_prod.watch(isHidden, () => {
      !isHidden.value ? setTimeout(() => {
        LaterHidden.value = isHidden.value;
      }, 300) : LaterHidden.value = isHidden.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: ["SearchAddItem", { SearchAddItemHidden: LaterHidden.value }]
      }, _attrs))} data-v-5b48f28e>`);
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</li>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/RightSideBar/SearchAddItem/index.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const SearchAddItem = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-5b48f28e"]]);
const _sfc_main$7 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    isFoucsActiveWrap: null
  },
  setup(__props) {
    const props = __props;
    const isFoucsActive = props.isFoucsActiveWrap();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: ["SearchBox", { isFoucsActiveClass: vue_cjs_prod.unref(isFoucsActive) }]
      }, _attrs))} data-v-1923a0ff><input type="text" data-v-1923a0ff><div data-v-1923a0ff><img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/1e8ab9a22f0ddc36349f60b38900d0bd.svg" alt="" data-v-1923a0ff></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/RightSideBar/SearchAddItem/SrearchBox/index.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const SrearchBox = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-1923a0ff"]]);
const _sfc_main$6 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    item: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "MoreListItem" }, _attrs))} data-v-1fce49d2><img${serverRenderer.exports.ssrRenderAttr("src", __props.item.src)} alt="" data-v-1fce49d2><span data-v-1fce49d2>${serverRenderer.exports.ssrInterpolate(__props.item.content)}</span></li>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/RightSideBar/SearchAddItem/GroupAdd/MoreList/MoreListItem/index.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const MoreListItem = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-1fce49d2"]]);
const _sfc_main$5 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    isMoreListShowWarp: null
  },
  setup(__props) {
    const props = __props;
    const isMoreListShow = props.isMoreListShowWarp();
    const MoreList2 = vue_cjs_prod.ref([
      {
        content: "\u5199\u6587\u7AE0",
        src: "//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/a0c8073862f04c2925249fd397763fd3.svg"
      },
      {
        content: "\u53D1\u6CB8\u70B9",
        src: "//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e5381c85b5939d984a4b0c0edf102122.svg"
      },
      {
        content: "\u5199\u4EE3\u7801",
        src: "//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/01c75d281edffa91cacfb93189c940b4.svg"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: ["moreList", { moreListShow: vue_cjs_prod.unref(isMoreListShow) }]
      }, _attrs))} data-v-65ee009b><!--[-->`);
      serverRenderer.exports.ssrRenderList(MoreList2.value, (item) => {
        _push(serverRenderer.exports.ssrRenderComponent(MoreListItem, {
          item,
          key: vue_cjs_prod.unref(nanoid)()
        }, null, _parent));
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/RightSideBar/SearchAddItem/GroupAdd/MoreList/index.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const MoreList = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-65ee009b"]]);
const _sfc_main$4 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    isHideWarp: null
  },
  setup(__props) {
    const props = __props;
    const isHide = props.isHideWarp();
    const GruopAddMoreBox = vue_cjs_prod.ref();
    onClickOutside(GruopAddMoreBox, (event) => {
      isMoreListShow.value = false;
    });
    const isMoreListShow = vue_cjs_prod.ref(false);
    const isMoreListShowWarp = () => isMoreListShow;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: ["GruopAdd", { HideClass: vue_cjs_prod.unref(isHide) }]
      }, _attrs))} data-v-1845e458><button class="GruopAddBtn" data-v-1845e458>\u521B\u4F5C\u8005\u4E2D\u5FC3</button><div class="GruopAddMore" data-v-1845e458><svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="${serverRenderer.exports.ssrRenderClass([{ MoreList: isMoreListShow.value }, "unfold12-icon"])}" data-v-1845e458><path d="M2.45025 4.82383C2.17422 4.49908 2.40501 4 2.83122 4H9.16878C9.59499 4 9.82578 4.49908 9.54975 4.82382L6.38097 8.5518C6.1813 8.7867 5.8187 8.7867 5.61903 8.5518L2.45025 4.82383Z" fill="white" data-v-1845e458></path></svg></div>`);
      _push(serverRenderer.exports.ssrRenderComponent(MoreList, { isMoreListShowWarp }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/RightSideBar/SearchAddItem/GroupAdd/index.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const GroupAdd = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-1845e458"]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<li${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "VipBox" }, _attrs))} data-v-1cc658da><div class="VipWrap" data-v-1cc658da><img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/24127194d5b158d7eaf8f09a256c5d01.svg" alt="" data-v-1cc658da></div></li>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/RightSideBar/VipBox/index.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const VipBox = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-1cc658da"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$2;
  _push(`<li${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "NotifyMessage" }, _attrs))} data-v-b18b7c3e>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, null, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-b18b7c3e${_scopeId}><path d="M6.01132 10.2856C6.28115 6.54234 8.68619 4.28564 11.9999 4.28564C15.3136 4.28564 17.7186 6.54234 17.9885 10.2856C18.1219 12.1363 18.4093 13.708 19.9473 15.8848C20.1889 16.2267 19.953 16.7142 19.5343 16.7142H4.46546C4.04679 16.7142 3.81092 16.2267 4.05252 15.8848C5.59053 13.708 5.87793 12.1363 6.01132 10.2856Z" stroke-width="1.5" stroke-linecap="round" data-v-b18b7c3e${_scopeId}></path><path d="M11.9573 3.21436V4.28578" stroke-width="3" stroke-linecap="round" data-v-b569322c="" data-v-b18b7c3e${_scopeId}></path><path d="M9.57495 18.8569C9.92795 19.8557 10.8804 20.5712 12.0001 20.5712C13.1197 20.5712 14.0722 19.8557 14.4252 18.8569H9.57495Z" stroke-linecap="round" stroke-linejoin="round" data-v-b569322c="" data-v-b18b7c3e${_scopeId}></path></svg>`);
      } else {
        return [
          (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("svg", {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            vue_cjs_prod.createVNode("path", {
              d: "M6.01132 10.2856C6.28115 6.54234 8.68619 4.28564 11.9999 4.28564C15.3136 4.28564 17.7186 6.54234 17.9885 10.2856C18.1219 12.1363 18.4093 13.708 19.9473 15.8848C20.1889 16.2267 19.953 16.7142 19.5343 16.7142H4.46546C4.04679 16.7142 3.81092 16.2267 4.05252 15.8848C5.59053 13.708 5.87793 12.1363 6.01132 10.2856Z",
              "stroke-width": "1.5",
              "stroke-linecap": "round"
            }),
            vue_cjs_prod.createVNode("path", {
              d: "M11.9573 3.21436V4.28578",
              "stroke-width": "3",
              "stroke-linecap": "round",
              "data-v-b569322c": ""
            }),
            vue_cjs_prod.createVNode("path", {
              d: "M9.57495 18.8569C9.92795 19.8557 10.8804 20.5712 12.0001 20.5712C13.1197 20.5712 14.0722 19.8557 14.4252 18.8569H9.57495Z",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "data-v-b569322c": ""
            })
          ]))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/RightSideBar/NotifyMessage/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const NotifyMessage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-b18b7c3e"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<li${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "AvatarBox" }, _attrs))} data-v-75fcb9bd><img src="https://p3-passport.byteacctimg.com/img/user-avatar/b86a8eb966aaee60df3271a506d21b52~300x300.image" alt="\u5E7B\u5F69\u51B0\u88AD\u7684\u5934\u50CF" data-src="https://p3-passport.byteacctimg.com/img/user-avatar/b86a8eb966aaee60df3271a506d21b52~300x300.image" loading="lazy" data-v-75fcb9bd></li>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layoutsComponents/defaultComponents/NavBarContainer/RightSideBar/AvatarBox/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AvatarBox = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-75fcb9bd"]]);
const _sfc_main = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const isNavBarHide = useNavBarHide();
    const route = useRoute();
    vue_cjs_prod.watch(route, () => {
      isNavBarHide.value = false;
    });
    const isFoucsActive = vue_cjs_prod.ref(false);
    const isFoucsActiveWrap = () => isFoucsActive;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavPageBar = __nuxt_component_0;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
      _push(serverRenderer.exports.ssrRenderComponent(NavBarContainer, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(NavBarList, null, null, _parent2, _scopeId));
            _push2(serverRenderer.exports.ssrRenderComponent(RightSideBar, null, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(SearchAddItem, { isHiddenWrap: isFoucsActiveWrap }, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer.exports.ssrRenderComponent(SrearchBox, { isFoucsActiveWrap }, null, _parent4, _scopeId3));
                        _push4(serverRenderer.exports.ssrRenderComponent(GroupAdd, { isHideWarp: isFoucsActiveWrap }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vue_cjs_prod.createVNode(SrearchBox, { isFoucsActiveWrap }),
                          vue_cjs_prod.createVNode(GroupAdd, { isHideWarp: isFoucsActiveWrap })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer.exports.ssrRenderComponent(VipBox, null, null, _parent3, _scopeId2));
                  _push3(serverRenderer.exports.ssrRenderComponent(NotifyMessage, null, null, _parent3, _scopeId2));
                  _push3(serverRenderer.exports.ssrRenderComponent(AvatarBox, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    vue_cjs_prod.createVNode(SearchAddItem, { isHiddenWrap: isFoucsActiveWrap }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createVNode(SrearchBox, { isFoucsActiveWrap }),
                        vue_cjs_prod.createVNode(GroupAdd, { isHideWarp: isFoucsActiveWrap })
                      ]),
                      _: 1
                    }),
                    vue_cjs_prod.createVNode(VipBox),
                    vue_cjs_prod.createVNode(NotifyMessage),
                    vue_cjs_prod.createVNode(AvatarBox)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(NavBarList),
              vue_cjs_prod.createVNode(RightSideBar, null, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(SearchAddItem, { isHiddenWrap: isFoucsActiveWrap }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode(SrearchBox, { isFoucsActiveWrap }),
                      vue_cjs_prod.createVNode(GroupAdd, { isHideWarp: isFoucsActiveWrap })
                    ]),
                    _: 1
                  }),
                  vue_cjs_prod.createVNode(VipBox),
                  vue_cjs_prod.createVNode(NotifyMessage),
                  vue_cjs_prod.createVNode(AvatarBox)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_component_NavPageBar, null, null, _parent));
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default.f2749c79.mjs.map
