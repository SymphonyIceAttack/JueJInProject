import { v as vue_cjs_prod, s as serverRenderer } from '../handlers/renderer.mjs';
import { joinURL, hasProtocol, isEqual, withBase, withQuery } from 'ufo';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { nanoid } from 'nanoid';
import { defineStore, createPinia, setActivePinia } from 'pinia/dist/pinia.mjs';
import { u as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import 'h3';
import 'unenv/runtime/mock/proxy';
import 'stream';
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
import 'pathe';
import 'url';

var vueRouter_prod = {};

/*!
  * vue-router v4.1.2
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */

(function (exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	var vue = vue_cjs_prod;

	function isESModule(obj) {
	    return obj.__esModule || obj[Symbol.toStringTag] === 'Module';
	}
	const assign = Object.assign;
	function applyToParams(fn, params) {
	    const newParams = {};
	    for (const key in params) {
	        const value = params[key];
	        newParams[key] = isArray(value)
	            ? value.map(fn)
	            : fn(value);
	    }
	    return newParams;
	}
	const noop = () => { };
	/**
	 * Typesafe alternative to Array.isArray
	 * https://github.com/microsoft/TypeScript/pull/48228
	 */
	const isArray = Array.isArray;

	const TRAILING_SLASH_RE = /\/$/;
	const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, '');
	/**
	 * Transforms an URI into a normalized history location
	 *
	 * @param parseQuery
	 * @param location - URI to normalize
	 * @param currentLocation - current absolute location. Allows resolving relative
	 * paths. Must start with `/`. Defaults to `/`
	 * @returns a normalized history location
	 */
	function parseURL(parseQuery, location, currentLocation = '/') {
	    let path, query = {}, searchString = '', hash = '';
	    // Could use URL and URLSearchParams but IE 11 doesn't support it
	    // TODO: move to new URL()
	    const hashPos = location.indexOf('#');
	    let searchPos = location.indexOf('?');
	    // the hash appears before the search, so it's not part of the search string
	    if (hashPos < searchPos && hashPos >= 0) {
	        searchPos = -1;
	    }
	    if (searchPos > -1) {
	        path = location.slice(0, searchPos);
	        searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length);
	        query = parseQuery(searchString);
	    }
	    if (hashPos > -1) {
	        path = path || location.slice(0, hashPos);
	        // keep the # character
	        hash = location.slice(hashPos, location.length);
	    }
	    // no search and no query
	    path = resolveRelativePath(path != null ? path : location, currentLocation);
	    // empty path means a relative query or hash `?foo=f`, `#thing`
	    return {
	        fullPath: path + (searchString && '?') + searchString + hash,
	        path,
	        query,
	        hash,
	    };
	}
	/**
	 * Stringifies a URL object
	 *
	 * @param stringifyQuery
	 * @param location
	 */
	function stringifyURL(stringifyQuery, location) {
	    const query = location.query ? stringifyQuery(location.query) : '';
	    return location.path + (query && '?') + query + (location.hash || '');
	}
	/**
	 * Strips off the base from the beginning of a location.pathname in a non
	 * case-sensitive way.
	 *
	 * @param pathname - location.pathname
	 * @param base - base to strip off
	 */
	function stripBase(pathname, base) {
	    // no base or base is not found at the beginning
	    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
	        return pathname;
	    return pathname.slice(base.length) || '/';
	}
	/**
	 * Checks if two RouteLocation are equal. This means that both locations are
	 * pointing towards the same {@link RouteRecord} and that all `params`, `query`
	 * parameters and `hash` are the same
	 *
	 * @param a - first {@link RouteLocation}
	 * @param b - second {@link RouteLocation}
	 */
	function isSameRouteLocation(stringifyQuery, a, b) {
	    const aLastIndex = a.matched.length - 1;
	    const bLastIndex = b.matched.length - 1;
	    return (aLastIndex > -1 &&
	        aLastIndex === bLastIndex &&
	        isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) &&
	        isSameRouteLocationParams(a.params, b.params) &&
	        stringifyQuery(a.query) === stringifyQuery(b.query) &&
	        a.hash === b.hash);
	}
	/**
	 * Check if two `RouteRecords` are equal. Takes into account aliases: they are
	 * considered equal to the `RouteRecord` they are aliasing.
	 *
	 * @param a - first {@link RouteRecord}
	 * @param b - second {@link RouteRecord}
	 */
	function isSameRouteRecord(a, b) {
	    // since the original record has an undefined value for aliasOf
	    // but all aliases point to the original record, this will always compare
	    // the original record
	    return (a.aliasOf || a) === (b.aliasOf || b);
	}
	function isSameRouteLocationParams(a, b) {
	    if (Object.keys(a).length !== Object.keys(b).length)
	        return false;
	    for (const key in a) {
	        if (!isSameRouteLocationParamsValue(a[key], b[key]))
	            return false;
	    }
	    return true;
	}
	function isSameRouteLocationParamsValue(a, b) {
	    return isArray(a)
	        ? isEquivalentArray(a, b)
	        : isArray(b)
	            ? isEquivalentArray(b, a)
	            : a === b;
	}
	/**
	 * Check if two arrays are the same or if an array with one single entry is the
	 * same as another primitive value. Used to check query and parameters
	 *
	 * @param a - array of values
	 * @param b - array of values or a single value
	 */
	function isEquivalentArray(a, b) {
	    return isArray(b)
	        ? a.length === b.length && a.every((value, i) => value === b[i])
	        : a.length === 1 && a[0] === b;
	}
	/**
	 * Resolves a relative path that starts with `.`.
	 *
	 * @param to - path location we are resolving
	 * @param from - currentLocation.path, should start with `/`
	 */
	function resolveRelativePath(to, from) {
	    if (to.startsWith('/'))
	        return to;
	    if (!to)
	        return from;
	    const fromSegments = from.split('/');
	    const toSegments = to.split('/');
	    let position = fromSegments.length - 1;
	    let toPosition;
	    let segment;
	    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
	        segment = toSegments[toPosition];
	        // we stay on the same position
	        if (segment === '.')
	            continue;
	        // go up in the from array
	        if (segment === '..') {
	            // we can't go below zero but we still need to increment toPosition
	            if (position > 1)
	                position--;
	            // continue
	        }
	        // we reached a non relative path, we stop here
	        else
	            break;
	    }
	    return (fromSegments.slice(0, position).join('/') +
	        '/' +
	        toSegments
	            // ensure we use at least the last element in the toSegments
	            .slice(toPosition - (toPosition === toSegments.length ? 1 : 0))
	            .join('/'));
	}

	var NavigationType;
	(function (NavigationType) {
	    NavigationType["pop"] = "pop";
	    NavigationType["push"] = "push";
	})(NavigationType || (NavigationType = {}));
	var NavigationDirection;
	(function (NavigationDirection) {
	    NavigationDirection["back"] = "back";
	    NavigationDirection["forward"] = "forward";
	    NavigationDirection["unknown"] = "";
	})(NavigationDirection || (NavigationDirection = {}));
	/**
	 * Starting location for Histories
	 */
	const START = '';
	// Generic utils
	/**
	 * Normalizes a base by removing any trailing slash and reading the base tag if
	 * present.
	 *
	 * @param base - base to normalize
	 */
	function normalizeBase(base) {
	    if (!base) {
	        {
	            base = '/';
	        }
	    }
	    // ensure leading slash when it was removed by the regex above avoid leading
	    // slash with hash because the file could be read from the disk like file://
	    // and the leading slash would cause problems
	    if (base[0] !== '/' && base[0] !== '#')
	        base = '/' + base;
	    // remove the trailing slash so all other method can just do `base + fullPath`
	    // to build an href
	    return removeTrailingSlash(base);
	}
	// remove any character before the hash
	const BEFORE_HASH_RE = /^[^#]+#/;
	function createHref(base, location) {
	    return base.replace(BEFORE_HASH_RE, '#') + location;
	}
	const computeScrollPosition = () => ({
	    left: window.pageXOffset,
	    top: window.pageYOffset,
	});
	// TODO: RFC about how to save scroll position
	/**
	 * ScrollBehavior instance used by the router to compute and restore the scroll
	 * position when navigating.
	 */
	// export interface ScrollHandler<ScrollPositionEntry extends HistoryStateValue, ScrollPosition extends ScrollPositionEntry> {
	//   // returns a scroll position that can be saved in history
	//   compute(): ScrollPositionEntry
	//   // can take an extended ScrollPositionEntry
	//   scroll(position: ScrollPosition): void
	// }
	// export const scrollHandler: ScrollHandler<ScrollPosition> = {
	//   compute: computeScroll,
	//   scroll: scrollToPosition,
	// }

	let createBaseLocation = () => location.protocol + '//' + location.host;
	/**
	 * Creates a normalized history location from a window.location object
	 * @param location -
	 */
	function createCurrentLocation(base, location) {
	    const { pathname, search, hash } = location;
	    // allows hash bases like #, /#, #/, #!, #!/, /#!/, or even /folder#end
	    const hashPos = base.indexOf('#');
	    if (hashPos > -1) {
	        let slicePos = hash.includes(base.slice(hashPos))
	            ? base.slice(hashPos).length
	            : 1;
	        let pathFromHash = hash.slice(slicePos);
	        // prepend the starting slash to hash so the url starts with /#
	        if (pathFromHash[0] !== '/')
	            pathFromHash = '/' + pathFromHash;
	        return stripBase(pathFromHash, '');
	    }
	    const path = stripBase(pathname, base);
	    return path + search + hash;
	}
	function useHistoryListeners(base, historyState, currentLocation, replace) {
	    let listeners = [];
	    let teardowns = [];
	    // TODO: should it be a stack? a Dict. Check if the popstate listener
	    // can trigger twice
	    let pauseState = null;
	    const popStateHandler = ({ state, }) => {
	        const to = createCurrentLocation(base, location);
	        const from = currentLocation.value;
	        const fromState = historyState.value;
	        let delta = 0;
	        if (state) {
	            currentLocation.value = to;
	            historyState.value = state;
	            // ignore the popstate and reset the pauseState
	            if (pauseState && pauseState === from) {
	                pauseState = null;
	                return;
	            }
	            delta = fromState ? state.position - fromState.position : 0;
	        }
	        else {
	            replace(to);
	        }
	        // console.log({ deltaFromCurrent })
	        // Here we could also revert the navigation by calling history.go(-delta)
	        // this listener will have to be adapted to not trigger again and to wait for the url
	        // to be updated before triggering the listeners. Some kind of validation function would also
	        // need to be passed to the listeners so the navigation can be accepted
	        // call all listeners
	        listeners.forEach(listener => {
	            listener(currentLocation.value, from, {
	                delta,
	                type: NavigationType.pop,
	                direction: delta
	                    ? delta > 0
	                        ? NavigationDirection.forward
	                        : NavigationDirection.back
	                    : NavigationDirection.unknown,
	            });
	        });
	    };
	    function pauseListeners() {
	        pauseState = currentLocation.value;
	    }
	    function listen(callback) {
	        // setup the listener and prepare teardown callbacks
	        listeners.push(callback);
	        const teardown = () => {
	            const index = listeners.indexOf(callback);
	            if (index > -1)
	                listeners.splice(index, 1);
	        };
	        teardowns.push(teardown);
	        return teardown;
	    }
	    function beforeUnloadListener() {
	        const { history } = window;
	        if (!history.state)
	            return;
	        history.replaceState(assign({}, history.state, { scroll: computeScrollPosition() }), '');
	    }
	    function destroy() {
	        for (const teardown of teardowns)
	            teardown();
	        teardowns = [];
	        window.removeEventListener('popstate', popStateHandler);
	        window.removeEventListener('beforeunload', beforeUnloadListener);
	    }
	    // setup the listeners and prepare teardown callbacks
	    window.addEventListener('popstate', popStateHandler);
	    window.addEventListener('beforeunload', beforeUnloadListener);
	    return {
	        pauseListeners,
	        listen,
	        destroy,
	    };
	}
	/**
	 * Creates a state object
	 */
	function buildState(back, current, forward, replaced = false, computeScroll = false) {
	    return {
	        back,
	        current,
	        forward,
	        replaced,
	        position: window.history.length,
	        scroll: computeScroll ? computeScrollPosition() : null,
	    };
	}
	function useHistoryStateNavigation(base) {
	    const { history, location } = window;
	    // private variables
	    const currentLocation = {
	        value: createCurrentLocation(base, location),
	    };
	    const historyState = { value: history.state };
	    // build current history entry as this is a fresh navigation
	    if (!historyState.value) {
	        changeLocation(currentLocation.value, {
	            back: null,
	            current: currentLocation.value,
	            forward: null,
	            // the length is off by one, we need to decrease it
	            position: history.length - 1,
	            replaced: true,
	            // don't add a scroll as the user may have an anchor and we want
	            // scrollBehavior to be triggered without a saved position
	            scroll: null,
	        }, true);
	    }
	    function changeLocation(to, state, replace) {
	        /**
	         * if a base tag is provided and we are on a normal domain, we have to
	         * respect the provided `base` attribute because pushState() will use it and
	         * potentially erase anything before the `#` like at
	         * https://github.com/vuejs/router/issues/685 where a base of
	         * `/folder/#` but a base of `/` would erase the `/folder/` section. If
	         * there is no host, the `<base>` tag makes no sense and if there isn't a
	         * base tag we can just use everything after the `#`.
	         */
	        const hashIndex = base.indexOf('#');
	        const url = hashIndex > -1
	            ? (location.host && document.querySelector('base')
	                ? base
	                : base.slice(hashIndex)) + to
	            : createBaseLocation() + base + to;
	        try {
	            // BROWSER QUIRK
	            // NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
	            history[replace ? 'replaceState' : 'pushState'](state, '', url);
	            historyState.value = state;
	        }
	        catch (err) {
	            {
	                console.error(err);
	            }
	            // Force the navigation, this also resets the call count
	            location[replace ? 'replace' : 'assign'](url);
	        }
	    }
	    function replace(to, data) {
	        const state = assign({}, history.state, buildState(historyState.value.back, 
	        // keep back and forward entries but override current position
	        to, historyState.value.forward, true), data, { position: historyState.value.position });
	        changeLocation(to, state, true);
	        currentLocation.value = to;
	    }
	    function push(to, data) {
	        // Add to current entry the information of where we are going
	        // as well as saving the current position
	        const currentState = assign({}, 
	        // use current history state to gracefully handle a wrong call to
	        // history.replaceState
	        // https://github.com/vuejs/router/issues/366
	        historyState.value, history.state, {
	            forward: to,
	            scroll: computeScrollPosition(),
	        });
	        changeLocation(currentState.current, currentState, true);
	        const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
	        changeLocation(to, state, false);
	        currentLocation.value = to;
	    }
	    return {
	        location: currentLocation,
	        state: historyState,
	        push,
	        replace,
	    };
	}
	/**
	 * Creates an HTML5 history. Most common history for single page applications.
	 *
	 * @param base -
	 */
	function createWebHistory(base) {
	    base = normalizeBase(base);
	    const historyNavigation = useHistoryStateNavigation(base);
	    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
	    function go(delta, triggerListeners = true) {
	        if (!triggerListeners)
	            historyListeners.pauseListeners();
	        history.go(delta);
	    }
	    const routerHistory = assign({
	        // it's overridden right after
	        location: '',
	        base,
	        go,
	        createHref: createHref.bind(null, base),
	    }, historyNavigation, historyListeners);
	    Object.defineProperty(routerHistory, 'location', {
	        enumerable: true,
	        get: () => historyNavigation.location.value,
	    });
	    Object.defineProperty(routerHistory, 'state', {
	        enumerable: true,
	        get: () => historyNavigation.state.value,
	    });
	    return routerHistory;
	}

	/**
	 * Creates a in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere.
	 * It's up to the user to replace that location with the starter location by either calling `router.push` or `router.replace`.
	 *
	 * @param base - Base applied to all urls, defaults to '/'
	 * @returns a history object that can be passed to the router constructor
	 */
	function createMemoryHistory(base = '') {
	    let listeners = [];
	    let queue = [START];
	    let position = 0;
	    base = normalizeBase(base);
	    function setLocation(location) {
	        position++;
	        if (position === queue.length) {
	            // we are at the end, we can simply append a new entry
	            queue.push(location);
	        }
	        else {
	            // we are in the middle, we remove everything from here in the queue
	            queue.splice(position);
	            queue.push(location);
	        }
	    }
	    function triggerListeners(to, from, { direction, delta }) {
	        const info = {
	            direction,
	            delta,
	            type: NavigationType.pop,
	        };
	        for (const callback of listeners) {
	            callback(to, from, info);
	        }
	    }
	    const routerHistory = {
	        // rewritten by Object.defineProperty
	        location: START,
	        // TODO: should be kept in queue
	        state: {},
	        base,
	        createHref: createHref.bind(null, base),
	        replace(to) {
	            // remove current entry and decrement position
	            queue.splice(position--, 1);
	            setLocation(to);
	        },
	        push(to, data) {
	            setLocation(to);
	        },
	        listen(callback) {
	            listeners.push(callback);
	            return () => {
	                const index = listeners.indexOf(callback);
	                if (index > -1)
	                    listeners.splice(index, 1);
	            };
	        },
	        destroy() {
	            listeners = [];
	            queue = [START];
	            position = 0;
	        },
	        go(delta, shouldTrigger = true) {
	            const from = this.location;
	            const direction = 
	            // we are considering delta === 0 going forward, but in abstract mode
	            // using 0 for the delta doesn't make sense like it does in html5 where
	            // it reloads the page
	            delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
	            position = Math.max(0, Math.min(position + delta, queue.length - 1));
	            if (shouldTrigger) {
	                triggerListeners(this.location, from, {
	                    direction,
	                    delta,
	                });
	            }
	        },
	    };
	    Object.defineProperty(routerHistory, 'location', {
	        enumerable: true,
	        get: () => queue[position],
	    });
	    return routerHistory;
	}

	/**
	 * Creates a hash history. Useful for web applications with no host (e.g. `file://`) or when configuring a server to
	 * handle any URL is not possible.
	 *
	 * @param base - optional base to provide. Defaults to `location.pathname + location.search` If there is a `<base>` tag
	 * in the `head`, its value will be ignored in favor of this parameter **but note it affects all the history.pushState()
	 * calls**, meaning that if you use a `<base>` tag, it's `href` value **has to match this parameter** (ignoring anything
	 * after the `#`).
	 *
	 * @example
	 * ```js
	 * // at https://example.com/folder
	 * createWebHashHistory() // gives a url of `https://example.com/folder#`
	 * createWebHashHistory('/folder/') // gives a url of `https://example.com/folder/#`
	 * // if the `#` is provided in the base, it won't be added by `createWebHashHistory`
	 * createWebHashHistory('/folder/#/app/') // gives a url of `https://example.com/folder/#/app/`
	 * // you should avoid doing this because it changes the original url and breaks copying urls
	 * createWebHashHistory('/other-folder/') // gives a url of `https://example.com/other-folder/#`
	 *
	 * // at file:///usr/etc/folder/index.html
	 * // for locations with no `host`, the base is ignored
	 * createWebHashHistory('/iAmIgnored') // gives a url of `file:///usr/etc/folder/index.html#`
	 * ```
	 */
	function createWebHashHistory(base) {
	    // Make sure this implementation is fine in terms of encoding, specially for IE11
	    // for `file://`, directly use the pathname and ignore the base
	    // location.pathname contains an initial `/` even at the root: `https://example.com`
	    base = location.host ? base || location.pathname + location.search : '';
	    // allow the user to provide a `#` in the middle: `/base/#/app`
	    if (!base.includes('#'))
	        base += '#';
	    return createWebHistory(base);
	}

	function isRouteLocation(route) {
	    return typeof route === 'string' || (route && typeof route === 'object');
	}
	function isRouteName(name) {
	    return typeof name === 'string' || typeof name === 'symbol';
	}

	/**
	 * Initial route location where the router is. Can be used in navigation guards
	 * to differentiate the initial navigation.
	 *
	 * @example
	 * ```js
	 * import { START_LOCATION } from 'vue-router'
	 *
	 * router.beforeEach((to, from) => {
	 *   if (from === START_LOCATION) {
	 *     // initial navigation
	 *   }
	 * })
	 * ```
	 */
	const START_LOCATION_NORMALIZED = {
	    path: '/',
	    name: undefined,
	    params: {},
	    query: {},
	    hash: '',
	    fullPath: '/',
	    matched: [],
	    meta: {},
	    redirectedFrom: undefined,
	};

	const NavigationFailureSymbol = Symbol('');
	/**
	 * Enumeration with all possible types for navigation failures. Can be passed to
	 * {@link isNavigationFailure} to check for specific failures.
	 */
	exports.NavigationFailureType = void 0;
	(function (NavigationFailureType) {
	    /**
	     * An aborted navigation is a navigation that failed because a navigation
	     * guard returned `false` or called `next(false)`
	     */
	    NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
	    /**
	     * A cancelled navigation is a navigation that failed because a more recent
	     * navigation finished started (not necessarily finished).
	     */
	    NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
	    /**
	     * A duplicated navigation is a navigation that failed because it was
	     * initiated while already being at the exact same location.
	     */
	    NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
	})(exports.NavigationFailureType || (exports.NavigationFailureType = {}));
	// DEV only debug messages
	const ErrorTypeMessages = {
	    [1 /* ErrorTypes.MATCHER_NOT_FOUND */]({ location, currentLocation }) {
	        return `No match for\n ${JSON.stringify(location)}${currentLocation
	            ? '\nwhile being at\n' + JSON.stringify(currentLocation)
	            : ''}`;
	    },
	    [2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */]({ from, to, }) {
	        return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
	    },
	    [4 /* ErrorTypes.NAVIGATION_ABORTED */]({ from, to }) {
	        return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
	    },
	    [8 /* ErrorTypes.NAVIGATION_CANCELLED */]({ from, to }) {
	        return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
	    },
	    [16 /* ErrorTypes.NAVIGATION_DUPLICATED */]({ from, to }) {
	        return `Avoided redundant navigation to current location: "${from.fullPath}".`;
	    },
	};
	function createRouterError(type, params) {
	    // keep full error messages in cjs versions
	    {
	        return assign(new Error(ErrorTypeMessages[type](params)), {
	            type,
	            [NavigationFailureSymbol]: true,
	        }, params);
	    }
	}
	function isNavigationFailure(error, type) {
	    return (error instanceof Error &&
	        NavigationFailureSymbol in error &&
	        (type == null || !!(error.type & type)));
	}
	const propertiesToLog = ['params', 'query', 'hash'];
	function stringifyRoute(to) {
	    if (typeof to === 'string')
	        return to;
	    if ('path' in to)
	        return to.path;
	    const location = {};
	    for (const key of propertiesToLog) {
	        if (key in to)
	            location[key] = to[key];
	    }
	    return JSON.stringify(location, null, 2);
	}

	// default pattern for a param: non greedy everything but /
	const BASE_PARAM_PATTERN = '[^/]+?';
	const BASE_PATH_PARSER_OPTIONS = {
	    sensitive: false,
	    strict: false,
	    start: true,
	    end: true,
	};
	// Special Regex characters that must be escaped in static tokens
	const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
	/**
	 * Creates a path parser from an array of Segments (a segment is an array of Tokens)
	 *
	 * @param segments - array of segments returned by tokenizePath
	 * @param extraOptions - optional options for the regexp
	 * @returns a PathParser
	 */
	function tokensToParser(segments, extraOptions) {
	    const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
	    // the amount of scores is the same as the length of segments except for the root segment "/"
	    const score = [];
	    // the regexp as a string
	    let pattern = options.start ? '^' : '';
	    // extracted keys
	    const keys = [];
	    for (const segment of segments) {
	        // the root segment needs special treatment
	        const segmentScores = segment.length ? [] : [90 /* PathScore.Root */];
	        // allow trailing slash
	        if (options.strict && !segment.length)
	            pattern += '/';
	        for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
	            const token = segment[tokenIndex];
	            // resets the score if we are inside a sub segment /:a-other-:b
	            let subSegmentScore = 40 /* PathScore.Segment */ +
	                (options.sensitive ? 0.25 /* PathScore.BonusCaseSensitive */ : 0);
	            if (token.type === 0 /* TokenType.Static */) {
	                // prepend the slash if we are starting a new segment
	                if (!tokenIndex)
	                    pattern += '/';
	                pattern += token.value.replace(REGEX_CHARS_RE, '\\$&');
	                subSegmentScore += 40 /* PathScore.Static */;
	            }
	            else if (token.type === 1 /* TokenType.Param */) {
	                const { value, repeatable, optional, regexp } = token;
	                keys.push({
	                    name: value,
	                    repeatable,
	                    optional,
	                });
	                const re = regexp ? regexp : BASE_PARAM_PATTERN;
	                // the user provided a custom regexp /:id(\\d+)
	                if (re !== BASE_PARAM_PATTERN) {
	                    subSegmentScore += 10 /* PathScore.BonusCustomRegExp */;
	                    // make sure the regexp is valid before using it
	                    try {
	                        new RegExp(`(${re})`);
	                    }
	                    catch (err) {
	                        throw new Error(`Invalid custom RegExp for param "${value}" (${re}): ` +
	                            err.message);
	                    }
	                }
	                // when we repeat we must take care of the repeating leading slash
	                let subPattern = repeatable ? `((?:${re})(?:/(?:${re}))*)` : `(${re})`;
	                // prepend the slash if we are starting a new segment
	                if (!tokenIndex)
	                    subPattern =
	                        // avoid an optional / if there are more segments e.g. /:p?-static
	                        // or /:p?-:p2
	                        optional && segment.length < 2
	                            ? `(?:/${subPattern})`
	                            : '/' + subPattern;
	                if (optional)
	                    subPattern += '?';
	                pattern += subPattern;
	                subSegmentScore += 20 /* PathScore.Dynamic */;
	                if (optional)
	                    subSegmentScore += -8 /* PathScore.BonusOptional */;
	                if (repeatable)
	                    subSegmentScore += -20 /* PathScore.BonusRepeatable */;
	                if (re === '.*')
	                    subSegmentScore += -50 /* PathScore.BonusWildcard */;
	            }
	            segmentScores.push(subSegmentScore);
	        }
	        // an empty array like /home/ -> [[{home}], []]
	        // if (!segment.length) pattern += '/'
	        score.push(segmentScores);
	    }
	    // only apply the strict bonus to the last score
	    if (options.strict && options.end) {
	        const i = score.length - 1;
	        score[i][score[i].length - 1] += 0.7000000000000001 /* PathScore.BonusStrict */;
	    }
	    // TODO: dev only warn double trailing slash
	    if (!options.strict)
	        pattern += '/?';
	    if (options.end)
	        pattern += '$';
	    // allow paths like /dynamic to only match dynamic or dynamic/... but not dynamic_something_else
	    else if (options.strict)
	        pattern += '(?:/|$)';
	    const re = new RegExp(pattern, options.sensitive ? '' : 'i');
	    function parse(path) {
	        const match = path.match(re);
	        const params = {};
	        if (!match)
	            return null;
	        for (let i = 1; i < match.length; i++) {
	            const value = match[i] || '';
	            const key = keys[i - 1];
	            params[key.name] = value && key.repeatable ? value.split('/') : value;
	        }
	        return params;
	    }
	    function stringify(params) {
	        let path = '';
	        // for optional parameters to allow to be empty
	        let avoidDuplicatedSlash = false;
	        for (const segment of segments) {
	            if (!avoidDuplicatedSlash || !path.endsWith('/'))
	                path += '/';
	            avoidDuplicatedSlash = false;
	            for (const token of segment) {
	                if (token.type === 0 /* TokenType.Static */) {
	                    path += token.value;
	                }
	                else if (token.type === 1 /* TokenType.Param */) {
	                    const { value, repeatable, optional } = token;
	                    const param = value in params ? params[value] : '';
	                    if (isArray(param) && !repeatable) {
	                        throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
	                    }
	                    const text = isArray(param)
	                        ? param.join('/')
	                        : param;
	                    if (!text) {
	                        if (optional) {
	                            // if we have more than one optional param like /:a?-static and there are more segments, we don't need to
	                            // care about the optional param
	                            if (segment.length < 2 && segments.length > 1) {
	                                // remove the last slash as we could be at the end
	                                if (path.endsWith('/'))
	                                    path = path.slice(0, -1);
	                                // do not append a slash on the next iteration
	                                else
	                                    avoidDuplicatedSlash = true;
	                            }
	                        }
	                        else
	                            throw new Error(`Missing required param "${value}"`);
	                    }
	                    path += text;
	                }
	            }
	        }
	        return path;
	    }
	    return {
	        re,
	        score,
	        keys,
	        parse,
	        stringify,
	    };
	}
	/**
	 * Compares an array of numbers as used in PathParser.score and returns a
	 * number. This function can be used to `sort` an array
	 *
	 * @param a - first array of numbers
	 * @param b - second array of numbers
	 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
	 * should be sorted first
	 */
	function compareScoreArray(a, b) {
	    let i = 0;
	    while (i < a.length && i < b.length) {
	        const diff = b[i] - a[i];
	        // only keep going if diff === 0
	        if (diff)
	            return diff;
	        i++;
	    }
	    // if the last subsegment was Static, the shorter segments should be sorted first
	    // otherwise sort the longest segment first
	    if (a.length < b.length) {
	        return a.length === 1 && a[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */
	            ? -1
	            : 1;
	    }
	    else if (a.length > b.length) {
	        return b.length === 1 && b[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */
	            ? 1
	            : -1;
	    }
	    return 0;
	}
	/**
	 * Compare function that can be used with `sort` to sort an array of PathParser
	 *
	 * @param a - first PathParser
	 * @param b - second PathParser
	 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
	 */
	function comparePathParserScore(a, b) {
	    let i = 0;
	    const aScore = a.score;
	    const bScore = b.score;
	    while (i < aScore.length && i < bScore.length) {
	        const comp = compareScoreArray(aScore[i], bScore[i]);
	        // do not return if both are equal
	        if (comp)
	            return comp;
	        i++;
	    }
	    if (Math.abs(bScore.length - aScore.length) === 1) {
	        if (isLastScoreNegative(aScore))
	            return 1;
	        if (isLastScoreNegative(bScore))
	            return -1;
	    }
	    // if a and b share the same score entries but b has more, sort b first
	    return bScore.length - aScore.length;
	    // this is the ternary version
	    // return aScore.length < bScore.length
	    //   ? 1
	    //   : aScore.length > bScore.length
	    //   ? -1
	    //   : 0
	}
	/**
	 * This allows detecting splats at the end of a path: /home/:id(.*)*
	 *
	 * @param score - score to check
	 * @returns true if the last entry is negative
	 */
	function isLastScoreNegative(score) {
	    const last = score[score.length - 1];
	    return score.length > 0 && last[last.length - 1] < 0;
	}

	const ROOT_TOKEN = {
	    type: 0 /* TokenType.Static */,
	    value: '',
	};
	const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
	// After some profiling, the cache seems to be unnecessary because tokenizePath
	// (the slowest part of adding a route) is very fast
	// const tokenCache = new Map<string, Token[][]>()
	function tokenizePath(path) {
	    if (!path)
	        return [[]];
	    if (path === '/')
	        return [[ROOT_TOKEN]];
	    if (!path.startsWith('/')) {
	        throw new Error(`Invalid path "${path}"`);
	    }
	    // if (tokenCache.has(path)) return tokenCache.get(path)!
	    function crash(message) {
	        throw new Error(`ERR (${state})/"${buffer}": ${message}`);
	    }
	    let state = 0 /* TokenizerState.Static */;
	    let previousState = state;
	    const tokens = [];
	    // the segment will always be valid because we get into the initial state
	    // with the leading /
	    let segment;
	    function finalizeSegment() {
	        if (segment)
	            tokens.push(segment);
	        segment = [];
	    }
	    // index on the path
	    let i = 0;
	    // char at index
	    let char;
	    // buffer of the value read
	    let buffer = '';
	    // custom regexp for a param
	    let customRe = '';
	    function consumeBuffer() {
	        if (!buffer)
	            return;
	        if (state === 0 /* TokenizerState.Static */) {
	            segment.push({
	                type: 0 /* TokenType.Static */,
	                value: buffer,
	            });
	        }
	        else if (state === 1 /* TokenizerState.Param */ ||
	            state === 2 /* TokenizerState.ParamRegExp */ ||
	            state === 3 /* TokenizerState.ParamRegExpEnd */) {
	            if (segment.length > 1 && (char === '*' || char === '+'))
	                crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
	            segment.push({
	                type: 1 /* TokenType.Param */,
	                value: buffer,
	                regexp: customRe,
	                repeatable: char === '*' || char === '+',
	                optional: char === '*' || char === '?',
	            });
	        }
	        else {
	            crash('Invalid state to consume buffer');
	        }
	        buffer = '';
	    }
	    function addCharToBuffer() {
	        buffer += char;
	    }
	    while (i < path.length) {
	        char = path[i++];
	        if (char === '\\' && state !== 2 /* TokenizerState.ParamRegExp */) {
	            previousState = state;
	            state = 4 /* TokenizerState.EscapeNext */;
	            continue;
	        }
	        switch (state) {
	            case 0 /* TokenizerState.Static */:
	                if (char === '/') {
	                    if (buffer) {
	                        consumeBuffer();
	                    }
	                    finalizeSegment();
	                }
	                else if (char === ':') {
	                    consumeBuffer();
	                    state = 1 /* TokenizerState.Param */;
	                }
	                else {
	                    addCharToBuffer();
	                }
	                break;
	            case 4 /* TokenizerState.EscapeNext */:
	                addCharToBuffer();
	                state = previousState;
	                break;
	            case 1 /* TokenizerState.Param */:
	                if (char === '(') {
	                    state = 2 /* TokenizerState.ParamRegExp */;
	                }
	                else if (VALID_PARAM_RE.test(char)) {
	                    addCharToBuffer();
	                }
	                else {
	                    consumeBuffer();
	                    state = 0 /* TokenizerState.Static */;
	                    // go back one character if we were not modifying
	                    if (char !== '*' && char !== '?' && char !== '+')
	                        i--;
	                }
	                break;
	            case 2 /* TokenizerState.ParamRegExp */:
	                // TODO: is it worth handling nested regexp? like :p(?:prefix_([^/]+)_suffix)
	                // it already works by escaping the closing )
	                // https://paths.esm.dev/?p=AAMeJbiAwQEcDKbAoAAkP60PG2R6QAvgNaA6AFACM2ABuQBB#
	                // is this really something people need since you can also write
	                // /prefix_:p()_suffix
	                if (char === ')') {
	                    // handle the escaped )
	                    if (customRe[customRe.length - 1] == '\\')
	                        customRe = customRe.slice(0, -1) + char;
	                    else
	                        state = 3 /* TokenizerState.ParamRegExpEnd */;
	                }
	                else {
	                    customRe += char;
	                }
	                break;
	            case 3 /* TokenizerState.ParamRegExpEnd */:
	                // same as finalizing a param
	                consumeBuffer();
	                state = 0 /* TokenizerState.Static */;
	                // go back one character if we were not modifying
	                if (char !== '*' && char !== '?' && char !== '+')
	                    i--;
	                customRe = '';
	                break;
	            default:
	                crash('Unknown state');
	                break;
	        }
	    }
	    if (state === 2 /* TokenizerState.ParamRegExp */)
	        crash(`Unfinished custom RegExp for param "${buffer}"`);
	    consumeBuffer();
	    finalizeSegment();
	    // tokenCache.set(path, tokens)
	    return tokens;
	}

	function createRouteRecordMatcher(record, parent, options) {
	    const parser = tokensToParser(tokenizePath(record.path), options);
	    const matcher = assign(parser, {
	        record,
	        parent,
	        // these needs to be populated by the parent
	        children: [],
	        alias: [],
	    });
	    if (parent) {
	        // both are aliases or both are not aliases
	        // we don't want to mix them because the order is used when
	        // passing originalRecord in Matcher.addRoute
	        if (!matcher.record.aliasOf === !parent.record.aliasOf)
	            parent.children.push(matcher);
	    }
	    return matcher;
	}

	/**
	 * Creates a Router Matcher.
	 *
	 * @internal
	 * @param routes - array of initial routes
	 * @param globalOptions - global route options
	 */
	function createRouterMatcher(routes, globalOptions) {
	    // normalized ordered array of matchers
	    const matchers = [];
	    const matcherMap = new Map();
	    globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
	    function getRecordMatcher(name) {
	        return matcherMap.get(name);
	    }
	    function addRoute(record, parent, originalRecord) {
	        // used later on to remove by name
	        const isRootAdd = !originalRecord;
	        const mainNormalizedRecord = normalizeRouteRecord(record);
	        // we might be the child of an alias
	        mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
	        const options = mergeOptions(globalOptions, record);
	        // generate an array of records to correctly handle aliases
	        const normalizedRecords = [
	            mainNormalizedRecord,
	        ];
	        if ('alias' in record) {
	            const aliases = typeof record.alias === 'string' ? [record.alias] : record.alias;
	            for (const alias of aliases) {
	                normalizedRecords.push(assign({}, mainNormalizedRecord, {
	                    // this allows us to hold a copy of the `components` option
	                    // so that async components cache is hold on the original record
	                    components: originalRecord
	                        ? originalRecord.record.components
	                        : mainNormalizedRecord.components,
	                    path: alias,
	                    // we might be the child of an alias
	                    aliasOf: originalRecord
	                        ? originalRecord.record
	                        : mainNormalizedRecord,
	                    // the aliases are always of the same kind as the original since they
	                    // are defined on the same record
	                }));
	            }
	        }
	        let matcher;
	        let originalMatcher;
	        for (const normalizedRecord of normalizedRecords) {
	            const { path } = normalizedRecord;
	            // Build up the path for nested routes if the child isn't an absolute
	            // route. Only add the / delimiter if the child path isn't empty and if the
	            // parent path doesn't have a trailing slash
	            if (parent && path[0] !== '/') {
	                const parentPath = parent.record.path;
	                const connectingSlash = parentPath[parentPath.length - 1] === '/' ? '' : '/';
	                normalizedRecord.path =
	                    parent.record.path + (path && connectingSlash + path);
	            }
	            // create the object before hand so it can be passed to children
	            matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
	            // if we are an alias we must tell the original record that we exist
	            // so we can be removed
	            if (originalRecord) {
	                originalRecord.alias.push(matcher);
	            }
	            else {
	                // otherwise, the first record is the original and others are aliases
	                originalMatcher = originalMatcher || matcher;
	                if (originalMatcher !== matcher)
	                    originalMatcher.alias.push(matcher);
	                // remove the route if named and only for the top record (avoid in nested calls)
	                // this works because the original record is the first one
	                if (isRootAdd && record.name && !isAliasRecord(matcher))
	                    removeRoute(record.name);
	            }
	            if (mainNormalizedRecord.children) {
	                const children = mainNormalizedRecord.children;
	                for (let i = 0; i < children.length; i++) {
	                    addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
	                }
	            }
	            // if there was no original record, then the first one was not an alias and all
	            // other alias (if any) need to reference this record when adding children
	            originalRecord = originalRecord || matcher;
	            // TODO: add normalized records for more flexibility
	            // if (parent && isAliasRecord(originalRecord)) {
	            //   parent.children.push(originalRecord)
	            // }
	            insertMatcher(matcher);
	        }
	        return originalMatcher
	            ? () => {
	                // since other matchers are aliases, they should be removed by the original matcher
	                removeRoute(originalMatcher);
	            }
	            : noop;
	    }
	    function removeRoute(matcherRef) {
	        if (isRouteName(matcherRef)) {
	            const matcher = matcherMap.get(matcherRef);
	            if (matcher) {
	                matcherMap.delete(matcherRef);
	                matchers.splice(matchers.indexOf(matcher), 1);
	                matcher.children.forEach(removeRoute);
	                matcher.alias.forEach(removeRoute);
	            }
	        }
	        else {
	            const index = matchers.indexOf(matcherRef);
	            if (index > -1) {
	                matchers.splice(index, 1);
	                if (matcherRef.record.name)
	                    matcherMap.delete(matcherRef.record.name);
	                matcherRef.children.forEach(removeRoute);
	                matcherRef.alias.forEach(removeRoute);
	            }
	        }
	    }
	    function getRoutes() {
	        return matchers;
	    }
	    function insertMatcher(matcher) {
	        let i = 0;
	        while (i < matchers.length &&
	            comparePathParserScore(matcher, matchers[i]) >= 0 &&
	            // Adding children with empty path should still appear before the parent
	            // https://github.com/vuejs/router/issues/1124
	            (matcher.record.path !== matchers[i].record.path ||
	                !isRecordChildOf(matcher, matchers[i])))
	            i++;
	        matchers.splice(i, 0, matcher);
	        // only add the original record to the name map
	        if (matcher.record.name && !isAliasRecord(matcher))
	            matcherMap.set(matcher.record.name, matcher);
	    }
	    function resolve(location, currentLocation) {
	        let matcher;
	        let params = {};
	        let path;
	        let name;
	        if ('name' in location && location.name) {
	            matcher = matcherMap.get(location.name);
	            if (!matcher)
	                throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
	                    location,
	                });
	            name = matcher.record.name;
	            params = assign(
	            // paramsFromLocation is a new object
	            paramsFromLocation(currentLocation.params, 
	            // only keep params that exist in the resolved location
	            // TODO: only keep optional params coming from a parent record
	            matcher.keys.filter(k => !k.optional).map(k => k.name)), location.params);
	            // throws if cannot be stringified
	            path = matcher.stringify(params);
	        }
	        else if ('path' in location) {
	            // no need to resolve the path with the matcher as it was provided
	            // this also allows the user to control the encoding
	            path = location.path;
	            matcher = matchers.find(m => m.re.test(path));
	            // matcher should have a value after the loop
	            if (matcher) {
	                // TODO: dev warning of unused params if provided
	                // we know the matcher works because we tested the regexp
	                params = matcher.parse(path);
	                name = matcher.record.name;
	            }
	            // location is a relative path
	        }
	        else {
	            // match by name or path of current route
	            matcher = currentLocation.name
	                ? matcherMap.get(currentLocation.name)
	                : matchers.find(m => m.re.test(currentLocation.path));
	            if (!matcher)
	                throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
	                    location,
	                    currentLocation,
	                });
	            name = matcher.record.name;
	            // since we are navigating to the same location, we don't need to pick the
	            // params like when `name` is provided
	            params = assign({}, currentLocation.params, location.params);
	            path = matcher.stringify(params);
	        }
	        const matched = [];
	        let parentMatcher = matcher;
	        while (parentMatcher) {
	            // reversed order so parents are at the beginning
	            matched.unshift(parentMatcher.record);
	            parentMatcher = parentMatcher.parent;
	        }
	        return {
	            name,
	            path,
	            params,
	            matched,
	            meta: mergeMetaFields(matched),
	        };
	    }
	    // add initial routes
	    routes.forEach(route => addRoute(route));
	    return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
	}
	function paramsFromLocation(params, keys) {
	    const newParams = {};
	    for (const key of keys) {
	        if (key in params)
	            newParams[key] = params[key];
	    }
	    return newParams;
	}
	/**
	 * Normalizes a RouteRecordRaw. Creates a copy
	 *
	 * @param record
	 * @returns the normalized version
	 */
	function normalizeRouteRecord(record) {
	    return {
	        path: record.path,
	        redirect: record.redirect,
	        name: record.name,
	        meta: record.meta || {},
	        aliasOf: undefined,
	        beforeEnter: record.beforeEnter,
	        props: normalizeRecordProps(record),
	        children: record.children || [],
	        instances: {},
	        leaveGuards: new Set(),
	        updateGuards: new Set(),
	        enterCallbacks: {},
	        components: 'components' in record
	            ? record.components || null
	            : record.component && { default: record.component },
	    };
	}
	/**
	 * Normalize the optional `props` in a record to always be an object similar to
	 * components. Also accept a boolean for components.
	 * @param record
	 */
	function normalizeRecordProps(record) {
	    const propsObject = {};
	    // props does not exist on redirect records but we can set false directly
	    const props = record.props || false;
	    if ('component' in record) {
	        propsObject.default = props;
	    }
	    else {
	        // NOTE: we could also allow a function to be applied to every component.
	        // Would need user feedback for use cases
	        for (const name in record.components)
	            propsObject[name] = typeof props === 'boolean' ? props : props[name];
	    }
	    return propsObject;
	}
	/**
	 * Checks if a record or any of its parent is an alias
	 * @param record
	 */
	function isAliasRecord(record) {
	    while (record) {
	        if (record.record.aliasOf)
	            return true;
	        record = record.parent;
	    }
	    return false;
	}
	/**
	 * Merge meta fields of an array of records
	 *
	 * @param matched - array of matched records
	 */
	function mergeMetaFields(matched) {
	    return matched.reduce((meta, record) => assign(meta, record.meta), {});
	}
	function mergeOptions(defaults, partialOptions) {
	    const options = {};
	    for (const key in defaults) {
	        options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
	    }
	    return options;
	}
	function isRecordChildOf(record, parent) {
	    return parent.children.some(child => child === record || isRecordChildOf(record, child));
	}

	/**
	 * Encoding Rules ␣ = Space Path: ␣ " < > # ? { } Query: ␣ " < > # & = Hash: ␣ "
	 * < > `
	 *
	 * On top of that, the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2)
	 * defines some extra characters to be encoded. Most browsers do not encode them
	 * in encodeURI https://github.com/whatwg/url/issues/369, so it may be safer to
	 * also encode `!'()*`. Leaving unencoded only ASCII alphanumeric(`a-zA-Z0-9`)
	 * plus `-._~`. This extra safety should be applied to query by patching the
	 * string returned by encodeURIComponent encodeURI also encodes `[\]^`. `\`
	 * should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a `\`
	 * into a `/` if directly typed in. The _backtick_ (`````) should also be
	 * encoded everywhere because some browsers like FF encode it when directly
	 * written while others don't. Safari and IE don't encode ``"<>{}``` in hash.
	 */
	// const EXTRA_RESERVED_RE = /[!'()*]/g
	// const encodeReservedReplacer = (c: string) => '%' + c.charCodeAt(0).toString(16)
	const HASH_RE = /#/g; // %23
	const AMPERSAND_RE = /&/g; // %26
	const SLASH_RE = /\//g; // %2F
	const EQUAL_RE = /=/g; // %3D
	const IM_RE = /\?/g; // %3F
	const PLUS_RE = /\+/g; // %2B
	/**
	 * NOTE: It's not clear to me if we should encode the + symbol in queries, it
	 * seems to be less flexible than not doing so and I can't find out the legacy
	 * systems requiring this for regular requests like text/html. In the standard,
	 * the encoding of the plus character is only mentioned for
	 * application/x-www-form-urlencoded
	 * (https://url.spec.whatwg.org/#urlencoded-parsing) and most browsers seems lo
	 * leave the plus character as is in queries. To be more flexible, we allow the
	 * plus character on the query but it can also be manually encoded by the user.
	 *
	 * Resources:
	 * - https://url.spec.whatwg.org/#urlencoded-parsing
	 * - https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20
	 */
	const ENC_BRACKET_OPEN_RE = /%5B/g; // [
	const ENC_BRACKET_CLOSE_RE = /%5D/g; // ]
	const ENC_CARET_RE = /%5E/g; // ^
	const ENC_BACKTICK_RE = /%60/g; // `
	const ENC_CURLY_OPEN_RE = /%7B/g; // {
	const ENC_PIPE_RE = /%7C/g; // |
	const ENC_CURLY_CLOSE_RE = /%7D/g; // }
	const ENC_SPACE_RE = /%20/g; // }
	/**
	 * Encode characters that need to be encoded on the path, search and hash
	 * sections of the URL.
	 *
	 * @internal
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function commonEncode(text) {
	    return encodeURI('' + text)
	        .replace(ENC_PIPE_RE, '|')
	        .replace(ENC_BRACKET_OPEN_RE, '[')
	        .replace(ENC_BRACKET_CLOSE_RE, ']');
	}
	/**
	 * Encode characters that need to be encoded on the hash section of the URL.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodeHash(text) {
	    return commonEncode(text)
	        .replace(ENC_CURLY_OPEN_RE, '{')
	        .replace(ENC_CURLY_CLOSE_RE, '}')
	        .replace(ENC_CARET_RE, '^');
	}
	/**
	 * Encode characters that need to be encoded query values on the query
	 * section of the URL.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodeQueryValue(text) {
	    return (commonEncode(text)
	        // Encode the space as +, encode the + to differentiate it from the space
	        .replace(PLUS_RE, '%2B')
	        .replace(ENC_SPACE_RE, '+')
	        .replace(HASH_RE, '%23')
	        .replace(AMPERSAND_RE, '%26')
	        .replace(ENC_BACKTICK_RE, '`')
	        .replace(ENC_CURLY_OPEN_RE, '{')
	        .replace(ENC_CURLY_CLOSE_RE, '}')
	        .replace(ENC_CARET_RE, '^'));
	}
	/**
	 * Like `encodeQueryValue` but also encodes the `=` character.
	 *
	 * @param text - string to encode
	 */
	function encodeQueryKey(text) {
	    return encodeQueryValue(text).replace(EQUAL_RE, '%3D');
	}
	/**
	 * Encode characters that need to be encoded on the path section of the URL.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodePath(text) {
	    return commonEncode(text).replace(HASH_RE, '%23').replace(IM_RE, '%3F');
	}
	/**
	 * Encode characters that need to be encoded on the path section of the URL as a
	 * param. This function encodes everything {@link encodePath} does plus the
	 * slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
	 * string instead.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodeParam(text) {
	    return text == null ? '' : encodePath(text).replace(SLASH_RE, '%2F');
	}
	/**
	 * Decode text using `decodeURIComponent`. Returns the original text if it
	 * fails.
	 *
	 * @param text - string to decode
	 * @returns decoded string
	 */
	function decode(text) {
	    try {
	        return decodeURIComponent('' + text);
	    }
	    catch (err) {
	    }
	    return '' + text;
	}

	/**
	 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
	 * version with the leading `?` and without Should work as URLSearchParams

	 * @internal
	 *
	 * @param search - search string to parse
	 * @returns a query object
	 */
	function parseQuery(search) {
	    const query = {};
	    // avoid creating an object with an empty key and empty value
	    // because of split('&')
	    if (search === '' || search === '?')
	        return query;
	    const hasLeadingIM = search[0] === '?';
	    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
	    for (let i = 0; i < searchParams.length; ++i) {
	        // pre decode the + into space
	        const searchParam = searchParams[i].replace(PLUS_RE, ' ');
	        // allow the = character
	        const eqPos = searchParam.indexOf('=');
	        const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
	        const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
	        if (key in query) {
	            // an extra variable for ts types
	            let currentValue = query[key];
	            if (!isArray(currentValue)) {
	                currentValue = query[key] = [currentValue];
	            }
	            currentValue.push(value);
	        }
	        else {
	            query[key] = value;
	        }
	    }
	    return query;
	}
	/**
	 * Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
	 * doesn't prepend a `?`
	 *
	 * @internal
	 *
	 * @param query - query object to stringify
	 * @returns string version of the query without the leading `?`
	 */
	function stringifyQuery(query) {
	    let search = '';
	    for (let key in query) {
	        const value = query[key];
	        key = encodeQueryKey(key);
	        if (value == null) {
	            // only null adds the value
	            if (value !== undefined) {
	                search += (search.length ? '&' : '') + key;
	            }
	            continue;
	        }
	        // keep null values
	        const values = isArray(value)
	            ? value.map(v => v && encodeQueryValue(v))
	            : [value && encodeQueryValue(value)];
	        values.forEach(value => {
	            // skip undefined values in arrays as if they were not present
	            // smaller code than using filter
	            if (value !== undefined) {
	                // only append & with non-empty search
	                search += (search.length ? '&' : '') + key;
	                if (value != null)
	                    search += '=' + value;
	            }
	        });
	    }
	    return search;
	}
	/**
	 * Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
	 * numbers into strings, removing keys with an undefined value and replacing
	 * undefined with null in arrays
	 *
	 * @param query - query object to normalize
	 * @returns a normalized query object
	 */
	function normalizeQuery(query) {
	    const normalizedQuery = {};
	    for (const key in query) {
	        const value = query[key];
	        if (value !== undefined) {
	            normalizedQuery[key] = isArray(value)
	                ? value.map(v => (v == null ? null : '' + v))
	                : value == null
	                    ? value
	                    : '' + value;
	        }
	    }
	    return normalizedQuery;
	}

	/**
	 * RouteRecord being rendered by the closest ancestor Router View. Used for
	 * `onBeforeRouteUpdate` and `onBeforeRouteLeave`. rvlm stands for Router View
	 * Location Matched
	 *
	 * @internal
	 */
	const matchedRouteKey = Symbol('');
	/**
	 * Allows overriding the router view depth to control which component in
	 * `matched` is rendered. rvd stands for Router View Depth
	 *
	 * @internal
	 */
	const viewDepthKey = Symbol('');
	/**
	 * Allows overriding the router instance returned by `useRouter` in tests. r
	 * stands for router
	 *
	 * @internal
	 */
	const routerKey = Symbol('');
	/**
	 * Allows overriding the current route returned by `useRoute` in tests. rl
	 * stands for route location
	 *
	 * @internal
	 */
	const routeLocationKey = Symbol('');
	/**
	 * Allows overriding the current route used by router-view. Internally this is
	 * used when the `route` prop is passed.
	 *
	 * @internal
	 */
	const routerViewLocationKey = Symbol('');

	/**
	 * Create a list of callbacks that can be reset. Used to create before and after navigation guards list
	 */
	function useCallbacks() {
	    let handlers = [];
	    function add(handler) {
	        handlers.push(handler);
	        return () => {
	            const i = handlers.indexOf(handler);
	            if (i > -1)
	                handlers.splice(i, 1);
	        };
	    }
	    function reset() {
	        handlers = [];
	    }
	    return {
	        add,
	        list: () => handlers,
	        reset,
	    };
	}

	function registerGuard(record, name, guard) {
	    const removeFromList = () => {
	        record[name].delete(guard);
	    };
	    vue.onUnmounted(removeFromList);
	    vue.onDeactivated(removeFromList);
	    vue.onActivated(() => {
	        record[name].add(guard);
	    });
	    record[name].add(guard);
	}
	/**
	 * Add a navigation guard that triggers whenever the component for the current
	 * location is about to be left. Similar to {@link beforeRouteLeave} but can be
	 * used in any component. The guard is removed when the component is unmounted.
	 *
	 * @param leaveGuard - {@link NavigationGuard}
	 */
	function onBeforeRouteLeave(leaveGuard) {
	    const activeRecord = vue.inject(matchedRouteKey, 
	    // to avoid warning
	    {}).value;
	    if (!activeRecord) {
	        return;
	    }
	    registerGuard(activeRecord, 'leaveGuards', leaveGuard);
	}
	/**
	 * Add a navigation guard that triggers whenever the current location is about
	 * to be updated. Similar to {@link beforeRouteUpdate} but can be used in any
	 * component. The guard is removed when the component is unmounted.
	 *
	 * @param updateGuard - {@link NavigationGuard}
	 */
	function onBeforeRouteUpdate(updateGuard) {
	    const activeRecord = vue.inject(matchedRouteKey, 
	    // to avoid warning
	    {}).value;
	    if (!activeRecord) {
	        return;
	    }
	    registerGuard(activeRecord, 'updateGuards', updateGuard);
	}
	function guardToPromiseFn(guard, to, from, record, name) {
	    // keep a reference to the enterCallbackArray to prevent pushing callbacks if a new navigation took place
	    const enterCallbackArray = record &&
	        // name is defined if record is because of the function overload
	        (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
	    return () => new Promise((resolve, reject) => {
	        const next = (valid) => {
	            if (valid === false)
	                reject(createRouterError(4 /* ErrorTypes.NAVIGATION_ABORTED */, {
	                    from,
	                    to,
	                }));
	            else if (valid instanceof Error) {
	                reject(valid);
	            }
	            else if (isRouteLocation(valid)) {
	                reject(createRouterError(2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */, {
	                    from: to,
	                    to: valid,
	                }));
	            }
	            else {
	                if (enterCallbackArray &&
	                    // since enterCallbackArray is truthy, both record and name also are
	                    record.enterCallbacks[name] === enterCallbackArray &&
	                    typeof valid === 'function')
	                    enterCallbackArray.push(valid);
	                resolve();
	            }
	        };
	        // wrapping with Promise.resolve allows it to work with both async and sync guards
	        const guardReturn = guard.call(record && record.instances[name], to, from, next);
	        let guardCall = Promise.resolve(guardReturn);
	        if (guard.length < 3)
	            guardCall = guardCall.then(next);
	        guardCall.catch(err => reject(err));
	    });
	}
	function extractComponentsGuards(matched, guardType, to, from) {
	    const guards = [];
	    for (const record of matched) {
	        for (const name in record.components) {
	            let rawComponent = record.components[name];
	            // skip update and leave guards if the route component is not mounted
	            if (guardType !== 'beforeRouteEnter' && !record.instances[name])
	                continue;
	            if (isRouteComponent(rawComponent)) {
	                // __vccOpts is added by vue-class-component and contain the regular options
	                const options = rawComponent.__vccOpts || rawComponent;
	                const guard = options[guardType];
	                guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
	            }
	            else {
	                // start requesting the chunk already
	                let componentPromise = rawComponent();
	                guards.push(() => componentPromise.then(resolved => {
	                    if (!resolved)
	                        return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
	                    const resolvedComponent = isESModule(resolved)
	                        ? resolved.default
	                        : resolved;
	                    // replace the function with the resolved component
	                    // cannot be null or undefined because we went into the for loop
	                    record.components[name] = resolvedComponent;
	                    // __vccOpts is added by vue-class-component and contain the regular options
	                    const options = resolvedComponent.__vccOpts || resolvedComponent;
	                    const guard = options[guardType];
	                    return guard && guardToPromiseFn(guard, to, from, record, name)();
	                }));
	            }
	        }
	    }
	    return guards;
	}
	/**
	 * Allows differentiating lazy components from functional components and vue-class-component
	 * @internal
	 *
	 * @param component
	 */
	function isRouteComponent(component) {
	    return (typeof component === 'object' ||
	        'displayName' in component ||
	        'props' in component ||
	        '__vccOpts' in component);
	}
	/**
	 * Ensures a route is loaded so it can be passed as o prop to `<RouterView>`.
	 *
	 * @param route - resolved route to load
	 */
	function loadRouteLocation(route) {
	    return route.matched.every(record => record.redirect)
	        ? Promise.reject(new Error('Cannot load a route that redirects.'))
	        : Promise.all(route.matched.map(record => record.components &&
	            Promise.all(Object.keys(record.components).reduce((promises, name) => {
	                const rawComponent = record.components[name];
	                if (typeof rawComponent === 'function' &&
	                    !('displayName' in rawComponent)) {
	                    promises.push(rawComponent().then(resolved => {
	                        if (!resolved)
	                            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}". Ensure you passed a function that returns a promise.`));
	                        const resolvedComponent = isESModule(resolved)
	                            ? resolved.default
	                            : resolved;
	                        // replace the function with the resolved component
	                        // cannot be null or undefined because we went into the for loop
	                        record.components[name] = resolvedComponent;
	                        return;
	                    }));
	                }
	                return promises;
	            }, [])))).then(() => route);
	}

	// TODO: we could allow currentRoute as a prop to expose `isActive` and
	// `isExactActive` behavior should go through an RFC
	function useLink(props) {
	    const router = vue.inject(routerKey);
	    const currentRoute = vue.inject(routeLocationKey);
	    const route = vue.computed(() => router.resolve(vue.unref(props.to)));
	    const activeRecordIndex = vue.computed(() => {
	        const { matched } = route.value;
	        const { length } = matched;
	        const routeMatched = matched[length - 1];
	        const currentMatched = currentRoute.matched;
	        if (!routeMatched || !currentMatched.length)
	            return -1;
	        const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
	        if (index > -1)
	            return index;
	        // possible parent record
	        const parentRecordPath = getOriginalPath(matched[length - 2]);
	        return (
	        // we are dealing with nested routes
	        length > 1 &&
	            // if the parent and matched route have the same path, this link is
	            // referring to the empty child. Or we currently are on a different
	            // child of the same parent
	            getOriginalPath(routeMatched) === parentRecordPath &&
	            // avoid comparing the child with its parent
	            currentMatched[currentMatched.length - 1].path !== parentRecordPath
	            ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2]))
	            : index);
	    });
	    const isActive = vue.computed(() => activeRecordIndex.value > -1 &&
	        includesParams(currentRoute.params, route.value.params));
	    const isExactActive = vue.computed(() => activeRecordIndex.value > -1 &&
	        activeRecordIndex.value === currentRoute.matched.length - 1 &&
	        isSameRouteLocationParams(currentRoute.params, route.value.params));
	    function navigate(e = {}) {
	        if (guardEvent(e)) {
	            return router[vue.unref(props.replace) ? 'replace' : 'push'](vue.unref(props.to)
	            // avoid uncaught errors are they are logged anyway
	            ).catch(noop);
	        }
	        return Promise.resolve();
	    }
	    return {
	        route,
	        href: vue.computed(() => route.value.href),
	        isActive,
	        isExactActive,
	        navigate,
	    };
	}
	const RouterLinkImpl = /*#__PURE__*/ vue.defineComponent({
	    name: 'RouterLink',
	    compatConfig: { MODE: 3 },
	    props: {
	        to: {
	            type: [String, Object],
	            required: true,
	        },
	        replace: Boolean,
	        activeClass: String,
	        // inactiveClass: String,
	        exactActiveClass: String,
	        custom: Boolean,
	        ariaCurrentValue: {
	            type: String,
	            default: 'page',
	        },
	    },
	    useLink,
	    setup(props, { slots }) {
	        const link = vue.reactive(useLink(props));
	        const { options } = vue.inject(routerKey);
	        const elClass = vue.computed(() => ({
	            [getLinkClass(props.activeClass, options.linkActiveClass, 'router-link-active')]: link.isActive,
	            // [getLinkClass(
	            //   props.inactiveClass,
	            //   options.linkInactiveClass,
	            //   'router-link-inactive'
	            // )]: !link.isExactActive,
	            [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, 'router-link-exact-active')]: link.isExactActive,
	        }));
	        return () => {
	            const children = slots.default && slots.default(link);
	            return props.custom
	                ? children
	                : vue.h('a', {
	                    'aria-current': link.isExactActive
	                        ? props.ariaCurrentValue
	                        : null,
	                    href: link.href,
	                    // this would override user added attrs but Vue will still add
	                    // the listener so we end up triggering both
	                    onClick: link.navigate,
	                    class: elClass.value,
	                }, children);
	        };
	    },
	});
	// export the public type for h/tsx inference
	// also to avoid inline import() in generated d.ts files
	/**
	 * Component to render a link that triggers a navigation on click.
	 */
	const RouterLink = RouterLinkImpl;
	function guardEvent(e) {
	    // don't redirect with control keys
	    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
	        return;
	    // don't redirect when preventDefault called
	    if (e.defaultPrevented)
	        return;
	    // don't redirect on right click
	    if (e.button !== undefined && e.button !== 0)
	        return;
	    // don't redirect if `target="_blank"`
	    // @ts-expect-error getAttribute does exist
	    if (e.currentTarget && e.currentTarget.getAttribute) {
	        // @ts-expect-error getAttribute exists
	        const target = e.currentTarget.getAttribute('target');
	        if (/\b_blank\b/i.test(target))
	            return;
	    }
	    // this may be a Weex event which doesn't have this method
	    if (e.preventDefault)
	        e.preventDefault();
	    return true;
	}
	function includesParams(outer, inner) {
	    for (const key in inner) {
	        const innerValue = inner[key];
	        const outerValue = outer[key];
	        if (typeof innerValue === 'string') {
	            if (innerValue !== outerValue)
	                return false;
	        }
	        else {
	            if (!isArray(outerValue) ||
	                outerValue.length !== innerValue.length ||
	                innerValue.some((value, i) => value !== outerValue[i]))
	                return false;
	        }
	    }
	    return true;
	}
	/**
	 * Get the original path value of a record by following its aliasOf
	 * @param record
	 */
	function getOriginalPath(record) {
	    return record ? (record.aliasOf ? record.aliasOf.path : record.path) : '';
	}
	/**
	 * Utility class to get the active class based on defaults.
	 * @param propClass
	 * @param globalClass
	 * @param defaultClass
	 */
	const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null
	    ? propClass
	    : globalClass != null
	        ? globalClass
	        : defaultClass;

	const RouterViewImpl = /*#__PURE__*/ vue.defineComponent({
	    name: 'RouterView',
	    // #674 we manually inherit them
	    inheritAttrs: false,
	    props: {
	        name: {
	            type: String,
	            default: 'default',
	        },
	        route: Object,
	    },
	    // Better compat for @vue/compat users
	    // https://github.com/vuejs/router/issues/1315
	    compatConfig: { MODE: 3 },
	    setup(props, { attrs, slots }) {
	        const injectedRoute = vue.inject(routerViewLocationKey);
	        const routeToDisplay = vue.computed(() => props.route || injectedRoute.value);
	        const injectedDepth = vue.inject(viewDepthKey, 0);
	        // The depth changes based on empty components option, which allows passthrough routes e.g. routes with children
	        // that are used to reuse the `path` property
	        const depth = vue.computed(() => {
	            let initialDepth = vue.unref(injectedDepth);
	            const { matched } = routeToDisplay.value;
	            let matchedRoute;
	            while ((matchedRoute = matched[initialDepth]) &&
	                !matchedRoute.components) {
	                initialDepth++;
	            }
	            return initialDepth;
	        });
	        const matchedRouteRef = vue.computed(() => routeToDisplay.value.matched[depth.value]);
	        vue.provide(viewDepthKey, vue.computed(() => depth.value + 1));
	        vue.provide(matchedRouteKey, matchedRouteRef);
	        vue.provide(routerViewLocationKey, routeToDisplay);
	        const viewRef = vue.ref();
	        // watch at the same time the component instance, the route record we are
	        // rendering, and the name
	        vue.watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
	            // copy reused instances
	            if (to) {
	                // this will update the instance for new instances as well as reused
	                // instances when navigating to a new route
	                to.instances[name] = instance;
	                // the component instance is reused for a different route or name so
	                // we copy any saved update or leave guards. With async setup, the
	                // mounting component will mount before the matchedRoute changes,
	                // making instance === oldInstance, so we check if guards have been
	                // added before. This works because we remove guards when
	                // unmounting/deactivating components
	                if (from && from !== to && instance && instance === oldInstance) {
	                    if (!to.leaveGuards.size) {
	                        to.leaveGuards = from.leaveGuards;
	                    }
	                    if (!to.updateGuards.size) {
	                        to.updateGuards = from.updateGuards;
	                    }
	                }
	            }
	            // trigger beforeRouteEnter next callbacks
	            if (instance &&
	                to &&
	                // if there is no instance but to and from are the same this might be
	                // the first visit
	                (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
	                (to.enterCallbacks[name] || []).forEach(callback => callback(instance));
	            }
	        }, { flush: 'post' });
	        return () => {
	            const route = routeToDisplay.value;
	            const matchedRoute = matchedRouteRef.value;
	            const ViewComponent = matchedRoute && matchedRoute.components[props.name];
	            // we need the value at the time we render because when we unmount, we
	            // navigated to a different location so the value is different
	            const currentName = props.name;
	            if (!ViewComponent) {
	                return normalizeSlot(slots.default, { Component: ViewComponent, route });
	            }
	            // props from route configuration
	            const routePropsOption = matchedRoute.props[props.name];
	            const routeProps = routePropsOption
	                ? routePropsOption === true
	                    ? route.params
	                    : typeof routePropsOption === 'function'
	                        ? routePropsOption(route)
	                        : routePropsOption
	                : null;
	            const onVnodeUnmounted = vnode => {
	                // remove the instance reference to prevent leak
	                if (vnode.component.isUnmounted) {
	                    matchedRoute.instances[currentName] = null;
	                }
	            };
	            const component = vue.h(ViewComponent, assign({}, routeProps, attrs, {
	                onVnodeUnmounted,
	                ref: viewRef,
	            }));
	            return (
	            // pass the vnode to the slot as a prop.
	            // h and <component :is="..."> both accept vnodes
	            normalizeSlot(slots.default, { Component: component, route }) ||
	                component);
	        };
	    },
	});
	function normalizeSlot(slot, data) {
	    if (!slot)
	        return null;
	    const slotContent = slot(data);
	    return slotContent.length === 1 ? slotContent[0] : slotContent;
	}
	// export the public type for h/tsx inference
	// also to avoid inline import() in generated d.ts files
	/**
	 * Component to display the current route the user is at.
	 */
	const RouterView = RouterViewImpl;

	/**
	 * Creates a Router instance that can be used by a Vue app.
	 *
	 * @param options - {@link RouterOptions}
	 */
	function createRouter(options) {
	    const matcher = createRouterMatcher(options.routes, options);
	    const parseQuery$1 = options.parseQuery || parseQuery;
	    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
	    const routerHistory = options.history;
	    const beforeGuards = useCallbacks();
	    const beforeResolveGuards = useCallbacks();
	    const afterGuards = useCallbacks();
	    const currentRoute = vue.shallowRef(START_LOCATION_NORMALIZED);
	    let pendingLocation = START_LOCATION_NORMALIZED;
	    const normalizeParams = applyToParams.bind(null, paramValue => '' + paramValue);
	    const encodeParams = applyToParams.bind(null, encodeParam);
	    const decodeParams = 
	    // @ts-expect-error: intentionally avoid the type check
	    applyToParams.bind(null, decode);
	    function addRoute(parentOrRoute, route) {
	        let parent;
	        let record;
	        if (isRouteName(parentOrRoute)) {
	            parent = matcher.getRecordMatcher(parentOrRoute);
	            record = route;
	        }
	        else {
	            record = parentOrRoute;
	        }
	        return matcher.addRoute(record, parent);
	    }
	    function removeRoute(name) {
	        const recordMatcher = matcher.getRecordMatcher(name);
	        if (recordMatcher) {
	            matcher.removeRoute(recordMatcher);
	        }
	    }
	    function getRoutes() {
	        return matcher.getRoutes().map(routeMatcher => routeMatcher.record);
	    }
	    function hasRoute(name) {
	        return !!matcher.getRecordMatcher(name);
	    }
	    function resolve(rawLocation, currentLocation) {
	        // const objectLocation = routerLocationAsObject(rawLocation)
	        // we create a copy to modify it later
	        currentLocation = assign({}, currentLocation || currentRoute.value);
	        if (typeof rawLocation === 'string') {
	            const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
	            const matchedRoute = matcher.resolve({ path: locationNormalized.path }, currentLocation);
	            const href = routerHistory.createHref(locationNormalized.fullPath);
	            // locationNormalized is always a new object
	            return assign(locationNormalized, matchedRoute, {
	                params: decodeParams(matchedRoute.params),
	                hash: decode(locationNormalized.hash),
	                redirectedFrom: undefined,
	                href,
	            });
	        }
	        let matcherLocation;
	        // path could be relative in object as well
	        if ('path' in rawLocation) {
	            matcherLocation = assign({}, rawLocation, {
	                path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path,
	            });
	        }
	        else {
	            // remove any nullish param
	            const targetParams = assign({}, rawLocation.params);
	            for (const key in targetParams) {
	                if (targetParams[key] == null) {
	                    delete targetParams[key];
	                }
	            }
	            // pass encoded values to the matcher so it can produce encoded path and fullPath
	            matcherLocation = assign({}, rawLocation, {
	                params: encodeParams(rawLocation.params),
	            });
	            // current location params are decoded, we need to encode them in case the
	            // matcher merges the params
	            currentLocation.params = encodeParams(currentLocation.params);
	        }
	        const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
	        const hash = rawLocation.hash || '';
	        // decoding them) the matcher might have merged current location params so
	        // we need to run the decoding again
	        matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
	        const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
	            hash: encodeHash(hash),
	            path: matchedRoute.path,
	        }));
	        const href = routerHistory.createHref(fullPath);
	        return assign({
	            fullPath,
	            // keep the hash encoded so fullPath is effectively path + encodedQuery +
	            // hash
	            hash,
	            query: 
	            // if the user is using a custom query lib like qs, we might have
	            // nested objects, so we keep the query as is, meaning it can contain
	            // numbers at `$route.query`, but at the point, the user will have to
	            // use their own type anyway.
	            // https://github.com/vuejs/router/issues/328#issuecomment-649481567
	            stringifyQuery$1 === stringifyQuery
	                ? normalizeQuery(rawLocation.query)
	                : (rawLocation.query || {}),
	        }, matchedRoute, {
	            redirectedFrom: undefined,
	            href,
	        });
	    }
	    function locationAsObject(to) {
	        return typeof to === 'string'
	            ? parseURL(parseQuery$1, to, currentRoute.value.path)
	            : assign({}, to);
	    }
	    function checkCanceledNavigation(to, from) {
	        if (pendingLocation !== to) {
	            return createRouterError(8 /* ErrorTypes.NAVIGATION_CANCELLED */, {
	                from,
	                to,
	            });
	        }
	    }
	    function push(to) {
	        return pushWithRedirect(to);
	    }
	    function replace(to) {
	        return push(assign(locationAsObject(to), { replace: true }));
	    }
	    function handleRedirectRecord(to) {
	        const lastMatched = to.matched[to.matched.length - 1];
	        if (lastMatched && lastMatched.redirect) {
	            const { redirect } = lastMatched;
	            let newTargetLocation = typeof redirect === 'function' ? redirect(to) : redirect;
	            if (typeof newTargetLocation === 'string') {
	                newTargetLocation =
	                    newTargetLocation.includes('?') || newTargetLocation.includes('#')
	                        ? (newTargetLocation = locationAsObject(newTargetLocation))
	                        : // force empty params
	                            { path: newTargetLocation };
	                // @ts-expect-error: force empty params when a string is passed to let
	                // the router parse them again
	                newTargetLocation.params = {};
	            }
	            return assign({
	                query: to.query,
	                hash: to.hash,
	                // avoid transferring params if the redirect has a path
	                params: 'path' in newTargetLocation ? {} : to.params,
	            }, newTargetLocation);
	        }
	    }
	    function pushWithRedirect(to, redirectedFrom) {
	        const targetLocation = (pendingLocation = resolve(to));
	        const from = currentRoute.value;
	        const data = to.state;
	        const force = to.force;
	        // to could be a string where `replace` is a function
	        const replace = to.replace === true;
	        const shouldRedirect = handleRedirectRecord(targetLocation);
	        if (shouldRedirect)
	            return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
	                state: data,
	                force,
	                replace,
	            }), 
	            // keep original redirectedFrom if it exists
	            redirectedFrom || targetLocation);
	        // if it was a redirect we already called `pushWithRedirect` above
	        const toLocation = targetLocation;
	        toLocation.redirectedFrom = redirectedFrom;
	        let failure;
	        if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
	            failure = createRouterError(16 /* ErrorTypes.NAVIGATION_DUPLICATED */, { to: toLocation, from });
	            // trigger scroll to allow scrolling to the same anchor
	            handleScroll();
	        }
	        return (failure ? Promise.resolve(failure) : navigate(toLocation, from))
	            .catch((error) => isNavigationFailure(error)
	            ? // navigation redirects still mark the router as ready
	                isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)
	                    ? error
	                    : markAsReady(error) // also returns the error
	            : // reject any unknown error
	                triggerError(error, toLocation, from))
	            .then((failure) => {
	            if (failure) {
	                if (isNavigationFailure(failure, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
	                    return pushWithRedirect(
	                    // keep options
	                    assign(locationAsObject(failure.to), {
	                        state: data,
	                        force,
	                        replace,
	                    }), 
	                    // preserve the original redirectedFrom if any
	                    redirectedFrom || toLocation);
	                }
	            }
	            else {
	                // if we fail we don't finalize the navigation
	                failure = finalizeNavigation(toLocation, from, true, replace, data);
	            }
	            triggerAfterEach(toLocation, from, failure);
	            return failure;
	        });
	    }
	    /**
	     * Helper to reject and skip all navigation guards if a new navigation happened
	     * @param to
	     * @param from
	     */
	    function checkCanceledNavigationAndReject(to, from) {
	        const error = checkCanceledNavigation(to, from);
	        return error ? Promise.reject(error) : Promise.resolve();
	    }
	    // TODO: refactor the whole before guards by internally using router.beforeEach
	    function navigate(to, from) {
	        let guards;
	        const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
	        // all components here have been resolved once because we are leaving
	        guards = extractComponentsGuards(leavingRecords.reverse(), 'beforeRouteLeave', to, from);
	        // leavingRecords is already reversed
	        for (const record of leavingRecords) {
	            record.leaveGuards.forEach(guard => {
	                guards.push(guardToPromiseFn(guard, to, from));
	            });
	        }
	        const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
	        guards.push(canceledNavigationCheck);
	        // run the queue of per route beforeRouteLeave guards
	        return (runGuardQueue(guards)
	            .then(() => {
	            // check global guards beforeEach
	            guards = [];
	            for (const guard of beforeGuards.list()) {
	                guards.push(guardToPromiseFn(guard, to, from));
	            }
	            guards.push(canceledNavigationCheck);
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // check in components beforeRouteUpdate
	            guards = extractComponentsGuards(updatingRecords, 'beforeRouteUpdate', to, from);
	            for (const record of updatingRecords) {
	                record.updateGuards.forEach(guard => {
	                    guards.push(guardToPromiseFn(guard, to, from));
	                });
	            }
	            guards.push(canceledNavigationCheck);
	            // run the queue of per route beforeEnter guards
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // check the route beforeEnter
	            guards = [];
	            for (const record of to.matched) {
	                // do not trigger beforeEnter on reused views
	                if (record.beforeEnter && !from.matched.includes(record)) {
	                    if (isArray(record.beforeEnter)) {
	                        for (const beforeEnter of record.beforeEnter)
	                            guards.push(guardToPromiseFn(beforeEnter, to, from));
	                    }
	                    else {
	                        guards.push(guardToPromiseFn(record.beforeEnter, to, from));
	                    }
	                }
	            }
	            guards.push(canceledNavigationCheck);
	            // run the queue of per route beforeEnter guards
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // NOTE: at this point to.matched is normalized and does not contain any () => Promise<Component>
	            // clear existing enterCallbacks, these are added by extractComponentsGuards
	            to.matched.forEach(record => (record.enterCallbacks = {}));
	            // check in-component beforeRouteEnter
	            guards = extractComponentsGuards(enteringRecords, 'beforeRouteEnter', to, from);
	            guards.push(canceledNavigationCheck);
	            // run the queue of per route beforeEnter guards
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // check global guards beforeResolve
	            guards = [];
	            for (const guard of beforeResolveGuards.list()) {
	                guards.push(guardToPromiseFn(guard, to, from));
	            }
	            guards.push(canceledNavigationCheck);
	            return runGuardQueue(guards);
	        })
	            // catch any navigation canceled
	            .catch(err => isNavigationFailure(err, 8 /* ErrorTypes.NAVIGATION_CANCELLED */)
	            ? err
	            : Promise.reject(err)));
	    }
	    function triggerAfterEach(to, from, failure) {
	        // navigation is confirmed, call afterGuards
	        // TODO: wrap with error handlers
	        for (const guard of afterGuards.list())
	            guard(to, from, failure);
	    }
	    /**
	     * - Cleans up any navigation guards
	     * - Changes the url if necessary
	     * - Calls the scrollBehavior
	     */
	    function finalizeNavigation(toLocation, from, isPush, replace, data) {
	        // a more recent navigation took place
	        const error = checkCanceledNavigation(toLocation, from);
	        if (error)
	            return error;
	        // only consider as push if it's not the first navigation
	        const isFirstNavigation = from === START_LOCATION_NORMALIZED;
	        const state = {} ;
	        // change URL only if the user did a push/replace and if it's not the initial navigation because
	        // it's just reflecting the url
	        if (isPush) {
	            // on the initial navigation, we want to reuse the scroll position from
	            // history state if it exists
	            if (replace || isFirstNavigation)
	                routerHistory.replace(toLocation.fullPath, assign({
	                    scroll: isFirstNavigation && state && state.scroll,
	                }, data));
	            else
	                routerHistory.push(toLocation.fullPath, data);
	        }
	        // accept current navigation
	        currentRoute.value = toLocation;
	        handleScroll();
	        markAsReady();
	    }
	    let removeHistoryListener;
	    // attach listener to history to trigger navigations
	    function setupListeners() {
	        // avoid setting up listeners twice due to an invalid first navigation
	        if (removeHistoryListener)
	            return;
	        removeHistoryListener = routerHistory.listen((to, _from, info) => {
	            if (!router.listening)
	                return;
	            // cannot be a redirect route because it was in history
	            const toLocation = resolve(to);
	            // due to dynamic routing, and to hash history with manual navigation
	            // (manually changing the url or calling history.hash = '#/somewhere'),
	            // there could be a redirect record in history
	            const shouldRedirect = handleRedirectRecord(toLocation);
	            if (shouldRedirect) {
	                pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
	                return;
	            }
	            pendingLocation = toLocation;
	            const from = currentRoute.value;
	            navigate(toLocation, from)
	                .catch((error) => {
	                if (isNavigationFailure(error, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
	                    return error;
	                }
	                if (isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
	                    // Here we could call if (info.delta) routerHistory.go(-info.delta,
	                    // false) but this is bug prone as we have no way to wait the
	                    // navigation to be finished before calling pushWithRedirect. Using
	                    // a setTimeout of 16ms seems to work but there is not guarantee for
	                    // it to work on every browser. So Instead we do not restore the
	                    // history entry and trigger a new navigation as requested by the
	                    // navigation guard.
	                    // the error is already handled by router.push we just want to avoid
	                    // logging the error
	                    pushWithRedirect(error.to, toLocation
	                    // avoid an uncaught rejection, let push call triggerError
	                    )
	                        .then(failure => {
	                        // manual change in hash history #916 ending up in the URL not
	                        // changing but it was changed by the manual url change, so we
	                        // need to manually change it ourselves
	                        if (isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ |
	                            16 /* ErrorTypes.NAVIGATION_DUPLICATED */) &&
	                            !info.delta &&
	                            info.type === NavigationType.pop) {
	                            routerHistory.go(-1, false);
	                        }
	                    })
	                        .catch(noop);
	                    // avoid the then branch
	                    return Promise.reject();
	                }
	                // do not restore history on unknown direction
	                if (info.delta)
	                    routerHistory.go(-info.delta, false);
	                // unrecognized error, transfer to the global handler
	                return triggerError(error, toLocation, from);
	            })
	                .then((failure) => {
	                failure =
	                    failure ||
	                        finalizeNavigation(
	                        // after navigation, all matched components are resolved
	                        toLocation, from, false);
	                // revert the navigation
	                if (failure) {
	                    if (info.delta) {
	                        routerHistory.go(-info.delta, false);
	                    }
	                    else if (info.type === NavigationType.pop &&
	                        isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 16 /* ErrorTypes.NAVIGATION_DUPLICATED */)) {
	                        // manual change in hash history #916
	                        // it's like a push but lacks the information of the direction
	                        routerHistory.go(-1, false);
	                    }
	                }
	                triggerAfterEach(toLocation, from, failure);
	            })
	                .catch(noop);
	        });
	    }
	    // Initialization and Errors
	    let readyHandlers = useCallbacks();
	    let errorHandlers = useCallbacks();
	    let ready;
	    /**
	     * Trigger errorHandlers added via onError and throws the error as well
	     *
	     * @param error - error to throw
	     * @param to - location we were navigating to when the error happened
	     * @param from - location we were navigating from when the error happened
	     * @returns the error as a rejected promise
	     */
	    function triggerError(error, to, from) {
	        markAsReady(error);
	        const list = errorHandlers.list();
	        if (list.length) {
	            list.forEach(handler => handler(error, to, from));
	        }
	        else {
	            console.error(error);
	        }
	        return Promise.reject(error);
	    }
	    function isReady() {
	        if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
	            return Promise.resolve();
	        return new Promise((resolve, reject) => {
	            readyHandlers.add([resolve, reject]);
	        });
	    }
	    function markAsReady(err) {
	        if (!ready) {
	            // still not ready if an error happened
	            ready = !err;
	            setupListeners();
	            readyHandlers
	                .list()
	                .forEach(([resolve, reject]) => (err ? reject(err) : resolve()));
	            readyHandlers.reset();
	        }
	        return err;
	    }
	    // Scroll behavior
	    function handleScroll(to, from, isPush, isFirstNavigation) {
	        return Promise.resolve();
	    }
	    const go = (delta) => routerHistory.go(delta);
	    const installedApps = new Set();
	    const router = {
	        currentRoute,
	        listening: true,
	        addRoute,
	        removeRoute,
	        hasRoute,
	        getRoutes,
	        resolve,
	        options,
	        push,
	        replace,
	        go,
	        back: () => go(-1),
	        forward: () => go(1),
	        beforeEach: beforeGuards.add,
	        beforeResolve: beforeResolveGuards.add,
	        afterEach: afterGuards.add,
	        onError: errorHandlers.add,
	        isReady,
	        install(app) {
	            const router = this;
	            app.component('RouterLink', RouterLink);
	            app.component('RouterView', RouterView);
	            app.config.globalProperties.$router = router;
	            Object.defineProperty(app.config.globalProperties, '$route', {
	                enumerable: true,
	                get: () => vue.unref(currentRoute),
	            });
	            const reactiveRoute = {};
	            for (const key in START_LOCATION_NORMALIZED) {
	                // @ts-expect-error: the key matches
	                reactiveRoute[key] = vue.computed(() => currentRoute.value[key]);
	            }
	            app.provide(routerKey, router);
	            app.provide(routeLocationKey, vue.reactive(reactiveRoute));
	            app.provide(routerViewLocationKey, currentRoute);
	            const unmountApp = app.unmount;
	            installedApps.add(app);
	            app.unmount = function () {
	                installedApps.delete(app);
	                // the router is not attached to an app anymore
	                if (installedApps.size < 1) {
	                    // invalidate the current navigation
	                    pendingLocation = START_LOCATION_NORMALIZED;
	                    removeHistoryListener && removeHistoryListener();
	                    removeHistoryListener = null;
	                    currentRoute.value = START_LOCATION_NORMALIZED;
	                    ready = false;
	                }
	                unmountApp();
	            };
	        },
	    };
	    return router;
	}
	function runGuardQueue(guards) {
	    return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
	}
	function extractChangingRecords(to, from) {
	    const leavingRecords = [];
	    const updatingRecords = [];
	    const enteringRecords = [];
	    const len = Math.max(from.matched.length, to.matched.length);
	    for (let i = 0; i < len; i++) {
	        const recordFrom = from.matched[i];
	        if (recordFrom) {
	            if (to.matched.find(record => isSameRouteRecord(record, recordFrom)))
	                updatingRecords.push(recordFrom);
	            else
	                leavingRecords.push(recordFrom);
	        }
	        const recordTo = to.matched[i];
	        if (recordTo) {
	            // the type doesn't matter because we are comparing per reference
	            if (!from.matched.find(record => isSameRouteRecord(record, recordTo))) {
	                enteringRecords.push(recordTo);
	            }
	        }
	    }
	    return [leavingRecords, updatingRecords, enteringRecords];
	}

	/**
	 * Returns the router instance. Equivalent to using `$router` inside
	 * templates.
	 */
	function useRouter() {
	    return vue.inject(routerKey);
	}
	/**
	 * Returns the current route location. Equivalent to using `$route` inside
	 * templates.
	 */
	function useRoute() {
	    return vue.inject(routeLocationKey);
	}

	exports.RouterLink = RouterLink;
	exports.RouterView = RouterView;
	exports.START_LOCATION = START_LOCATION_NORMALIZED;
	exports.createMemoryHistory = createMemoryHistory;
	exports.createRouter = createRouter;
	exports.createRouterMatcher = createRouterMatcher;
	exports.createWebHashHistory = createWebHashHistory;
	exports.createWebHistory = createWebHistory;
	exports.isNavigationFailure = isNavigationFailure;
	exports.loadRouteLocation = loadRouteLocation;
	exports.matchedRouteKey = matchedRouteKey;
	exports.onBeforeRouteLeave = onBeforeRouteLeave;
	exports.onBeforeRouteUpdate = onBeforeRouteUpdate;
	exports.parseQuery = parseQuery;
	exports.routeLocationKey = routeLocationKey;
	exports.routerKey = routerKey;
	exports.routerViewLocationKey = routerViewLocationKey;
	exports.stringifyQuery = stringifyQuery;
	exports.useLink = useLink;
	exports.useRoute = useRoute;
	exports.useRouter = useRouter;
	exports.viewDepthKey = viewDepthKey;
} (vueRouter_prod));

