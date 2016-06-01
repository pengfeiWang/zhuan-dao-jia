'use strict';


  //切割字符串为一个个小块，以空格或豆号分开它们，结合replace实现字符串的forEach
  var rword = /[^, ]+/g,
      rnospaces = /\S+/g,
      rwindow = /^\[object (?:Window|DOMWindow|global)\]$/,
      oproto = Object.prototype,
      oToString = oproto.toString,
      ohasOwn = oproto.hasOwnProperty,
      userAgent = navigator.userAgent,
      isIos = /iPhone\sOS/.test(userAgent),
      class2type = {};

  'Boolean Number String Function Array Date RegExp Object Error'.replace(rword, function ( name ) {
    class2type[ '[object ' + name + ']' ] = name.toLowerCase()
  });
  function noop () {};
  /*取得目标类型*/
  function _getType ( obj ) { //
    if ( obj == null ) {
      return String(obj)
    }
    // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
    return typeof obj === 'object' || typeof obj === 'function' ?
    class2type[ oToString.call(obj) ] || 'object' :
      typeof obj
  }
  /**
   * [regWordBorder 单词边距正则]
   * @param  string
   * @return regExp
   */
  function regWordBorder ( str ) {
    return new RegExp('(^|\\s)' + str + '(\\s|$)')
  }
  /**
   * 数组原型添加 indexOf 方法
   */
  if ( !Array.prototype.indexOf ) {
    Array.prototype.indexOf = function ( element, index ) {
      var length = this.length;
      var current;
      if ( index == null ) {
        index = 0;
      } else {
        index = +index || 0;
        if ( index < 0 ) index += length;
        if ( index < 0 ) index = 0;
      }
      for ( ; index < length; index++ ) {
        current = this[ index ];
        if ( current === element ) return index;
      }
      return -1;
    }
  }
  var _isFunction = typeof alert === 'object' ? function ( fn ) {
    try {
      return /^\s*\bfunction\b/.test(fn + "")
    } catch ( e ) {
      return false
    }
  } : function ( fn ) {
    return oToString.call(fn) === '[object Function]'
  }
  
  function _isWindow ( obj ) {
    return obj != null && obj === obj.window;
  }

  /*
   判定是否是一个朴素的javascript对象（Object）
   不是DOM对象，不是BOM对象，不是自定义类的实例
   */
  function _isPlainObject ( obj ) {
    var key;
    if ( !obj || _getType(obj) !== 'object' || obj.nodeType || _isWindow(obj) ) {
      return false;
    }
    
    if ( obj.constructor && !ohasOwn.call(obj, 'constructor') && !ohasOwn.call(obj.constructor.prototype, 'isPrototypeOf') ) {
      return false;
    }
    
    for ( key in obj ) {
    }
    return key === void 0 || ohasOwn.call(obj, key)
  }
  

  //与jQuery.extend方法，可用于浅拷贝，深拷贝
  function _extend () {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[ 0 ] || {},
      i = 1,
      length = arguments.length,
      deep = false
    // 如果第一个参数为布尔,判定是否深拷贝
    if ( typeof target === 'boolean' ) {
      deep = target
      target = arguments[ 1 ] || {}
      i++
    }
    //确保接受方为一个复杂的数据类型
    if ( typeof target !== 'object' && _getType(target) !== 'function' ) {
      target = {}
    }
    //如果只有一个参数，那么新成员添加于mix所在的对象上
    if ( i === length ) {
      return target;
      // target = this
      // i--
    }
    for ( ; i < length; i++ ) {
      //只处理非空参数
      if ( (options = arguments[ i ]) != null ) {
        for ( name in options ) {
          src = target[ name ]
          copy = options[ name ]
          // 防止环引用
          if ( target === copy ) {
            continue
          }
          if ( deep && copy && (_isPlainObject(copy) || (copyIsArray = Array.isArray(copy))) ) {
            if ( copyIsArray ) {
              copyIsArray = false
              clone = src && Array.isArray(src) ? src : []
            } else {
              clone = src && _isPlainObject(src) ? src : {}
            }
            target[ name ] = _extend(deep, clone, copy)
          } else if ( copy !== void 0 ) {
            target[ name ] = copy
          }
        }
      }
    }
    return target
  }
  
  /**
   * 数组去重
   * @param  arr [ Array ]
   * @return arr
   */
  function _unique ( arr ) {
    var n = [];
    if( !arr ) return;
    for ( var i = 0, len = arr.length; i < len; i++ ) {
      if ( n.indexOf(arr[ i ]) == -1 ) n.push(arr[ i ]);
    }
    return n;
  }
  
  /**
   * @param arr
   * @returns boolean
   */
  function _isArray ( arr ) {
    return oToString.call(arr) == '[object Array]';
  }
  
  /**
   * 遍历数组与对象,回调的第一个参数为 元素或键值 ,第二个索引或键名
   * @param obj
   * @param callBack
   * @private
   */
  function _each ( obj, callBack ) {
    if ( obj ) {
      if ( _isArray(obj) ) {
        // if ( !!Array.prototype.forEach ) {
        //  obj.forEach(function ( value, i ) {
        //    if( callBack(i, value) === false ) {
        //      // break
        //    }
        //  });
        // } else {
          for ( var i = 0, len = obj.length; i < len; i++ ) {
            // callBack(obj[ i ], i);
            if( callBack(i, obj[ i ]) === false ) {
              break
            }
          }
        // }
      } else {
        for ( var i in obj ) {
          //if (i == 'length') continue;
          if ( obj.hasOwnProperty(i) && callBack(i, obj[ i ]) === false ) {
            // callback(obj[ i ], i);
            // if( callBack.call(i, obj[ i ]) === false ) {
              break
            // }
          }
        }
      }
    }
  }
  
  function camelize ( target ) {
    //转换为驼峰风格
    if ( target.indexOf('-') < 0 && target.indexOf('_') < 0 ) {
      return target; //提前判断，提高getStyle等的效率
    }
    return target.replace(/[-_][^-_]/g, function ( match ) {
      return match.charAt(1).toUpperCase()
    })
  }


