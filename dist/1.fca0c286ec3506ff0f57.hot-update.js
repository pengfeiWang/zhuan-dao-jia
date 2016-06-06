webpackHotUpdate(1,{

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(4);

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
	    var betData = utils.extend({}, config.reqParam, {
	      betKind: betKind,
	      betValue: vm.betScore
	    });
	    console.log(betData);return;
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
	      url: config.URL,
	      dataType: 'JSON',
	      type: 'post',
	      data: betData,
	      success: function success(req) {
	        setTimeout(function () {
	          stop = true;

	          vm.isWin = true;
	          num();
	        }, 500);
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
	    data: config.reqParam,
	    success: function success(res) {
	      if (res.rescode == 100) {
	        vm.data = res.data;
	        rootVM.userInfo.availableDevoteValue = res.availableDevoteValue;

	        arr[0] = { checked: false, score: res.betValue1 };
	        arr[1] = { checked: false, score: res.betValue2 };
	        arr[2] = { checked: false, score: res.betValue3 };
	        vm.score = res.availableDevoteValue;
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
	      if (v > this.$root.userInfo.availableDevoteValue) {
	        this.isStart = true;
	      } else {
	        this.isStart = false;
	      }
	    },
	    score: function score(v) {
	      var n = parseFloat(v);
	      if (n >= this.data.betValue1) {
	        this.isStart = false;
	      } else {
	        this.isStart = true;
	      }
	    }
	  },
	  ready: function ready() {
	    var t = this;

	    lottoStart(this);

	    this.$on('init', function () {
	      if (this.score >= this.data.betValue1) {
	        this.isStart = false;
	      } else {
	        this.isStart = true;
	      }

	      init(t);
	      this.lottoStartEnd = false;
	      this.isWin = false;
	      this.betScore = '';
	    });
	  }
	};

/***/ }

})