const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^["{[]|^-?[0-9][0-9.]{0,14}$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor") {
    return;
  }
  return value;
}
function destr(val) {
  if (typeof val !== "string") {
    return val;
  }
  const _lval = val.toLowerCase();
  if (_lval === "true") {
    return true;
  }
  if (_lval === "false") {
    return false;
  }
  if (_lval === "null") {
    return null;
  }
  if (_lval === "nan") {
    return NaN;
  }
  if (_lval === "infinity") {
    return Infinity;
  }
  if (_lval === "undefined") {
    return void 0;
  }
  if (!JsonSigRx.test(val)) {
    return val;
  }
  try {
    if (suspectProtoRx.test(val) || suspectConstructorRx.test(val)) {
      return JSON.parse(val, jsonParseTransform);
    }
    return JSON.parse(val);
  } catch (_e) {
    return val;
  }
}
class FetchError extends Error {
  constructor() {
    super(...arguments);
    this.name = "FetchError";
  }
}
function createFetchError(request, error, response) {
  let message = "";
  if (request && response) {
    message = `${response.status} ${response.statusText} (${request.toString()})`;
  }
  if (error) {
    message = `${error.message} (${message})`;
  }
  const fetchError = new FetchError(message);
  Object.defineProperty(fetchError, "request", { get() {
    return request;
  } });
  Object.defineProperty(fetchError, "response", { get() {
    return response;
  } });
  Object.defineProperty(fetchError, "data", { get() {
    return response && response._data;
  } });
  return fetchError;
}
const payloadMethods = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(val) {
  if (val === void 0) {
    return false;
  }
  const t = typeof val;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(val)) {
    return true;
  }
  return val.constructor && val.constructor.name === "Object" || typeof val.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*`\-.^~]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift();
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  409,
  425,
  429,
  500,
  502,
  503,
  504
]);
function createFetch(globalOptions) {
  const { fetch: fetch2, Headers: Headers2 } = globalOptions;
  function onError(ctx) {
    if (ctx.options.retry !== false) {
      const retries = typeof ctx.options.retry === "number" ? ctx.options.retry : isPayloadMethod(ctx.options.method) ? 0 : 1;
      const responseCode = ctx.response && ctx.response.status || 500;
      if (retries > 0 && retryStatusCodes.has(responseCode)) {
        return $fetchRaw(ctx.request, {
          ...ctx.options,
          retry: retries - 1
        });
      }
    }
    const err = createFetchError(ctx.request, ctx.error, ctx.response);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(err, $fetchRaw);
    }
    throw err;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _opts = {}) {
    const ctx = {
      request: _request,
      options: { ...globalOptions.defaults, ..._opts },
      response: void 0,
      error: void 0
    };
    if (ctx.options.onRequest) {
      await ctx.options.onRequest(ctx);
    }
    if (typeof ctx.request === "string") {
      if (ctx.options.baseURL) {
        ctx.request = withBase(ctx.request, ctx.options.baseURL);
      }
      if (ctx.options.params) {
        ctx.request = withQuery(ctx.request, ctx.options.params);
      }
      if (ctx.options.body && isPayloadMethod(ctx.options.method)) {
        if (isJSONSerializable(ctx.options.body)) {
          ctx.options.body = typeof ctx.options.body === "string" ? ctx.options.body : JSON.stringify(ctx.options.body);
          ctx.options.headers = new Headers2(ctx.options.headers);
          if (!ctx.options.headers.has("content-type")) {
            ctx.options.headers.set("content-type", "application/json");
          }
          if (!ctx.options.headers.has("accept")) {
            ctx.options.headers.set("accept", "application/json");
          }
        }
      }
    }
    ctx.response = await fetch2(ctx.request, ctx.options).catch(async (error) => {
      ctx.error = error;
      if (ctx.options.onRequestError) {
        await ctx.options.onRequestError(ctx);
      }
      return onError(ctx);
    });
    const responseType = (ctx.options.parseResponse ? "json" : ctx.options.responseType) || detectResponseType(ctx.response.headers.get("content-type") || "");
    if (responseType === "json") {
      const data = await ctx.response.text();
      const parseFn = ctx.options.parseResponse || destr;
      ctx.response._data = parseFn(data);
    } else {
      ctx.response._data = await ctx.response[responseType]();
    }
    if (ctx.options.onResponse) {
      await ctx.options.onResponse(ctx);
    }
    if (!ctx.response.ok) {
      if (ctx.options.onResponseError) {
        await ctx.options.onResponseError(ctx);
      }
    }
    return ctx.response.ok ? ctx.response : onError(ctx);
  };
  const $fetch2 = function $fetch22(request, opts) {
    return $fetchRaw(request, opts).then((r) => r._data);
  };
  $fetch2.raw = $fetchRaw;
  $fetch2.create = (defaultOptions = {}) => createFetch({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch2;
}
const _globalThis$2 = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
const fetch = _globalThis$2.fetch || (() => Promise.reject(new Error("[ohmyfetch] global.fetch is not supported!")));
const Headers = _globalThis$2.Headers;
const $fetch = createFetch({ fetch, Headers });
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
function serialCaller(hooks, args) {
  return hooks.reduce((promise, hookFn) => promise.then(() => hookFn.apply(void 0, args)), Promise.resolve(null));
}
function parallelCaller(hooks, args) {
  return Promise.all(hooks.map((hook) => hook.apply(void 0, args)));
}
class Hookable {
  constructor() {
    this._hooks = {};
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, fn) {
    if (!name || typeof fn !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let deprecatedHookObj;
    while (this._deprecatedHooks[name]) {
      const deprecatedHook = this._deprecatedHooks[name];
      if (typeof deprecatedHook === "string") {
        deprecatedHookObj = { to: deprecatedHook };
      } else {
        deprecatedHookObj = deprecatedHook;
      }
      name = deprecatedHookObj.to;
    }
    if (deprecatedHookObj) {
      if (!deprecatedHookObj.message) {
        console.warn(`${originalName} hook has been deprecated` + (deprecatedHookObj.to ? `, please use ${deprecatedHookObj.to}` : ""));
      } else {
        console.warn(deprecatedHookObj.message);
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(fn);
    return () => {
      if (fn) {
        this.removeHook(name, fn);
        fn = null;
      }
    };
  }
  hookOnce(name, fn) {
    let _unreg;
    let _fn = (...args) => {
      _unreg();
      _unreg = null;
      _fn = null;
      return fn(...args);
    };
    _unreg = this.hook(name, _fn);
    return _unreg;
  }
  removeHook(name, fn) {
    if (this._hooks[name]) {
      const idx = this._hooks[name].indexOf(fn);
      if (idx !== -1) {
        this._hooks[name].splice(idx, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = deprecated;
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
    return () => {
      removeFns.splice(0, removeFns.length).forEach((unreg) => unreg());
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  callHook(name, ...args) {
    return serialCaller(this._hooks[name] || [], args);
  }
  callHookParallel(name, ...args) {
    return parallelCaller(this._hooks[name] || [], args);
  }
  callHookWith(caller, name, ...args) {
    return caller(this._hooks[name] || [], args);
  }
}
function createHooks() {
  return new Hookable();
}
function createContext() {
  let currentInstance = null;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  return {
    use: () => currentInstance,
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = null;
      isSingleton = false;
    },
    call: (instance, cb) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return cb();
      } finally {
        if (!isSingleton) {
          currentInstance = null;
        }
      }
    },
    async callAsync(instance, cb) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = cb();
        if (!isSingleton) {
          currentInstance = null;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace() {
  const contexts = {};
  return {
    get(key) {
      if (!contexts[key]) {
        contexts[key] = createContext();
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$1 = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey$1] || (_globalThis$1[globalKey$1] = createNamespace());
const getContext = (key) => defaultNamespace.get(key);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis$1[asyncHandlersKey] || (_globalThis$1[asyncHandlersKey] = /* @__PURE__ */ new Set());
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: vue_cjs_prod.reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    _asyncDataPromises: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  if (nuxtApp.ssrContext) {
    nuxtApp.ssrContext.nuxt = nuxtApp;
  }
  {
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    nuxtApp.ssrContext.payload = nuxtApp.payload;
  }
  {
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.use();
  if (!nuxtAppInstance) {
    const vm = vue_cjs_prod.getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const wrapInRef = (value) => vue_cjs_prod.isRef(value) ? value : vue_cjs_prod.ref(value);
const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  if (options.defer) {
    console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC.");
  }
  options.lazy = (_d = (_c = options.lazy) != null ? _c : options.defer) != null ? _d : false;
  options.initialCache = (_e = options.initialCache) != null ? _e : true;
  const nuxt = useNuxtApp();
  const instance = vue_cjs_prod.getCurrentInstance();
  if (instance && !instance._nuxtOnBeforeMountCbs) {
    const cbs = instance._nuxtOnBeforeMountCbs = [];
    if (instance && false) {
      vue_cjs_prod.onUnmounted(() => cbs.splice(0, cbs.length));
    }
  }
  const useInitialCache = () => options.initialCache && nuxt.payload.data[key] !== void 0;
  const asyncData = {
    data: wrapInRef((_f = nuxt.payload.data[key]) != null ? _f : options.default()),
    pending: vue_cjs_prod.ref(!useInitialCache()),
    error: vue_cjs_prod.ref((_g = nuxt.payload._errors[key]) != null ? _g : null)
  };
  asyncData.refresh = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      return nuxt._asyncDataPromises[key];
    }
    if (opts._initial && useInitialCache()) {
      return nuxt.payload.data[key];
    }
    asyncData.pending.value = true;
    nuxt._asyncDataPromises[key] = Promise.resolve(handler(nuxt)).then((result) => {
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      asyncData.error.value = error;
      asyncData.data.value = vue_cjs_prod.unref(options.default());
    }).finally(() => {
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = true;
      }
      delete nuxt._asyncDataPromises[key];
    });
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer) {
    const promise = initialFetch();
    vue_cjs_prod.onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = vue_cjs_prod.toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (vue_cjs_prod.isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useError = () => {
  const nuxtApp = useNuxtApp();
  return useState("error", () => nuxtApp.ssrContext.error, "$bWWAMK0bSA");
};
const throwError = (_err) => {
  const nuxtApp = useNuxtApp();
  useError();
  const err = typeof _err === "string" ? new Error(_err) : _err;
  nuxtApp.callHook("app:error", err);
  {
    nuxtApp.ssrContext.error = nuxtApp.ssrContext.error || err;
  }
  return err;
};
const MIMES = {
  html: "text/html",
  json: "application/json"
};
const defer = typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      event.res.end(data);
      resolve(void 0);
    });
  });
}
function defaultContentType(event, type) {
  if (type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.res.statusCode = code;
  event.res.setHeader("Location", location);
  return send(event, "Redirecting to " + location, MIMES.html);
}
class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.fatal = false;
    this.unhandled = false;
    this.statusMessage = "Internal Server Error";
  }
}
H3Error.__h3_error__ = true;
function createError(input) {
  var _a;
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error((_a = input.message) != null ? _a : input.statusMessage, input.cause ? { cause: input.cause } : void 0);
  if (input.statusCode) {
    err.statusCode = input.statusCode;
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  var _a;
  return ((_a = input == null ? void 0 : input.constructor) == null ? void 0 : _a.__h3_error__) === true;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  return useNuxtApp()._route;
};
const navigateTo = (to, options = {}) => {
  if (!to) {
    to = "/";
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, options.redirectCode || 302));
    }
  }
  return options.replace ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return vue_cjs_prod.defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = vue_cjs_prod.computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = vue_cjs_prod.computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      return () => {
        var _a, _b, _c;
        if (!isExternal.value) {
          return vue_cjs_prod.h(vue_cjs_prod.resolveComponent("RouterLink"), {
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          }, slots.default);
        }
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return vue_cjs_prod.h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$2 = defineNuxtLink({ componentName: "NuxtLink" });
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var shared_cjs_prod = {};
Object.defineProperty(shared_cjs_prod, "__esModule", { value: true });
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const PatchFlagNames = {
  [1]: `TEXT`,
  [2]: `CLASS`,
  [4]: `STYLE`,
  [8]: `PROPS`,
  [16]: `FULL_PROPS`,
  [32]: `HYDRATE_EVENTS`,
  [64]: `STABLE_FRAGMENT`,
  [128]: `KEYED_FRAGMENT`,
  [256]: `UNKEYED_FRAGMENT`,
  [512]: `NEED_PATCH`,
  [1024]: `DYNAMIC_SLOTS`,
  [2048]: `DEV_ROOT_FRAGMENT`,
  [-1]: `HOISTED`,
  [-2]: `BAIL`
};
const slotFlagsText = {
  [1]: "STABLE",
  [2]: "DYNAMIC",
  [3]: "FORWARDED"
};
const GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
const isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  let lines = source.split(/(\r?\n)/);
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
        if (j === i) {
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + newLineSeqLength;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString$1(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString$1(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString$1(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html2 = "";
  let escaped;
  let index;
  let lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html2 += str.slice(lastIndex, index);
    }
    lastIndex = index + 1;
    html2 += escaped;
  }
  return lastIndex !== index ? html2 + str.slice(lastIndex, index) : html2;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject$1(a);
  bValidType = isObject$1(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return isString$1(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
};
const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
function genPropsAccessExp(name) {
  return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
}
shared_cjs_prod.EMPTY_ARR = EMPTY_ARR;
shared_cjs_prod.EMPTY_OBJ = EMPTY_OBJ;
shared_cjs_prod.NO = NO;
shared_cjs_prod.NOOP = NOOP;
shared_cjs_prod.PatchFlagNames = PatchFlagNames;
shared_cjs_prod.camelize = camelize;
shared_cjs_prod.capitalize = capitalize;
shared_cjs_prod.def = def;
shared_cjs_prod.escapeHtml = escapeHtml;
shared_cjs_prod.escapeHtmlComment = escapeHtmlComment;
shared_cjs_prod.extend = extend;
shared_cjs_prod.genPropsAccessExp = genPropsAccessExp;
shared_cjs_prod.generateCodeFrame = generateCodeFrame;
shared_cjs_prod.getGlobalThis = getGlobalThis;
shared_cjs_prod.hasChanged = hasChanged;
shared_cjs_prod.hasOwn = hasOwn;
shared_cjs_prod.hyphenate = hyphenate;
shared_cjs_prod.includeBooleanAttr = includeBooleanAttr;
shared_cjs_prod.invokeArrayFns = invokeArrayFns;
shared_cjs_prod.isArray = isArray;
shared_cjs_prod.isBooleanAttr = isBooleanAttr;
shared_cjs_prod.isBuiltInDirective = isBuiltInDirective;
shared_cjs_prod.isDate = isDate;
var isFunction_1 = shared_cjs_prod.isFunction = isFunction$1;
shared_cjs_prod.isGloballyWhitelisted = isGloballyWhitelisted;
shared_cjs_prod.isHTMLTag = isHTMLTag;
shared_cjs_prod.isIntegerKey = isIntegerKey;
shared_cjs_prod.isKnownHtmlAttr = isKnownHtmlAttr;
shared_cjs_prod.isKnownSvgAttr = isKnownSvgAttr;
shared_cjs_prod.isMap = isMap;
shared_cjs_prod.isModelListener = isModelListener;
shared_cjs_prod.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
shared_cjs_prod.isObject = isObject$1;
shared_cjs_prod.isOn = isOn;
shared_cjs_prod.isPlainObject = isPlainObject;
shared_cjs_prod.isPromise = isPromise;
shared_cjs_prod.isReservedProp = isReservedProp;
shared_cjs_prod.isSSRSafeAttrName = isSSRSafeAttrName;
shared_cjs_prod.isSVGTag = isSVGTag;
shared_cjs_prod.isSet = isSet;
shared_cjs_prod.isSpecialBooleanAttr = isSpecialBooleanAttr;
shared_cjs_prod.isString = isString$1;
shared_cjs_prod.isSymbol = isSymbol;
shared_cjs_prod.isVoidTag = isVoidTag;
shared_cjs_prod.looseEqual = looseEqual;
shared_cjs_prod.looseIndexOf = looseIndexOf;
shared_cjs_prod.makeMap = makeMap;
shared_cjs_prod.normalizeClass = normalizeClass;
shared_cjs_prod.normalizeProps = normalizeProps;
shared_cjs_prod.normalizeStyle = normalizeStyle;
shared_cjs_prod.objectToString = objectToString;
shared_cjs_prod.parseStringStyle = parseStringStyle;
shared_cjs_prod.propsToAttrMap = propsToAttrMap;
shared_cjs_prod.remove = remove;
shared_cjs_prod.slotFlagsText = slotFlagsText;
shared_cjs_prod.stringifyStyle = stringifyStyle;
shared_cjs_prod.toDisplayString = toDisplayString;
shared_cjs_prod.toHandlerKey = toHandlerKey;
shared_cjs_prod.toNumber = toNumber;
shared_cjs_prod.toRawType = toRawType;
shared_cjs_prod.toTypeString = toTypeString;
function useHead(meta2) {
  const resolvedMeta = isFunction_1(meta2) ? vue_cjs_prod.computed(meta2) : meta2;
  useNuxtApp()._useHead(resolvedMeta);
}
const preload = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    beforeCreate() {
      const { _registeredComponents } = this.$nuxt.ssrContext;
      const { __moduleIdentifier } = this.$options;
      _registeredComponents.add(__moduleIdentifier);
    }
  });
});
const components = {};
const _47Users_47huancaibingxi_47Downloads_47_21069_31471_25972_21512_47Nuxt3_47nuxt3_45web_45juejin_47_46nuxt_47components_46plugin_46mjs = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var createElement = (tag, attrs, document2) => {
  const el = document2.createElement(tag);
  for (const key of Object.keys(attrs)) {
    let value = attrs[key];
    if (key === "key" || value === false) {
      continue;
    }
    if (key === "children") {
      el.textContent = value;
    } else {
      el.setAttribute(key, value);
    }
  }
  return el;
};
var htmlEscape = (str) => str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = htmlEscape(key);
    if (value !== true) {
      attribute += `="${htmlEscape(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var getTagKey = (props) => {
  const names = ["key", "id", "name", "property"];
  for (const n of names) {
    const value = typeof props.getAttribute === "function" ? props.hasAttribute(n) ? props.getAttribute(n) : void 0 : props[n];
    if (value !== void 0) {
      return { name: n, value };
    }
  }
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "htmlAttrs",
  "bodyAttrs"
];
var headObjToTags = (obj) => {
  const tags = [];
  for (const key of Object.keys(obj)) {
    if (obj[key] == null)
      continue;
    if (key === "title") {
      tags.push({ tag: key, props: { children: obj[key] } });
    } else if (key === "base") {
      tags.push({ tag: key, props: __spreadValues({ key: "default" }, obj[key]) });
    } else if (acceptFields.includes(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          tags.push({ tag: key, props: item });
        });
      } else if (value) {
        tags.push({ tag: key, props: value });
      }
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a;
  const head = document2.head;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldElements = [];
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_a = j == null ? void 0 : j.tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldElements.push(j);
      }
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => createElement(tag.tag, tag.props, document2));
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldElements.length; i++) {
      const oldEl = oldElements[i];
      if (isEqualNode(oldEl, newEl)) {
        oldElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    head.insertBefore(t, headCountEl);
  });
  headCountEl.setAttribute("content", "" + (headCount - oldElements.length + newElements.length));
};
var createHead = () => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      allHeadObjs.forEach((objs) => {
        const tags = headObjToTags(objs.value);
        tags.forEach((tag) => {
          if (tag.tag === "meta" || tag.tag === "base" || tag.tag === "script") {
            const key = getTagKey(tag.props);
            if (key) {
              let index = -1;
              for (let i = 0; i < deduped.length; i++) {
                const prev = deduped[i];
                const prevValue = prev.props[key.name];
                const nextValue = tag.props[key.name];
                if (prev.tag === tag.tag && prevValue === nextValue) {
                  index = i;
                  break;
                }
              }
              if (index !== -1) {
                deduped.splice(index, 1);
              }
            }
          }
          deduped.push(tag);
        });
      });
      return deduped;
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document2 = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document2.title = title;
      }
      setAttrs(document2.documentElement, htmlAttrs);
      setAttrs(document2.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document2, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}>`;
  }
  return `<${tag.tag}${attrs}>${tag.props.children || ""}</${tag.tag}>`;
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  for (const tag of head.headTags) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, htmlAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      }));
    },
    get bodyAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, bodyAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      }));
    }
  };
};
function isObject(val) {
  return val !== null && typeof val === "object";
}
function _defu(baseObj, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObj, {}, namespace, merger);
  }
  const obj = Object.assign({}, defaults);
  for (const key in baseObj) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const val = baseObj[key];
    if (val === null || val === void 0) {
      continue;
    }
    if (merger && merger(obj, key, val, namespace)) {
      continue;
    }
    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = val.concat(obj[key]);
    } else if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      obj[key] = val;
    }
  }
  return obj;
}
function createDefu(merger) {
  return (...args) => args.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defu = createDefu();
const _47Users_47huancaibingxi_47Downloads_47_21069_31471_25972_21512_47Nuxt3_47nuxt3_45web_45juejin_47node_modules_47nuxt_47dist_47head_47runtime_47lib_47vueuse_45head_46plugin = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    vue_cjs_prod.watchEffect(() => {
      head.updateDOM();
    });
  });
  const titleTemplate = vue_cjs_prod.ref();
  nuxtApp._useHead = (_meta) => {
    const meta2 = vue_cjs_prod.ref(_meta);
    if ("titleTemplate" in meta2.value) {
      titleTemplate.value = meta2.value.titleTemplate;
    }
    const headObj = vue_cjs_prod.computed(() => {
      const overrides = { meta: [] };
      if (titleTemplate.value && "title" in meta2.value) {
        overrides.title = typeof titleTemplate.value === "function" ? titleTemplate.value(meta2.value.title) : titleTemplate.value.replace(/%s/g, meta2.value.title);
      }
      if (meta2.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta2.value.charset });
      }
      if (meta2.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta2.value.viewport });
      }
      return defu(overrides, meta2.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => renderHeadToString(head);
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = vue_cjs_prod.defineComponent({
  name: "Script",
  inheritAttrs: false,
  props: {
    ...globalProps,
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  },
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const Link = vue_cjs_prod.defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = vue_cjs_prod.defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = vue_cjs_prod.defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = vue_cjs_prod.defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  },
  setup: setupForUseMeta((meta2) => ({
    meta: [meta2]
  }))
});
const Style = vue_cjs_prod.defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = vue_cjs_prod.defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = vue_cjs_prod.defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = vue_cjs_prod.defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
const metaConfig = { "globalMeta": { "charset": "utf-8", "viewport": "width=device-width, initial-scale=1", "meta": [], "link": [], "style": [], "script": [] } };
const metaMixin = {
  created() {
    const instance = vue_cjs_prod.getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? vue_cjs_prod.computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const _47Users_47huancaibingxi_47Downloads_47_21069_31471_25972_21512_47Nuxt3_47nuxt3_45web_45juejin_47node_modules_47nuxt_47dist_47head_47runtime_47plugin = defineNuxtPlugin((nuxtApp) => {
  useHead(vue_cjs_prod.markRaw({ title: "", ...metaConfig.globalMeta }));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => m.components.default === routeProps.Component.type);
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = {
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
};
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? vue_cjs_prod.h(component, props === true ? {} : props, slots) : vue_cjs_prod.h(Fragment, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = vue_cjs_prod.defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    const isNested = vue_cjs_prod.inject(isNestedKey, false);
    vue_cjs_prod.provide(isNestedKey, true);
    return () => {
      return vue_cjs_prod.h(vueRouter_prod.RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a;
          return routeProps.Component && _wrapIf(vue_cjs_prod.Transition, (_a = routeProps.route.meta.pageTransition) != null ? _a : defaultPageTransition, wrapInKeepAlive(routeProps.route.meta.keepalive, isNested && nuxtApp.isHydrating ? vue_cjs_prod.h(routeProps.Component, { key: generateRouteKey(props.pageKey, routeProps) }) : vue_cjs_prod.h(vue_cjs_prod.Suspense, {
            onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
            onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
          }, { default: () => vue_cjs_prod.h(routeProps.Component, { key: generateRouteKey(props.pageKey, routeProps) }) }))).default();
        }
      });
    };
  }
});
const defaultPageTransition = { name: "page", mode: "out-in" };
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const meta$i = void 0;
const meta$h = void 0;
const meta$g = void 0;
const meta$f = void 0;
const meta$e = void 0;
const meta$d = void 0;
const meta$c = void 0;
const meta$b = void 0;
const meta$a = void 0;
const meta$9 = void 0;
const meta$8 = void 0;
const _sfc_main$n = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    navigateTo("/main");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-309d9110></div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const meta$7 = void 0;
const meta$6 = void 0;
const useDirceortyStore = defineStore("useDirceortyStore", {
  state: () => {
    return {
      value: []
    };
  },
  actions: {
    pushNewItem(item) {
      this.value.push(item);
    },
    updateItem(id, TopLength) {
      if (this.value.find((item) => id === item.id) !== void 0) {
        this.value.find((item) => id === item.id).TopLength = TopLength;
      }
    }
  }
});
const isFunction = (val) => typeof val === "function";
const isNumber = (val) => typeof val === "number";
const isString = (val) => typeof val === "string";
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const noop = () => {
};
function identity(arg) {
  return arg;
}
function tryOnScopeDispose(fn) {
  if (vue_cjs_prod.getCurrentScope()) {
    vue_cjs_prod.onScopeDispose(fn);
    return true;
  }
  return false;
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = vue_cjs_prod.ref(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, vue_cjs_prod.unref(interval));
  }
  if (immediate) {
    isPending.value = true;
  }
  tryOnScopeDispose(stop);
  return {
    isPending,
    start,
    stop
  };
}
function unrefElement(elRef) {
  var _a;
  const plain = vue_cjs_prod.unref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop;
  let cleanup = noop;
  const stopWatch = vue_cjs_prod.watch(() => unrefElement(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore, capture = true, detectIframe = false } = options;
  if (!window2)
    return;
  const shouldListen = vue_cjs_prod.ref(true);
  let fallback;
  const listener = (event) => {
    window2.clearTimeout(fallback);
    const el = unrefElement(target);
    const composedPath = event.composedPath();
    if (!el || el === event.target || composedPath.includes(el) || !shouldListen.value)
      return;
    if (ignore && ignore.length > 0) {
      if (ignore.some((target2) => {
        const el2 = unrefElement(target2);
        return el2 && (event.target === el2 || composedPath.includes(el2));
      }))
        return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window2, "click", listener, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen.value = !!el && !e.composedPath().includes(el);
    }, { passive: true }),
    useEventListener(window2, "pointerup", (e) => {
      if (e.button === 0) {
        const path2 = e.composedPath();
        e.composedPath = () => path2;
        fallback = window2.setTimeout(() => listener(e), 50);
      }
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      var _a;
      const el = unrefElement(target);
      if (((_a = document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(document.activeElement)))
        handler(event);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
_global[globalKey];
var __getOwnPropSymbols$e = Object.getOwnPropertySymbols;
var __hasOwnProp$e = Object.prototype.hasOwnProperty;
var __propIsEnum$e = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$e.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$e)
    for (var prop of __getOwnPropSymbols$e(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$e.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a = options, { window: window2 = defaultWindow } = _a, observerOptions = __objRest$2(_a, ["window"]);
  let observer;
  const isSupported = window2 && "ResizeObserver" in window2;
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = vue_cjs_prod.watch(() => unrefElement(target), (el) => {
    cleanup();
    if (isSupported && window2 && el) {
      observer = new ResizeObserver(callback);
      observer.observe(el, observerOptions);
    }
  }, { immediate: true, flush: "post" });
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    window: window2 = defaultWindow
  } = options;
  const isActive = vue_cjs_prod.ref(false);
  let rafId = null;
  function loop() {
    if (!isActive.value || !window2)
      return;
    fn();
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      loop();
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}
function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const width = vue_cjs_prod.ref(initialSize.width);
  const height = vue_cjs_prod.ref(initialSize.height);
  useResizeObserver(target, ([entry2]) => {
    width.value = entry2.contentRect.width;
    height.value = entry2.contentRect.height;
  }, options);
  vue_cjs_prod.watch(() => unrefElement(target), (ele) => {
    width.value = ele ? initialSize.width : 0;
    height.value = ele ? initialSize.height : 0;
  });
  return {
    width,
    height
  };
}
function useIntersectionObserver(target, callback, options = {}) {
  const {
    root,
    rootMargin = "0px",
    threshold = 0.1,
    window: window2 = defaultWindow
  } = options;
  const isSupported = window2 && "IntersectionObserver" in window2;
  let cleanup = noop;
  const stopWatch = isSupported ? vue_cjs_prod.watch(() => ({
    el: unrefElement(target),
    root: unrefElement(root)
  }), ({ el, root: root2 }) => {
    cleanup();
    if (!el)
      return;
    const observer = new IntersectionObserver(callback, {
      root: root2,
      rootMargin,
      threshold
    });
    observer.observe(el);
    cleanup = () => {
      observer.disconnect();
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" }) : noop;
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
const TransitionPresets = {
  linear: identity,
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
function createEasingFunction([p0, p1, p2, p3]) {
  const a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
  const b = (a1, a2) => 3 * a2 - 6 * a1;
  const c = (a1) => 3 * a1;
  const calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
  const getSlope = (t, a1, a2) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
  const getTforX = (x) => {
    let aGuessT = x;
    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, p0, p2);
      if (currentSlope === 0)
        return aGuessT;
      const currentX = calcBezier(aGuessT, p0, p2) - x;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  };
  return (x) => p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3);
}
function useTransition(source, options = {}) {
  const {
    delay = 0,
    disabled = false,
    duration = 1e3,
    onFinished = noop,
    onStarted = noop,
    transition = identity
  } = options;
  const currentTransition = vue_cjs_prod.computed(() => {
    const t = vue_cjs_prod.unref(transition);
    return isFunction(t) ? t : createEasingFunction(t);
  });
  const sourceValue = vue_cjs_prod.computed(() => {
    const s = vue_cjs_prod.unref(source);
    return isNumber(s) ? s : s.map(vue_cjs_prod.unref);
  });
  const sourceVector = vue_cjs_prod.computed(() => isNumber(sourceValue.value) ? [sourceValue.value] : sourceValue.value);
  const outputVector = vue_cjs_prod.ref(sourceVector.value.slice(0));
  let currentDuration;
  let diffVector;
  let endAt;
  let startAt;
  let startVector;
  const { resume, pause } = useRafFn(() => {
    const now = Date.now();
    const progress = clamp(1 - (endAt - now) / currentDuration, 0, 1);
    outputVector.value = startVector.map((val, i) => {
      var _a;
      return val + ((_a = diffVector[i]) != null ? _a : 0) * currentTransition.value(progress);
    });
    if (progress >= 1) {
      pause();
      onFinished();
    }
  }, { immediate: false });
  const start = () => {
    pause();
    currentDuration = vue_cjs_prod.unref(duration);
    diffVector = outputVector.value.map((n, i) => {
      var _a, _b;
      return ((_a = sourceVector.value[i]) != null ? _a : 0) - ((_b = outputVector.value[i]) != null ? _b : 0);
    });
    startVector = outputVector.value.slice(0);
    startAt = Date.now();
    endAt = startAt + currentDuration;
    resume();
    onStarted();
  };
  const timeout = useTimeoutFn(start, delay, { immediate: false });
  vue_cjs_prod.watch(sourceVector, () => {
    if (vue_cjs_prod.unref(disabled)) {
      outputVector.value = sourceVector.value.slice(0);
    } else {
      if (vue_cjs_prod.unref(delay) <= 0)
        start();
      else
        timeout.start();
    }
  }, { deep: true });
  return vue_cjs_prod.computed(() => {
    const targetVector = vue_cjs_prod.unref(disabled) ? sourceVector : outputVector;
    return isNumber(sourceValue.value) ? targetVector.value[0] : targetVector.value;
  });
}
function useVirtualList(list, options) {
  const containerRef = vue_cjs_prod.ref();
  const size = useElementSize(containerRef);
  const currentList = vue_cjs_prod.ref([]);
  const source = vue_cjs_prod.shallowRef(list);
  const state = vue_cjs_prod.ref({ start: 0, end: 10 });
  const { itemHeight, overscan = 5 } = options;
  const getViewCapacity = (containerHeight) => {
    if (typeof itemHeight === "number")
      return Math.ceil(containerHeight / itemHeight);
    const { start = 0 } = state.value;
    let sum = 0;
    let capacity = 0;
    for (let i = start; i < source.value.length; i++) {
      const height = itemHeight(i);
      sum += height;
      if (sum >= containerHeight) {
        capacity = i;
        break;
      }
    }
    return capacity - start;
  };
  const getOffset = (scrollTop) => {
    if (typeof itemHeight === "number")
      return Math.floor(scrollTop / itemHeight) + 1;
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < source.value.length; i++) {
      const height = itemHeight(i);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };
  const calculateRange = () => {
    const element = containerRef.value;
    if (element) {
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);
      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length ? source.value.length : to
      };
      currentList.value = source.value.slice(state.value.start, state.value.end).map((ele, index) => ({
        data: ele,
        index: index + state.value.start
      }));
    }
  };
  vue_cjs_prod.watch([size.width, size.height, list], () => {
    calculateRange();
  });
  const totalHeight = vue_cjs_prod.computed(() => {
    if (typeof itemHeight === "number")
      return source.value.length * itemHeight;
    return source.value.reduce((sum, _, index) => sum + itemHeight(index), 0);
  });
  const getDistanceTop = (index) => {
    if (typeof itemHeight === "number") {
      const height2 = index * itemHeight;
      return height2;
    }
    const height = source.value.slice(0, index).reduce((sum, _, i) => sum + itemHeight(i), 0);
    return height;
  };
  const scrollTo = (index) => {
    if (containerRef.value) {
      containerRef.value.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };
  const offsetTop = vue_cjs_prod.computed(() => getDistanceTop(state.value.start));
  const wrapperProps = vue_cjs_prod.computed(() => {
    return {
      style: {
        width: "100%",
        height: `${totalHeight.value - offsetTop.value}px`,
        marginTop: `${offsetTop.value}px`
      }
    };
  });
  const containerStyle = { overflowY: "auto" };
  return {
    list: currentList,
    scrollTo,
    containerProps: {
      ref: containerRef,
      onScroll: () => {
        calculateRange();
      },
      style: containerStyle
    },
    wrapperProps
  };
}
function useWindowScroll({ window: window2 = defaultWindow } = {}) {
  if (!window2) {
    return {
      x: vue_cjs_prod.ref(0),
      y: vue_cjs_prod.ref(0)
    };
  }
  const x = vue_cjs_prod.ref(window2.pageXOffset);
  const y = vue_cjs_prod.ref(window2.pageYOffset);
  useEventListener("scroll", () => {
    x.value = window2.pageXOffset;
    y.value = window2.pageYOffset;
  }, {
    capture: false,
    passive: true
  });
  return { x, y };
}
async function getAllPostIds() {
  const postsDirectory = "public/posts";
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    };
  });
}
async function getPostData(id) {
  const postsDirectory = "public/posts";
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).use(remarkGfm).process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}
const useMarkDownTransform = (target) => {
  const DirceortyStore = useDirceortyStore();
  const { x, y } = useWindowScroll();
  vue_cjs_prod.watch([x, y], () => {
    var _a;
    const children = (_a = target.value) == null ? void 0 : _a.children;
    for (const child of children) {
      const type = child.tagName[0];
      type === "H" && DirceortyStore.updateItem(child.getAttribute("id"), child.getBoundingClientRect().top);
    }
  });
};
const useNavBarHide = () => {
  return useState("isNavBarHide", () => false, "$tm3HZjqM9T");
};
const _sfc_main$m = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isNavBarHide = useNavBarHide();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: ["IndexPageContainter", { NavBarMoveTop: vue_cjs_prod.unref(isNavBarHide) }]
      }, _attrs))} data-v-211eff0f>`);
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/index/indexComponents/IndexPageContainter/index.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const IndexPageContainter = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-211eff0f"]]);
const _sfc_main$l = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    height: null,
    item: null,
    AllPostId: null
  },
  setup(__props) {
    const props = __props;
    useRouter();
    const AllPostId = props.AllPostId;
    const randomRange = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };
    const currentPostId = vue_cjs_prod.computed(() => randomRange(0, AllPostId.length));
    const dev = false;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, vue_cjs_prod.mergeProps({
        style: { height: __props.height + "px" },
        class: "ItemBox",
        to: !vue_cjs_prod.unref(dev) ? "http://www.huancaibingxi.online/post/" + vue_cjs_prod.unref(AllPostId)[vue_cjs_prod.unref(currentPostId)].params.id : "/post/" + vue_cjs_prod.unref(AllPostId)[vue_cjs_prod.unref(currentPostId)].params.id,
        target: "_blank"
      }, _attrs), {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="MainItem" data-v-5f6b7c56${_scopeId}><div class="ItemHeader" data-v-5f6b7c56${_scopeId}><a data-v-5f6b7c56${_scopeId}>${serverRenderer.exports.ssrInterpolate(__props.item.name)}</a><span data-v-5f6b7c56${_scopeId}>${serverRenderer.exports.ssrInterpolate(__props.item.day.toDateString())}</span><!--[-->`);
            serverRenderer.exports.ssrRenderList(__props.item.tags, (tag) => {
              _push2(`<div class="tag" data-v-5f6b7c56${_scopeId}>${serverRenderer.exports.ssrInterpolate(tag)}</div>`);
            });
            _push2(`<!--]--></div><div class="TitleRow" data-v-5f6b7c56${_scopeId}><a data-v-5f6b7c56${_scopeId}> xxxxxxxxx </a></div><div class="Describe" data-v-5f6b7c56${_scopeId}>${serverRenderer.exports.ssrInterpolate(__props.item.Describe)}</div><ul class="actionList" data-v-5f6b7c56${_scopeId}><li class="view" data-v-5f6b7c56${_scopeId}><i data-v-5f6b7c56${_scopeId}></i><span data-v-5f6b7c56${_scopeId}>${serverRenderer.exports.ssrInterpolate(__props.item.actionList.view)}</span></li><li class="like" data-v-5f6b7c56${_scopeId}><i data-v-5f6b7c56${_scopeId}></i><span data-v-5f6b7c56${_scopeId}>${serverRenderer.exports.ssrInterpolate(__props.item.actionList.like)}</span></li><li class="comment" data-v-5f6b7c56${_scopeId}><i data-v-5f6b7c56${_scopeId}></i><span data-v-5f6b7c56${_scopeId}>${serverRenderer.exports.ssrInterpolate(__props.item.actionList.comment)}</span></li></ul></div><div class="line" data-v-5f6b7c56${_scopeId}></div>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", { class: "MainItem" }, [
                vue_cjs_prod.createVNode("div", { class: "ItemHeader" }, [
                  vue_cjs_prod.createVNode("a", null, vue_cjs_prod.toDisplayString(__props.item.name), 1),
                  vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(__props.item.day.toDateString()), 1),
                  (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(__props.item.tags, (tag) => {
                    return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                      key: vue_cjs_prod.unref(nanoid)(),
                      class: "tag"
                    }, vue_cjs_prod.toDisplayString(tag), 1);
                  }), 128))
                ]),
                vue_cjs_prod.createVNode("div", { class: "TitleRow" }, [
                  vue_cjs_prod.createVNode("a", null, " xxxxxxxxx ")
                ]),
                vue_cjs_prod.createVNode("div", { class: "Describe" }, vue_cjs_prod.toDisplayString(__props.item.Describe), 1),
                vue_cjs_prod.createVNode("ul", { class: "actionList" }, [
                  vue_cjs_prod.createVNode("li", { class: "view" }, [
                    vue_cjs_prod.createVNode("i"),
                    vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(__props.item.actionList.view), 1)
                  ]),
                  vue_cjs_prod.createVNode("li", { class: "like" }, [
                    vue_cjs_prod.createVNode("i"),
                    vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(__props.item.actionList.like), 1)
                  ]),
                  vue_cjs_prod.createVNode("li", { class: "comment" }, [
                    vue_cjs_prod.createVNode("i"),
                    vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(__props.item.actionList.comment), 1)
                  ])
                ])
              ]),
              vue_cjs_prod.createVNode("div", { class: "line" })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/index/indexComponents/IndexPageContainter/IndexPageList/indexPageItem/index.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const indexPageItem = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-5f6b7c56"]]);
