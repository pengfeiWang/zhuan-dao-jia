webpackHotUpdate(1,[
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

	window.config = {
	  URL: 'http://42.62.90.56:8081/zdj_zly/zly/',
	  UID: '123',
	  getUID: function getUID() {
	    console.log(this.UID);
	  }
	};
	config.getUID();
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
	        audio.muted = false;
	        audio.play();
	        audio.pause();
	        audio.muted = true;
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

/***/ }
])