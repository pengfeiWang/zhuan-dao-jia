webpackHotUpdate(1,{

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _index = __webpack_require__(4);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var back = _index2.default.back;
	var getUser = _index2.default.getUser;

	var arrTip = ['开始抢, 消除起床气', '开始抢, 精神一下午', '开始抢, 精神一下午', '开始抢, 健胃又消食'];

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
	var anm = function anm(first, last) {
	  first.classList.add('out');
	  first.classList.remove('in');
	  setTimeout(function () {
	    last.classList.add("in");
	    last.classList.remove("out");
	  }, 225);
	};
	var getALL = function getALL(vm) {
	  getUser(function (data) {});

	  ;(function () {
	    utils.ajax({
	      url: config.URL + 'test.php',
	      type: 'post',
	      dataType: 'json',
	      data: {},
	      success: function success(res) {},
	      error: function error(xhr) {}
	    });
	  });
	};
	var start = function start(vm) {
	  var timinggrab = document.querySelector('#timinggrab');

	  Hammer(timinggrab).on('tap', function (ev) {
	    var target = ev.target;
	    var flip,
	        firstNode,
	        lastNode,
	        idx,
	        row,
	        reqData = config.reqParam;
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
	      utils.dialog('还没开始哦...');
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
	          vm.timinggrabData[idx].isGrab = true;
	          firstNode = flip[1];
	          lastNode = flip[0];
	          anm(firstNode, lastNode);
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
	    data: config.reqParam,
	    success: function success(res) {
	      if (res.rescode == 100) {
	        for (var i = 0, len = vm.timinggrabData.length; i < len; i++) {
	          vm.timinggrabData[i].overFlg = parseInt(res.data['overFlg' + (i + 1)], 10);
	          vm.timinggrabData[i].desc[1] = res.data['doTime4' + (i + 1)] + arrTip[i];
	        }
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

/***/ }

})