const _sfc_main$k = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    AllPostId: null
  },
  setup(__props) {
    const props = __props;
    const ulBoxList = vue_cjs_prod.ref();
    const isPosting = vue_cjs_prod.ref(false);
    const targetBottomLi = vue_cjs_prod.ref();
    const targetIsVisible = vue_cjs_prod.ref(false);
    useIntersectionObserver(targetBottomLi, ([{ isIntersecting }], observerElement) => {
      targetIsVisible.value = isIntersecting;
    });
    const createVirtualItem = () => ({
      name: "test",
      tags: ["tag1", "tag2"],
      title: "title",
      day: new Date(),
      Describe: "Describe",
      actionList: {
        view: 22,
        like: 22,
        comment: 22
      }
    });
    const ArrayList = vue_cjs_prod.ref(Array.from(Array(99).keys()).map((item) => createVirtualItem()));
    const { list, containerProps, wrapperProps } = useVirtualList(ArrayList, {
      itemHeight: 130
    });
    const isNavBarHide = useNavBarHide();
    const AllPostId = props.AllPostId;
    vue_cjs_prod.watch(() => wrapperProps.value.style.marginTop, (newValue, oldValue) => {
      const newNumber = parseInt(newValue);
      const oldNumber = parseInt(oldValue);
      !isPosting.value && newNumber - oldNumber > 0 ? isNavBarHide.value = true : isNavBarHide.value = false;
    });
    vue_cjs_prod.watch(targetIsVisible, async () => {
      if (targetIsVisible.value && isPosting.value === false) {
        isPosting.value = true;
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(1);
          }, 500);
        });
        ArrayList.value.push(...Array.from(Array(50).keys()).map((item) => createVirtualItem()));
        isPosting.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "container" }, vue_cjs_prod.unref(containerProps), { style: {} }, _attrs))} data-v-96e29058><ul${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        ref_key: "ulBoxList",
        ref: ulBoxList
      }, vue_cjs_prod.unref(wrapperProps), { class: "wrapper" }))} data-v-96e29058><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(list), (item) => {
        _push(serverRenderer.exports.ssrRenderComponent(indexPageItem, {
          key: item.index,
          height: 130,
          item: item.data,
          AllPostId: vue_cjs_prod.unref(AllPostId)
        }, null, _parent));
      });
      _push(`<!--]--><li style="${serverRenderer.exports.ssrRenderStyle({ "height": "130px" })}" data-v-96e29058></li></ul></div>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/index/indexComponents/IndexPageContainter/IndexPageList/index.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const IndexPageList = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-96e29058"]]);
const _sfc_main$j = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[type]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const AllPostId = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("AllPostId", () => getAllPostIds(), "$ApV1p0Bo4B")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "IndexPage" }, _attrs))} data-v-54d82458>`);
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
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/main/[type].vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const meta$5 = void 0;
const _sfc_main$i = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const AllPostId = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("AllPostId", () => getAllPostIds(), "$eHoaktOh6E")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "IndexPage" }, _attrs))} data-v-7ffa24b4>`);
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
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/main/index.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const meta$4 = void 0;
const meta$3 = void 0;
const meta$2 = void 0;
const meta$1 = void 0;
const _sfc_main$h = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const DirceortyStore = useDirceortyStore();
    const { x, y } = useWindowScroll();
    const UlBoxel = vue_cjs_prod.ref();
    const recentId = vue_cjs_prod.ref("");
    const TopLengthScroll = vue_cjs_prod.ref(0);
    const isTransition = vue_cjs_prod.ref(false);
    const TopLengthScrolloutput = useTransition(TopLengthScroll, {
      duration: 1e3,
      transition: TransitionPresets.easeInQuad
    });
    const compare = (obj1, obj2) => {
      const val1 = obj1.TopLength;
      const val2 = obj2.TopLength;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    };
    const getArrayIndex = (arr, id) => {
      let i = arr.length;
      while (i--) {
        if (arr[i].id === id) {
          return i;
        }
      }
      return -1;
    };
    vue_cjs_prod.onUnmounted(() => {
      DirceortyStore.$reset();
    });
    vue_cjs_prod.watch([x, y], () => {
      const ResultArr = DirceortyStore.value.filter((item) => item.TopLength > 0).sort(compare);
      ResultArr.length !== 0 ? recentId.value = ResultArr[0].id : recentId.value = DirceortyStore.value[DirceortyStore.value.length - 1].id;
    });
    vue_cjs_prod.watch(recentId, (newValue, oldValue) => {
      const newIndex = getArrayIndex(DirceortyStore.value, newValue);
      const oldIndex = getArrayIndex(DirceortyStore.value, oldValue);
      UlBoxel.value.scrollTop += 40 * (newIndex - oldIndex);
      !isTransition.value ? TopLengthScroll.value = document.documentElement.scrollTop + DirceortyStore.value.find((item) => item.id == newValue).TopLength : null;
    });
    vue_cjs_prod.watch(TopLengthScrolloutput, (output) => {
      isTransition.value ? document.documentElement.scrollTop = output : null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "DirectorySelfListContainer" }, _attrs))} data-v-2f0fc4f5><div class="DirectorySelfListBox" data-v-2f0fc4f5><div class="DirectorySelfListHeader" data-v-2f0fc4f5> \u76EE\u5F55 </div><div class="DirectorySelfListHr" data-v-2f0fc4f5></div><div class="DirectorySelfList" data-v-2f0fc4f5><ul data-v-2f0fc4f5><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(DirceortyStore).value, (item) => {
        _push(`<li class="${serverRenderer.exports.ssrRenderClass({
          ActiveDirectory: recentId.value == item.id
        })}" data-v-2f0fc4f5><div style="${serverRenderer.exports.ssrRenderStyle({ paddingLeft: `${1 - item.index}rem` })}" data-v-2f0fc4f5>${serverRenderer.exports.ssrInterpolate(item.content)}</div></li>`);
      });
      _push(`<!--]--></ul></div></div></div>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Directory/SelfList/index.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-2f0fc4f5"]]);
const _sfc_main$g = {};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "Content" }, _attrs))} data-v-7ea7b610>`);
  serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/PostContent/index.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const PostContent = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$9], ["__scopeId", "data-v-7ea7b610"]]);
