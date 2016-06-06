webpackHotUpdate(1,{

/***/ 4:
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

/***/ }

})