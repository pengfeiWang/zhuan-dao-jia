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

	var backBtn;
	var go = function go(vm) {
	  var btn = vm.$els.signstarGo;
	  Hammer(btn).on('tap', function (ev) {
	    console.log('ajax 请求签到');
	    if (!vm.data || !vm.data.adId) return;
	    var d = utils.extend({}, config.reqParam, { adId: vm.data.adId });
	    utils.ajax({
	      url: config.URL + 'doSign.do',
	      type: 'post',
	      dataType: 'json',
	      data: d,
	      success: function success(res) {
	        if (res.rescode == 100) {} else {
	          utils.dialog(res.message);
	        }
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
	    data: config.reqParam,
	    success: function success(res) {
	      if (res.rescode == 100) {
	        vm.data = res.data;
	      } else {
	        utils.dialog(res.message);
	      }
	    },
	    error: function error(xhr) {
	      setTimeout(function () {
	        utils.dialog('暂时无数据');
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

/***/ }

})