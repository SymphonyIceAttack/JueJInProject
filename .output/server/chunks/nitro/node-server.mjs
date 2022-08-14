globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, createApp, createRouter, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import { promises } from 'fs';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      return decodeURI(parseURL(event.req.originalUrl || event.req.url).pathname).replace(/\/$/, "/index");
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(_error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(_error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    description: "",
    data: _error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (errorObject.statusCode !== 404) {
    console.error("[nuxt] [request error]", errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const url = withQuery("/__nuxt_error", errorObject);
  const html = await $fetch(url).catch((error) => {
    console.error("[nitro] Error while generating error response", error);
    return errorObject.statusMessage;
  });
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/_nuxt/_id_-ee9f867a.mjs": {
    "type": "application/javascript",
    "etag": "\"2011-q92Bo229/43OOAGc40fk8Ee+o44\"",
    "mtime": "2022-08-14T13:46:22.882Z",
    "path": "../public/_nuxt/_id_-ee9f867a.mjs"
  },
  "/_nuxt/_type_-10849677.mjs": {
    "type": "application/javascript",
    "etag": "\"25c-yT1IXFl3Z2RTgWiKQOSHtJ/tIeE\"",
    "mtime": "2022-08-14T13:46:22.882Z",
    "path": "../public/_nuxt/_type_-10849677.mjs"
  },
  "/_nuxt/ai-7c58d028.mjs": {
    "type": "application/javascript",
    "etag": "\"cc-RvpuunmAXk9/njkXBUnMJ+qxiOY\"",
    "mtime": "2022-08-14T13:46:22.882Z",
    "path": "../public/_nuxt/ai-7c58d028.mjs"
  },
  "/_nuxt/all-67863b3a.mjs": {
    "type": "application/javascript",
    "etag": "\"d7-LM5S+aBBa7y8EGcjY+Oyb55hlbc\"",
    "mtime": "2022-08-14T13:46:22.882Z",
    "path": "../public/_nuxt/all-67863b3a.mjs"
  },
  "/_nuxt/android-f81fa95e.mjs": {
    "type": "application/javascript",
    "etag": "\"cc-rVlHvylK80iAM42J9o0kOLleaBc\"",
    "mtime": "2022-08-14T13:46:22.881Z",
    "path": "../public/_nuxt/android-f81fa95e.mjs"
  },
  "/_nuxt/article-e58b2ab8.mjs": {
    "type": "application/javascript",
    "etag": "\"d1-fhl7M0G3xnvqVXijFqZr9WLgD+8\"",
    "mtime": "2022-08-14T13:46:22.881Z",
    "path": "../public/_nuxt/article-e58b2ab8.mjs"
  },
  "/_nuxt/backend-7982fa6e.mjs": {
    "type": "application/javascript",
    "etag": "\"d1-3rFHN45pws4QvLhODsRrzqVQyY0\"",
    "mtime": "2022-08-14T13:46:22.881Z",
    "path": "../public/_nuxt/backend-7982fa6e.mjs"
  },
  "/_nuxt/career-f40bc8de.mjs": {
    "type": "application/javascript",
    "etag": "\"d0-dB/mDU2zUY38IlF7bi+imLtysoY\"",
    "mtime": "2022-08-14T13:46:22.881Z",
    "path": "../public/_nuxt/career-f40bc8de.mjs"
  },
  "/_nuxt/default-82523e9f.mjs": {
    "type": "application/javascript",
    "etag": "\"241f-+ORJZ4Wda/ajN7bCqNjgbhbpQ5E\"",
    "mtime": "2022-08-14T13:46:22.881Z",
    "path": "../public/_nuxt/default-82523e9f.mjs"
  },
  "/_nuxt/default.3ac2c694.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2438-I4QlW3XDJl03tn1E0bgy0EAh7u8\"",
    "mtime": "2022-08-14T13:46:22.881Z",
    "path": "../public/_nuxt/default.3ac2c694.css"
  },
  "/_nuxt/entry-c94362a1.mjs": {
    "type": "application/javascript",
    "etag": "\"36a62-VEJgxMaLW4y9ZlI6+JYuFRcOEvw\"",
    "mtime": "2022-08-14T13:46:22.880Z",
    "path": "../public/_nuxt/entry-c94362a1.mjs"
  },
  "/_nuxt/entry.3afc3bb5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3ee0-Y7pkzyfArjF8jkdbKLU+4KSqhZ8\"",
    "mtime": "2022-08-14T13:46:22.880Z",
    "path": "../public/_nuxt/entry.3afc3bb5.css"
  },
  "/_nuxt/error-404-ca2941d1.mjs": {
    "type": "application/javascript",
    "etag": "\"81a-4iS8EJsfKvoqEUrv+1SGSDxQNDA\"",
    "mtime": "2022-08-14T13:46:22.880Z",
    "path": "../public/_nuxt/error-404-ca2941d1.mjs"
  },
  "/_nuxt/error-404.ebe4683c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17e8-qa1kxA9BFwmC+qG2hYVRBwW3b1A\"",
    "mtime": "2022-08-14T13:46:22.880Z",
    "path": "../public/_nuxt/error-404.ebe4683c.css"
  },
  "/_nuxt/error-500-972a6676.mjs": {
    "type": "application/javascript",
    "etag": "\"6c8-GkzJeNm9VSzugddjiiz8lMDTzlY\"",
    "mtime": "2022-08-14T13:46:22.880Z",
    "path": "../public/_nuxt/error-500-972a6676.mjs"
  },
  "/_nuxt/error-500.325d524c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"bcb-lq/qL3EiB5tmiu/3aopqEtQMr4k\"",
    "mtime": "2022-08-14T13:46:22.879Z",
    "path": "../public/_nuxt/error-500.325d524c.css"
  },
  "/_nuxt/error-component-6c142d3a.mjs": {
    "type": "application/javascript",
    "etag": "\"425-13sTa43WoIIVvpw07nIaiW7DkSo\"",
    "mtime": "2022-08-14T13:46:22.879Z",
    "path": "../public/_nuxt/error-component-6c142d3a.mjs"
  },
  "/_nuxt/following-e0070224.mjs": {
    "type": "application/javascript",
    "etag": "\"ce-4yZsQyq8EiQzxF2FxI+zG0iYL8Q\"",
    "mtime": "2022-08-14T13:46:22.879Z",
    "path": "../public/_nuxt/following-e0070224.mjs"
  },
  "/_nuxt/freebie-b27fb190.mjs": {
    "type": "application/javascript",
    "etag": "\"d1-4DB0BhbWW3X+Nl84sVIST6EIVXY\"",
    "mtime": "2022-08-14T13:46:22.879Z",
    "path": "../public/_nuxt/freebie-b27fb190.mjs"
  },
  "/_nuxt/frontend-9ae17e99.mjs": {
    "type": "application/javascript",
    "etag": "\"d2-MqM9pAPnVMxuRe2Qe02h89OzI/w\"",
    "mtime": "2022-08-14T13:46:22.879Z",
    "path": "../public/_nuxt/frontend-9ae17e99.mjs"
  },
  "/_nuxt/index-150fcd14.mjs": {
    "type": "application/javascript",
    "etag": "\"d6-EK3TkLXbIdxBpjMmEa31efrZ/oo\"",
    "mtime": "2022-08-14T13:46:22.879Z",
    "path": "../public/_nuxt/index-150fcd14.mjs"
  },
  "/_nuxt/index-1e93493b.mjs": {
    "type": "application/javascript",
    "etag": "\"b38-5aJXhk2ipnmNI8UFJfEnB7ZmhmA\"",
    "mtime": "2022-08-14T13:46:22.878Z",
    "path": "../public/_nuxt/index-1e93493b.mjs"
  },
  "/_nuxt/index-27b8124c.mjs": {
    "type": "application/javascript",
    "etag": "\"d7-cb4EMs9xBxp4oLYOKgIsZpq7ruU\"",
    "mtime": "2022-08-14T13:46:22.878Z",
    "path": "../public/_nuxt/index-27b8124c.mjs"
  },
  "/_nuxt/index-398cab2f.mjs": {
    "type": "application/javascript",
    "etag": "\"da-QlKKcW3gwEMoHKwVxEHe4fOftwM\"",
    "mtime": "2022-08-14T13:46:22.878Z",
    "path": "../public/_nuxt/index-398cab2f.mjs"
  },
  "/_nuxt/index-63510abd.mjs": {
    "type": "application/javascript",
    "etag": "\"d7-BHJGvH0oCkOAUnet9DmEHME1qWo\"",
    "mtime": "2022-08-14T13:46:22.878Z",
    "path": "../public/_nuxt/index-63510abd.mjs"
  },
  "/_nuxt/index-6791b041.mjs": {
    "type": "application/javascript",
    "etag": "\"d6-53GNAISmJjmNb7dzbJw65c3hqDc\"",
    "mtime": "2022-08-14T13:46:22.877Z",
    "path": "../public/_nuxt/index-6791b041.mjs"
  },
  "/_nuxt/index-ab0a7536.mjs": {
    "type": "application/javascript",
    "etag": "\"d1-w2p19wUFybW2eKByHBm9u1RcViA\"",
    "mtime": "2022-08-14T13:46:22.877Z",
    "path": "../public/_nuxt/index-ab0a7536.mjs"
  },
  "/_nuxt/index-ef848ce6.mjs": {
    "type": "application/javascript",
    "etag": "\"25b-/9QqpJ29Pq0IRXmpl+mN7jXzHm0\"",
    "mtime": "2022-08-14T13:46:22.877Z",
    "path": "../public/_nuxt/index-ef848ce6.mjs"
  },
  "/_nuxt/index-f4ffeb46.mjs": {
    "type": "application/javascript",
    "etag": "\"1b0e-w7CkvemDlqHVKDwqHDqce1joOCo\"",
    "mtime": "2022-08-14T13:46:22.877Z",
    "path": "../public/_nuxt/index-f4ffeb46.mjs"
  },
  "/_nuxt/ios-7ff033f9.mjs": {
    "type": "application/javascript",
    "etag": "\"c8-Xle0QjMd0xR8yH/REr8dD+o2UK8\"",
    "mtime": "2022-08-14T13:46:22.877Z",
    "path": "../public/_nuxt/ios-7ff033f9.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"1cd2-65U8BlwrnZpe3p8ToedtCgxt+Ig\"",
    "mtime": "2022-08-14T13:46:22.876Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/useMarkDownTransform-7f721b34.mjs": {
    "type": "application/javascript",
    "etag": "\"2796a-06rFQUxuXl/boF7wh7MCKCM3ApU\"",
    "mtime": "2022-08-14T13:46:22.876Z",
    "path": "../public/_nuxt/useMarkDownTransform-7f721b34.mjs"
  },
  "/_nuxt/useNavBarHide-d3c21034.mjs": {
    "type": "application/javascript",
    "etag": "\"6a-gjtBOeb+PFFwvGhDBrGeFc/wSsg\"",
    "mtime": "2022-08-14T13:46:22.875Z",
    "path": "../public/_nuxt/useNavBarHide-d3c21034.mjs"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = ["/_nuxt"];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const _f4b49z = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _lazy_KkA7JA = () => import('../handlers/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_KkA7JA, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_KkA7JA, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const hostname = process.env.NITRO_HOST || process.env.HOST || "0.0.0.0";
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  console.log(`Listening on ${protocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { nodeServer as n, useRuntimeConfig as u };
//# sourceMappingURL=node-server.mjs.map
