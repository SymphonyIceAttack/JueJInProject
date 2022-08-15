import { _ as _export_sfc } from './server.mjs';
import { s as serverRenderer, v as vue_cjs_prod } from '../handlers/renderer.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-0f4967bc>\u6211\u662Fai</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/course/ai.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ai = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0f4967bc"]]);

export { ai as default };
//# sourceMappingURL=ai.1360f9a4.mjs.map
