webpackJsonp([1,0,3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _App = __webpack_require__(118);

	var _App2 = _interopRequireDefault(_App);

	var _utils = __webpack_require__(33);

	var _utils2 = _interopRequireDefault(_utils);

	var _hammer = __webpack_require__(32);

	var _hammer2 = _interopRequireDefault(_hammer);

	var _template = __webpack_require__(34);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	  var locationSearch = location.search;
	  var s = location.search;
	  if (s && s.indexOf('?') > -1) {
	    var s2 = s.replace('?', '');
	    var arr = s2.split('&');
	    for (var i = 0, len = arr.length; i < len; i++) {
	      var idx = arr[i].indexOf('=');
	      if (idx >= 1) {
	        if (/appLoginMobile/.test(arr[i])) {
	          window.config.reqParam.appLoginMobile = arr[i].substring(idx + 1);
	        }
	        if (/loginPassword/.test(arr[i])) {
	          window.config.reqParam.loginPassword = arr[i].substring(idx + 1);
	        }
	      }
	    }
	  }
	})();
	var doc = document,
	    dialog,
	    dialogTimer,
	    audio,
	    hInfo,
	    maskNode,
	    dialogNode;

	var isAndroid = /Android/g.test(navigator.userAgent);
	if (isAndroid) {
	  document.documentElement.classList.add('android');
	}
	_vue2.default.transition('expand', {
	  afterEnter: function afterEnter(el) {
	    var rootVm = this.$root;
	    if (rootVm.isBack) {
	      rootVm.isBack = false;
	      rootVm.$el.classList.remove('back');
	    }
	    rootVm.$el.classList.remove('art');
	    setTimeout(function () {
	      rootVm.isTranslate = false;
	    }, 200);
	  },
	  beforeEnter: function beforeEnter(el) {
	    this.$root.isTranslate = true;
	  },
	  beforeLeave: function beforeLeave(el) {
	    this.$root.isTranslate = true;
	  }
	});
	_vue2.default.transition('art', {
	  afterEnter: function afterEnter(el) {
	    var rootVm = this.$root;
	    rootVm.$el.classList.remove('art');
	    rootVm.$el.classList.remove('detail');
	    setTimeout(function () {
	      rootVm.isTranslate = false;
	    }, 200);
	  },
	  beforeEnter: function beforeEnter(el) {
	    this.$root.isTranslate = true;
	  },
	  beforeLeave: function beforeLeave(el) {
	    this.$root.isTranslate = true;
	  }
	});
	_utils2.default.dialog = dialog = function dialog(num, cb) {
	  var html;
	  var str = parseInt(num, 10);

	  clearTimeout(dialogTimer);
	  if (cb) {
	    _utils2.default.dialogCb = cb;
	  }
	  maskNode.style.display = 'block';
	  dialogNode.style.display = 'block';
	  dialogNode.classList.remove('bounce-out');
	  dialogNode.classList.add('bounce-in');
	  html = isNaN(str) ? num : _template2.default[num].join('');
	  dialogNode.innerHTML = html;
	};
	var dialogInit = function dialogInit(vm) {
	  (0, _hammer2.default)(maskNode).on('tap', function () {
	    clearTimeout(dialogTimer);
	    dialogNode.classList.remove('bounce-in');
	    dialogNode.classList.add('bounce-out');
	    dialogTimer = setTimeout(function () {
	      maskNode.style.display = 'none';
	      dialogNode.style.display = 'none';
	      if (vm.show == 3) {
	        audio.muted = true;
	        audio.play();
	        audio.pause();
	        audio.muted = false;
	      }
	      if (_utils2.default.dialogCb) {
	        _utils2.default.dialogCb();
	        _utils2.default.dialogCb = null;
	      }
	    }, 400);
	  });
	};

	var backHandle = function backHandle(vm) {
	  var backBtn = document.querySelectorAll('.h-back');
	  var hd = function hd(node) {
	    (0, _hammer2.default)(node).on('tap', function (ev) {
	      if (vm.isTranslate) return;
	      if (node.getAttribute('data-article')) {
	        return;
	      }
	      _utils2.default.setActive(vm, node);
	      if (vm.show == 1) {
	        callClientFunction('returnBack');
	        return;
	      }
	      vm.isBack = true;
	      vm.$el.classList.add('back');


	      vm.show = vm.oldShow;
	    });
	  };
	  for (var i = 0, len = backBtn.length; i < len; i++) {
	    hd(backBtn[i]);
	  }
	};

	var info = function info(vm, target) {
	  if (vm.show == 2) {
	    dialog(0);
	    return;
	  }
	  if (vm.show == 4) {
	    dialog(1);
	    return;
	  }
	  if (vm.show == 5) {
	    dialog(5);
	    return;
	  }
	};

	var hInfoHandle = function hInfoHandle(vm) {
	  var hd = function hd(node) {
	    (0, _hammer2.default)(node).on('tap', function () {
	      _utils2.default.setActive(vm, node);
	      info(vm, node);
	    });
	  };
	  for (var i = 0, len = hInfo.length; i < len; i++) {
	    hd(hInfo[i]);
	  }
	};

	var advAudio = function advAudio() {
	  audio.addEventListener('play', function (e) {});
	  audio.addEventListener('ended', function (e) {});
	  audio.addEventListener('canplay', function (e) {});
	};

	window.pageVM = new _vue2.default({
	  el: 'body',
	  data: {
	    width: window.innerWidth,
	    height: window.innerHeight,
	    rawWidth: 750,
	    rawHeight: 1334,
	    isBack: false,
	    oldShow: 1,
	    isTranslate: false,
	    show: 1,
	    userInfo: {},
	    bet: []
	  },
	  watch: {
	    show: function show(n) {
	      this.$broadcast('pageTab', n);
	    }
	  },
	  events: {
	    'child-show': function childShow(num) {
	      this.show = num;
	    }
	  },
	  computed: {
	    pageWidth: function pageWidth() {},
	    pageHeight: function pageHeight() {}
	  },
	  components: { App: _App2.default },
	  ready: function ready() {
	    hInfo = doc.querySelectorAll('.h-info');

	    maskNode = doc.querySelector('#mask');

	    dialogNode = doc.querySelector('#dialog');

	    audio = doc.querySelectorAll('audio')[0];

	    backHandle(this);
	    dialogInit(this);
	    hInfoHandle(this);
	    advAudio(this);
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * Vue.js v1.0.24
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj._digest();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([a-z\d])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	var isWechat = UA && UA.indexOf('micromessenger') > 0;

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined' && !(isWechat && isIos)) {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	var _Set = undefined;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = function () {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;
	  if (this.size === this.limit) {
	    removed = this.shift();
	  }

	  var entry = this.get(key, true);
	  if (!entry) {
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */

	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};

	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */

	  devtools: ("development").NODE_ENV !== 'production',

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;
	var formatComponentName = undefined;

	if (("development").NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';

	    warn = function (msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };

	    formatComponentName = function (vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      ("development").NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  if (!node) return false;
	  var doc = node.ownerDocument.documentElement;
	  var parent = node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isFragment(node) {
	  return node && node.nodeType === 11;
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;

	var isUnknownElement = undefined;
	if (("development").NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)
	      );
	    }
	  };
	}

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el, options);
	      if (is) {
	        return is;
	      } else if (("development").NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el, options);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function getIsBinding(el, options) {
	  // dynamic syntax
	  var exp = el.getAttribute('is');
	  if (exp != null) {
	    if (resolveAsset(options, 'components', exp)) {
	      el.removeAttribute('is');
	      return { id: exp };
	    }
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      ("development").NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    ("development").NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (("development").NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        ("development").NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (("development").NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        ("development").NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  if (("development").NODE_ENV !== 'production') {
	    if (child.propsData && !vm) {
	      warn('propsData can only be used as an instantiation option.');
	    }
	  }
	  var options = {};
	  var key;
	  if (child['extends']) {
	    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (("development").NODE_ENV !== 'production' && warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}

	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */

	var shouldConvert = true;

	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */

	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}



	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE9: isIE9,
		isAndroid: isAndroid,
		isIos: isIos,
		isWechat: isWechat,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		get _Set () { return _Set; },
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {
	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initData().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (("development").NODE_ENV !== 'production') {
	  warnNonExistent = function (path, vm) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (("development").NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path, last);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (("development").NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path, obj);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var booleanLiteralRE = /^(?:true|false)$/;

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    ("development").NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    ("development").NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    ("development").NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.

	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue.length = 0;
	  userQueue.length = 0;
	  has = {};
	  circular = {};
	  waiting = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  var _again = true;

	  _function: while (_again) {
	    _again = false;

	    runBatcherQueue(queue);
	    runBatcherQueue(userQueue);
	    // user watchers triggered more watchers,
	    // keep flushing until it depletes
	    if (queue.length) {
	      _again = true;
	      continue _function;
	    }
	    // dev tool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	    resetBatcherState();
	  }
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (("development").NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	  queue.length = 0;
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (("development").NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (("development").NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      ("development").NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	};

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (("development").NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (("development").NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	var seenObjects = new _Set();
	function traverse(val, seen) {
	  var i = undefined,
	      keys = undefined;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  var isA = isArray(val);
	  var isO = isObject(val);
	  if (isA || isO) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) traverse(val[i], seen);
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) traverse(val[keys[i]], seen);
	    }
	  }
	}

	var text$1 = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}

	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);

	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment. However, iOS Safari has
	  // bug when using directly cloned template content with touch
	  // events and can cause crashes when the nodes are removed from DOM, so we
	  // have to treat template elements as string templates. (#2805)
	  /* istanbul ignore if */
	  if (isRealTemplate(node)) {
	    return stringToFragment(node.innerHTML);
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var IF = 2100;
	var FOR = 2200;
	var SLOT = 2300;

	var uid$3 = 0;

	var vFor = {

	  priority: FOR,
	  terminal: true,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      ("development").NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      var target = prevEl.nextSibling;
	      /* istanbul ignore if */
	      if (!target) {
	        // reset end anchor position in case the position was messed up
	        // by an external drag-n-drop library.
	        after(this.end, prevEl);
	        target = this.end;
	      }
	      frag.before(target);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = getTrackByKey(index, key, value, trackByKey);
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        ("development").NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          ("development").NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else if (Object.isExtensible(value)) {
	        def(value, id, frag);
	      } else if (("development").NODE_ENV !== 'production') {
	        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      ("development").NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	/**
	 * Get the track by key for an item.
	 *
	 * @param {Number} index
	 * @param {String} key
	 * @param {*} value
	 * @param {String} [trackByKey]
	 */

	function getTrackByKey(index, key, value, trackByKey) {
	  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	}

	if (("development").NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	  };
	}

	var vIf = {

	  priority: IF,
	  terminal: true,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      ("development").NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.value = _toString(value);
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var select = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      ("development").NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      ("development").NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on$1 = {

	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      ("development").NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        /* istanbul ignore if */
	        if (("development").NODE_ENV !== 'production') {
	          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	        }
	        value = value.replace(importantRE, '').trim();
	        this.el.style.setProperty(prop.kebab, value, isImportant);
	      } else {
	        this.el.style[prop.camel] = value;
	      }
	    } else {
	      this.el.style[prop.camel] = '';
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  if (camel !== 'filter' && camel in testEl.style) {
	    return {
	      kebab: prop,
	      camel: camel
	    };
	  }
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return {
	        kebab: prefixes[i] + prop,
	        camel: prefixed
	      };
	    }
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind$1 = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        ("development").NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (("development").NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;

	      if (el[attr] !== attrValue) {
	        el[attr] = attrValue;
	      }
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var ref = {
	  bind: function bind() {
	    ("development").NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	  }
	};

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (!value) {
	      this.cleanup();
	    } else if (typeof value === 'string') {
	      this.setClass(value.trim().split(/\s+/));
	    } else {
	      this.setClass(normalize$1(value));
	    }
	  },

	  setClass: function setClass(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val) {
	        apply(this.el, val, addClass);
	      }
	    }
	    this.prevKeys = value;
	  },

	  cleanup: function cleanup(value) {
	    var prevKeys = this.prevKeys;
	    if (!prevKeys) return;
	    var i = prevKeys.length;
	    while (i--) {
	      var key = prevKeys[i];
	      if (!value || value.indexOf(key) < 0) {
	        apply(this.el, key, removeClass);
	      }
	    }
	  }
	};

	/**
	 * Normalize objects and arrays (potentially containing objects)
	 * into array of strings.
	 *
	 * @param {Object|Array<String|Object>} value
	 * @return {Array<String>}
	 */

	function normalize$1(value) {
	  var res = [];
	  if (isArray(value)) {
	    for (var i = 0, l = value.length; i < l; i++) {
	      var _key = value[i];
	      if (_key) {
	        if (typeof _key === 'string') {
	          res.push(_key);
	        } else {
	          for (var k in _key) {
	            if (_key[k]) res.push(k);
	          }
	        }
	      }
	    }
	  } else if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) res.push(key);
	    }
	  }
	  return res;
	}

	/**
	 * Add or remove a class/classes on an element
	 *
	 * @param {Element} el
	 * @param {String} key The class name. This may or may not
	 *                     contain a space character, in such a
	 *                     case we'll deal with multiple class
	 *                     names at once.
	 * @param {Function} fn
	 */

	function apply(el, key, fn) {
	  key = key.trim();
	  if (key.indexOf(' ') === -1) {
	    fn(el, key);
	    return;
	  }
	  // The key contains one or more space characters.
	  // Since a class name doesn't accept such characters, we
	  // treat it as multiple classes.
	  var keys = key.split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    fn(el, keys[i]);
	  }
	}

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      this.el.removeAttribute(':is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      ("development").NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (("development").NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */

	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @param {Vue} vm
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions, vm) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (("development").NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.', vm);
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      ("development").NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (("development").NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (("development").NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.', vm);
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (("development").NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	      } else if (options.required) {
	        // warn missing required
	        warn('Missing required prop: ' + name, vm);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var inlineProps = vm.$options.propsData;
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (inlineProps && hasOwn(inlineProps, path)) {
	        initProp(vm, prop, inlineProps[path]);
	      }if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Process a prop with a rawValue, applying necessary coersions,
	 * default values & assertions and call the given callback with
	 * processed value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} rawValue
	 * @param {Function} fn
	 */

	function processPropValue(vm, prop, rawValue, fn) {
	  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	  var value = rawValue;
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop);
	  }
	  value = coerceProp(prop, value);
	  var coerced = value !== rawValue;
	  if (!assertProp(prop, value, vm)) {
	    value = undefined;
	  }
	  if (isSimple && !coerced) {
	    withoutConversion(function () {
	      fn(value);
	    });
	  } else {
	    fn(value);
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    defineReactive(vm, prop.path, value);
	  });
	}

	/**
	 * Update a prop's value on a vm.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function updateProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    vm[prop.path] = value;
	  });
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */

	function getPropDefaultValue(vm, prop) {
	  // no default, return undefined
	  var options = prop.options;
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    ("development").NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 * @param {Vue} vm
	 */

	function assertProp(prop, value, vm) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (("development").NODE_ENV !== 'production') {
	      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      ("development").NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  // coerce is a function
	  return coerce(value);
	}

	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */

	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = typeof value === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = typeof value === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = typeof value === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = typeof value === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = isPlainObject(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}

	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */

	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}

	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      updateProp(child, prop, val);
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */

	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (("development").NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {
	  var _this = this;

	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}

	var transition$1 = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (("development").NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (("development").NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props, vm);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (("development").NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && !isScript(node)) {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }

	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          modifiers = parseModifiers(attr.name);
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }

	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (("development").NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName, true);
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	function isScript(el) {
	  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        ("development").NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    ("development").NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */

	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (("development").NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.', vm.$parent);
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    var nodes = content.childNodes;
	    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	      return;
	    }
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node, true);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}



	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});

	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      ("development").NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      ("development").NODE_ENV !== 'production' && warn('data functions should return an object.', this);
	    }
	    var props = this._props;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key)) {
	        this._proxy(key);
	      } else if (("development").NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	      }
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, value, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        // force the expression into a statement so that
	        // it always dynamically resolves the method to call (#2670)
	        // kinda ugly hack, but does the job.
	        value = attrs[i].value;
	        if (isSimplePath(value)) {
	          value += '.apply(this, $arguments)';
	        }
	        handler = (vm._scope || vm._context).$eval(value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        ("development").NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (("development").NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (("development").NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (("development").NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // resolve slot distribution
	    resolveSlots(this, options._content);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data && this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name, true);
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value, true);
	    }
	    /* istanbul ignore if */
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          ("development").NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	var filterRE$1 = /[^|]\|[^|]/;

	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      ("development").NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var slot = {

	  priority: SLOT,
	  params: ['name'],

	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String|Array<String>|Function} ...sortKeys
	 * @param {Number} [order]
	 */

	function orderBy(arr) {
	  var comparator = null;
	  var sortKeys = undefined;
	  arr = convertArray(arr);

	  // determine order (last argument)
	  var args = toArray(arguments, 1);
	  var order = args[args.length - 1];
	  if (typeof order === 'number') {
	    order = order < 0 ? -1 : 1;
	    args = args.length > 1 ? args.slice(0, -1) : args;
	  } else {
	    order = 1;
	  }

	  // determine sortKeys & comparator
	  var firstArg = args[0];
	  if (!firstArg) {
	    return arr;
	  } else if (typeof firstArg === 'function') {
	    // custom comparator
	    comparator = function (a, b) {
	      return firstArg(a, b) * order;
	    };
	  } else {
	    // string keys. flatten first
	    sortKeys = Array.prototype.concat.apply([], args);
	    comparator = function (a, b, i) {
	      i = i || 0;
	      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	    };
	  }

	  function baseCompare(a, b, sortKeyIndex) {
	    var sortKey = sortKeys[sortKeyIndex];
	    if (sortKey) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	    }
	    return a === b ? 0 : a > b ? order : -order;
	  }

	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(comparator);
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   * @param {Number} decimals Decimal places
	   */

	  currency: function currency(value, _currency, decimals) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    decimals = decimals != null ? decimals : 2;
	    var stringified = Math.abs(value).toFixed(decimals);
	    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = decimals ? stringified.slice(-1 - decimals) : '';
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */

	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (("development").NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (("development").NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });

	  // expose internal transition API
	  extend(Vue.transition, transition);
	}

	installGlobalAPI(Vue);

	Vue.version = '1.0.24';

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue);
	    } else if (("development").NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	    }
	  }
	}, 0);

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	var Vue // late bind
	var map = Object.create(null)
	var shimmed = false
	var isBrowserify = false

	/**
	 * Determine compatibility and apply patch.
	 *
	 * @param {Function} vue
	 * @param {Boolean} browserify
	 */

	exports.install = function (vue, browserify) {
	  if (shimmed) return
	  shimmed = true

	  Vue = vue
	  isBrowserify = browserify

	  exports.compatible = !!Vue.internalDirectives
	  if (!exports.compatible) {
	    console.warn(
	      '[HMR] vue-loader hot reload is only compatible with ' +
	      'Vue.js 1.0.0+.'
	    )
	    return
	  }

	  // patch view directive
	  patchView(Vue.internalDirectives.component)
	  console.log('[HMR] Vue component hot reload shim applied.')
	  // shim router-view if present
	  var routerView = Vue.elementDirective('router-view')
	  if (routerView) {
	    patchView(routerView)
	    console.log('[HMR] vue-router <router-view> hot reload shim applied.')
	  }
	}

	/**
	 * Shim the view directive (component or router-view).
	 *
	 * @param {Object} View
	 */

	function patchView (View) {
	  var unbuild = View.unbuild
	  View.unbuild = function (defer) {
	    if (!this.hotUpdating) {
	      var prevComponent = this.childVM && this.childVM.constructor
	      removeView(prevComponent, this)
	      // defer = true means we are transitioning to a new
	      // Component. Register this new component to the list.
	      if (defer) {
	        addView(this.Component, this)
	      }
	    }
	    // call original
	    return unbuild.call(this, defer)
	  }
	}

	/**
	 * Add a component view to a Component's hot list
	 *
	 * @param {Function} Component
	 * @param {Directive} view - view directive instance
	 */

	function addView (Component, view) {
	  var id = Component && Component.options.hotID
	  if (id) {
	    if (!map[id]) {
	      map[id] = {
	        Component: Component,
	        views: [],
	        instances: []
	      }
	    }
	    map[id].views.push(view)
	  }
	}

	/**
	 * Remove a component view from a Component's hot list
	 *
	 * @param {Function} Component
	 * @param {Directive} view - view directive instance
	 */

	function removeView (Component, view) {
	  var id = Component && Component.options.hotID
	  if (id) {
	    map[id].views.$remove(view)
	  }
	}

	/**
	 * Create a record for a hot module, which keeps track of its construcotr,
	 * instnaces and views (component directives or router-views).
	 *
	 * @param {String} id
	 * @param {Object} options
	 */

	exports.createRecord = function (id, options) {
	  if (typeof options === 'function') {
	    options = options.options
	  }
	  if (typeof options.el !== 'string' && typeof options.data !== 'object') {
	    makeOptionsHot(id, options)
	    map[id] = {
	      Component: null,
	      views: [],
	      instances: []
	    }
	  }
	}

	/**
	 * Make a Component options object hot.
	 *
	 * @param {String} id
	 * @param {Object} options
	 */

	function makeOptionsHot (id, options) {
	  options.hotID = id
	  injectHook(options, 'created', function () {
	    var record = map[id]
	    if (!record.Component) {
	      record.Component = this.constructor
	    }
	    record.instances.push(this)
	  })
	  injectHook(options, 'beforeDestroy', function () {
	    map[id].instances.$remove(this)
	  })
	}

	/**
	 * Inject a hook to a hot reloadable component so that
	 * we can keep track of it.
	 *
	 * @param {Object} options
	 * @param {String} name
	 * @param {Function} hook
	 */

	function injectHook (options, name, hook) {
	  var existing = options[name]
	  options[name] = existing
	    ? Array.isArray(existing)
	      ? existing.concat(hook)
	      : [existing, hook]
	    : [hook]
	}

	/**
	 * Update a hot component.
	 *
	 * @param {String} id
	 * @param {Object|null} newOptions
	 * @param {String|null} newTemplate
	 */

	exports.update = function (id, newOptions, newTemplate) {
	  var record = map[id]
	  // force full-reload if an instance of the component is active but is not
	  // managed by a view
	  if (!record || (record.instances.length && !record.views.length)) {
	    console.log('[HMR] Root or manually-mounted instance modified. Full reload may be required.')
	    if (!isBrowserify) {
	      window.location.reload()
	    } else {
	      // browserify-hmr somehow sends incomplete bundle if we reload here
	      return
	    }
	  }
	  if (!isBrowserify) {
	    // browserify-hmr already logs this
	    console.log('[HMR] Updating component: ' + format(id))
	  }
	  var Component = record.Component
	  // update constructor
	  if (newOptions) {
	    // in case the user exports a constructor
	    Component = record.Component = typeof newOptions === 'function'
	      ? newOptions
	      : Vue.extend(newOptions)
	    makeOptionsHot(id, Component.options)
	  }
	  if (newTemplate) {
	    Component.options.template = newTemplate
	  }
	  // handle recursive lookup
	  if (Component.options.name) {
	    Component.options.components[Component.options.name] = Component
	  }
	  // reset constructor cached linker
	  Component.linker = null
	  // reload all views
	  record.views.forEach(function (view) {
	    updateView(view, Component)
	  })
	  // flush devtools
	  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush')
	  }
	}

	/**
	 * Update a component view instance
	 *
	 * @param {Directive} view
	 * @param {Function} Component
	 */

	function updateView (view, Component) {
	  if (!view._bound) {
	    return
	  }
	  view.Component = Component
	  view.hotUpdating = true
	  // disable transitions
	  view.vm._isCompiled = false
	  // save state
	  var state = extractState(view.childVM)
	  // remount, make sure to disable keep-alive
	  var keepAlive = view.keepAlive
	  view.keepAlive = false
	  view.mountComponent()
	  view.keepAlive = keepAlive
	  // restore state
	  restoreState(view.childVM, state, true)
	  // re-eanble transitions
	  view.vm._isCompiled = true
	  view.hotUpdating = false
	}

	/**
	 * Extract state from a Vue instance.
	 *
	 * @param {Vue} vm
	 * @return {Object}
	 */

	function extractState (vm) {
	  return {
	    cid: vm.constructor.cid,
	    data: vm.$data,
	    children: vm.$children.map(extractState)
	  }
	}

	/**
	 * Restore state to a reloaded Vue instance.
	 *
	 * @param {Vue} vm
	 * @param {Object} state
	 */

	function restoreState (vm, state, isRoot) {
	  var oldAsyncConfig
	  if (isRoot) {
	    // set Vue into sync mode during state rehydration
	    oldAsyncConfig = Vue.config.async
	    Vue.config.async = false
	  }
	  // actual restore
	  if (isRoot || !vm._props) {
	    vm.$data = state.data
	  } else {
	    Object.keys(state.data).forEach(function (key) {
	      if (!vm._props[key]) {
	        // for non-root, only restore non-props fields
	        vm.$data[key] = state.data[key]
	      }
	    })
	  }
	  // verify child consistency
	  var hasSameChildren = vm.$children.every(function (c, i) {
	    return state.children[i] && state.children[i].cid === c.constructor.cid
	  })
	  if (hasSameChildren) {
	    // rehydrate children
	    vm.$children.forEach(function (c, i) {
	      restoreState(c, state.children[i])
	    })
	  }
	  if (isRoot) {
	    Vue.config.async = oldAsyncConfig
	  }
	}

	function format (id) {
	  return id.match(/[^\/]+\.vue$/)[0]
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var obj = {
	  back: function back(vm, param, cb) {
	    var hBack = vm.$els.back;
	    var rootVm = vm.$root;
	    Hammer(hBack).on('tap', function () {
	      if (obj.isTranslate(vm)) {
	        return;
	      }
	      if (hBack.disabled) return;

	      rootVm.$el.classList.add('art');
	      if (param) {
	        rootVm.$el.classList.add('detail');
	      }
	      if (cb) {
	        cb();
	      }
	      vm.show = false;
	      vm.$parent[param ? param : 'pts'] = vm.pts;
	    });
	  },
	  isTranslate: function isTranslate(vm) {
	    return vm.$root.isTranslate;
	  },
	  getUser: function getUser(cb) {
	    var t = this;
	    utils.ajax({
	      url: config.URL + 'test.php',
	      type: 'post',
	      dataType: 'json',
	      data: {},
	      success: function success(res) {
	        if (cb) {
	          cb(res);
	        }
	      },
	      error: function error(xhr) {}
	    });
	  },
	  getBet: function getBet(cb) {
	    var t = this;
	    utils.ajax({
	      url: config.URL + 'test.php',
	      type: 'post',
	      dataType: 'json',
	      data: {},
	      success: function success(res) {
	        if (cb) {
	          cb(res);
	        }
	      },
	      error: function error(xhr) {}
	    });
	  }
	};
	exports.default = obj;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(74)
	  , defined = __webpack_require__(19);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(12)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(10)
	  , createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(8) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(14)
	  , IE8_DOM_DEFINE = __webpack_require__(38)
	  , toPrimitive    = __webpack_require__(29)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(27)('wks')
	  , uid        = __webpack_require__(18)
	  , Symbol     = __webpack_require__(4).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(42)
	  , enumBugKeys = __webpack_require__(20);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , core      = __webpack_require__(7)
	  , ctx       = __webpack_require__(71)
	  , hide      = __webpack_require__(9)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(14)
	  , dPs         = __webpack_require__(80)
	  , enumBugKeys = __webpack_require__(20)
	  , IE_PROTO    = __webpack_require__(26)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(37)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(73).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(10).f
	  , has = __webpack_require__(5)
	  , TAG = __webpack_require__(11)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(27)('keys')
	  , uid    = __webpack_require__(18);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(16);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(4)
	  , core           = __webpack_require__(7)
	  , LIBRARY        = __webpack_require__(22)
	  , wksExt         = __webpack_require__(31)
	  , defineProperty = __webpack_require__(10).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(11);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _create = __webpack_require__(60);

	var _create2 = _interopRequireDefault(_create);

	var _keys = __webpack_require__(61);

	var _keys2 = _interopRequireDefault(_keys);

	var _typeof2 = __webpack_require__(35);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function (global, factory) {
	    ( false ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : typeof define === "function" && define.cmd ? define(factory) : global['Hammer'] = factory();
	})(undefined, function () {
	    'use strict';

	    var exportName = 'Hammer';
	    var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
	    var TEST_ELEMENT = document.createElement('div');

	    var TYPE_FUNCTION = 'function';

	    var round = Math.round;
	    var abs = Math.abs;
	    var now = Date.now;

	    function setTimeoutContext(fn, timeout, context) {
	        return setTimeout(bindFn(fn, context), timeout);
	    }

	    function invokeArrayArg(arg, fn, context) {
	        if (Array.isArray(arg)) {
	            each(arg, context[fn], context);
	            return true;
	        }
	        return false;
	    }

	    function each(obj, iterator, context) {
	        var i;

	        if (!obj) {
	            return;
	        }

	        if (obj.forEach) {
	            obj.forEach(iterator, context);
	        } else if (obj.length !== undefined) {
	            i = 0;
	            while (i < obj.length) {
	                iterator.call(context, obj[i], i, obj);
	                i++;
	            }
	        } else {
	            for (i in obj) {
	                obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	            }
	        }
	    }

	    function extend(dest, src, merge) {
	        var keys = (0, _keys2.default)(src);
	        var i = 0;
	        while (i < keys.length) {
	            if (!merge || merge && dest[keys[i]] === undefined) {
	                dest[keys[i]] = src[keys[i]];
	            }
	            i++;
	        }
	        return dest;
	    }

	    function merge(dest, src) {
	        return extend(dest, src, true);
	    }

	    function inherit(child, base, properties) {
	        var baseP = base.prototype,
	            childP;

	        childP = child.prototype = (0, _create2.default)(baseP);
	        childP.constructor = child;
	        childP._super = baseP;

	        if (properties) {
	            extend(childP, properties);
	        }
	    }

	    function bindFn(fn, context) {
	        return function boundFn() {
	            return fn.apply(context, arguments);
	        };
	    }

	    function boolOrFn(val, args) {
	        if ((typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) == TYPE_FUNCTION) {
	            return val.apply(args ? args[0] || undefined : undefined, args);
	        }
	        return val;
	    }

	    function ifUndefined(val1, val2) {
	        return val1 === undefined ? val2 : val1;
	    }

	    function addEventListeners(target, types, handler) {
	        each(splitStr(types), function (type) {
	            target.addEventListener(type, handler, false);
	        });
	    }

	    function removeEventListeners(target, types, handler) {
	        each(splitStr(types), function (type) {
	            target.removeEventListener(type, handler, false);
	        });
	    }

	    function hasParent(node, parent) {
	        while (node) {
	            if (node == parent) {
	                return true;
	            }
	            node = node.parentNode;
	        }
	        return false;
	    }

	    function inStr(str, find) {
	        return str.indexOf(find) > -1;
	    }

	    function splitStr(str) {
	        return str.trim().split(/\s+/g);
	    }

	    function inArray(src, find, findByKey) {
	        if (src.indexOf && !findByKey) {
	            return src.indexOf(find);
	        } else {
	            var i = 0;
	            while (i < src.length) {
	                if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
	                    return i;
	                }
	                i++;
	            }
	            return -1;
	        }
	    }

	    function toArray(obj) {
	        return Array.prototype.slice.call(obj, 0);
	    }

	    function uniqueArray(src, key, sort) {
	        var results = [];
	        var values = [];
	        var i = 0;

	        while (i < src.length) {
	            var val = key ? src[i][key] : src[i];
	            if (inArray(values, val) < 0) {
	                results.push(src[i]);
	            }
	            values[i] = val;
	            i++;
	        }

	        if (sort) {
	            if (!key) {
	                results = results.sort();
	            } else {
	                results = results.sort(function sortUniqueArray(a, b) {
	                    return a[key] > b[key];
	                });
	            }
	        }

	        return results;
	    }

	    function prefixed(obj, property) {
	        var prefix, prop;
	        var camelProp = property[0].toUpperCase() + property.slice(1);

	        var i = 0;
	        while (i < VENDOR_PREFIXES.length) {
	            prefix = VENDOR_PREFIXES[i];
	            prop = prefix ? prefix + camelProp : property;

	            if (prop in obj) {
	                return prop;
	            }
	            i++;
	        }
	        return undefined;
	    }

	    var _uniqueId = 1;
	    function uniqueId() {
	        return _uniqueId++;
	    }

	    function getWindowForElement(element) {
	        var doc = element.ownerDocument;
	        return doc.defaultView || doc.parentWindow;
	    }

	    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	    var SUPPORT_TOUCH = 'ontouchstart' in window;
	    var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

	    var INPUT_TYPE_TOUCH = 'touch';
	    var INPUT_TYPE_PEN = 'pen';
	    var INPUT_TYPE_MOUSE = 'mouse';
	    var INPUT_TYPE_KINECT = 'kinect';

	    var COMPUTE_INTERVAL = 25;

	    var INPUT_START = 1;
	    var INPUT_MOVE = 2;
	    var INPUT_END = 4;
	    var INPUT_CANCEL = 8;

	    var DIRECTION_NONE = 1;
	    var DIRECTION_LEFT = 2;
	    var DIRECTION_RIGHT = 4;
	    var DIRECTION_UP = 8;
	    var DIRECTION_DOWN = 16;

	    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

	    var PROPS_XY = ['x', 'y'];
	    var PROPS_CLIENT_XY = ['clientX', 'clientY'];

	    function Input(manager, callback) {
	        var self = this;
	        this.manager = manager;
	        this.callback = callback;
	        this.element = manager.element;
	        this.target = manager.options.inputTarget;

	        this.domHandler = function (ev) {
	            if (boolOrFn(manager.options.enable, [manager])) {
	                self.handler(ev);
	            }
	        };

	        this.init();
	    }

	    Input.prototype = {
	        handler: function handler() {},

	        init: function init() {
	            this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	            this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	            this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	        },

	        destroy: function destroy() {
	            this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	            this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	            this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	        }
	    };

	    function createInputInstance(manager) {
	        var Type;
	        var inputClass = manager.options.inputClass;

	        if (inputClass) {
	            Type = inputClass;
	        } else if (SUPPORT_POINTER_EVENTS) {
	            Type = PointerEventInput;
	        } else if (SUPPORT_ONLY_TOUCH) {
	            Type = TouchInput;
	        } else if (!SUPPORT_TOUCH) {
	            Type = MouseInput;
	        } else {
	            Type = TouchMouseInput;
	        }
	        return new Type(manager, inputHandler);
	    }

	    function inputHandler(manager, eventType, input) {
	        var pointersLen = input.pointers.length;
	        var changedPointersLen = input.changedPointers.length;
	        var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
	        var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;

	        input.isFirst = !!isFirst;
	        input.isFinal = !!isFinal;

	        if (isFirst) {
	            manager.session = {};
	        }

	        input.eventType = eventType;

	        computeInputData(manager, input);

	        manager.emit('hammer.input', input);

	        manager.recognize(input);
	        manager.session.prevInput = input;
	    }

	    function computeInputData(manager, input) {
	        var session = manager.session;
	        var pointers = input.pointers;
	        var pointersLength = pointers.length;

	        if (!session.firstInput) {
	            session.firstInput = simpleCloneInputData(input);
	        }

	        if (pointersLength > 1 && !session.firstMultiple) {
	            session.firstMultiple = simpleCloneInputData(input);
	        } else if (pointersLength === 1) {
	            session.firstMultiple = false;
	        }

	        var firstInput = session.firstInput;
	        var firstMultiple = session.firstMultiple;
	        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

	        var center = input.center = getCenter(pointers);
	        input.timeStamp = now();
	        input.deltaTime = input.timeStamp - firstInput.timeStamp;

	        input.angle = getAngle(offsetCenter, center);
	        input.distance = getDistance(offsetCenter, center);

	        computeDeltaXY(session, input);
	        input.offsetDirection = getDirection(input.deltaX, input.deltaY);

	        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

	        computeIntervalInputData(session, input);

	        var target = manager.element;
	        if (hasParent(input.srcEvent.target, target)) {
	            target = input.srcEvent.target;
	        }
	        input.target = target;
	    }

	    function computeDeltaXY(session, input) {
	        var center = input.center;
	        var offset = session.offsetDelta || {};
	        var prevDelta = session.prevDelta || {};
	        var prevInput = session.prevInput || {};

	        if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	            prevDelta = session.prevDelta = {
	                x: prevInput.deltaX || 0,
	                y: prevInput.deltaY || 0
	            };

	            offset = session.offsetDelta = {
	                x: center.x,
	                y: center.y
	            };
	        }

	        input.deltaX = prevDelta.x + (center.x - offset.x);
	        input.deltaY = prevDelta.y + (center.y - offset.y);
	    }

	    function computeIntervalInputData(session, input) {
	        var last = session.lastInterval || input,
	            deltaTime = input.timeStamp - last.timeStamp,
	            velocity,
	            velocityX,
	            velocityY,
	            direction;

	        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	            var deltaX = last.deltaX - input.deltaX;
	            var deltaY = last.deltaY - input.deltaY;

	            var v = getVelocity(deltaTime, deltaX, deltaY);
	            velocityX = v.x;
	            velocityY = v.y;
	            velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
	            direction = getDirection(deltaX, deltaY);

	            session.lastInterval = input;
	        } else {
	            velocity = last.velocity;
	            velocityX = last.velocityX;
	            velocityY = last.velocityY;
	            direction = last.direction;
	        }

	        input.velocity = velocity;
	        input.velocityX = velocityX;
	        input.velocityY = velocityY;
	        input.direction = direction;
	    }

	    function simpleCloneInputData(input) {
	        var pointers = [];
	        var i = 0;
	        while (i < input.pointers.length) {
	            pointers[i] = {
	                clientX: round(input.pointers[i].clientX),
	                clientY: round(input.pointers[i].clientY)
	            };
	            i++;
	        }

	        return {
	            timeStamp: now(),
	            pointers: pointers,
	            center: getCenter(pointers),
	            deltaX: input.deltaX,
	            deltaY: input.deltaY
	        };
	    }

	    function getCenter(pointers) {
	        var pointersLength = pointers.length;

	        if (pointersLength === 1) {
	            return {
	                x: round(pointers[0].clientX),
	                y: round(pointers[0].clientY)
	            };
	        }

	        var x = 0,
	            y = 0,
	            i = 0;
	        while (i < pointersLength) {
	            x += pointers[i].clientX;
	            y += pointers[i].clientY;
	            i++;
	        }

	        return {
	            x: round(x / pointersLength),
	            y: round(y / pointersLength)
	        };
	    }

	    function getVelocity(deltaTime, x, y) {
	        return {
	            x: x / deltaTime || 0,
	            y: y / deltaTime || 0
	        };
	    }

	    function getDirection(x, y) {
	        if (x === y) {
	            return DIRECTION_NONE;
	        }

	        if (abs(x) >= abs(y)) {
	            return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	        }
	        return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
	    }

	    function getDistance(p1, p2, props) {
	        if (!props) {
	            props = PROPS_XY;
	        }
	        var x = p2[props[0]] - p1[props[0]],
	            y = p2[props[1]] - p1[props[1]];

	        return Math.sqrt(x * x + y * y);
	    }

	    function getAngle(p1, p2, props) {
	        if (!props) {
	            props = PROPS_XY;
	        }
	        var x = p2[props[0]] - p1[props[0]],
	            y = p2[props[1]] - p1[props[1]];
	        return Math.atan2(y, x) * 180 / Math.PI;
	    }

	    function getRotation(start, end) {
	        return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
	    }

	    function getScale(start, end) {
	        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	    }

	    var MOUSE_INPUT_MAP = {
	        mousedown: INPUT_START,
	        mousemove: INPUT_MOVE,
	        mouseup: INPUT_END
	    };

	    var MOUSE_ELEMENT_EVENTS = 'mousedown';
	    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

	    function MouseInput() {
	        this.evEl = MOUSE_ELEMENT_EVENTS;
	        this.evWin = MOUSE_WINDOW_EVENTS;

	        this.allow = true;
	        this.pressed = false;

	        Input.apply(this, arguments);
	    }

	    inherit(MouseInput, Input, {
	        handler: function MEhandler(ev) {
	            var eventType = MOUSE_INPUT_MAP[ev.type];

	            if (eventType & INPUT_START && ev.button === 0) {
	                this.pressed = true;
	            }

	            if (eventType & INPUT_MOVE && ev.which !== 1) {
	                eventType = INPUT_END;
	            }

	            if (!this.pressed || !this.allow) {
	                return;
	            }

	            if (eventType & INPUT_END) {
	                this.pressed = false;
	            }

	            this.callback(this.manager, eventType, {
	                pointers: [ev],
	                changedPointers: [ev],
	                pointerType: INPUT_TYPE_MOUSE,
	                srcEvent: ev
	            });
	        }
	    });

	    var POINTER_INPUT_MAP = {
	        pointerdown: INPUT_START,
	        pointermove: INPUT_MOVE,
	        pointerup: INPUT_END,
	        pointercancel: INPUT_CANCEL,
	        pointerout: INPUT_CANCEL
	    };

	    var IE10_POINTER_TYPE_ENUM = {
	        2: INPUT_TYPE_TOUCH,
	        3: INPUT_TYPE_PEN,
	        4: INPUT_TYPE_MOUSE,
	        5: INPUT_TYPE_KINECT };

	    var POINTER_ELEMENT_EVENTS = 'pointerdown';
	    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

	    if (window.MSPointerEvent) {
	        POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	        POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	    }

	    function PointerEventInput() {
	        this.evEl = POINTER_ELEMENT_EVENTS;
	        this.evWin = POINTER_WINDOW_EVENTS;

	        Input.apply(this, arguments);

	        this.store = this.manager.session.pointerEvents = [];
	    }

	    inherit(PointerEventInput, Input, {
	        handler: function PEhandler(ev) {
	            var store = this.store;
	            var removePointer = false;

	            var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	            var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	            var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

	            var isTouch = pointerType == INPUT_TYPE_TOUCH;

	            var storeIndex = inArray(store, ev.pointerId, 'pointerId');

	            if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	                if (storeIndex < 0) {
	                    store.push(ev);
	                    storeIndex = store.length - 1;
	                }
	            } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	                removePointer = true;
	            }

	            if (storeIndex < 0) {
	                return;
	            }

	            store[storeIndex] = ev;

	            this.callback(this.manager, eventType, {
	                pointers: store,
	                changedPointers: [ev],
	                pointerType: pointerType,
	                srcEvent: ev
	            });

	            if (removePointer) {
	                store.splice(storeIndex, 1);
	            }
	        }
	    });

	    var SINGLE_TOUCH_INPUT_MAP = {
	        touchstart: INPUT_START,
	        touchmove: INPUT_MOVE,
	        touchend: INPUT_END,
	        touchcancel: INPUT_CANCEL
	    };

	    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

	    function SingleTouchInput() {
	        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	        this.started = false;

	        Input.apply(this, arguments);
	    }

	    inherit(SingleTouchInput, Input, {
	        handler: function TEhandler(ev) {
	            var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

	            if (type === INPUT_START) {
	                this.started = true;
	            }

	            if (!this.started) {
	                return;
	            }

	            var touches = normalizeSingleTouches.call(this, ev, type);

	            if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	                this.started = false;
	            }

	            this.callback(this.manager, type, {
	                pointers: touches[0],
	                changedPointers: touches[1],
	                pointerType: INPUT_TYPE_TOUCH,
	                srcEvent: ev
	            });
	        }
	    });

	    function normalizeSingleTouches(ev, type) {
	        var all = toArray(ev.touches);
	        var changed = toArray(ev.changedTouches);

	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            all = uniqueArray(all.concat(changed), 'identifier', true);
	        }

	        return [all, changed];
	    }

	    var TOUCH_INPUT_MAP = {
	        touchstart: INPUT_START,
	        touchmove: INPUT_MOVE,
	        touchend: INPUT_END,
	        touchcancel: INPUT_CANCEL
	    };

	    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

	    function TouchInput() {
	        this.evTarget = TOUCH_TARGET_EVENTS;
	        this.targetIds = {};

	        Input.apply(this, arguments);
	    }

	    inherit(TouchInput, Input, {
	        handler: function MTEhandler(ev) {
	            var type = TOUCH_INPUT_MAP[ev.type];
	            var touches = getTouches.call(this, ev, type);
	            if (!touches) {
	                return;
	            }

	            this.callback(this.manager, type, {
	                pointers: touches[0],
	                changedPointers: touches[1],
	                pointerType: INPUT_TYPE_TOUCH,
	                srcEvent: ev
	            });
	        }
	    });

	    function getTouches(ev, type) {
	        var allTouches = toArray(ev.touches);
	        var targetIds = this.targetIds;

	        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	            targetIds[allTouches[0].identifier] = true;
	            return [allTouches, allTouches];
	        }

	        var i,
	            targetTouches,
	            changedTouches = toArray(ev.changedTouches),
	            changedTargetTouches = [],
	            target = this.target;

	        targetTouches = allTouches.filter(function (touch) {
	            return hasParent(touch.target, target);
	        });

	        if (type === INPUT_START) {
	            i = 0;
	            while (i < targetTouches.length) {
	                targetIds[targetTouches[i].identifier] = true;
	                i++;
	            }
	        }

	        i = 0;
	        while (i < changedTouches.length) {
	            if (targetIds[changedTouches[i].identifier]) {
	                changedTargetTouches.push(changedTouches[i]);
	            }

	            if (type & (INPUT_END | INPUT_CANCEL)) {
	                delete targetIds[changedTouches[i].identifier];
	            }
	            i++;
	        }

	        if (!changedTargetTouches.length) {
	            return;
	        }

	        return [uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
	    }

	    function TouchMouseInput() {
	        Input.apply(this, arguments);

	        var handler = bindFn(this.handler, this);
	        this.touch = new TouchInput(this.manager, handler);
	        this.mouse = new MouseInput(this.manager, handler);
	    }

	    inherit(TouchMouseInput, Input, {
	        handler: function TMEhandler(manager, inputEvent, inputData) {
	            var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
	                isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

	            if (isTouch) {
	                this.mouse.allow = false;
	            } else if (isMouse && !this.mouse.allow) {
	                return;
	            }

	            if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
	                this.mouse.allow = true;
	            }

	            this.callback(manager, inputEvent, inputData);
	        },

	        destroy: function destroy() {
	            this.touch.destroy();
	            this.mouse.destroy();
	        }
	    });

	    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

	    var TOUCH_ACTION_COMPUTE = 'compute';
	    var TOUCH_ACTION_AUTO = 'auto';
	    var TOUCH_ACTION_MANIPULATION = 'manipulation';
	    var TOUCH_ACTION_NONE = 'none';
	    var TOUCH_ACTION_PAN_X = 'pan-x';
	    var TOUCH_ACTION_PAN_Y = 'pan-y';

	    function TouchAction(manager, value) {
	        this.manager = manager;
	        this.set(value);
	    }

	    TouchAction.prototype = {
	        set: function set(value) {
	            if (value == TOUCH_ACTION_COMPUTE) {
	                value = this.compute();
	            }

	            if (NATIVE_TOUCH_ACTION) {
	                this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	            }
	            this.actions = value.toLowerCase().trim();
	        },

	        update: function update() {
	            this.set(this.manager.options.touchAction);
	        },

	        compute: function compute() {
	            var actions = [];
	            each(this.manager.recognizers, function (recognizer) {
	                if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                    actions = actions.concat(recognizer.getTouchAction());
	                }
	            });
	            return cleanTouchActions(actions.join(' '));
	        },

	        preventDefaults: function preventDefaults(input) {
	            if (NATIVE_TOUCH_ACTION) {
	                return;
	            }

	            var srcEvent = input.srcEvent;
	            var direction = input.offsetDirection;

	            if (this.manager.session.prevented) {
	                srcEvent.preventDefault();
	                return;
	            }

	            var actions = this.actions;
	            var hasNone = inStr(actions, TOUCH_ACTION_NONE);
	            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);

	            if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
	                return this.preventSrc(srcEvent);
	            }
	        },

	        preventSrc: function preventSrc(srcEvent) {
	            this.manager.session.prevented = true;
	            srcEvent.preventDefault();
	        }
	    };

	    function cleanTouchActions(actions) {
	        if (inStr(actions, TOUCH_ACTION_NONE)) {
	            return TOUCH_ACTION_NONE;
	        }

	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

	        if (hasPanX && hasPanY) {
	            return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;
	        }

	        if (hasPanX || hasPanY) {
	            return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	        }

	        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	            return TOUCH_ACTION_MANIPULATION;
	        }

	        return TOUCH_ACTION_AUTO;
	    }

	    var STATE_POSSIBLE = 1;
	    var STATE_BEGAN = 2;
	    var STATE_CHANGED = 4;
	    var STATE_ENDED = 8;
	    var STATE_RECOGNIZED = STATE_ENDED;
	    var STATE_CANCELLED = 16;
	    var STATE_FAILED = 32;

	    function Recognizer(options) {
	        this.id = uniqueId();

	        this.manager = null;
	        this.options = merge(options || {}, this.defaults);

	        this.options.enable = ifUndefined(this.options.enable, true);

	        this.state = STATE_POSSIBLE;

	        this.simultaneous = {};
	        this.requireFail = [];
	    }

	    Recognizer.prototype = {
	        defaults: {},

	        set: function set(options) {
	            extend(this.options, options);

	            this.manager && this.manager.touchAction.update();
	            return this;
	        },

	        recognizeWith: function recognizeWith(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	                return this;
	            }

	            var simultaneous = this.simultaneous;
	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            if (!simultaneous[otherRecognizer.id]) {
	                simultaneous[otherRecognizer.id] = otherRecognizer;
	                otherRecognizer.recognizeWith(this);
	            }
	            return this;
	        },

	        dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	                return this;
	            }

	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            delete this.simultaneous[otherRecognizer.id];
	            return this;
	        },

	        requireFailure: function requireFailure(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	                return this;
	            }

	            var requireFail = this.requireFail;
	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            if (inArray(requireFail, otherRecognizer) === -1) {
	                requireFail.push(otherRecognizer);
	                otherRecognizer.requireFailure(this);
	            }
	            return this;
	        },

	        dropRequireFailure: function dropRequireFailure(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	                return this;
	            }

	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            var index = inArray(this.requireFail, otherRecognizer);
	            if (index > -1) {
	                this.requireFail.splice(index, 1);
	            }
	            return this;
	        },

	        hasRequireFailures: function hasRequireFailures() {
	            return this.requireFail.length > 0;
	        },

	        canRecognizeWith: function canRecognizeWith(otherRecognizer) {
	            return !!this.simultaneous[otherRecognizer.id];
	        },

	        emit: function emit(input) {
	            var self = this;
	            var state = this.state;

	            function emit(withState) {
	                self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);
	            }

	            if (state < STATE_ENDED) {
	                emit(true);
	            }

	            emit();
	            if (state >= STATE_ENDED) {
	                emit(true);
	            }
	        },

	        tryEmit: function tryEmit(input) {
	            if (this.canEmit()) {
	                return this.emit(input);
	            }

	            this.state = STATE_FAILED;
	        },

	        canEmit: function canEmit() {
	            var i = 0;
	            while (i < this.requireFail.length) {
	                if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                    return false;
	                }
	                i++;
	            }
	            return true;
	        },

	        recognize: function recognize(inputData) {
	            var inputDataClone = extend({}, inputData);

	            if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	                this.reset();
	                this.state = STATE_FAILED;
	                return;
	            }

	            if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	                this.state = STATE_POSSIBLE;
	            }

	            this.state = this.process(inputDataClone);

	            if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	                this.tryEmit(inputDataClone);
	            }
	        },

	        process: function process(inputData) {},
	        getTouchAction: function getTouchAction() {},

	        reset: function reset() {}
	    };

	    function stateStr(state) {
	        if (state & STATE_CANCELLED) {
	            return 'cancel';
	        } else if (state & STATE_ENDED) {
	            return 'end';
	        } else if (state & STATE_CHANGED) {
	            return 'move';
	        } else if (state & STATE_BEGAN) {
	            return 'start';
	        }
	        return '';
	    }

	    function directionStr(direction) {
	        if (direction == DIRECTION_DOWN) {
	            return 'down';
	        } else if (direction == DIRECTION_UP) {
	            return 'up';
	        } else if (direction == DIRECTION_LEFT) {
	            return 'left';
	        } else if (direction == DIRECTION_RIGHT) {
	            return 'right';
	        }
	        return '';
	    }

	    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	        var manager = recognizer.manager;
	        if (manager) {
	            return manager.get(otherRecognizer);
	        }
	        return otherRecognizer;
	    }

	    function AttrRecognizer() {
	        Recognizer.apply(this, arguments);
	    }

	    inherit(AttrRecognizer, Recognizer, {
	        defaults: {
	            pointers: 1
	        },

	        attrTest: function attrTest(input) {
	            var optionPointers = this.options.pointers;
	            return optionPointers === 0 || input.pointers.length === optionPointers;
	        },

	        process: function process(input) {
	            var state = this.state;
	            var eventType = input.eventType;

	            var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	            var isValid = this.attrTest(input);

	            if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	                return state | STATE_CANCELLED;
	            } else if (isRecognized || isValid) {
	                if (eventType & INPUT_END) {
	                    return state | STATE_ENDED;
	                } else if (!(state & STATE_BEGAN)) {
	                    return STATE_BEGAN;
	                }
	                return state | STATE_CHANGED;
	            }
	            return STATE_FAILED;
	        }
	    });

	    function PanRecognizer() {
	        AttrRecognizer.apply(this, arguments);

	        this.pX = null;
	        this.pY = null;
	    }

	    inherit(PanRecognizer, AttrRecognizer, {
	        defaults: {
	            event: 'pan',
	            threshold: 10,
	            pointers: 1,
	            direction: DIRECTION_ALL
	        },

	        getTouchAction: function getTouchAction() {
	            var direction = this.options.direction;
	            var actions = [];
	            if (direction & DIRECTION_HORIZONTAL) {
	                actions.push(TOUCH_ACTION_PAN_Y);
	            }
	            if (direction & DIRECTION_VERTICAL) {
	                actions.push(TOUCH_ACTION_PAN_X);
	            }
	            return actions;
	        },

	        directionTest: function directionTest(input) {
	            var options = this.options;
	            var hasMoved = true;
	            var distance = input.distance;
	            var direction = input.direction;
	            var x = input.deltaX;
	            var y = input.deltaY;

	            if (!(direction & options.direction)) {
	                if (options.direction & DIRECTION_HORIZONTAL) {
	                    direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                    hasMoved = x != this.pX;
	                    distance = Math.abs(input.deltaX);
	                } else {
	                    direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	                    hasMoved = y != this.pY;
	                    distance = Math.abs(input.deltaY);
	                }
	            }
	            input.direction = direction;
	            return hasMoved && distance > options.threshold && direction & options.direction;
	        },

	        attrTest: function attrTest(input) {
	            return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
	        },

	        emit: function emit(input) {
	            this.pX = input.deltaX;
	            this.pY = input.deltaY;

	            var direction = directionStr(input.direction);
	            if (direction) {
	                this.manager.emit(this.options.event + direction, input);
	            }

	            this._super.emit.call(this, input);
	        }
	    });

	    function PinchRecognizer() {
	        AttrRecognizer.apply(this, arguments);
	    }

	    inherit(PinchRecognizer, AttrRecognizer, {
	        defaults: {
	            event: 'pinch',
	            threshold: 0,
	            pointers: 2
	        },

	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_NONE];
	        },

	        attrTest: function attrTest(input) {
	            return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	        },

	        emit: function emit(input) {
	            this._super.emit.call(this, input);
	            if (input.scale !== 1) {
	                var inOut = input.scale < 1 ? 'in' : 'out';
	                this.manager.emit(this.options.event + inOut, input);
	            }
	        }
	    });

	    function PressRecognizer() {
	        Recognizer.apply(this, arguments);

	        this._timer = null;
	        this._input = null;
	    }

	    inherit(PressRecognizer, Recognizer, {
	        defaults: {
	            event: 'press',
	            pointers: 1,
	            time: 500,
	            threshold: 5 },

	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_AUTO];
	        },

	        process: function process(input) {
	            var options = this.options;
	            var validPointers = input.pointers.length === options.pointers;
	            var validMovement = input.distance < options.threshold;
	            var validTime = input.deltaTime > options.time;

	            this._input = input;

	            if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
	                this.reset();
	            } else if (input.eventType & INPUT_START) {
	                this.reset();
	                this._timer = setTimeoutContext(function () {
	                    this.state = STATE_RECOGNIZED;
	                    this.tryEmit();
	                }, options.time, this);
	            } else if (input.eventType & INPUT_END) {
	                return STATE_RECOGNIZED;
	            }
	            return STATE_FAILED;
	        },

	        reset: function reset() {
	            clearTimeout(this._timer);
	        },

	        emit: function emit(input) {
	            if (this.state !== STATE_RECOGNIZED) {
	                return;
	            }

	            if (input && input.eventType & INPUT_END) {
	                this.manager.emit(this.options.event + 'up', input);
	            } else {
	                this._input.timeStamp = now();
	                this.manager.emit(this.options.event, this._input);
	            }
	        }
	    });

	    function RotateRecognizer() {
	        AttrRecognizer.apply(this, arguments);
	    }

	    inherit(RotateRecognizer, AttrRecognizer, {
	        defaults: {
	            event: 'rotate',
	            threshold: 0,
	            pointers: 2
	        },

	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_NONE];
	        },

	        attrTest: function attrTest(input) {
	            return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	        }
	    });

	    function SwipeRecognizer() {
	        AttrRecognizer.apply(this, arguments);
	    }

	    inherit(SwipeRecognizer, AttrRecognizer, {
	        defaults: {
	            event: 'swipe',
	            threshold: 10,
	            velocity: 0.65,
	            direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	            pointers: 1
	        },

	        getTouchAction: function getTouchAction() {
	            return PanRecognizer.prototype.getTouchAction.call(this);
	        },

	        attrTest: function attrTest(input) {
	            var direction = this.options.direction;
	            var velocity;

	            if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	                velocity = input.velocity;
	            } else if (direction & DIRECTION_HORIZONTAL) {
	                velocity = input.velocityX;
	            } else if (direction & DIRECTION_VERTICAL) {
	                velocity = input.velocityY;
	            }

	            return this._super.attrTest.call(this, input) && direction & input.direction && input.distance > this.options.threshold && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	        },

	        emit: function emit(input) {
	            var direction = directionStr(input.direction);
	            if (direction) {
	                this.manager.emit(this.options.event + direction, input);
	            }

	            this.manager.emit(this.options.event, input);
	        }
	    });

	    function TapRecognizer() {
	        Recognizer.apply(this, arguments);

	        this.pTime = false;
	        this.pCenter = false;

	        this._timer = null;
	        this._input = null;
	        this.count = 0;
	    }

	    inherit(TapRecognizer, Recognizer, {
	        defaults: {
	            event: 'tap',
	            pointers: 1,
	            taps: 1,
	            interval: 300,
	            time: 250,
	            threshold: 2,
	            posThreshold: 10 },

	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_MANIPULATION];
	        },

	        process: function process(input) {
	            var options = this.options;

	            var validPointers = input.pointers.length === options.pointers;
	            var validMovement = input.distance < options.threshold;
	            var validTouchTime = input.deltaTime < options.time;

	            this.reset();

	            if (input.eventType & INPUT_START && this.count === 0) {
	                return this.failTimeout();
	            }

	            if (validMovement && validTouchTime && validPointers) {
	                if (input.eventType != INPUT_END) {
	                    return this.failTimeout();
	                }

	                var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
	                var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

	                this.pTime = input.timeStamp;
	                this.pCenter = input.center;

	                if (!validMultiTap || !validInterval) {
	                    this.count = 1;
	                } else {
	                    this.count += 1;
	                }

	                this._input = input;

	                var tapCount = this.count % options.taps;
	                if (tapCount === 0) {
	                    if (!this.hasRequireFailures()) {
	                        return STATE_RECOGNIZED;
	                    } else {
	                        this._timer = setTimeoutContext(function () {
	                            this.state = STATE_RECOGNIZED;
	                            this.tryEmit();
	                        }, options.interval, this);
	                        return STATE_BEGAN;
	                    }
	                }
	            }
	            return STATE_FAILED;
	        },

	        failTimeout: function failTimeout() {
	            this._timer = setTimeoutContext(function () {
	                this.state = STATE_FAILED;
	            }, this.options.interval, this);
	            return STATE_FAILED;
	        },

	        reset: function reset() {
	            clearTimeout(this._timer);
	        },

	        emit: function emit() {
	            if (this.state == STATE_RECOGNIZED) {
	                this._input.tapCount = this.count;
	                this.manager.emit(this.options.event, this._input);
	            }
	        }
	    });

	    function Hammer(element, options) {
	        options = options || {};
	        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	        return new Manager(element, options);
	    }

	    Hammer.VERSION = '2.0.4';

	    Hammer.defaults = {
	        domEvents: false,

	        touchAction: TOUCH_ACTION_COMPUTE,

	        enable: true,

	        inputTarget: null,

	        inputClass: null,

	        preset: [[RotateRecognizer, { enable: false }], [PinchRecognizer, { enable: false }, ['rotate']], [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }], [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']], [TapRecognizer], [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']], [PressRecognizer]],

	        cssProps: {
	            userSelect: 'none',

	            touchSelect: 'none',

	            touchCallout: 'none',

	            contentZooming: 'none',

	            userDrag: 'none',

	            tapHighlightColor: 'rgba(0,0,0,0)'
	        }
	    };

	    var STOP = 1;
	    var FORCED_STOP = 2;

	    function Manager(element, options) {
	        options = options || {};

	        this.options = merge(options, Hammer.defaults);
	        this.options.inputTarget = this.options.inputTarget || element;

	        this.handlers = {};
	        this.session = {};
	        this.recognizers = [];

	        this.element = element;
	        this.input = createInputInstance(this);
	        this.touchAction = new TouchAction(this, this.options.touchAction);

	        toggleCssProps(this, true);

	        each(options.recognizers, function (item) {
	            var recognizer = this.add(new item[0](item[1]));

	            item[2] && recognizer.recognizeWith(item[2]);
	            item[3] && recognizer.requireFailure(item[3]);
	        }, this);
	    }

	    Manager.prototype = {
	        set: function set(options) {
	            extend(this.options, options);

	            if (options.touchAction) {
	                this.touchAction.update();
	            }
	            if (options.inputTarget) {
	                this.input.destroy();
	                this.input.target = options.inputTarget;
	                this.input.init();
	            }
	            return this;
	        },

	        stop: function stop(force) {
	            this.session.stopped = force ? FORCED_STOP : STOP;
	        },

	        recognize: function recognize(inputData) {
	            var session = this.session;
	            if (session.stopped) {
	                return;
	            }

	            this.touchAction.preventDefaults(inputData);

	            var recognizer;
	            var recognizers = this.recognizers;

	            var curRecognizer = session.curRecognizer;

	            if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
	                curRecognizer = session.curRecognizer = null;
	            }

	            var i = 0;
	            while (i < recognizers.length) {
	                recognizer = recognizers[i];

	                if (session.stopped !== FORCED_STOP && (!curRecognizer || recognizer == curRecognizer || recognizer.canRecognizeWith(curRecognizer))) {
	                    recognizer.recognize(inputData);
	                } else {
	                    recognizer.reset();
	                }

	                if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                    curRecognizer = session.curRecognizer = recognizer;
	                }
	                i++;
	            }
	        },

	        get: function get(recognizer) {
	            if (recognizer instanceof Recognizer) {
	                return recognizer;
	            }

	            var recognizers = this.recognizers;
	            for (var i = 0; i < recognizers.length; i++) {
	                if (recognizers[i].options.event == recognizer) {
	                    return recognizers[i];
	                }
	            }
	            return null;
	        },

	        add: function add(recognizer) {
	            if (invokeArrayArg(recognizer, 'add', this)) {
	                return this;
	            }

	            var existing = this.get(recognizer.options.event);
	            if (existing) {
	                this.remove(existing);
	            }

	            this.recognizers.push(recognizer);
	            recognizer.manager = this;

	            this.touchAction.update();
	            return recognizer;
	        },

	        remove: function remove(recognizer) {
	            if (invokeArrayArg(recognizer, 'remove', this)) {
	                return this;
	            }

	            var recognizers = this.recognizers;
	            recognizer = this.get(recognizer);
	            recognizers.splice(inArray(recognizers, recognizer), 1);

	            this.touchAction.update();
	            return this;
	        },

	        on: function on(events, handler) {
	            var handlers = this.handlers;
	            each(splitStr(events), function (event) {
	                handlers[event] = handlers[event] || [];
	                handlers[event].push(handler);
	            });
	            return this;
	        },

	        off: function off(events, handler) {
	            var handlers = this.handlers;
	            each(splitStr(events), function (event) {
	                if (!handler) {
	                    delete handlers[event];
	                } else {
	                    handlers[event].splice(inArray(handlers[event], handler), 1);
	                }
	            });
	            return this;
	        },

	        emit: function emit(event, data) {
	            if (data.target.disabled) return;

	            if (this.options.domEvents) {
	                triggerDomEvent(event, data);
	            }

	            var handlers = this.handlers[event] && this.handlers[event].slice();
	            if (!handlers || !handlers.length) {
	                return;
	            }

	            data.type = event;
	            data.preventDefault = function () {
	                data.srcEvent.preventDefault();
	            };

	            var i = 0;
	            while (i < handlers.length) {
	                handlers[i](data);
	                i++;
	            }
	        },

	        destroy: function destroy() {
	            this.element && toggleCssProps(this, false);

	            this.handlers = {};
	            this.session = {};
	            this.input.destroy();
	            this.element = null;
	        }
	    };

	    function toggleCssProps(manager, add) {
	        var element = manager.element;
	        each(manager.options.cssProps, function (value, name) {
	            element.style[prefixed(element.style, name)] = add ? value : '';
	        });
	    }

	    function triggerDomEvent(event, data) {
	        console.log(event, data);
	        var gestureEvent = document.createEvent('Event');
	        gestureEvent.initEvent(event, true, true);
	        gestureEvent.gesture = data;
	        data.target.dispatchEvent(gestureEvent);
	    }

	    extend(Hammer, {
	        INPUT_START: INPUT_START,
	        INPUT_MOVE: INPUT_MOVE,
	        INPUT_END: INPUT_END,
	        INPUT_CANCEL: INPUT_CANCEL,

	        STATE_POSSIBLE: STATE_POSSIBLE,
	        STATE_BEGAN: STATE_BEGAN,
	        STATE_CHANGED: STATE_CHANGED,
	        STATE_ENDED: STATE_ENDED,
	        STATE_RECOGNIZED: STATE_RECOGNIZED,
	        STATE_CANCELLED: STATE_CANCELLED,
	        STATE_FAILED: STATE_FAILED,

	        DIRECTION_NONE: DIRECTION_NONE,
	        DIRECTION_LEFT: DIRECTION_LEFT,
	        DIRECTION_RIGHT: DIRECTION_RIGHT,
	        DIRECTION_UP: DIRECTION_UP,
	        DIRECTION_DOWN: DIRECTION_DOWN,
	        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	        DIRECTION_ALL: DIRECTION_ALL,

	        Manager: Manager,
	        Input: Input,
	        TouchAction: TouchAction,

	        TouchInput: TouchInput,
	        MouseInput: MouseInput,
	        PointerEventInput: PointerEventInput,
	        TouchMouseInput: TouchMouseInput,
	        SingleTouchInput: SingleTouchInput,

	        Recognizer: Recognizer,
	        AttrRecognizer: AttrRecognizer,
	        Tap: TapRecognizer,
	        Pan: PanRecognizer,
	        Swipe: SwipeRecognizer,
	        Pinch: PinchRecognizer,
	        Rotate: RotateRecognizer,
	        Press: PressRecognizer,

	        on: addEventListeners,
	        off: removeEventListeners,
	        each: each,
	        merge: merge,
	        extend: extend,
	        inherit: inherit,
	        bindFn: bindFn,
	        prefixed: prefixed
	    });

	    window[exportName] = Hammer;
	    return Hammer;
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = __webpack_require__(35);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rword = /[^, ]+/g,
	    rnospaces = /\S+/g,
	    rwindow = /^\[object (?:Window|DOMWindow|global)\]$/,
	    oproto = Object.prototype,
	    oToString = oproto.toString,
	    ohasOwn = oproto.hasOwnProperty,
	    userAgent = navigator.userAgent,
	    isIos = /iPhone\sOS/.test(userAgent),
	    class2type = {};

	'Boolean Number String Function Array Date RegExp Object Error'.replace(rword, function (name) {
	  class2type['[object ' + name + ']'] = name.toLowerCase();
	});
	function noop() {};

	function _getType(obj) {
	  if (obj == null) {
	    return String(obj);
	  }

	  return (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' || typeof obj === 'function' ? class2type[oToString.call(obj)] || 'object' : typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj);
	}

	function regWordBorder(str) {
	  return new RegExp('(^|\\s)' + str + '(\\s|$)');
	}

	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = function (element, index) {
	    var length = this.length;
	    var current;
	    if (index == null) {
	      index = 0;
	    } else {
	      index = +index || 0;
	      if (index < 0) index += length;
	      if (index < 0) index = 0;
	    }
	    for (; index < length; index++) {
	      current = this[index];
	      if (current === element) return index;
	    }
	    return -1;
	  };
	}
	var _isFunction = (typeof alert === 'undefined' ? 'undefined' : (0, _typeof3.default)(alert)) === 'object' ? function (fn) {
	  try {
	    return (/^\s*\bfunction\b/.test(fn + "")
	    );
	  } catch (e) {
	    return false;
	  }
	} : function (fn) {
	  return oToString.call(fn) === '[object Function]';
	};

	function _isWindow(obj) {
	  return obj != null && obj === obj.window;
	}

	function _isPlainObject(obj) {
	  var key;
	  if (!obj || _getType(obj) !== 'object' || obj.nodeType || _isWindow(obj)) {
	    return false;
	  }

	  if (obj.constructor && !ohasOwn.call(obj, 'constructor') && !ohasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
	    return false;
	  }

	  for (key in obj) {}
	  return key === void 0 || ohasOwn.call(obj, key);
	}

	function _extend() {
	  var options,
	      name,
	      src,
	      copy,
	      copyIsArray,
	      clone,
	      target = arguments[0] || {},
	      i = 1,
	      length = arguments.length,
	      deep = false;

	  if (typeof target === 'boolean') {
	    deep = target;
	    target = arguments[1] || {};
	    i++;
	  }

	  if ((typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target)) !== 'object' && _getType(target) !== 'function') {
	    target = {};
	  }

	  if (i === length) {
	    return target;
	  }
	  for (; i < length; i++) {
	    if ((options = arguments[i]) != null) {
	      for (name in options) {
	        src = target[name];
	        copy = options[name];

	        if (target === copy) {
	          continue;
	        }
	        if (deep && copy && (_isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
	          if (copyIsArray) {
	            copyIsArray = false;
	            clone = src && Array.isArray(src) ? src : [];
	          } else {
	            clone = src && _isPlainObject(src) ? src : {};
	          }
	          target[name] = _extend(deep, clone, copy);
	        } else if (copy !== void 0) {
	          target[name] = copy;
	        }
	      }
	    }
	  }
	  return target;
	}

	function _unique(arr) {
	  var n = [];
	  if (!arr) return;
	  for (var i = 0, len = arr.length; i < len; i++) {
	    if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
	  }
	  return n;
	}

	function _isArray(arr) {
	  return oToString.call(arr) == '[object Array]';
	}

	function _each(obj, callBack) {
	  if (obj) {
	    if (_isArray(obj)) {
	      for (var i = 0, len = obj.length; i < len; i++) {
	        if (callBack(i, obj[i]) === false) {
	          break;
	        }
	      }
	    } else {
	        for (var i in obj) {
	          if (obj.hasOwnProperty(i) && callBack(i, obj[i]) === false) {
	            break;
	          }
	        }
	      }
	  }
	}

	function camelize(target) {
	  if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
	    return target;
	  }
	  return target.replace(/[-_][^-_]/g, function (match) {
	    return match.charAt(1).toUpperCase();
	  });
	}

	var doc = document;
	var getId = function getId(id) {
	  return doc.getElementById(id) || null;
	};
	var _addClass = function _addClass(node, aClass, type) {
	  if (!node || node.nodeType !== 1) return;
	  var classNames = (aclass || '').match(rnospaces) || [];
	  var cls = node.classList;
	  if (type) {
	    for (var i = 0, len = classNames.length; i < len; i++) {
	      cls.remove(classNames[i]);
	    }
	  } else {
	    for (var i = 0, len = classNames.length; i < len; i++) {
	      cls.add(classNames[i]);
	    }
	  }
	  return node;
	};
	(function (window) {
	  if (!window.requestAnimationFrame) {
	    var lastTime = 0;
	    window.requestAnimationFrame = window.webkitRequestAnimationFrame || function (callback, element) {
	      var currTime = new Date().getTime();
	      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
	      var id = window.setTimeout(function () {
	        callback(currTime + timeToCall);
	      }, timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };
	    window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || function (id) {
	      clearTimeout(id);
	    };
	  };
	})(window);

	var _removeClass = function _removeClass(node, aClass) {
	  _addClass(node, aClass, true);
	};
	var _ajaxClass = function () {
	  var jsonType = 'application/json';
	  var htmlType = 'text/html';
	  var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	  var scriptTypeRE = /^(?:text|application)\/javascript/i;
	  var xmlTypeRE = /^(?:text|application)\/xml/i;
	  var blankRE = /^\s*$/;

	  var ajaxSettings = {
	    type: 'GET',
	    beforeSend: noop,
	    success: noop,
	    error: noop,
	    complete: noop,
	    context: null,
	    xhr: function xhr(protocol) {
	      return new window.XMLHttpRequest();
	    },
	    accepts: {
	      script: 'text/javascript, application/javascript, application/x-javascript',
	      json: jsonType,
	      xml: 'application/xml, text/xml',
	      html: htmlType,
	      text: 'text/plain'
	    },
	    timeout: 0,
	    processData: true,
	    cache: true
	  };
	  var ajaxBeforeSend = function ajaxBeforeSend(xhr, settings) {
	    var context = settings.context;
	    if (settings.beforeSend.call(context, xhr, settings) === false) {
	      return false;
	    }
	  };
	  var ajaxSuccess = function ajaxSuccess(data, xhr, settings) {
	    settings.success.call(settings.context, data, 'success', xhr);
	    ajaxComplete('success', xhr, settings);
	  };

	  var ajaxError = function ajaxError(error, type, xhr, settings) {
	    settings.error.call(settings.context, xhr, type, error);
	    ajaxComplete(type, xhr, settings);
	  };

	  var ajaxComplete = function ajaxComplete(status, xhr, settings) {
	    settings.complete.call(settings.context, xhr, status);
	  };

	  var serialize = function serialize(params, obj, traditional, scope) {
	    var type,
	        array = _isArray(obj),
	        hash = _isPlainObject(obj);
	    _each(obj, function (key, value) {
	      type = _getType(value);
	      if (scope) {
	        key = traditional ? scope : scope + '[' + (hash || type === 'object' || type === 'array' ? key : '') + ']';
	      }

	      if (!scope && array) {
	        params.add(value.name, value.value);
	      } else if (type === "array" || !traditional && type === "object") {
	          serialize(params, value, traditional, key);
	        } else {
	          params.add(key, value);
	        }
	    });
	  };
	  var serializeData = function serializeData(options) {
	    if (options.processData && options.data && typeof options.data !== "string") {
	      options.data = param(options.data, options.traditional);
	    }
	    if (options.data && (!options.type || options.type.toUpperCase() === 'GET')) {
	      options.url = appendQuery(options.url, options.data);
	      options.data = undefined;
	    }
	  };
	  var appendQuery = function appendQuery(url, query) {
	    if (query === '') {
	      return url;
	    }
	    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
	  };
	  var mimeToDataType = function mimeToDataType(mime) {
	    if (mime) {
	      mime = mime.split(';', 2)[0];
	    }
	    return mime && (mime === htmlType ? 'html' : mime === jsonType ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml') || 'text';
	  };
	  var parseArguments = function parseArguments(url, data, success, dataType) {
	    if (_isFunction(data)) {
	      dataType = success, success = data, data = undefined;
	    }
	    if (!_isFunction(success)) {
	      dataType = success, success = undefined;
	    }
	    return {
	      url: url,
	      data: data,
	      success: success,
	      dataType: dataType
	    };
	  };
	  var ajax = function ajax(url, options) {
	    if ((typeof url === 'undefined' ? 'undefined' : (0, _typeof3.default)(url)) === "object") {
	      options = url;
	      url = undefined;
	    }
	    var settings = options || {};
	    settings.url = url || settings.url;
	    for (var key in ajaxSettings) {
	      if (settings[key] === undefined) {
	        settings[key] = ajaxSettings[key];
	      }
	    }

	    serializeData(settings);
	    var dataType = settings.dataType || 'json';

	    if (settings.cache === false || (!options || options.cache !== true) && 'script' === dataType) {
	      settings.url = appendQuery(settings.url, '_=' + +new Date());
	    }
	    var mime = settings.accepts[dataType.toLowerCase()];
	    var headers = {};
	    var setHeader = function setHeader(name, value) {
	      headers[name.toLowerCase()] = [name, value];
	    };
	    var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
	    var xhr = settings.xhr(settings);
	    var nativeSetHeader = xhr.setRequestHeader;
	    var abortTimeout;
	    var locationHost = location.host;
	    var U = options.url.replace(/http\:\/\//, '').replace(/\/.+$/ig, '');
	    if (U == locationHost) {
	      setHeader('X-Requested-With', 'XMLHttpRequest');
	    }

	    setHeader('Accept', mime || '*/*');
	    if (!!(mime = settings.mimeType || mime)) {
	      if (mime.indexOf(',') > -1) {
	        mime = mime.split(',', 2)[0];
	      }
	      xhr.overrideMimeType && xhr.overrideMimeType(mime);
	    }
	    if (settings.contentType || settings.contentType !== false && settings.data && settings.type.toUpperCase() !== 'GET') {
	      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
	    }
	    if (settings.headers) {
	      for (var name in settings.headers) {
	        setHeader(name, settings.headers[name]);
	      }
	    }
	    xhr.setRequestHeader = setHeader;

	    xhr.onreadystatechange = function () {
	      if (xhr.readyState === 4) {
	        xhr.onreadystatechange = noop;
	        clearTimeout(abortTimeout);
	        var result,
	            error = false;
	        var isLocal = protocol === 'file:';
	        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 0 && isLocal && xhr.responseText) {
	          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
	          result = xhr.responseText;
	          try {
	            if (dataType === 'script') {
	              (1, eval)(result);
	            } else if (dataType === 'xml') {
	              result = xhr.responseXML;
	            } else if (dataType === 'json') {
	              result = blankRE.test(result) ? null : JSON.parse(result);
	            }
	          } catch (e) {
	            error = e;
	          }

	          if (error) {
	            ajaxError(error, 'parsererror', xhr, settings);
	          } else {
	            ajaxSuccess(result, xhr, settings);
	          }
	        } else {
	          var status = xhr.status ? 'error' : 'abort';
	          var statusText = xhr.statusText || null;
	          if (isLocal) {
	            status = 'error';
	            statusText = '404';
	          }
	          ajaxError(statusText, status, xhr, settings);
	        }
	      }
	    };
	    if (ajaxBeforeSend(xhr, settings) === false) {
	      xhr.abort();
	      ajaxError(null, 'abort', xhr, settings);
	      return xhr;
	    }

	    if (settings.xhrFields) {
	      for (var name in settings.xhrFields) {
	        xhr[name] = settings.xhrFields[name];
	      }
	    }

	    var async = 'async' in settings ? settings.async : true;

	    xhr.open(settings.type.toUpperCase(), settings.url, async, settings.username, settings.password);

	    for (var name in headers) {
	      nativeSetHeader.apply(xhr, headers[name]);
	    }
	    if (settings.timeout > 0) {
	      abortTimeout = setTimeout(function () {
	        xhr.onreadystatechange = noop;
	        xhr.abort();
	        ajaxError(null, 'timeout', xhr, settings);
	      }, settings.timeout);
	    }
	    xhr.send(settings.data ? settings.data : null);
	    return xhr;
	  };

	  var param = function param(obj, traditional) {
	    var params = [];
	    params.add = function (k, v) {
	      this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
	    };
	    serialize(params, obj, traditional);
	    return params.join('&').replace(/%20/g, '+');
	  };
	  var get = function get() {
	    return ajax(parseArguments.apply(null, arguments));
	  };

	  var post = function post() {
	    var options = parseArguments.apply(null, arguments);
	    options.type = 'POST';
	    return ajax(options);
	  };

	  var getJSON = function getJSON() {
	    var options = parseArguments.apply(null, arguments);
	    options.dataType = 'json';
	    return ajax(options);
	  };

	  return {
	    ajax: ajax,
	    get: get,
	    post: post,
	    serialize: serialize
	  };
	}();

	var setActive = function setActive(vm, target) {
	  target.classList.add('active');
	  setTimeout(function () {
	    target.classList.remove('active');
	  }, 200);
	};
	var utils = {
	  NS: 'http://www.w3.org/2000/svg',
	  getId: getId,
	  addClass: _addClass,
	  removeClass: _removeClass,
	  each: _each,
	  isArray: _isArray,
	  unique: _unique,
	  extend: _extend,
	  ajax: _ajaxClass.ajax,
	  post: _ajaxClass.post,
	  get: _ajaxClass.get,
	  serialize: _ajaxClass.serialize,
	  setActive: setActive
	};
	window.utils = utils;
	exports.default = utils;

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  0: ['<table width="240">', '  <tr>', '    <td colspan="2"><div class="title">规则说明：</div></td>', '  </tr>', '  <tr>', '    <th>1、</th>', '    <td>点击任务大厅内可接受的任务跳转到任务链接。</td>', '  </tr>', '  <tr>', '    <th valign="top" style="padding-top:3px">2、</th>', '    <td>', '      点击右上角分享按钮分享在自己的社交圈中（QQ空间、微信朋友圈、微信好友、微博等）即可获得相应积分。', '    </td>', '  </tr>', '  <tr>', '    <th>3、</th>', '    <td>每日任务投放人次数有限，先做先得。</td>', '  </tr>', '  <tr>', '    <th>4、</th>', '    <td>每日投放任务的时间和数量不定。</td>', '  </tr>', '  <tr>', '    <th>5、</th>', '    <td>普通会员和VIP会员完成每日任务得到的贡献值不同。</td>', '  </tr>', '</table> '],
	  1: ['<table width="240">', '  <tr>', '    <td colspan="2"><div class="title">规则说明：</div></td>', '  </tr>', '  <tr>', '    <th>1、</th>', '    <td>每日只能签到1次。</td>', '  </tr>', '  <tr>', '    <th>2、</th>', '    <td>每次签到获得100积分。</td>', '  </tr>', '  <tr>', '    <th>3、</th>', '    <td>每日签到时间限定为当日0：00：00-23：59：59。</td>', '  </tr>', '</table> '],
	  5: ['<table width="240">', '  <tr>', '    <td colspan="2"><div class="title">规则说明：</div></td>', '  </tr>', '  <tr>', '    <th>1、</th>', '    <td>普通会员在VIP直通车中 消费满5万元, 即可升级VIP会员.</td>', '  </tr>', '  <tr>', '    <th>2、</th>', '    <td>VIP会员可直接销售商城商品, 但只能推荐VIP直通车内的商品.</td>', '  </tr>', '  <tr>', '    <th>3、</th>', '    <td>VIP会员与普通会员相比, 在红包专区内通过点击广告专区收益大.</td>', '  </tr>', '  <tr>', '    <th>4、</th>', '    <td>VIP会员与普通会员相比, 每日特定任务完成后, 获得积分多.</td>', '  </tr>', '  <tr>', '    <th>5、</th>', '    <td>VIP会员长期有效.</td>', '  </tr>', '</table> '],
	  'loading': ['<div class="loading-spinner-outer" v-show="pullUpLoadStatus">' + '  <div class="loading-spinner">' + '    <span class="loading-top"></span>' + '    <span class="loading-right"></span>' + '    <span class="loading-bottom"></span>' + '    <span class="loading-left"></span>' + '  </div>' + '</div>'],
	  '5-2': ['摇一摇, 摇出好运气']
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(63);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(62);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16)
	  , document = __webpack_require__(4).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(8) && !__webpack_require__(12)(function(){
	  return Object.defineProperty(__webpack_require__(37)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(22)
	  , $export        = __webpack_require__(15)
	  , redefine       = __webpack_require__(43)
	  , hide           = __webpack_require__(9)
	  , has            = __webpack_require__(5)
	  , Iterators      = __webpack_require__(21)
	  , $iterCreate    = __webpack_require__(76)
	  , setToStringTag = __webpack_require__(25)
	  , getPrototypeOf = __webpack_require__(83)
	  , ITERATOR       = __webpack_require__(11)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(42)
	  , hiddenKeys = __webpack_require__(20).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(5)
	  , toIObject    = __webpack_require__(6)
	  , arrayIndexOf = __webpack_require__(70)(false)
	  , IE_PROTO     = __webpack_require__(26)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(19);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(126);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(132);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(121);

	var _index6 = _interopRequireDefault(_index5);

	var _index7 = __webpack_require__(130);

	var _index8 = _interopRequireDefault(_index7);

	var _index9 = __webpack_require__(128);

	var _index10 = _interopRequireDefault(_index9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    Index: _index2.default, Task: _index4.default, Arena: _index6.default, Sign: _index8.default, Money: _index10.default
	  }
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _flopDetail = __webpack_require__(120);

	var _flopDetail2 = _interopRequireDefault(_flopDetail);

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var back = _index2.default.back;
	var getUser = _index2.default.getUser;

	var arrTip = ['开始抢, 消除起床气', '开始抢, 精神一下午', '开始抢, 精神一下午', '开始抢, 健胃又消食'];
	var timinggrabNode;

	var timinggrab = [{
	  ico: '',
	  id: 1,
	  status: 0,
	  overFlg: false,
	  desc: ['起床红包', '01:17开始抢, 消除起床气']

	}, {
	  ico: '',
	  id: 2,
	  status: 1,
	  overFlg: false,
	  desc: ['午休红包', '12:17开始抢, 精神一下午']
	}, {
	  ico: '',
	  id: 3,
	  status: 1,
	  overFlg: false,
	  desc: ['晚餐红包', '17:17开始抢, 健胃又消食']
	}, {
	  ico: '',
	  id: 4,
	  status: 1,
	  overFlg: false,
	  desc: ['睡前红包', '22:17开始抢, 一夜睡香香']
	}];

	_vue2.default.filter('renderSrc', function (idx) {
	  var s = '<img src="./static/images/h-t-' + idx + '.png" alt="">';
	  return s;
	});
	var anm = function anm(first, last, cb) {
	  first.classList.add('out');
	  first.classList.remove('in');
	  setTimeout(function () {
	    last.classList.add("in");
	    last.classList.remove("out");
	    if (cb) {
	      setTimeout(cb, 500);
	    };
	  }, 225);
	};

	var start = function start(vm) {
	  timinggrabNode = document.querySelector('#timinggrab');

	  Hammer(timinggrabNode).on('tap', function (ev) {
	    var target = ev.target;
	    var flip,
	        firstNode,
	        lastNode,
	        idx,
	        row,
	        reqData = window.config.reqParam;
	    if (target.classList.contains('timinggrab')) {
	      return;
	    };
	    while (!target.classList.contains('list')) {
	      target = target.parentNode;
	    }
	    idx = +target.getAttribute('data-idx');
	    flip = target.querySelectorAll('.flip');
	    firstNode = flip[0];
	    lastNode = flip[1];

	    if (vm.timinggrabData[idx].overFlg) {
	      utils.dialog('已经抢过了');
	      return;
	    }
	    reqData.doKind = idx + 1;
	    utils.ajax({
	      url: config.URL + 'doTimeRedPaper.do',
	      type: 'post',
	      dataType: 'json',
	      data: reqData,
	      success: function success(res) {
	        if (res.rescode == 100) {
	          document.body.classList.add('detail');
	          vm.timinggrabData[idx].overFlg = true;
	          firstNode = flip[1];
	          lastNode = flip[0];
	          anm(firstNode, lastNode, function () {
	            utils.dialog(res.message || '暂无红包数据', function () {
	              vm.$broadcast('flopDetail', res.data);
	            });
	          });
	        } else {
	          utils.dialog(res.message);
	        }
	      },
	      error: function error(xhr) {
	        utils.dialog('暂无红包数据');
	      }
	    });
	  });
	};
	var init = function init(vm) {
	  utils.ajax({
	    url: config.URL + 'initTimeRedPaper.do',
	    type: 'post',
	    dataType: 'json',
	    data: window.config.reqParam,
	    success: function success(res) {
	      if (res.rescode == 100) {

	        for (var i = 0, len = timinggrab.length; i < len; i++) {
	          var o = utils.extend({}, timinggrab[i], { overFlg: parseInt(res.data['overFlg' + (i + 1)], 10) });
	          o.desc[1] = res.data['doTime' + (i + 1)] + arrTip[i];
	          vm.timinggrabData.$set(i, o);
	        }
	        setTimeout(function () {
	          var l = timinggrabNode.querySelectorAll('.list');
	          for (var i = 0, len = l.length; i < len; i++) {
	            var flip = l[i].querySelectorAll('.flip');
	            if (vm.timinggrabData[i].overFlg) {
	              anm(flip[1], flip[0]);
	            } else {
	              anm(flip[0], flip[1]);
	            }
	          }
	        }, 0);
	      } else {
	        utils.dialog(res.message);
	      }
	    },
	    error: function error() {
	      utils.dialog('暂无红包数据');
	    }
	  });
	};
	exports.default = {
	  data: function data() {
	    return {
	      show: false,
	      pts: this.$parent.pts,
	      timinggrabData: timinggrab
	    };
	  },

	  components: { Flopdetail: _flopDetail2.default },
	  ready: function ready() {
	    var t = this;
	    back(t);
	    start(t);
	    t.$on('arenaTap', function (num) {
	      var bol = num == 3;
	      if (bol) {
	        init(t);
	        t.pts = t.$parent.pts;
	        t.$parent.pts = false;
	      }

	      t.show = bol;
	    });
	    window.flopVM = this;
	  }
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var back = _index2.default.back;
	var getUser = _index2.default.getUser;
	exports.default = {
	  data: function data() {
	    return {
	      show: false,
	      pts: this.$parent.pts,
	      data: {}
	    };
	  },
	  ready: function ready() {
	    var t = this;
	    back(t, 'show');
	    t.$on('flopDetail', function (data) {
	      t.pts = t.$parent.pts;
	      t.$parent.show = false;
	      t.show = true;
	      t.data = data;
	    });
	  }
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lotto = __webpack_require__(122);

	var _lotto2 = _interopRequireDefault(_lotto);

	var _shake = __webpack_require__(125);

	var _shake2 = _interopRequireDefault(_shake);

	var _flop = __webpack_require__(119);

	var _flop2 = _interopRequireDefault(_flop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var btnTap = function btnTap(vm) {
	  var rootVm = vm.$root;
	  var rect = vm.$els.g.getElementsByTagName('rect');
	  var hd = function hd(num) {
	    var node = rect[num];
	    Hammer(node).on('tap', function () {
	      if (rootVm.isTranslate) {
	        return;
	      }
	      vm.$broadcast('arenaTap', num);
	    });
	  };
	  for (var i = 0, len = rect.length; i < len; i++) {
	    hd(i);
	  }
	};
	exports.default = {
	  data: function data() {
	    return {
	      pts: this.$root.show
	    };
	  },

	  components: {
	    Lotto: _lotto2.default, Shake: _shake2.default, Flop: _flop2.default
	  },
	  ready: function ready() {
	    var t = this;
	    btnTap(t);
	    t.$on('pageTab', function (num) {
	      t.pts = num;
	    });
	  }
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	var _lottoTemplate = __webpack_require__(124);

	var _lottoTemplate2 = _interopRequireDefault(_lottoTemplate);

	var _lottoLayer = __webpack_require__(123);

	var _lottoLayer2 = _interopRequireDefault(_lottoLayer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var back = _index2.default.back;
	exports.default = {
	  data: function data() {
	    return {
	      show: false,
	      pts: this.$parent.pts
	    };
	  },

	  components: {
	    Temp: _lottoTemplate2.default, Desc: _lottoLayer2.default
	  },
	  ready: function ready() {
	    var t = this;
	    back(t);

	    t.$on('arenaTap', function (num) {
	      var bol = num == 0;
	      if (bol) {
	        t.pts = t.$parent.pts;
	        t.$parent.pts = false;
	        this.$broadcast('init');
	      }

	      t.show = bol;
	    });
	  }
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getUser = _index2.default.getUser;
	var getBet = _index2.default.getBet;

	var stop = false,
	    lop = 0,
	    id,
	    size = 8;
	var getRandom = function getRandom(n1, n2) {
	  var r = 0,
	      r1 = Math.floor(Math.random() * 6),
	      r2 = Math.floor(Math.random() * 6);
	  if (r > 10 || r == n1 + n2 - 2) {
	    getRandom();
	  } else {
	    return [r1, r2];
	  }
	};
	var setLop = function setLop(vm, n1, n2, bol) {
	  var svg = vm.$parent.$children[0].$el,
	      nodeG = svg.getElementsByTagName('g'),
	      img1 = nodeG[0].getElementsByTagName('use'),
	      img2 = nodeG[1].getElementsByTagName('use');

	  for (var i = 0; i < size; i++) {
	    img1.item(i).style.opacity = img2.item(i).style.opacity = 0;
	  }
	  if (bol) {
	    img1.item(n1).style.opacity = 1;
	    img2.item(n2).style.opacity = 1;
	  } else {
	    img1.item(n1).style.opacity = img2.item(n1).style.opacity = 1;
	  }
	};
	var sAnimate = function sAnimate(vm, n1, n2, btn) {
	  cancelAnimationFrame(id);
	  if (lop >= size) {
	    lop = 0;
	  }
	  if (!stop) {
	    setLop(vm, lop);
	    lop++;
	    id = requestAnimationFrame(function () {
	      sAnimate(vm, n1, n2, btn);
	    });
	    return;
	  }
	  lop = 0;
	  stop = false;
	  setLop(vm, n1 - 1, n2 - 1, !0);
	  vm.lottoStartEnd = true;
	  btn.removeAttribute('disabled');
	};

	var getNum = function getNum(vm, num) {
	  var n1 = Math.floor(Math.random() * 6 + 1),
	      n2 = Math.floor(Math.random() * 6 + 1);

	  if (vm.isWin) {
	    if (n1 + n2 == num) {
	      return [n1, n2];
	    } else {
	      getNum(vm, num);
	    }
	  } else {
	    if (vm.lotSts === 'b' && n1 + n2 <= 7 || vm.lotSts === 's' && n1 + n2 >= 8) {
	      return [n1, n2];
	    } else {
	      getNum(vm, num);
	    }
	  }
	};
	var lottoStart = function lottoStart(vm) {
	  var n,
	      svg = vm.$parent.$children[0].$el,
	      btn = utils.getId('lotto-btn'),
	      isWinBtn = utils.getId('lotto-is-win-btn');
	  Hammer(isWinBtn).on('tap', function () {
	    setTimeout(function () {
	      vm.lottoStartEnd = false;
	    }, 100);
	  });
	  Hammer(btn).on('tap', function () {
	    btn.disabled = true;
	    var betKind;
	    for (var i = 0, len = vm.bet.length; i < len; i++) {
	      if (vm.bet[i].checked) {
	        betKind = i + 1;
	      }
	    }
	    var betData = utils.extend({}, window.config.reqParam, {
	      betKind: betKind,
	      betValue: vm.betScore
	    });

	    sAnimate(vm, Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1), btn);
	    var num = function num(cb) {
	      if (vm.lotSts === 's') {
	        n = getNum(vm, Math.floor(Math.random() * 6 + 2));
	      } else {
	        n = getNum(vm, Math.floor(Math.random() * 5 + 8));
	      }
	      if (!n) {
	        num();
	        return;
	      }
	      if (cb) {
	        cb();
	        return;
	      }
	      sAnimate(vm, n[0], n[1], btn);
	    };
	    utils.ajax({
	      url: config.URL + 'doDice.do',
	      dataType: 'JSON',
	      type: 'post',
	      data: betData,
	      success: function success(res) {
	        res = typeof res == 'string' ? JSON.parse(res) : res;
	        if (res.rescode == 100) {
	          vm.$root.userInfo.availableDevoteValue = res.data.availableDevoteValue;
	          vm.score = res.data.availableDevoteValue;
	          if (parseInt(res.data.winFlg) == 0) {
	            vm.isWin = true;
	            stop = true;
	            num();
	            init(vm);
	            return;
	          }
	        }
	        init(vm);
	        vm.isWin = false;
	        stop = true;
	        num();
	      },
	      error: function error(xhr) {
	        setTimeout(function () {
	          stop = true;

	          vm.isWin = false;
	          num();
	        }, 500);
	      }
	    });
	  });
	};
	var init = function init(vm) {
	  var rootVM = vm.$root;
	  var arr = [];

	  utils.ajax({
	    url: config.URL + 'initDice.do',
	    type: 'post',
	    dataType: 'json',
	    data: window.config.reqParam,
	    success: function success(res) {
	      if (res.rescode == 100) {
	        vm.data = res.data;
	        rootVM.userInfo.availableDevoteValue = +res.data.availableDevoteValue;

	        arr[0] = { checked: true, score: res.data.betValue1 };
	        arr[1] = { checked: false, score: res.data.betValue2 };
	        arr[2] = { checked: false, score: res.data.betValue3 };
	        vm.score = +res.data.availableDevoteValue;


	        vm.bet = arr;
	      } else {
	        utils.dialog(res.message);
	      }
	    },
	    erroe: function erroe(xhr) {
	      utils.dialog('暂时无数据');
	    }
	  });
	};

	var bet = utils.extend([], [{ score: 500, checked: true }, { score: 1000, checked: false }, { score: 10000, checked: false }]);

	var getALL = function getALL(vm) {
	  getUser(function (data) {});

	  getBet(function (data) {});
	};
	exports.default = {
	  data: function data() {
	    return {
	      data: {},
	      score: 5000,
	      bet: [],
	      isStart: true,

	      betScore: '',

	      isWin: false,

	      lotSts: '',
	      lottoStartEnd: false
	    };
	  },

	  watch: {
	    betScore: function betScore(v) {
	      v = +v;
	      if (v > this.score) {
	        this.isStart = true;
	      } else {
	        this.isStart = false;
	      }
	    },
	    score: function score(v) {
	      v = +v;
	      if (v >= this.data.betValue1) {
	        this.isStart = false;
	      } else {
	        this.isStart = true;
	      }
	    }
	  },
	  ready: function ready() {
	    var t = this;

	    lottoStart(this);
	    window.lottoVM = t;

	    this.$on('init', function () {
	      init(t);
	      this.lottoStartEnd = false;
	      this.isWin = false;
	      this.betScore = '';
	    });
	  }
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var back = _index2.default.back;

	var isBind = false,
	    isShake,
	    numShake = 0,
	    maxShake = 10;
	var deviceMotionHandler;
	var startShake = function startShake(vm) {
	  isShake = true;
	  if (!isBind) {
	    utils.dialog('5-2', function () {
	      isShake = false;
	    });
	  }

	  var shakeImg = utils.getId('shakeImg');
	  var SHAKE_THRESHOLD = 5000;
	  var last_update = 0;
	  var animSpe = 25;
	  var x,
	      y,
	      z,
	      lastX = 0,
	      lastY = 0,
	      lastZ = 0;
	  var count = 0;
	  var audio = document.getElementsByTagName('audio')[0];

	  var outFalse = function outFalse() {
	    isShake = false;
	  };
	  deviceMotionHandler = function deviceMotionHandler(eventData) {
	    var acceleration = eventData.accelerationIncludingGravity;
	    var curTime = new Date().getTime();
	    if (isShake) return;
	    if (curTime - last_update > 30) {

	      var diffTime = curTime - last_update;
	      last_update = curTime;
	      x = acceleration.x;
	      y = acceleration.y;
	      z = acceleration.z;

	      if (Math.abs(x - lastX) > animSpe || Math.abs(y - lastY) > animSpe) {

	        if (!shakeImg.classList.contains('y1y')) {
	          shakeImg.setAttribute('class', 'images-animate y1y');
	          setTimeout(function () {
	            shakeImg.setAttribute('class', 'images-animate');
	          }, 300);
	        }

	        if (vm.numShake == 0) {
	          isShake = true;
	          utils.dialog('超出限制');
	          return;
	        }

	        audio.play();

	        if (!isShake) {
	          isShake = true;
	          utils.ajax({
	            url: config.URL + 'doShake.do',
	            dataType: 'json',
	            type: 'post',
	            data: window.config.reqParam,
	            success: function success(res) {
	              vm.numShake = res.data.availableCount;
	              if (res.rescode == 100) {

	                utils.dialog('恭喜本次赚取<span style="color:red; font-weight:bold;">' + (res.data.earnDevoteValue || 0) + '</span>点贡献值', outFalse);
	              } else {
	                utils.dialog(res.message, outFalse);
	              }
	            },
	            error: function error(xhr) {
	              utils.dialog('可惜~~~什么也没摇到', outFalse);
	            }
	          });
	        }
	      }

	      lastX = x;
	      lastY = y;
	      lastZ = z;
	    }
	  };
	  if (window.DeviceMotionEvent && !isBind) {
	    isBind = true;
	    window.addEventListener('devicemotion', deviceMotionHandler, false);
	  } else {
	    console.log('不支持?');
	  }
	};
	var init = function init(vm) {
	  utils.ajax({
	    url: config.URL + 'initShake.do',
	    type: 'post',
	    dataType: 'json',
	    data: window.config.reqParam,
	    success: function success(res) {
	      if (res.rescode == 100) {
	        vm.numShake = res.data.availableCount;
	        if (res.data.availableCount > 0) {
	          setTimeout(function () {
	            startShake(vm);
	          }, 300);
	        }
	      } else {
	        utils.dialog(res.message);
	      }
	    },
	    error: function error(xhr) {
	      utils.dialog('暂无数据');
	    }
	  });
	};
	exports.default = {
	  data: function data() {
	    return {
	      show: false,
	      numShake: 0,
	      pts: this.$parent.pts
	    };
	  },

	  watch: {
	    numShake: function numShake(v) {
	      if (+v && deviceMotionHandler) {
	        window.removeEventListener('devicemotion', deviceMotionHandler);
	        window.addEventListener('devicemotion', deviceMotionHandler, false);
	      } else if (! +v && deviceMotionHandler) {
	        window.removeEventListener('devicemotion', deviceMotionHandler);
	      }
	    }
	  },
	  ready: function ready() {
	    var t = this;
	    back(t, null, function () {
	      window.removeEventListener('devicemotion', deviceMotionHandler);
	    });
	    t.$on('arenaTap', function (num) {
	      var bol = num == 2;
	      if (bol) {
	        t.pts = t.$parent.pts;
	        t.$parent.pts = false;
	        t.numShake = 0;
	        maxShake = 10;
	        init(t);
	      }

	      t.show = bol;
	    });
	  }
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(33);

	var _utils2 = _interopRequireDefault(_utils);

	var _hammer = __webpack_require__(32);

	var _hammer2 = _interopRequireDefault(_hammer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pageViewTab = function pageViewTab(vm) {
	  var rootVm = vm.$root,
	      svg = _utils2.default.getId('index'),
	      id = _utils2.default.getId('g'),
	      rect = id.getElementsByTagName('rect'),
	      len = rect.length,
	      i = 0,
	      arr = [1, 2, 3, 4, 1, 2, 3, 4];

	  var tapHd = function tapHd(key) {
	    (0, _hammer2.default)(rect[key]).on('tap', function (ev) {
	      if (rootVm.isTranslate) {
	        return;
	      }
	      rootVm.olsShow = rootVm.show;
	      vm.$dispatch('child-show', arr[key] + 1);
	    });
	  };
	  for (; i < len; i++) {
	    tapHd(i);
	  }
	};

	exports.default = {
	  data: function data() {
	    return {
	      pts: this.$root.show
	    };
	  },
	  ready: function ready() {
	    var t = this;
	    t.$on('pageTab', function (num) {
	      t.pts = num;
	    });
	    setTimeout(function () {
	      pageViewTab(t);
	    }, 200);
	    window.indexVm = t;
	  }
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var back = _index2.default.back;
	var getUser = _index2.default.getUser;

	_vue2.default.filter('toBool', function (s) {
	  return !! +s;
	});
	var getList = function getList(vm) {};
	var btnTap = function btnTap(vm) {
	  var btn = document.getElementById('btn');
	  var rootVm = vm.$root;
	  Hammer(btn).on('tap', function (ev) {
	    var target = ev.target,
	        pt,
	        idx;
	    if (btn.disabled) return;
	    var reqObj = utils.extend({}, window.config.reqParam);
	    if (rootVm.isTranslate) {
	      return;
	    }
	    vm.isTap = true;
	    reqObj.adId = vm.listData.adId;
	    console.log(reqObj);
	    utils.ajax({
	      url: config.URL + 'doCashRedPaper.do',
	      type: 'post',
	      dataType: 'json',
	      data: reqObj,
	      success: function success(res) {
	        utils.dialog(res.message);
	      },
	      error: function error() {}
	    });
	  });
	};
	var timeDown = function timeDown(vm) {
	  var time = function time() {
	    vm.timeNum -= 1;
	    if (vm.timeNum == 0) {
	      vm.isTap = false;
	    }
	    if (vm.timeNum > 0) {
	      setTimeout(time, 1000);
	    }
	  };
	  time();
	};
	exports.default = {
	  data: function data() {
	    return {
	      show: false,
	      timeNum: 5,
	      isTap: true,
	      listData: {},
	      pts: this.$parent.pts
	    };
	  },

	  watch: {
	    timeNum: function timeNum(v) {}
	  },
	  ready: function ready() {
	    var t = this;
	    back(t, 'show');
	    btnTap(t);
	    t.$on('moneyDetail', function (data) {
	      t.timeNum = 5;
	      t.isTap = true;
	      t.pts = t.$parent.show;
	      t.$parent.show = false;
	      t.show = true;
	      t.listData = data;
	      setTimeout(function () {
	        timeDown(t);
	      }, 300);
	    });
	  }
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _list = __webpack_require__(129);

	var _list2 = _interopRequireDefault(_list);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var listTap = function listTap(vm) {
	  var box = document.getElementById('listBox');
	  var rootVm = vm.$root;
	  Hammer(box).on('tap', function (ev) {
	    var target = ev.target,
	        pt,
	        idx;

	    if (!box.contains(target)) {
	      return;
	    }
	    if (rootVm.isTranslate) {
	      return;
	    }
	    pt = target;
	    while (pt.tagName.toLowerCase() !== 'li') {
	      pt = pt.parentNode;
	    }
	    idx = pt.getAttribute('data-idx');
	    utils.setActive(vm, pt.children[0].children[0]);

	    vm.$broadcast('moneyList', vm.btn[idx]);
	  });
	};

	exports.default = {
	  data: function data() {
	    return {

	      btn: [{ id: 1, title: '厨卫电器' }, { id: 2, title: '家具建材' }, { id: 3, title: '家用电器' }, { id: 4, title: '生活服务' }, { id: 5, title: '汽车用品' }, { id: 6, title: '生活家电' }, { id: 7, title: '随机' }],
	      pts: this.$root.show
	    };
	  },

	  components: { List: _list2.default },
	  ready: function ready() {
	    var t = this;
	    listTap(t);
	    t.$on('pageTab', function (num) {
	      t.pts = num;
	    });
	  }
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	var _detail = __webpack_require__(127);

	var _detail2 = _interopRequireDefault(_detail);

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.filter('toBool', function (s) {
	  return !! +s;
	});
	var back = _index2.default.back;
	var getUser = _index2.default.getUser;

	var getList = function getList(vm) {};
	var listTap = function listTap(vm) {
	  var box = document.getElementById('box');
	  var rootVm = vm.$root;
	  Hammer(box).on('tap', function (ev) {
	    var target = ev.target,
	        pt,
	        idx;

	    if (!box.contains(target) || rootVm.isTranslate) {
	      return;
	    }

	    pt = target;
	    while (pt.tagName.toLowerCase() !== 'button') {
	      pt = pt.parentNode;
	    }
	    if (pt.disabled) {
	      utils.dialog('已经抢过了');
	      return;
	    };
	    document.body.classList.add('detail');
	    idx = pt.getAttribute('data-idx');
	    utils.setActive(vm, pt.children[0].children[0]);

	    vm.$broadcast('moneyDetail', vm.list[idx]);
	  });
	};
	var init = function init(vm) {
	  var reqObj = utils.extend({}, window.config.reqParam);
	  reqObj.adKind = vm.adKind;
	  utils.ajax({
	    url: config.URL + 'initCashRedPaper.do',
	    type: 'post',
	    dataType: 'json',
	    data: reqObj,
	    success: function success(res) {
	      if (res.rescode == 100) {
	        vm.list = res.list;
	        setTimeout(function () {
	          winScroll(vm);
	        }, 200);
	      } else {
	        utils.dialog(res.message);
	      }
	    },
	    error: function error() {
	      utils.dialog('暂无数据');
	    }
	  });
	};
	var winScroll = function winScroll(vm) {
	  var rootNode = document.getElementById('money-controller');
	  var page = rootNode.querySelectorAll('.page')[0];
	  var box = document.getElementById('box');
	  var loadTxt = ['上拉加载更多', '数据加载中...', '已经到最后一条'];
	  var isEnd = false;
	  var rootHeight = rootNode.offsetHeight;
	  var scrollHeight = page.scrollHeight;
	  if (box.offsetHeight > rootHeight) {
	    vm.pullUpAll = false;
	  } else {
	    vm.pullUpAll = true;
	  }
	  page.addEventListener('scroll', function (e) {
	    var rootHeight = rootNode.offsetHeight;
	    var scrollHeight = page.scrollHeight;
	    var top = page.scrollTop;
	    var box = document.getElementById('box');
	    var pageSize = 0;
	    var reqObj = utils.extend({}, window.config.reqParam);
	    if (box.offsetHeight > rootHeight) {
	      vm.pullUpAll = true;
	    } else {
	      vm.pullUpAll = false;
	    }
	    if (scrollHeight > rootHeight && !vm.pullUpLoadStatus && !isEnd) {

	      if (scrollHeight - top - 50 <= rootHeight) {
	        vm.pullUpLoadStatus = true;
	        reqObj.adKind = vm.adKind;
	        reqObj.adId = vm.list[vm.list.length - 1].adId;

	        utils.ajax({
	          url: config.URL + 'addMoreCashRedPaper.do',
	          type: 'post',
	          dataType: 'json',
	          data: reqObj,
	          success: function success(res) {
	            vm.pullUpLoadStatus = false;
	            if (!res.list) {
	              isEnd = true;
	              vm.pullUpLoadTxt = loadTxt[2];
	            } else {
	              for (var i = 0, len = res.list.length; i < len; i++) {
	                vm.list.push(res.list[i]);
	              }

	              isEnd = false;
	              vm.pullUpLoadTxt = loadTxt[0];
	            }
	          },
	          error: function error(xhr) {
	            vm.pullUpLoadTxt = loadTxt[2];
	          }
	        });
	      }
	    }
	  });
	};
	exports.default = {
	  data: function data() {
	    return {
	      pullUpLoadTxt: '上拉加载更多',
	      pullUpLoadStatus: false,
	      pullUpAll: false,
	      title: '',
	      list: [],
	      show: false,
	      pts: this.$parent.pts
	    };
	  },

	  methods: {
	    toBol: function toBol(v) {
	      return typeof v == 'string' ? !! +v : !!v;
	    }
	  },
	  components: { Detail: _detail2.default },
	  ready: function ready() {
	    var t = this;
	    back(t);
	    listTap(t);
	    window.sttt = t;
	    setTimeout(function () {
	      winScroll(t);
	    }, 200);
	    t.$on('moneyList', function (data) {
	      t.pts = t.$parent.pts;
	      t.$parent.pts = false;
	      t.title = data.title;
	      t.adKind = data.id;
	      t.show = true;

	      init(t);
	    });
	  }
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _template = __webpack_require__(34);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var backBtn;
	var go = function go(vm) {
	  var btn = vm.$els.signstarGo;

	  Hammer(btn).on('tap', function (ev) {
	    if (!vm.data || !vm.data.adId) return;

	    var d = utils.extend({}, window.config.reqParam, { adId: vm.data.adId });
	    utils.ajax({
	      url: config.URL + 'doSign.do',
	      type: 'post',
	      dataType: 'json',
	      data: d,
	      success: function success(res) {
	        btn.disabled = true;

	        utils.dialog(res.message);
	      },
	      error: function error(xhr) {
	        utils.dialog('暂无数据');
	      }
	    });
	  });
	};
	var infoTip = function infoTip(vm) {
	  var btn = vm.$els.signstarInfo;
	  Hammer(btn).on('tap', function (ev) {
	    utils.dialog(_template2.default[1].join(''));
	  });
	};
	var init = function init(vm) {
	  var rootVm = vm.$root;

	  utils.ajax({
	    url: config.URL + 'initSign.do',
	    type: 'POST',
	    dataType: 'json',
	    data: window.config.reqParam,
	    success: function success(res) {
	      if (res.rescode == 100) {
	        vm.data = res.data;
	        vm.data.signOverFlg = !! +vm.data.signOverFlg;
	      } else {
	        utils.dialog(res.message);
	      }
	    },
	    error: function error(xhr) {
	      setTimeout(function () {
	        utils.dialog('暂时无任务数据');
	      }, 200);
	    }
	  });
	};
	exports.default = {
	  data: function data() {
	    return {
	      data: {},
	      pts: this.$root.show
	    };
	  },
	  ready: function ready() {
	    var t = this;
	    backBtn = document.getElementById('h-back');
	    go(t);
	    infoTip(t);
	    t.$on('pageTab', function (num) {
	      if (num == 4) {
	        init(t);
	      }
	      t.pts = num;
	    });
	  }
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _share = __webpack_require__(133);

	var _share2 = _interopRequireDefault(_share);

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var doc = document;
	var back = _index2.default.back;

	var button;
	var share = function share(vm) {
	  var rect = vm.$children[0].$els.shareBox.getElementsByTagName('rect');

	  var arr = [{ id: 0, name: '微信' }, { id: 1, name: '朋友圈' }, { id: 2, name: 'qq' }, { id: 3, name: 'qq空间' }, { id: 4, name: '新浪微博' }];
	  var hd = function hd(n) {
	    var node = rect[n];
	    Hammer(node).on('tap', function (ev) {

	      var reqObj = utils.extend({}, window.config.reqParam);
	      reqObj.adId = vm.taskDetail.adId;
	      utils.ajax({
	        url: config.URL + 'doShareMisson.do',
	        type: 'post',
	        dataType: 'json',
	        data: reqObj,
	        success: function success(res) {
	          if (res.rescode == 100) {
	            vm.missonOverFlg = true;
	            button.removeAttribute('disabled');
	            callClientFunction('share', {
	              shareType: arr[n].id,
	              missonTitle: res.data.missonTitle,
	              missonContent: res.data.missonContent,
	              missionShareUrl: res.data.missionShareUrl,
	              smallPicUrl: res.data.smallPicUrl
	            });
	          } else {
	            utils.dialog(res.message);
	          }
	        },
	        error: function error(xhr) {
	          utils.dialog('没抢到');
	        }
	      });
	    });
	  };
	  for (var i = 0, len = rect.length; i < len; i++) {
	    hd(i);
	  }
	};
	var rush = function rush(vm) {

	  Hammer(button).on('tap', function (ev) {
	    if (vm.$root.isTranslate) {
	      return;
	    }
	    vm.missonOverFlg = true;
	    button.disabled = true;
	  });
	};
	exports.default = {
	  data: function data() {
	    return {
	      taskDetail: {
	        missonOverFlg: 0
	      },
	      missonOverFlg: false,
	      parentIdx: '',
	      show: false,
	      pts: this.$parent.pts
	    };
	  },

	  methods: {
	    isBol: function isBol() {
	      this.missonOverFlg = !! +this.taskDetail.missonOverFlg;
	    }
	  },
	  components: { Share: _share2.default },
	  ready: function ready() {
	    var t = this;
	    button = t.$els.rush;
	    button.removeAttribute('disabled');
	    rush(t);
	    back(t);
	    t.$on('setData', function (data, idx) {
	      button.removeAttribute('disabled');
	      for (var i in data) {
	        if (i == 'missonOverFlg') {
	          t.taskDetail[i] = +data[i];
	        }
	      }
	      t.taskDetail = data;
	      t.parentIdx = idx;
	      t.missonOverFlg = false;
	      t.pts = t.$parent.pts;
	      t.$parent.pts = false;
	      t.show = true;
	      share(t);
	    });
	    window.articleVm = t;
	  }
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _article = __webpack_require__(131);

	var _article2 = _interopRequireDefault(_article);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var listTap = function listTap(vm) {
	  var t = vm;
	  var taskBox = t.$els.taskBox;
	  Hammer(taskBox).on('tap', function (ev) {
	    if (vm.$root.isTranslate) {
	      return;
	    }
	    var target = ev.target;
	    var pt, idx, data;
	    if (taskBox.contains(target)) {
	      if (target.tagName.toLowerCase() != 'li') {
	        pt = target.parentNode;
	        while (pt.tagName.toLowerCase() !== 'li') {
	          pt = pt.parentNode;
	        }
	      } else {
	        pt = target;
	      }
	      idx = pt.getAttribute('data-idx');
	      data = t.taskData[idx];
	      if (data.isGrab) {
	        utils.dialog('您已经抢过了!!!');
	        return false;
	      }
	      t.$broadcast('setData', data, idx);
	      t.taskDetail = data;
	    }
	  });
	};
	var init = function init(vm) {
	  utils.ajax({
	    url: config.URL + 'initShareMisson.do',
	    type: 'post',
	    dataType: 'json',
	    data: window.config.reqParam,
	    success: function success(res) {
	      if (res.rescode == 100) {
	        vm.taskData = res.list;
	        setTimeout(function () {
	          winScroll(vm);
	        }, 300);
	      }
	    },
	    error: function error(xhr) {}
	  });
	};
	var winScroll = function winScroll(vm) {
	  var rootNode = document.getElementById('task-controller');
	  var page = rootNode.querySelectorAll('.page')[0];
	  var loadTxt = ['上拉加载更多', '数据加载中...', '已经到最后一条'];
	  var isEnd = false;

	  var taskBox = vm.$els.taskBox;
	  if (taskBox.offsetHeight > page.offsetHeight) {
	    vm.isPullUp = true;
	  } else {
	    vm.isPullUp = false;
	  }
	  page.addEventListener('scroll', function (e) {
	    var rootHeight = rootNode.offsetHeight;
	    var scrollHeight = page.scrollHeight;
	    var top = page.scrollTop;
	    var pageSize = 0;
	    var reqObj = utils.extend({}, window.config.reqParam);
	    var taskBox = vm.$els.taskBox;
	    if (taskBox.offsetHeight > page.offsetHeight) {
	      vm.isPullUp = true;
	    } else {
	      vm.isPullUp = false;
	    }
	    if (taskBox.offsetHeight > rootHeight && !vm.pullUpLoadStatus && !isEnd) {

	      if (scrollHeight - top - 50 <= rootHeight) {
	        vm.pullUpLoadStatus = true;
	        reqObj.adId = vm.taskData[vm.taskData.length - 1].adId;

	        utils.ajax({
	          url: config.URL + 'addMoreShareMisson.do',
	          type: 'post',
	          dataType: 'json',
	          data: reqObj,
	          success: function success(res) {
	            vm.pullUpLoadStatus = false;
	            if (!res.list) {
	              isEnd = true;
	              vm.pullUpLoadTxt = loadTxt[2];
	            } else {
	              for (var i = 0, len = res.list.length; i < len; i++) {
	                vm.taskData.push(res.list[i]);
	              }

	              isEnd = false;
	              vm.pullUpLoadTxt = loadTxt[0];
	            }
	          },
	          error: function error(xhr) {
	            vm.pullUpLoadTxt = loadTxt[2];
	          }
	        });
	      }
	    }
	  });
	};

	exports.default = {
	  data: function data() {
	    return {
	      pullUpLoadTxt: '上拉加载更多',
	      pullUpLoadStatus: false,
	      isPullUp: false,
	      taskData: [],
	      pts: this.$root.show
	    };
	  },
	  events: {
	    'child-show': function childShow(num) {
	      this.taskData[num].missonOverFlg = true;
	    }
	  },
	  components: { Art: _article2.default },
	  ready: function ready() {
	    var t = this;
	    listTap(t);
	    winScroll(t);
	    t.$on('pageTab', function (num) {
	      if (num == 2) {
	        if (!t.taskData.length) init(t);
	      }
	      t.pts = num;
	    });

	    window.taskVM = t;
	  }
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: function data() {
	    return {};
	  },
	  ready: function ready() {}
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(89);
	var $Object = __webpack_require__(7).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90);
	module.exports = __webpack_require__(7).Object.keys;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	__webpack_require__(91);
	__webpack_require__(94);
	__webpack_require__(95);
	module.exports = __webpack_require__(7).Symbol;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	__webpack_require__(96);
	module.exports = __webpack_require__(31).f('iterator');

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(6)
	  , toLength  = __webpack_require__(87)
	  , toIndex   = __webpack_require__(86);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(68);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(13)
	  , gOPS    = __webpack_require__(41)
	  , pIE     = __webpack_require__(24);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).document && document.documentElement;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(36);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(36);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(23)
	  , descriptor     = __webpack_require__(17)
	  , setToStringTag = __webpack_require__(25)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(11)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(13)
	  , toIObject = __webpack_require__(6);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(18)('meta')
	  , isObject = __webpack_require__(16)
	  , has      = __webpack_require__(5)
	  , setDesc  = __webpack_require__(10).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(12)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(10)
	  , anObject = __webpack_require__(14)
	  , getKeys  = __webpack_require__(13);

	module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(24)
	  , createDesc     = __webpack_require__(17)
	  , toIObject      = __webpack_require__(6)
	  , toPrimitive    = __webpack_require__(29)
	  , has            = __webpack_require__(5)
	  , IE8_DOM_DEFINE = __webpack_require__(38)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(6)
	  , gOPN      = __webpack_require__(40).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(5)
	  , toObject    = __webpack_require__(44)
	  , IE_PROTO    = __webpack_require__(26)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(15)
	  , core    = __webpack_require__(7)
	  , fails   = __webpack_require__(12);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(28)
	  , defined   = __webpack_require__(19);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(28)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(28)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(69)
	  , step             = __webpack_require__(77)
	  , Iterators        = __webpack_require__(21)
	  , toIObject        = __webpack_require__(6);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(39)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(15)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(23)});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(44)
	  , $keys    = __webpack_require__(13);

	__webpack_require__(84)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 91 */
/***/ function(module, exports) {

	

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(85)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(39)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(4)
	  , has            = __webpack_require__(5)
	  , DESCRIPTORS    = __webpack_require__(8)
	  , $export        = __webpack_require__(15)
	  , redefine       = __webpack_require__(43)
	  , META           = __webpack_require__(79).KEY
	  , $fails         = __webpack_require__(12)
	  , shared         = __webpack_require__(27)
	  , setToStringTag = __webpack_require__(25)
	  , uid            = __webpack_require__(18)
	  , wks            = __webpack_require__(11)
	  , wksExt         = __webpack_require__(31)
	  , wksDefine      = __webpack_require__(30)
	  , keyOf          = __webpack_require__(78)
	  , enumKeys       = __webpack_require__(72)
	  , isArray        = __webpack_require__(75)
	  , anObject       = __webpack_require__(14)
	  , toIObject      = __webpack_require__(6)
	  , toPrimitive    = __webpack_require__(29)
	  , createDesc     = __webpack_require__(17)
	  , _create        = __webpack_require__(23)
	  , gOPNExt        = __webpack_require__(82)
	  , $GOPD          = __webpack_require__(81)
	  , $DP            = __webpack_require__(10)
	  , $keys          = __webpack_require__(13)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(40).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(24).f  = $propertyIsEnumerable;
	  __webpack_require__(41).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(22)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(30)('asyncIterator');

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(30)('observable');

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	var global        = __webpack_require__(4)
	  , hide          = __webpack_require__(9)
	  , Iterators     = __webpack_require__(21)
	  , TO_STRING_TAG = __webpack_require__(11)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 97 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 98 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZ4AAACaCAYAAACZmi6tAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0JBMThGRjkwRjQyMTFFNjhFRjlFNkU0RDVCNTc1MzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0JBMThGRkEwRjQyMTFFNjhFRjlFNkU0RDVCNTc1MzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQkExOEZGNzBGNDIxMUU2OEVGOUU2RTRENUI1NzUzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQkExOEZGODBGNDIxMUU2OEVGOUU2RTRENUI1NzUzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnEIUCoAAB/sSURBVHja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"

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZ4AAAC1CAYAAABvYJlOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0JBMThGRkQwRjQyMTFFNjhFRjlFNkU0RDVCNTc1MzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0JBMThGRkUwRjQyMTFFNjhFRjlFNkU0RDVCNTc1MzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQkExOEZGQjBGNDIxMUU2OEVGOUU2RTRENUI1NzUzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQkExOEZGQzBGNDIxMUU2OEVGOUU2RTRENUI1NzUzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoWLQhIAAGzMSURBVHja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"

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAAAoCAYAAADg1CgtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzcwRjZGRUZGM0VDMTFFNTlEREQ5M0JGMzJEODEyMDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzcwRjZGRjBGM0VDMTFFNTlEREQ5M0JGMzJEODEyMDMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NzBGNkZFREYzRUMxMUU1OURERDkzQkYzMkQ4MTIwMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NzBGNkZFRUYzRUMxMUU1OURERDkzQkYzMkQ4MTIwMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt1077cAAA0TSURBVHja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"

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = "\n<!-- 0 首页, 1 任务, 2 竞技场 , 3 签到, 5 暂定详情-->\n<div id=\"page-wrapper\" class=\"page-wrapper\">\n  <Index></Index>\n  <Task></Task>\n  <Sign></Sign>\n  <Arena></Arena>\n  <Money></Money>\n  <audio src=\"./static/images/5018.mp3\">您的浏览器不支持 audio 标签。</audio>\n  <div id=\"mask\" class=\"mask\"></div>\n  <div id=\"dialog\" class=\"dialog\"></div>  \n</div>\n";

/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = "\n<!-- 竞技场 -->\n<div class=\"pages-controller\" v-show=\"show\" transition=\"art\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <div class=\"h-back\" v-el:back data-article=\"article\"><span class=\"icon-arrow-left2\"></span>返回</div>\n    <h1 class=\"h-title\" >\n      定时红包抢现金\n    </h1>\n  </div>  \n  <div class=\"gol-wrapper doc-header\">\n    <div class=\"page\" >\n      <div class=\"article-inner\" style=\"padding-top:20px;\">\n          <div class=\"timinggrab\" id=\"timinggrab\">\n            <div class=\"list\" v-for=\"it in timinggrabData\"  data-idx=\"{{$index}}\">\n              <div class=\"inner\">\n                <div class=\"flip out\">\n                  <div class=\"icon\">\n                    {{{$index | renderSrc }}}\n                  </div>\n                  <div class=\"desc\" >\n                    <p v-for=\"sit in it.desc\">{{sit}}</p>\n                  </div> \n                </div>\n                <div class=\"flip in\">\n                  <div class=\"icon\">\n                    {{{$index | renderSrc }}}\n                  </div>\n                  <div class=\"desc\" >\n                    <p v-for=\"sit in it.desc\">{{sit}}</p>\n                  </div> \n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"padding-20 txt-red\">\n            <p class=\"fz16 padding-bottom-5\">规则说明：</p>\n            <p class=\"fz12 padding-bottom-5\">1、定时红包有4波，包括起床红包、午休红包、晚餐红包和睡前红包。</p>\n            <p class=\"fz12 padding-bottom-5\">2、定时红包发放数量有限，抢完为止。</p>\n            <p class=\"fz12 padding-bottom-5\">3、定时红包对所有会员开放。</p>\n          </div>\n      </div>    \n    </div>\n  </div>\n</div>\n<Flopdetail></Flopdetail>\n";

/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = "\n<!-- 竞技场 -->\n<div class=\"pages-controller\" v-show=\"show\" transition=\"art\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <div class=\"h-back\" v-el:back data-article=\"article\"><span class=\"icon-arrow-left2\"></span>返回</div>\n    <h1 class=\"h-title\" >\n      定时红包抢现金\n    </h1>\n  </div>  \n  <div class=\"gol-wrapper doc-header\">\n    <div class=\"page\" >\n      <img v-bind:src=\"data.adPicUrl\" alt=\"\">  \n    </div>\n  </div>\n</div>\n";

/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = "\n<!-- 竞技场 -->\n<div class=\"pages-controller\" v-show=\"pts==3\" transition=\"expand\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <div class=\"h-back\" ><span class=\"icon-arrow-left2\"></span>返回</div>\n    <h1 class=\"h-title\" >\n      竞技场\n    </h1>\n  </div>  \n  <div class=\"gol-wrapper doc-header\">\n    <div class=\"page\" style=\"overflow-y:-hidden\">\n      <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 750 1294\" style=\"enable-background:new 0 0 750 1294;position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto;\" xml:space=\"preserve\">\n        <g>\n          <image style=\"overflow:visible; opacity:1\" width=\"750\" height=\"1294\" xlink:href=\"./static/images/page-2.png\" >\n          </image>\n        </g>\n        <g v-el:g>\n          <rect x=\"132.3\" y=\"201.3\" class=\"st0\" width=\"267.9\" height=\"313.5\"/>\n          <rect x=\"494.8\" y=\"358\" class=\"st0\" width=\"165\" height=\"156.8\"/>\n          <rect x=\"132.3\" y=\"538.8\" class=\"st0\" width=\"242.7\" height=\"369\"/>\n          <rect x=\"413.8\" y=\"844.8\" class=\"st0\" width=\"246\" height=\"309\"/>\n        </g>\n      </svg>\n    </div>\n  </div>\n\n</div>\n  <Lotto></Lotto>\n  <Shake></Shake>\n  <Flop></Flop>\n";

/***/ },
/* 106 */
/***/ function(module, exports) {

	module.exports = "\n<!-- 竞技场 -->\n<div class=\"pages-controller lotto\" v-show=\"show\" transition=\"art\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <button type=\"button\" class=\"h-back\" v-el:back data-article=\"article\"><span class=\"icon-arrow-left2\"></span>返回</button>\n    <h1 class=\"h-title\" >\n      猜大小\n    </h1>\n  </div>  \n  <div class=\"gol-wrapper doc-header\">\n    <div class=\"page\" style=\"overflow-y:hidden\">\n      <Temp></Temp>\n      <Desc></Desc>    \n    </div>\n  </div>\n</div>\n";

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<div class=\"desc-box\" >\n  <div v-show=\"!lottoStartEnd\">\n    <p>您的积分: {{score}}</p>\n    <p>轻选择参与游戏分数值: &nbsp;\n      <label for=\"\" v-for=\"it in bet\"><input type=\"radio\" name=\"bet\" v-model=\"betScore\" v-bind:checked=\"it.checked\" v-bind:value=\"it.score\">{{it.score}}</label>\n    </p>\n    <p>\n      请猜结果: &nbsp;\n      <label for=\"\"><input type=\"radio\" v-model=\"lotSts\" name=\"sts\" value=\"b\" checked>大</label>\n      <label for=\"\"><input type=\"radio\" v-model=\"lotSts\" name=\"sts\" value=\"s\">小</label>\n    </p>\n    <p>\n      <button type=\"button\" id=\"lotto-btn\" class=\"start\" v-bind:disabled=\"isStart\">开始</button>\n    </p>\n    <p>&nbsp;</p>\n    <p class=\"lh-14\">游戏说明： </p>\n    \n    <p class=\"lh-14 padding-tb0\">1.压500赢1000积分、压1000赢3000积分、压10000赢20000积分。</p>\n    <!-- <p class=\"lh-14 padding-tb0\">2.每个账号每天可以参与三次猜大小，贡献值额度不限。</p> -->\n    <p class=\"lh-14 padding-tb0\">2.猜大小的结果将影响当前相应的贡献值。</p>\n\n  </div>\n  <div class=\"tip\" v-show=\"lottoStartEnd\">\n    <div class=\"btn-box\" id=\"lotto-is-win-btn\">\n      <!-- <template v-show=\"isWin\"> -->\n        <img src=\"" + __webpack_require__(100) + "\"  class=\"is-win\" alt=\"\" v-show=\"isWin\">\n      <!-- </template> -->\n      <!-- <template v-show=\"!isWin\"> -->\n        <img src=\"" + __webpack_require__(99) + "\"  class=\"is-win\" alt=\"\" v-show=\"!isWin\">\n      <!-- </template> -->\n    </div>\n    <p>&nbsp;</p>\n    <p class=\"lh-14\" style=\"padding-left:85px;\">游戏说明:</p>\n    <p class=\"lh-14 padding-tb0\" style=\"padding-left:85px;\">2,3,4,5,6 7小 &nbsp;&nbsp; 8,9,10,11,12大</p>\n  </div>\n</div>  \n";

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = "\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 750 1294\" style=\"enable-background:new 0 0 750 1294;position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto;\" xml:space=\"preserve\">\n  <style>\n    use{\n      opacity:1\n    }\n    g use{\n      opacity:0\n    }\n    g use:nth-child(2){\n      opacity:1\n    }\n\n    g:last-child  use{\n      opacity:0\n    }\n    g:last-child  use:nth-child(4){\n      opacity:1\n    }\n  </style>\n  <defs >\n    <image id=\"sss1\" xlink:href=\"./static/images/s/1.png\" style=\"overflow:visible;\" width=\"200\" height=\"200\"></image>\n\n    <image id=\"sss2\" xlink:href=\"./static/images/s/2.png\" style=\"overflow:visible;\" width=\"200\" height=\"200\"></image>\n\n    <image id=\"sss3\" xlink:href=\"./static/images/s/3.png\" style=\"overflow:visible;\" width=\"200\" height=\"200\"></image>\n\n    <image id=\"sss4\" xlink:href=\"./static/images/s/4.png\" style=\"overflow:visible;\" width=\"200\" height=\"200\"></image>\n\n    <image id=\"sss5\" xlink:href=\"./static/images/s/5.png\" style=\"overflow:visible;\" width=\"200\" height=\"200\"></image>\n\n    <image id=\"sss6\" xlink:href=\"./static/images/s/6.png\" style=\"overflow:visible;\" width=\"200\" height=\"200\"></image>\n\n    <image id=\"ssst\" xlink:href=\"./static/images/s/t.png\" style=\"overflow:visible;\" width=\"200\" height=\"200\"></image>\n\n    <image id=\"sssb\" xlink:href=\"./static/images/s/b.png\" style=\"overflow:visible;\" width=\"200\" height=\"200\"></image>\n\n    <image id=\"ssss\" xlink:href=\"./static/images/s/s.png\" style=\"overflow:visible;\" width=\"200\" height=\"200\"></image>\n  </defs>\n  <image style=\"overflow:visible;opacity:1\" width=\"750\" height=\"1294\" xlink:href=\"./static/images/1-5-4-2-1.jpg\"></image>\n  <g id=\"t1\">\n    <use xlink:href=\"#sss1\" transform=\"matrix(0.5066 0 0 0.5066 352.6071 528.0714)\"></use>\n    <use xlink:href=\"#sss2\"  transform=\"matrix(0.5 0 0 0.5 353.9286 528.7321)\"></use>\n    <use xlink:href=\"#sss3\"  transform=\"matrix(0.5 0 0 0.5 353.2679 528.7321)\"></use>\n    <use xlink:href=\"#sss4\"  transform=\"matrix(0.5 0 0 0.5 353.9286 528.7321)\"></use>\n    <use xlink:href=\"#sss5\"  transform=\"matrix(0.5 0 0 0.5 353.2679 528.7321)\"></use>\n    <use xlink:href=\"#sss6\"  transform=\"matrix(0.5 0 0 0.5 353.9286 528.7321)\"></use>\n    <use xlink:href=\"#ssst\"  transform=\"matrix(0.5 0 0 0.5 353.2679 528.7321)\"></use>\n    <use xlink:href=\"#sssb\"  transform=\"matrix(0.5 0 0 0.5 353.2679 528.7321)\"></use>\n    <use xlink:href=\"#ssss\"  transform=\"matrix(0.5 0 0 0.5 353.2679 528.7321)\"></use>\n  </g>\n  <g id=\"t2\">\n    <use xlink:href=\"#sss1\"  transform=\"matrix(0.5066 0 0 0.5066 453.9286 427.4107)\"></use>\n    <use xlink:href=\"#sss2\"  transform=\"matrix(0.5 0 0 0.5 455.25 428.0714)\"></use>\n    <use xlink:href=\"#sss3\"  transform=\"matrix(0.5 0 0 0.5 454.5893 428.0714)\"></use>\n    <use xlink:href=\"#sss4\"  transform=\"matrix(0.5 0 0 0.5 455.25 428.0714)\"></use>\n    <use xlink:href=\"#sss5\"  transform=\"matrix(0.5 0 0 0.5 454.5893 428.0714)\"></use>\n    <use xlink:href=\"#sss6\"  transform=\"matrix(0.5 0 0 0.5 455.25 428.0714)\"></use>\n    <use xlink:href=\"#ssst\"  transform=\"matrix(0.5 0 0 0.5 454.5893 428.0714)\"></use>\n    <use xlink:href=\"#sssb\"  transform=\"matrix(0.5 0 0 0.5 455.25 428.0714)\"></use>\n    <use xlink:href=\"#ssss\"  transform=\"matrix(0.5 0 0 0.5 454.5893 428.0714)\"></use>\n  </g>\n</svg>\n";

/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = "\n<!-- 竞技场 -->\n<div class=\"pages-controller\" v-show=\"show\" transition=\"art\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <div class=\"h-back\" v-el:back data-article=\"article\"><span class=\"icon-arrow-left2\"></span>返回</div>\n    <h1 class=\"h-title\" >\n      摇一摇\n    </h1>\n  </div>  \n  <div class=\"gol-wrapper doc-header\">\n    <div class=\"page\" style=\"overflow-y: hidden;\">\n      <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 750 1294\" style=\"enable-background:new 0 0 750 1294;position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto;\">\n        <style type=\"text/css\">\n          @-webkit-keyframes byi{\n              0%{-webkit-transform: rotateZ(-20deg);transform: rotateZ(-40deg);}\n              100%{-webkit-transform: rotateZ(10deg);transform: rotateZ(20deg);}\n          } \n          .images-animate {\n            -webkit-transform: rotateZ(0);\n            transform: rotateZ(0);\n            -webkit-transform-origin: 100% 100%;\n            transform-origin: 100% 100%;\n          }\n          .y1y{\n            -webkit-animation:byi .5s ease-out backwards;\n            animation:byi .5s ease-out backwards;\n          }\n        </style>  \n        <image style=\"overflow:visible;\" width=\"750\" height=\"1294\" xlink:href=\"./static/images/y-y.jpg\" transform=\"matrix(1 0 0 1 0 0)\">\n        </image>\n        <image class=\"images-animate\" id=\"shakeImg\" style=\"overflow:visible;\" x=\"200\" y=\"620\" width=\"287\" height=\"255\"  xlink:href=\"./static/images/y-phone.png\" transform=\"matrix(1 0 0 1 231.5 599.7857)\">\n      </svg>\n      <div style=\"position:absolute; bottom:30px; left:0; right:0; text-align:center; color:#6eb92b; font-size:16px;\">摇一摇, 摇出好运气</div>\n    </div>\n  </div>\n</div>\n";

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<!-- 游戏入口 -->\n<div class=\"pages-controller\" v-show=\"pts==1\" transition=\"expand\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <div class=\"h-back\" ><span class=\"icon-arrow-left2\"></span>返回</div>\n    <h1 class=\"h-title image-title\" >\n      <img src=\"" + __webpack_require__(101) + "\" alt=\"\">\n    </h1>\n    <!-- <div class=\"h-info\" >&nbsp;</div> -->\n  </div>  \n  <div class=\"gol-wrapper doc-header\">\n    <div class=\"page\" id=\"idx-page\" style=\"overflow-y:-hidden;overflow-x:-hidden;\">\n      <svg version=\"1.1\" id=\"index\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 750 1294\" style=\"opacity:1;position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto; \" xml:space=\"preserve\">\n        <!-- <g> -->\n          <image style=\"overflow:visible;opacity:1\" width=\"750\" height=\"1294\" xlink:href=\"./static/images/page-1.png\"></image>\n        <!-- </g> -->\n        <g id=\"g\">\n          <rect x=\"129\" y=\"217\" width=\"156\" height=\"120\"  class=\"st0\"/>\n          <rect x=\"557\" y=\"369\" width=\"158\" height=\"98.8\" class=\"st0\"/>\n          <rect x=\"45\" y=\"589\" width=\"162\" height=\"120\" class=\"st0\"/>\n          <rect x=\"207\" y=\"995\" width=\"168\" height=\"116\" class=\"st0\"/>\n          <rect x=\"165\" y=\"353\" width=\"180\" height=\"196\" class=\"st0\"/>\n          <rect x=\"497\" y=\"469.8\" width=\"180\" height=\"178\" class=\"st0\"/>\n          <rect x=\"165\" y=\"727\" width=\"210\" height=\"222\" class=\"st0\"/>\n          <rect x=\"511\" y=\"971\" width=\"204\" height=\"236\" class=\"st0\"/>\n        </g>\n      </svg>\n    </div>\n  </div>\n</div>\n";

/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = "\n<!-- <link rel=\"stylesheet\" href=\"../dist/static/css/mui.min.css\"> -->\n<!-- 现金专区 -->\n<div class=\"pages-controller money-detail\" v-show=\"show\" transition=\"art\" style=\"background-color: -red;\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <button type=\"button\" class=\"h-back\" v-el:back data-article=\"article\">\n        <span class=\"icon-arrow-left2\"></span>返回\n    </button>\n    <h1 class=\"h-title\" >\n      商品详情\n    </h1>\n    <!-- <div class=\"h-info\" ><span class=\"icon-help-with-circle\"></span></div> -->\n  </div> \n  <div class=\"gol-footer\">\n  <button type=\"button\" v-bind:disabled=\"isTap\" id=\"btn\">\n    <span>{{timeNum}}</span>\n    轻轻一点就赚钱\n  </button>\n    \n  </div> \n  <div class=\"gol-wrapper doc-header doc-footer\">\n    <div class=\"page\" >\n      <div class=\"detail-box\">\n        \n        <img v-bind:src=\"listData.bigPicUrl\">\n\n\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = "\n<!-- 现金专区 -->\n<div class=\"pages-controller money-page\" v-show=\"pts==5\" transition=\"expand\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <button type=\"button\" class=\"h-back\" ><span class=\"icon-arrow-left2\"></span>返回</button>\n    <h1 class=\"h-title\" >\n      现金专区\n    </h1>\n    <!-- <div class=\"h-info\" ><span class=\"icon-help-with-circle\"></span></div> -->\n  </div>  \n  <div class=\"gol-wrapper doc-header\">\n    <div class=\"page\" >\n        <div class=\"money-page-box\">\n          <ul id=\"listBox\">\n            <li v-for=\"item in btn\" data-idx=\"{{$index}}\">\n              <div class=\"inner\">\n                <div class=\"content\">\n                  <div class=\"bg\"></div>\n                  <div class=\"title\">{{item.title}}</div>\n                </div>\n              </div>\n            </li>\n          </ul>\n          \n        </div>\n    </div>\n  </div>\n</div>\n<List></List>\n";

/***/ },
/* 113 */
/***/ function(module, exports) {

	module.exports = "\n<!-- 现金专区 -->\n<div class=\"pages-controller money-list\" v-show=\"show\" transition=\"art\" style=\"background-color: -red;\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <button type=\"button\" class=\"h-back\" v-el:back data-article=\"article\">\n        <span class=\"icon-arrow-left2\"></span>返回\n    </button>\n    <h1 class=\"h-title\" >\n      {{title}}\n    </h1>\n    <div class=\"h-info\" ><span class=\"icon-help-with-circle\"></span></div>\n  </div>  \n  <div class=\"gol-wrapper doc-header\" id=\"money-controller\">\n    <div class=\"page\" >\n      <div class=\"list-box\" id=\"box\">\n        <button type=\"button\" v-for=\"item in list\" data-idx=\"{{$index}}\" v-bind:disabled=\"toBol(item.cashOverFlg)\" v-bind:class=\"{'active':toBol(item.cashOverFlg)}\">\n          <div class=\"inner\">\n            <div class=\"cont\">\n              <div class=\"b\">{{item.adName}}</div>\n             <!--  <div class=\"s\">55英寸</div>\n              <div class=\"x\">4K(3840*2160)</div> -->\n            </div>\n          </div>\n        </button>\n      </div>\n      <div class=\"scroll-pull\" v-show=\"pullUpAll\">\n            <span class=\"scroll-loadTxt\" v-show=\"!pullUpLoadStatus\">{{pullUpLoadTxt}}</span>\n            <!-- 加载更多loading图标 -->\n            <div class=\"loading-spinner-outer\" v-show=\"pullUpLoadStatus\">\n              <div class=\"loading-spinner\">\n                <span class=\"loading-top\"></span>\n                <span class=\"loading-right\"></span>\n                <span class=\"loading-bottom\"></span>\n                <span class=\"loading-left\"></span>\n              </div>\n            </div>\n          </div>\n    </div>\n  </div>\n</div>\n<Detail></Detail>\n";

/***/ },
/* 114 */
/***/ function(module, exports) {

	module.exports = "\n<!-- 竞技场 -->\n<div class=\"pages-controller\" v-show=\"pts==4\" transition=\"expand\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <div class=\"h-back\" id=\"h-back\"><span class=\"icon-arrow-left2\"></span>返回</div>\n    <h1 class=\"h-title\" >\n      签到\n    </h1>\n    <div class=\"h-info\" ><span class=\"icon-help-with-circle\" style=\"font-size:12px\"></span></div>\n  </div>  \n  <div class=\"gol-wrapper doc-header\">\n    <div class=\"page signstar_wrapper\">\n      <img v-bind:src=\"data.adPicUrl\" alt=\"\" style=\"pos\">\n      <div class=\"content\" >\n        <p>\n          给五星好评, 再送1000积分 <button type=\"button\" v-el:signstar-go v-bind:disabled=\"data.signOverFlg\">GO</button>\n        </p>\n        <p v-el:signstar-info>\n          签到规则 <span class=\"icon-help-with-circle txt-fff\" style=\"padding:10px; display: inline-block;\" ></span>\n        </p>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ },
/* 115 */
/***/ function(module, exports) {

	module.exports = "\n<div  class=\"pages-controller\" v-show=\"show\" transition=\"art\">\n  <div class=\"gol-header\">\n    <div class=\"h-back\" v-el:back data-article=\"article\"><span class=\"icon-arrow-left2\"></span>返回</div>\n    <h1 class=\"h-title\" >\n      任务\n    </h1>\n  </div> \n  <div class=\"gol-wrapper doc-header\">\n    <div class=\"page\">\n      <div class=\"article-inner\">\n        <div class=\"task-detail\">\n          <div class=\"img-box\" v-bind:style=\"{background: 'url('+taskDetail.bigPicUrl+') no-repeat center center','background-size':'cover'}\" style=\"background-size:cover\">\n          </div>\n          <div class=\"bottom\">\n            <ul class=\"task-list\" v-show=\"!missonOverFlg\">\n              <li style=\"background:#F1F1F1\">\n                <img v-bind:src=\"taskDetail.smallPicUrl\" alt=\"\">\n                <span class=\"title\">{{taskDetail.missonTitle}}</span>\n                <div class=\"text ellipsis-2\">  \n                  {{taskDetail.desc}}\n                </div>\n                <div class=\"footer\">\n                  <span class=\"fr\">\n                    结束时间: {{taskDetail.endTime}}\n                  </span>\n                    <!-- 昨天: --> {{taskDetail.time}}\n                </div>\n              </li>\n            </ul>\n            <div class=\"share-box\" v-show=\"missonOverFlg\">\n              <p class=\"txt-green txt-green tac padding-20\">快快分享给小伙伴   大家一起赚到家</p>\n              <!-- <embed src=\"../../assets/images/share.svg\" alt=\"\" style=\"width:100%;\"  type=\"image/svg+xml\" > -->\n              <Share></Share>\n            </div>\n          </div>\n          <div class=\"footer\">\n            <button type=\"button\" v-el:rush >立即抢贡献值</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ },
/* 116 */
/***/ function(module, exports) {

	module.exports = "\n<!-- 任务 -->\n<div class=\"pages-controller\"  v-show=\"pts==2\" transition=\"expand\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <div class=\"h-back\" ><span class=\"icon-arrow-left2\"></span>返回</div>\n    <h1 class=\"h-title\" >\n      任务\n    </h1>\n    <div class=\"h-info\" ><span class=\"icon-help-with-circle\"></span></div>\n  </div>  \n  <div class=\"gol-wrapper doc-header\" id=\"task-controller\">\n    <div class=\"page\" >\n      <ul class=\"task-list\" v-el:task-box>\n        <li v-for=\"it in taskData\" data-idx=\"{{$index}}\">\n          <img v-bind:src=\"it.smallPicUrl\" alt=\"\">\n          <span class=\"title\">{{it.missonTitle}}</span>\n          <div class=\"text ellipsis-2\">  \n            {{it.desc}}\n          </div>\n          <div class=\"footer\">\n            <span class=\"fr\">\n              结束时间: {{it.endTime}}\n            </span>\n              <!-- 昨天: --> {{it.startTime}}\n          </div>\n        </li>\n      </ul>\n\n      <div class=\"scroll-pull\" v-show=\"isPullUp\">\n        <span class=\"scroll-loadTxt\" v-show=\"!pullUpLoadStatus\">{{pullUpLoadTxt}}</span>\n        <!-- 加载更多loading图标 -->\n        <div class=\"loading-spinner-outer\" v-show=\"pullUpLoadStatus\">\n          <div class=\"loading-spinner\">\n            <span class=\"loading-top\"></span>\n            <span class=\"loading-right\"></span>\n            <span class=\"loading-bottom\"></span>\n            <span class=\"loading-left\"></span>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>\n<Art></Art>\n";

/***/ },
/* 117 */
/***/ function(module, exports) {

	module.exports = "\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 2354 523\" style=\"enable-background:new 0 0 2354 523; width: 100%;\" xml:space=\"preserve\">\n  <g>\n      <image style=\"overflow:visible;\" width=\"645\" height=\"119\" xlink:href=\"./static/images/share.png\" transform=\"matrix(3.4382 0 0 3.4382 77 55.9264)\">\n      </image>\n  </g>\n  <g v-el:share-box>\n    <rect class=\"st0\" width=\"441.7\" height=\"523\"/>\n    <rect x=\"441.7\" class=\"st0\" width=\"471\" height=\"523\"/>\n    <rect x=\"912.8\" class=\"st0\" width=\"489\" height=\"523\"/>\n    <rect x=\"1401.8\" class=\"st0\" width=\"474\" height=\"523\"/>\n    <rect x=\"1875.9\" class=\"st0\" width=\"478.1\" height=\"523\"/>\n  </g>\n</svg>\n";

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(97)
	__webpack_require__(98)
	__vue_script__ = __webpack_require__(45)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/App.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(102)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./App.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(46)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/arena/flop.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(103)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./flop.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(47)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/arena/flop/flop-detail.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(104)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./flop-detail.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(48)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/arena/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(105)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(49)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/arena/lotto.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(106)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./lotto.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(50)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/arena/lotto/lotto-layer.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(107)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./lotto-layer.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_template__ = __webpack_require__(108)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./lotto-template.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(51)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/arena/shake.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(109)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./shake.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(52)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/index/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(110)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(53)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/money/detail.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(111)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./detail.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(54)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/money/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(112)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(55)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/money/list.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(113)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./list.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(56)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/sign/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(114)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(57)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/task/article.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(115)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./article.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(58)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/task/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(116)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(59)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/task/share.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(117)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "./share.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ }
]);