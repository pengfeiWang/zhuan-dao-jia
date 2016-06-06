webpackHotUpdate(1,{

/***/ 33:
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
	    console.log(locationHost);
	    console.log(options.url);
	    setHeader('X-Requested-With', 'XMLHttpRequest');
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
	    console.log(xhr.setRequestHeader);
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

/***/ }

})