const _sfc_main$f = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "CommentModule" }, _attrs))} data-v-3646f180>`);
  serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/PostContent/CommentModule/index.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const CommentModule = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$8], ["__scopeId", "data-v-3646f180"]]);
const _sfc_main$e = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "CommentHeader" }, _attrs))} data-v-74e7dac4> \u8BC4\u8BBA </div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/PostContent/CommentModule/CommentHeader/index.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const CommentHeader = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$7], ["__scopeId", "data-v-74e7dac4"]]);
const _sfc_main$d = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "CommentBox" }, _attrs))} data-v-3017cd14>`);
  serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/PostContent/CommentModule/CommentBox/index.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const CommentBox = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-3017cd14"]]);
const _sfc_main$c = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "AvatarBox" }, _attrs))} data-v-b1a354ec><img src="https://p3-passport.byteacctimg.com/img/user-avatar/b86a8eb966aaee60df3271a506d21b52~300x300.image" alt="" data-v-b1a354ec></div>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/PostContent/CommentModule/CommentBox/AvatarBox/index.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const AvatarBox = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-b1a354ec"]]);
const _sfc_main$b = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "FormBox" }, _attrs))} data-v-7ec5f857>`);
  serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/PostContent/CommentModule/CommentBox/FormBox/index.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const FormBox = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-7ec5f857"]]);
const useCommentState = () => {
  return useState("useCommentState", () => ({
    isFooterShow: false,
    isInputText: false
  }), "$QuYy51JipH");
};
const _sfc_main$a = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const CommentState = useCommentState();
    const TextValue = vue_cjs_prod.ref("");
    vue_cjs_prod.watch(TextValue, (newValue, oldValue) => {
      newValue.length > 0 ? CommentState.value.isInputText = true : CommentState.value.isInputText = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "inputBox" }, _attrs))} data-v-1d6de16a><textarea placeholder="\u8F93\u5165\u8BC4\u8BBA(Enter\u6362\u884C,\u2318 + Enter\u53D1\u9001)" type="text" class="${serverRenderer.exports.ssrRenderClass({
        ActiveTextarea: vue_cjs_prod.unref(CommentState).isFooterShow || vue_cjs_prod.unref(CommentState).isInputText
      })}" data-v-1d6de16a>${serverRenderer.exports.ssrInterpolate(TextValue.value)}</textarea></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/PostContent/CommentModule/CommentBox/FormBox/inputBox/index.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const inputBox = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-1d6de16a"]]);
const _sfc_main$9 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const CommentState = useCommentState();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: "FooterButtonList",
        style: vue_cjs_prod.unref(CommentState).isFooterShow || vue_cjs_prod.unref(CommentState).isInputText ? null : { display: "none" }
      }, _attrs))} data-v-691364ef>`);
      serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/PostContent/CommentModule/CommentBox/FormBox/FooterButtonList/index.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const FooterButtonList = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-691364ef"]]);
