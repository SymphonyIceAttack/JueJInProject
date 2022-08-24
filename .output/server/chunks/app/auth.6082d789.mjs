import { e as defineNuxtPlugin } from './server.mjs';
import '../handlers/renderer.mjs';
import 'h3';
import 'ufo';
import '../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'unenv/runtime/mock/proxy';
import 'stream';
import 'path';
import 'gray-matter';
import 'remark';
import 'remark-html';
import 'remark-gfm';
import 'nanoid';
import 'pinia/dist/pinia.mjs';

const auth = defineNuxtPlugin((NuxtApp) => {
  var _a;
  ((_a = NuxtApp == null ? void 0 : NuxtApp.ssrContext) == null ? void 0 : _a.noSSR) === void 0 && location.reload();
});

export { auth as default };
//# sourceMappingURL=auth.6082d789.mjs.map