var doc = document;
var getId = ( id ) => doc.getElementById(id) || null;
var _addClass = (node, aClass, type) => {
  if( !node || node.nodeType !== 1 ) return;
  var classNames = (aclass || '').match(rnospaces) || [];
  var cls = node.classList;
  if( type ) {
    for( var i = 0, len = classNames.length; i < len; i++ ) {
      cls.remove(classNames[i]);
    }
  } else {
    for( var i = 0, len = classNames.length; i < len; i++ ) {
      cls.add(classNames[i]);
    }    
  }
  return node;
}
(function(window) {
  if (!window.requestAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
    window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || function(id) {
      clearTimeout(id);
    };
  };
}(window));

var _removeClass = ( node, aClass ) => {
  _addClass(node, aClass, true)
};
var _ajaxClass = (function () {
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
    xhr: function(protocol) {
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
  var ajaxBeforeSend = function(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false) {
      return false;
    }
  };
  var ajaxSuccess = function(data, xhr, settings) {
    settings.success.call(settings.context, data, 'success', xhr);
    ajaxComplete('success', xhr, settings);
  };
  // type: "timeout", "error", "abort", "parsererror"
  var ajaxError = function(error, type, xhr, settings) {
    settings.error.call(settings.context, xhr, type, error);
    ajaxComplete(type, xhr, settings);
  };
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  var ajaxComplete = function(status, xhr, settings) {
    settings.complete.call(settings.context, xhr, status);
  };

  var serialize = function(params, obj, traditional, scope) {
    var type, array = _isArray(obj),
      hash = _isPlainObject(obj);
    _each(obj, function(key, value) {
      type = _getType(value);
      if (scope) {
        key = traditional ? scope :
          scope + '[' + (hash || type === 'object' || type === 'array' ? key : '') + ']';
      }
      // handle data in serializeArray() format
      if (!scope && array) {
        params.add(value.name, value.value);
      }
      // recurse into nested objects
      else if (type === "array" || (!traditional && type === "object")) {
        serialize(params, value, traditional, key);
      } else {
        params.add(key, value);
      }
    });
  };
  var serializeData = function(options) {
    if (options.processData && options.data && typeof options.data !== "string") {
      options.data = param(options.data, options.traditional);
    }
    if (options.data && (!options.type || options.type.toUpperCase() === 'GET')) {
      options.url = appendQuery(options.url, options.data);
      options.data = undefined;
    }
  };
  var appendQuery = function(url, query) {
    if (query === '') {
      return url;
    }
    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
  };
  var mimeToDataType = function(mime) {
    if (mime) {
      mime = mime.split(';', 2)[0];
    }
    return mime && (mime === htmlType ? 'html' :
      mime === jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml') || 'text';
  };
  var parseArguments = function(url, data, success, dataType) {
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
  var ajax = function(url, options) {
    if (typeof url === "object") {
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

    if (settings.cache === false || ((!options || options.cache !== true) && ('script' === dataType))) {
      settings.url = appendQuery(settings.url, '_=' + (+ new Date()));
    }
    var mime = settings.accepts[dataType.toLowerCase()];
    var headers = {};
    var setHeader = function(name, value) {
      headers[name.toLowerCase()] = [name, value];
    };
    var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
    var xhr = settings.xhr(settings);
    var nativeSetHeader = xhr.setRequestHeader;
    var abortTimeout;

    setHeader('X-Requested-With', 'XMLHttpRequest');
    setHeader('Accept', mime || '*/*');
    if (!!(mime = settings.mimeType || mime)) {
      if (mime.indexOf(',') > -1) {
        mime = mime.split(',', 2)[0];
      }
      xhr.overrideMimeType && xhr.overrideMimeType(mime);
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() !== 'GET')) {
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
    }
    if (settings.headers) {
      for (var name in settings.headers)
        setHeader(name, settings.headers[name]);
    }
    xhr.setRequestHeader = setHeader;

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        xhr.onreadystatechange = noop;
        clearTimeout(abortTimeout);
        var result, error = false;
        var isLocal = protocol === 'file:';
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && isLocal && xhr.responseText)) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
          result = xhr.responseText;
          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
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
      abortTimeout = setTimeout(function() {
        xhr.onreadystatechange = noop;
        xhr.abort();
        ajaxError(null, 'timeout', xhr, settings);
      }, settings.timeout);
    }
    xhr.send(settings.data ? settings.data : null);
    return xhr;
  };


  var param = function(obj, traditional) {
    var params = [];
    params.add = function(k, v) {
      this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    };
    serialize(params, obj, traditional);
    return params.join('&').replace(/%20/g, '+');
  };
  var get = function( /* url, data, success, dataType */ ) {
    return ajax(parseArguments.apply(null, arguments));
  };

  var post = function( /* url, data, success, dataType */ ) {
    var options = parseArguments.apply(null, arguments);
    options.type = 'POST';
    return ajax(options);
  };

  var getJSON = function( /* url, data, success */ ) {
    var options = parseArguments.apply(null, arguments);
    options.dataType = 'json';
    return ajax(options);
  };

  return {
    ajax: ajax,
    get: get,
    post: post,
    serialize:serialize
  }  
})();
// 点击 active 样式处理函数
var setActive = (vm, target) => {
  target.classList.add('active');
  setTimeout(function () {
    target.classList.remove('active');
  },200);
};
var utils = {
  NS:'http://www.w3.org/2000/svg',
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
}
window.utils = utils;
export default utils;
