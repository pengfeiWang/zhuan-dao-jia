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

	var timinggrab = [{
	  ico: '',
	  id: 1,
	  status: 0,
	  isGrab: false,
	  desc: ['起床红包', '01:17开始抢, 消除起床气'],
	  desc1: ['起床红包', '01:17开始抢, 消除起床气']
	}, {
	  ico: '',
	  id: 2,
	  status: 1,
	  isGrab: false,
	  desc: ['午休红包', '12:17开始抢, 精神一下午'],
	  desc1: ['午休红包', '12:17开始抢, 精神一下午']
	}, {
	  ico: '',
	  id: 3,
	  status: 1,
	  isGrab: false,
	  desc: ['晚餐红包', '17:17开始抢, 健胃又消食'],
	  desc1: ['晚餐红包', '17:17开始抢, 健胃又消食']
	}, {
	  ico: '',
	  id: 4,
	  status: 1,
	  isGrab: false,
	  desc: ['睡前红包', '22:17开始抢, 一夜睡香香'],
	  desc1: ['睡前红包', '22:17开始抢, 一夜睡香香']
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
	    var flip, firstNode, lastNode, idx, row;
	    if (target.classList.contains('timinggrab')) {
	      return;
	    };
	    while (!target.classList.contains('list')) {
	      target = target.parentNode;
	    }
	    idx = target.getAttribute('data-idx');
	    flip = target.querySelectorAll('.flip');
	    firstNode = flip[0];
	    lastNode = flip[1];
	    if (vm.timinggrabData[idx].isGrab) return;
	    utils.ajax({
	      url: config.URL + 'test.php',
	      type: 'post',
	      dataType: 'json',
	      data: {},
	      success: function success(res) {
	        if (res) {
	          vm.timinggrabData[idx].isGrab = true;
	          firstNode = flip[1];
	          lastNode = flip[0];
	          anm(firstNode, lastNode);
	        } else {
	          utils.dialog('还没到时间哦...');
	        }
	      },
	      error: function error(xhr) {
	        utils.dialog('数据出错');
	      }
	    });
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