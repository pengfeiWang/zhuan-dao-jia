webpackHotUpdate(1,{

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _template = __webpack_require__(34);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var go = function go(vm) {
	  var btn = vm.$els.signstarGo;
	  Hammer(btn).on('tap', function (ev) {
	    console.log('ajax 请求签到');
	    utils.ajax({
	      url: config.URL + 'test.php',
	      type: 'post',
	      dataType: 'json',
	      data: {
	        uid: ''
	      },
	      success: function success(res) {},
	      error: function error(xhr) {}
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
	  rootVm.isTranslate = true;

	  utils.ajax({
	    url: config.URL + 'initSign.do',
	    type: 'POST',
	    dataType: 'json',
	    data: {
	      appLoginMobile: '',
	      loginPassword: ''
	    },
	    success: function success(res) {
	      if (res.rescode == 100) {
	        console.log(res);
	      } else {
	        utils.dialog(res.message);
	      }
	    },
	    error: function error(xhr) {
	      utils.dialog('暂时无数据');
	    }
	  });
	};
	exports.default = {
	  data: function data() {
	    return {
	      pts: this.$root.show
	    };
	  },
	  ready: function ready() {
	    var t = this;
	    go(t);
	    infoTip(t);
	    t.$on('pageTab', function (num) {
	      init(t);
	      t.pts = num;
	    });
	  }
	};

/***/ }

})