const _sfc_main$8 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "emojiBox" }, _attrs))} data-v-002d1382><svg data-v-9fe533ba="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" data-v-002d1382><path data-v-9fe533ba="" fill-rule="evenodd" clip-rule="evenodd" d="M8.00002 0.666504C12.0501 0.666504 15.3334 3.94975 15.3334 7.99984C15.3334 12.0499 12.0501 15.3332 8.00002 15.3332C3.94993 15.3332 0.666687 12.0499 0.666687 7.99984C0.666687 3.94975 3.94993 0.666504 8.00002 0.666504ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM10.6667 5.66667V7.66667H9.33333V5.66667H10.6667ZM6.66667 5.66667V7.66667H5.33333V5.66667H6.66667ZM10.0767 9.33333H11.0495C11.1804 9.33333 11.2866 9.43951 11.2866 9.57048C11.2866 9.60754 11.2779 9.64409 11.2612 9.67718L11.244 9.71053C10.6294 10.8739 9.40726 11.6667 7.99998 11.6667C6.61523 11.6667 5.40977 10.8991 4.7859 9.76612L4.73786 9.67593C4.67845 9.56052 4.72385 9.4188 4.83926 9.35939C4.87253 9.34226 4.90941 9.33333 4.94683 9.33333H5.92347C6.02396 9.33332 6.11908 9.37865 6.18238 9.4567C6.26207 9.55496 6.32833 9.62955 6.38117 9.68046C6.80074 10.0847 7.37133 10.3333 7.99998 10.3333C8.63289 10.3333 9.20694 10.0814 9.62728 9.67224C9.67791 9.62296 9.74135 9.55121 9.8176 9.45698C9.88089 9.37877 9.97611 9.33333 10.0767 9.33333Z" data-v-002d1382></path></svg><span data-v-002d1382>\u8868\u60C5</span></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/PostContent/CommentModule/CommentBox/FormBox/FooterButtonList/emojiBox/index.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const emojiBox = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-002d1382"]]);
const _sfc_main$7 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "ImageBox" }, _attrs))} data-v-341dab9e><svg data-v-013fc4fa="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" data-v-341dab9e><path data-v-013fc4fa="" fill-rule="evenodd" clip-rule="evenodd" d="M14 1.3335C14.3514 1.3335 14.6394 1.60546 14.6648 1.95041L14.6666 2.00016V14.0002C14.6666 14.3516 14.3947 14.6396 14.0497 14.665L14 14.6668H1.99998C1.64853 14.6668 1.36059 14.3949 1.33514 14.0499L1.33331 14.0002V2.00016C1.33331 1.64871 1.60527 1.36077 1.95023 1.33532L1.99998 1.3335H14ZM13.3333 2.66618H2.66664V13.3328H13.3333V2.66618ZM11.9219 6.7879C11.9719 6.83791 12 6.90574 12 6.97647V11.7993C12 11.9098 11.9104 11.9993 11.8 11.9993H6.81615C6.7975 11.9993 6.77945 11.9968 6.76232 11.992L3.91042 11.9847C3.79996 11.9844 3.71063 11.8947 3.7109 11.7842C3.71102 11.7313 3.73209 11.6807 3.76948 11.6433L6.52468 8.88807C6.62882 8.78393 6.79766 8.78393 6.9018 8.88807L8.17297 10.1593L11.5447 6.7879C11.6489 6.68376 11.8177 6.68376 11.9219 6.7879ZM5.99997 3.99951V5.99951H3.99997V3.99951H5.99997Z" data-v-341dab9e></path></svg><span data-v-341dab9e>\u56FE\u7247</span></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/PostContent/CommentModule/CommentBox/FormBox/FooterButtonList/ImageBox/index.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ImageBox = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-341dab9e"]]);
const _sfc_main$6 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const CommentState = useCommentState();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "SubmitButton" }, _attrs))} data-v-31415a21><span data-v-31415a21> \u2318 + Enter </span><button class="${serverRenderer.exports.ssrRenderClass({ ActiveButton: vue_cjs_prod.unref(CommentState).isInputText })}" data-v-31415a21>\u53D1\u8868\u8BC4\u8BBA</button></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/PostContent/CommentModule/CommentBox/FormBox/FooterButtonList/SubmitButton/index.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const SubmitButton = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-31415a21"]]);
const _sfc_main$5 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "SideTab" }, _attrs))} data-v-386d6c9c>`);
  serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/SideTab/index.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const SideTab = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-386d6c9c"]]);
const _sfc_main$4 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DirectorySelfList = __nuxt_component_0$1;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "Post" }, _attrs))} data-v-d5840920>`);
      _push(serverRenderer.exports.ssrRenderComponent(PostContent, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(serverRenderer.exports.ssrRenderComponent(CommentModule, null, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(CommentHeader, null, null, _parent3, _scopeId2));
                  _push3(serverRenderer.exports.ssrRenderComponent(CommentBox, null, {
                    default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer.exports.ssrRenderComponent(AvatarBox, null, null, _parent4, _scopeId3));
                        _push4(serverRenderer.exports.ssrRenderComponent(FormBox, null, {
                          default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(serverRenderer.exports.ssrRenderComponent(inputBox, null, null, _parent5, _scopeId4));
                              _push5(serverRenderer.exports.ssrRenderComponent(FooterButtonList, null, {
                                default: vue_cjs_prod.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(serverRenderer.exports.ssrRenderComponent(emojiBox, null, null, _parent6, _scopeId5));
                                    _push6(serverRenderer.exports.ssrRenderComponent(ImageBox, null, null, _parent6, _scopeId5));
                                    _push6(serverRenderer.exports.ssrRenderComponent(SubmitButton, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      vue_cjs_prod.createVNode(emojiBox),
                                      vue_cjs_prod.createVNode(ImageBox),
                                      vue_cjs_prod.createVNode(SubmitButton)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                vue_cjs_prod.createVNode(inputBox),
                                vue_cjs_prod.createVNode(FooterButtonList, null, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createVNode(emojiBox),
                                    vue_cjs_prod.createVNode(ImageBox),
                                    vue_cjs_prod.createVNode(SubmitButton)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vue_cjs_prod.createVNode(AvatarBox),
                          vue_cjs_prod.createVNode(FormBox, null, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(inputBox),
                              vue_cjs_prod.createVNode(FooterButtonList, null, {
                                default: vue_cjs_prod.withCtx(() => [
                                  vue_cjs_prod.createVNode(emojiBox),
                                  vue_cjs_prod.createVNode(ImageBox),
                                  vue_cjs_prod.createVNode(SubmitButton)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vue_cjs_prod.createVNode(CommentHeader),
                    vue_cjs_prod.createVNode(CommentBox, null, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createVNode(AvatarBox),
                        vue_cjs_prod.createVNode(FormBox, null, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createVNode(inputBox),
                            vue_cjs_prod.createVNode(FooterButtonList, null, {
                              default: vue_cjs_prod.withCtx(() => [
                                vue_cjs_prod.createVNode(emojiBox),
                                vue_cjs_prod.createVNode(ImageBox),
                                vue_cjs_prod.createVNode(SubmitButton)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.renderSlot(_ctx.$slots, "default", {}, void 0, true),
              vue_cjs_prod.createVNode(CommentModule, null, {
                default: vue_cjs_prod.withCtx(() => [
                  vue_cjs_prod.createVNode(CommentHeader),
                  vue_cjs_prod.createVNode(CommentBox, null, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode(AvatarBox),
                      vue_cjs_prod.createVNode(FormBox, null, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createVNode(inputBox),
                          vue_cjs_prod.createVNode(FooterButtonList, null, {
                            default: vue_cjs_prod.withCtx(() => [
                              vue_cjs_prod.createVNode(emojiBox),
                              vue_cjs_prod.createVNode(ImageBox),
                              vue_cjs_prod.createVNode(SubmitButton)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(SideTab, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_component_DirectorySelfList, null, null, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(_component_DirectorySelfList)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/index.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const PostPage = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-d5840920"]]);
const _sfc_main$3 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    data: null
  },
  setup(__props) {
    const HtmlDom = vue_cjs_prod.ref();
    useMarkDownTransform(HtmlDom);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: "markdownTransform",
        ref_key: "HtmlDom",
        ref: HtmlDom
      }, _attrs))}>${__props.data.contentHtml}</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("PagesComponents/post/PostPage/markdownTransform/index.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData("getPostData", () => {
      return getPostData(route.params.id);
    }, "$hl1bGykBuW")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "PostContainer" }, _attrs))} data-v-2fe093d8>`);
      _push(serverRenderer.exports.ssrRenderComponent(PostPage, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_sfc_main$3, { data: vue_cjs_prod.unref(data) }, null, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(_sfc_main$3, { data: vue_cjs_prod.unref(data) }, null, 8, ["data"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/post/[id].vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const meta = void 0;
const routes = [
  {
    name: "course-ai",
    path: "/course/ai",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/course/ai.vue",
    children: [],
    meta: meta$i,
    alias: [],
    component: () => import('./ai.1360f9a4.mjs')
  },
  {
    name: "course-android",
    path: "/course/android",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/course/android.vue",
    children: [],
    meta: meta$h,
    alias: [],
    component: () => import('./android.806ae6ff.mjs')
  },
  {
    name: "course-article",
    path: "/course/article",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/course/article.vue",
    children: [],
    meta: meta$g,
    alias: [],
    component: () => import('./article.1d08e6ac.mjs')
  },
  {
    name: "course-backend",
    path: "/course/backend",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/course/backend.vue",
    children: [],
    meta: meta$f,
    alias: [],
    component: () => import('./backend.1cea0e13.mjs')
  },
  {
    name: "course-career",
    path: "/course/career",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/course/career.vue",
    children: [],
    meta: meta$e,
    alias: [],
    component: () => import('./career.739b847f.mjs')
  },
  {
    name: "course-following",
    path: "/course/following",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/course/following.vue",
    children: [],
    meta: meta$d,
    alias: [],
    component: () => import('./following.d539c40e.mjs')
  },
  {
    name: "course-freebie",
    path: "/course/freebie",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/course/freebie.vue",
    children: [],
    meta: meta$c,
    alias: [],
    component: () => import('./freebie.2f75e3ba.mjs')
  },
  {
    name: "course-frontend",
    path: "/course/frontend",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/course/frontend.vue",
    children: [],
    meta: meta$b,
    alias: [],
    component: () => import('./frontend.28856f55.mjs')
  },
  {
    name: "course",
    path: "/course",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/course/index.vue",
    children: [],
    meta: meta$a,
    alias: [],
    component: () => import('./index.7b334597.mjs')
  },
  {
    name: "course-ios",
    path: "/course/ios",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/course/ios.vue",
    children: [],
    meta: meta$9,
    alias: [],
    component: () => import('./ios.c879e100.mjs')
  },
  {
    name: "events-all",
    path: "/events/all",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/events/all.vue",
    children: [],
    meta: meta$8,
    alias: [],
    component: () => import('./all.7c75cbfd.mjs')
  },
  {
    name: "index",
    path: "/",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/index.vue",
    children: [],
    meta: meta$7,
    alias: [],
    component: () => import('./index.de7664df.mjs')
  },
  {
    name: "live",
    path: "/live",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/live/index.vue",
    children: [],
    meta: meta$6,
    alias: [],
    component: () => import('./index.04c73851.mjs')
  },
  {
    name: "main-type",
    path: "/main/:type",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/main/[type].vue",
    children: [],
    meta: meta$5,
    alias: [],
    component: () => import('./_type_.07dffcee.mjs')
  },
  {
    name: "main",
    path: "/main",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/main/index.vue",
    children: [],
    meta: meta$4,
    alias: [],
    component: () => import('./index.3276a15b.mjs')
  },
  {
    name: "news-category",
    path: "/news/category",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/news/category/index.vue",
    children: [],
    meta: meta$3,
    alias: [],
    component: () => import('./index.276e5248.mjs')
  },
  {
    name: "news",
    path: "/news",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/news/index.vue",
    children: [],
    meta: meta$2,
    alias: [],
    component: () => import('./index.1fb71c69.mjs')
  },
  {
    name: "pins",
    path: "/pins",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/pins/index.vue",
    children: [],
    meta: meta$1,
    alias: [],
    component: () => import('./index.58458f57.mjs')
  },
  {
    name: "post-id",
    path: "/post/:id",
    file: "/Users/huancaibingxi/Downloads/\u524D\u7AEF\u6574\u5408/Nuxt3/nuxt3-web-juejin/pages/post/[id].vue",
    children: [],
    meta,
    alias: [],
    component: () => import('./_id_.8f8f7915.mjs')
  }
];
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions
};
const globalMiddleware = [];
const namedMiddleware = {};
const _47Users_47huancaibingxi_47Downloads_47_21069_31471_25972_21512_47Nuxt3_47nuxt3_45web_45juejin_47node_modules_47nuxt_47dist_47pages_47runtime_47router = defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  const baseURL2 = useRuntimeConfig().app.baseURL;
  const routerHistory = vueRouter_prod.createMemoryHistory(baseURL2);
  const initialURL = nuxtApp.ssrContext.url;
  const router = vueRouter_prod.createRouter({
    ...routerOptions,
    history: routerHistory,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = vue_cjs_prod.shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const route = {};
  for (const key in router.currentRoute.value) {
    route[key] = vue_cjs_prod.computed(() => router.currentRoute.value[key]);
  }
  const _activeRoute = vue_cjs_prod.shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _activeRoute.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a, _b, _c, _d;
    if (((_b = (_a = to.matched[0]) == null ? void 0 : _a.components) == null ? void 0 : _b.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
      syncCurrentRoute();
    }
  });
  const activeRoute = {};
  for (const key in _activeRoute.value) {
    activeRoute[key] = vue_cjs_prod.computed(() => _activeRoute.value[key]);
  }
  nuxtApp._route = vue_cjs_prod.reactive(route);
  nuxtApp._activeRoute = vue_cjs_prod.reactive(activeRoute);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      await router.push(initialURL);
    }
    await router.isReady();
  } catch (error2) {
    callWithNuxt(nuxtApp, throwError, [error2]);
  }
  router.beforeEach(async (to, from) => {
    var _a;
    to.meta = vue_cjs_prod.reactive(to.meta);
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a = namedMiddleware[entry2]) == null ? void 0 : _a.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError({
            statusMessage: `Route navigation aborted: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, throwError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, throwError, [createError({
        statusCode: 404,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, throwError, [error2]);
    }
  });
  return { provide: { router } };
});
const _47Users_47huancaibingxi_47Downloads_47_21069_31471_25972_21512_47Nuxt3_47nuxt3_45web_45juejin_47node_modules_47_64pinia_47nuxt_47dist_47runtime_47plugin_46vue3 = defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const _plugins = [
  preload,
  _47Users_47huancaibingxi_47Downloads_47_21069_31471_25972_21512_47Nuxt3_47nuxt3_45web_45juejin_47_46nuxt_47components_46plugin_46mjs,
  _47Users_47huancaibingxi_47Downloads_47_21069_31471_25972_21512_47Nuxt3_47nuxt3_45web_45juejin_47node_modules_47nuxt_47dist_47head_47runtime_47lib_47vueuse_45head_46plugin,
  _47Users_47huancaibingxi_47Downloads_47_21069_31471_25972_21512_47Nuxt3_47nuxt3_45web_45juejin_47node_modules_47nuxt_47dist_47head_47runtime_47plugin,
  _47Users_47huancaibingxi_47Downloads_47_21069_31471_25972_21512_47Nuxt3_47nuxt3_45web_45juejin_47node_modules_47nuxt_47dist_47pages_47runtime_47router,
  _47Users_47huancaibingxi_47Downloads_47_21069_31471_25972_21512_47Nuxt3_47nuxt3_45web_45juejin_47node_modules_47_64pinia_47nuxt_47dist_47runtime_47plugin_46vue3
];
const _sfc_main$1 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = vue_cjs_prod.defineAsyncComponent(() => import('./error-component.45d99220.mjs'));
    const nuxtApp = useNuxtApp();
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    vue_cjs_prod.onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, throwError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = vue_cjs_prod.resolveComponent("App");
      serverRenderer.exports.ssrRenderSuspense(_push, {
        default: () => {
          if (vue_cjs_prod.unref(error)) {
            _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ErrorComponent), { error: vue_cjs_prod.unref(error) }, null, _parent));
          } else {
            _push(serverRenderer.exports.ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const layouts = {
  default: vue_cjs_prod.defineAsyncComponent(() => import('./default.c32e783a.mjs'))
};
const defaultLayoutTransition = { name: "layout", mode: "out-in" };
const __nuxt_component_0 = vue_cjs_prod.defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const route = useRoute();
    return () => {
      var _a, _b, _c;
      const layout = (_b = (_a = vue_cjs_prod.isRef(props.name) ? props.name.value : props.name) != null ? _a : route.meta.layout) != null ? _b : "default";
      const hasLayout = layout && layout in layouts;
      return _wrapIf(vue_cjs_prod.Transition, hasLayout && ((_c = route.meta.layoutTransition) != null ? _c : defaultLayoutTransition), _wrapIf(layouts[layout], hasLayout, context.slots)).default();
    };
  }
});
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = vue_cjs_prod.resolveComponent("NuxtPage");
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = vue_cjs_prod.createApp(_sfc_main$1);
    vueApp.component("App", AppComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      ssrContext.error = ssrContext.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { IndexPageContainter as I, PostPage as P, _export_sfc as _, IndexPageList as a, useRoute as b, _sfc_main$3 as c, getPostData as d, entry$1 as default, useState as e, useNavBarHide as f, getAllPostIds as g, __nuxt_component_0$2 as h, useHead as i, navigateTo as n, onClickOutside as o, useAsyncData as u };
//# sourceMappingURL=server.mjs.map
