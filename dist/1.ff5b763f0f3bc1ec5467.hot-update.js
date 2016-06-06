webpackHotUpdate(1,{

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(4);

	var _index2 = _interopRequireDefault(_index);

	var _lottoTemplate = __webpack_require__(123);

	var _lottoTemplate2 = _interopRequireDefault(_lottoTemplate);

	var _lottoLayer = __webpack_require__(122);

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
	      }
	      this.$broadcast('init');

	      t.show = bol;
	    });
	  }
	};

/***/ }

})