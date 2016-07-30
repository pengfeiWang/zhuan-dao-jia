webpackJsonp([2,0,3],[
/* 0 */
/***/ function(module, exports) {

	'use strict';

	function getTranslateX(obj) {
	  var str = 'matrix(0, 0, 0, 0, 0, 0)';
	  var trs = getComputedStyle(obj, null)['webkitTransform'];
	  var matrix = trs == 'none' ? str.replace(/matrix\(|\)/g, '') : trs.replace(/matrix\(|\)/g, '');
	  var arr = matrix.split(',');
	  var x = Math.floor(arr[4]);

	  return x;
	}
	function itemTap(box) {
	  var item = box.querySelectorAll('li');
	  var arr = ['gotoNewHouse', 'gotoNewCar', '赚二手', 'gotoMoney', '赚装修'];

	  for (var i = 0, len = item.length; i < len; i++) {
	    (function (k) {
	      Hammer(item[k]).on('tap', function (e) {
	        var method = arr[k % 5];
	        if (method) {
	          callClientFunction(method);
	        }
	      });
	    })(i);
	  }
	}
	mui('#slider').slider({
	  customIndicator: true,
	  getElems: function getElems() {
	    var nav = document.getElementById('nav');
	    var item = nav.querySelectorAll('li');
	    var inner = nav.querySelectorAll('.inner')[0];
	    var innerWidth = parseFloat(getComputedStyle(inner, null)['width']);
	    var itemWidth = parseFloat(getComputedStyle(item[0], null)['width']);
	    var innerBox = nav.querySelectorAll('.innerBox')[0];
	    var innerBoxWidth = parseFloat(getComputedStyle(innerBox, null)['width']);
	    var moveBox = nav.querySelectorAll('.move-box')[0];
	    this.options.customObj = {
	      nav: nav,
	      navItem: item,
	      itemWidth: itemWidth,
	      innerBox: innerBox,
	      innerBoxWidth: innerBoxWidth,
	      moveBox: moveBox
	    };
	  },
	  setItem: function setItem(e) {
	    var elems = this.options.customObj;
	    var bw = elems.innerBoxWidth,
	        sw = elems.itemWidth,
	        idx = this.lastSlideNumber || 0,
	        len = 10,
	        s2 = idx + 5;;
	    var dis = -(bw / 2 + (sw * idx + sw / 2));

	    var dir = this.direction;
	    if (dir == 'right' && idx == 4 || dir == 'left' && idx == 0) {
	      elems.moveBox.style.webkitTransitionDuration = '0ms';
	      elems.moveBox.style.webkitTransitionTimingFunction = 'none';
	    } else {
	      elems.moveBox.style.webkitTransitionTimingFunction = this.options.bounceEasing.style;
	      elems.moveBox.style.webkitTransitionDuration = '500ms';
	    }

	    for (var i = 5; i < len; i++) {
	      elems.item[i].children[0].style.webkitTransform = 'scale(.86)';
	      elems.item[i].children[0].style.webkitTransitionDuration = '500ms';
	      elems.item[i].classList[i === s2 ? 'add' : 'remove']('active');
	    }

	    elems.item[s2].children[0].style.webkitTransform = 'scale(1.3)';
	    elems.moveBox.style.webkitTransform = 'translateX(' + dis + 'px)';
	    this.oldSlideNumber = idx;
	    this.oldX = getTranslateX(elems.moveBox);
	  },
	  setScale: function setScale(e, scale) {
	    var elems = this.options.customObj;
	    var idx = this.lastSlideNumber || 0;
	    var len = 10;

	    var dir = this.direction;
	    var current = this.currentPage.pageX - 1;

	    this.nextItem = 5 + current + 1;

	    if (dir == 'right') {
	      this.nextItem = current - 1;

	      this.nextItem = 4 + idx;
	    }
	    elems.item[this.nextItem].children[0].style.webkitTransitionDuration = '0ms';
	    for (var i = 5; i < len; i++) {
	      if (elems.item[i].classList.contains('active')) continue;
	      elems.item[i].children[0].style.webkitTransform = 'scale(.86)';
	    };
	    if (idx == 0) {
	      elems.item[9].children[0].style.webkitTransform = 'scale(' + scale + ')';
	    }
	    if (idx == 4) {
	      elems.item[5].children[0].style.webkitTransform = 'scale(' + scale + ')';
	    }
	    elems.item[this.nextItem].children[0].style.webkitTransform = 'scale(' + scale + ')';
	  },
	  initCallBack: function initCallBack() {
	    this.options.getElems.apply(this);
	    this.oldSlideNumber = this.lastSlideNumber || 0;
	    var elems = this.options.customObj;
	    elems.moveBox.style.width = elems.innerBoxWidth * 3 + 'px';
	    elems.moveBox.style.webkitTransform = 'translateX(-33.333%)';
	    elems.moveBox.innerHTML += elems.moveBox.innerHTML + elems.moveBox.innerHTML;
	    setTimeout(function () {
	      itemTap(elems.moveBox);
	    }, 300);
	    this.options.customObj.item = nav.querySelectorAll('li');
	    this.options.setItem.apply(this, arguments);
	  },
	  customStartCallBack: function customStartCallBack() {
	    var moveBox = this.options.customObj.moveBox;
	    this.oldWrapX = getTranslateX(this.scroller);
	    this.oldX = getTranslateX(moveBox);
	    this.oldSlideNumber = this.lastSlideNumber || 0;
	  },

	  customMoveCallBack: function customMoveCallBack(e) {
	    var dis = e.detail.deltaX;
	    var oldWrapX = this.oldWrapX;
	    var curWrapX = getTranslateX(this.scroller);
	    var min = Math.min(oldWrapX, curWrapX);
	    var max = Math.max(oldWrapX, curWrapX);
	    var moveBox = this.options.customObj.moveBox;
	    var wx = this.oldX;
	    var ww = this.wrapperWidth;
	    var iw = this.options.customObj.itemWidth;
	    var ratio = iw / ww;
	    var tg = wx + dis * ratio;
	    this.options.setScale.call(this, e, Math.abs(dis * ratio) / iw / 5 + 1);
	    moveBox.style.webkitTransitionTimingFunction = 'none';
	    moveBox.style.webkitTransitionDuration = '0ms';
	    moveBox.style.webkitTransform = 'translate3d(' + tg + 'px,0,0)';
	  },
	  customEndCallBack: function customEndCallBack() {
	    this.options.setItem.apply(this, arguments);
	  }
	});

/***/ }
]);