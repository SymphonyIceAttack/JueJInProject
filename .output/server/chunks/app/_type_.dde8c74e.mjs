import { _ as _export_sfc, u as useAsyncData, g as getAllPostIds, I as IndexPageContainter, a as IndexPageList } from './server.mjs';
import { v as vue_cjs_prod, s as serverRenderer } from '../handlers/renderer.mjs';
import 'ufo';
import 'fs';
import 'path';
import 'gray-matter';
import 'remark';
import 'remark-html';
import 'remark-gfm';
import 'nanoid';
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

const _sfc_main = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[type]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const AllPostId = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("AllPostId", (NuxtApp) => {
      var _a;
      ((_a = NuxtApp == null ? void 0 : NuxtApp.ssrContext) == null ? void 0 : _a.noSSR) === void 0 && location.reload();
      return getAllPostIds();
    }, "$Ev7gxHp2ZR")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "IndexPage" }, _attrs))} data-v-08121aee>`);
      _push(serverRenderer.exports.ssrRenderComponent(IndexPageContainter, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(IndexPageList, {
              AllPostId: vue_cjs_prod.unref(AllPostId).data.value
            }, null, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(IndexPageList, {
                AllPostId: vue_cjs_prod.unref(AllPostId).data.value
              }, null, 8, ["AllPostId"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/main/[type].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _type_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-08121aee"]]);

export { _type_ as default };
//# sourceMappingURL=_type_.dde8c74e.mjs.map
