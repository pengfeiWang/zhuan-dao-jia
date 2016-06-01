'use strict';

import utils from 'utils';
import Vue from 'vue';
import Hammer from 'hammer';

import page from './page';
import timinggrabData from './timinggrab-data';
import template from './template';
import testData from './test-data';



// 页面切换动画 class
const PAGEENTER = 'page-enter';
const PAGELEAVE = 'page-leave';
const BACKENTER = 'back-enter';
const BACKLEAVE = 'back-leave';
const TOUCHSTART = 'touchstart';
const TRANSITIONEND = 'webkitTransitionEnd';
const URL = 'http://192.168.1.105:8080/';

Vue.filter('renderSrc', function ( idx ) {
  var s = '<img src="images/h-t-' + idx + '.png" alt="">';
  return s;
})
var slice = Array.prototype.slice;


var 
  doc = document,
  bslocation = window.location,
  hash = bslocation.hash ? bslocation.hash.substring(1) : 0,
  // 页面长度(多少个)
  pageLength = page.length,
  // 各种元素
  // 页面
  nodePage = doc.querySelectorAll('.pages-controller'),
  // 遮罩
  maskNode = doc.querySelector('#mask'),
  // 弹窗
  dialogNode = doc.querySelector('#dialog'),
  // 头右侧按钮
  hInfo = doc.querySelectorAll('.h-info'),
  // 先到规则按钮
  signstarInfo = doc.querySelector('#signstar-info'),
  // 签到按钮
  signstarGo = doc.querySelector('#signstar-go'),
  // 需要处理 当前状态的元素
  activeNode = doc.querySelectorAll('.is-active'),
  // 抢贡献值按钮
  rush = doc.querySelector('#rush'),
  // 音频元素, 用于摇摇音效
  audio = doc.querySelectorAll('audio')[0],
  // 骰子
  lotto = doc.querySelector('#lotto'),
  lottoBtn = doc.querySelector('#lottoBtn'),
  lottoIsWinBtn = doc.querySelector('#lotto-is-win-btn'),
  // task list 元素节点
  taskList = doc.querySelectorAll('.task-list')[0],
  // 抢红包列表
  timinggrab = doc.querySelector('#timinggrab'),
  // 页面是否切换中
  pagesAnimateing = false,
  // vm 根
  wrapper = 'page-wrapper',
  userInfo = {
    score: 5000
  },
  // 视图模型
  vm;

// 摇一摇
var isPlauAudio = false, isInY1Y = false, Y1YNum = 0, Y1YMax = 5, isY1YReq = false;

var
  dialogTimer,
  // 最大循环次数
  lopMax = 20,
  // 循环计数
  lopNum = 0, 
  // 页面切换队列
  isAnimateEnd = [],
  pageQueue = [0],
  subTitle = [
    '',
    '任务',
    '猜大小',
    '其他游戏',
    '摇一摇',
    '定时红包抢现金',
    '房贷计算器',
    '新手指南'
  ];
var eventMaps = {
  'signstar-info': '',
  'signstar-go': '',
  0: '',
  1: '',
  2: '',
  3: '',
  4: '',
  5: ''
}  
var handleMaps = {
  'signstar-info' (vm) {
    if( eventMaps['signstar-info'] ) return;
    eventMaps['signstar-info'] = true
    // 签到规则
    Hammer(this).on('tap', function () {
      dialog(1)
    })
  },
  'signstar-go' (vm) {
    if( eventMaps['signstar-go'] ) return;
    eventMaps['signstar-go'] = true
    // 签到
    Hammer(this).on('tap', function (ev) {
      active(vm, ev.target);
      utils.ajax({
        url: URL + 'test.php',
        type: 'post',
        dataType: 'json',
        success ( data ) {
          dialog('<p>签到成功</p>');
        },
        error ( xhr ) {
          console.log(xhr)
        }
      });
    })  
  },
  0 () {
    if( eventMaps[0] ) return;
    eventMaps[0] = true
  },
  // 任务
  1 (vm, box) {
    // console.log(eventMaps[1])
    // if( eventMaps[1] ) return;
    // eventMaps[1] = true

    // 任务列表点击处理
    var target = this;
    var parent = this.parentNode;
    var idx,data;
    if( box.contains(target) ) {
      if( target.tagName.toLowerCase() != 'li' ) {
         while( parent.tagName.toLowerCase() !== 'li' ) {
          parent = parent.parentNode;
        }       
      } else {
        parent = target;
      }

      idx = parent.getAttribute('data-idx');
      data = vm.taskData[idx];
      if( data.isGrab ) {
        // vm.pageQueue.pop();
        // dialog('您已经抢过了!!!');
        // return false;
      }
      vm.taskDetail = data;
      pageIn(vm);
    }
  },
  // 猜大小
  2 () {
    
    lottoBtn.disabled = true;
    var 
      svgRoot = getSVGDocument(lotto),
      nodeG = svgRoot.getElementsByTagName('g'),
      s1 = nodeG.item(0),
      s2 = nodeG.item(1),
      s1I = s1.getElementsByTagName('image'), 
      s2I = s2.getElementsByTagName('image'),
      lottoDataMap = testData.lotto;
    var 
      n,
      lop = 0,
      // 骰子由9层组合
      size = 8;
    var sAnimate = function (n1, n2, noWin) {
      // noWin == true 不中
      var
        i = 0,
        randoms,
        random1 = 0, 
        random2 = 0;
      var getRandom = function (  ) {
        var 
        ng = 0;
        random1 = Math.floor(Math.random() * 6), 
        random2 = Math.floor(Math.random() * 6);
        ng = random1 + random2;
        if( ng > 10 || ng == ((n1-1)+(n2-1)) ) {
            getRandom();
        } else {
          return [random1, random2];
        }
      }
      randoms = getRandom();
      for( ; i < size; i++ ) {
        s1I.item(i).style.opacity = s2I.item(i).style.opacity = 0
      }
      s1I.item(lop).style.opacity = s2I.item(lop).style.opacity = 1;
      lop++;
      if( lop >= size ) {
        lop = 0;
        if( noWin ) {
          if( !randoms ) {
            lop = 0;
            sAnimate(n1, n2, noWin);
            return
          } else {
            n1 = randoms[0]+1;
            n2 = randoms[1]+1
          }
        }
        for(var i = 0 ; i < size; i++ ) {
          s1I.item(i).style.opacity = s2I.item(i).style.opacity = 0;
        }
        s1I.item(n1-1).style.opacity = 1;
        s2I.item(n2-1).style.opacity = 1;
        vm.lottoStartEnd = true;
        lottoBtn.removeAttribute('disabled');
      } else {
        setTimeout(function () {
          sAnimate(n1, n2, noWin);
        }, 100)
      }
    }

    // 获取点数
    utils.ajax({
      url: URL + 'test.php',
      dataType: 'json',
      type: 'post',
      success ( req ) {
        n = 5;
        vm.isWin = true
        var getNum = function () {
          var 
            rn1 = Math.floor(Math.random() * (7-1) + 1 ), 
            rn2 = Math.floor(Math.random() * (7-1) + 1);
          if( rn1 + rn2 != n ) {
            getNum()
          } else {
            if( vm.isWin ) {
              sAnimate(rn1, rn2);
            } else {
              sAnimate(rn1, rn2, n);
            }
          }
        }
        getNum();      
      },
      error ( xhr ) {
        
      }
    });
  },
  // 其他
  3 () {
    if( eventMaps[3] ) return;
    eventMaps[3] = true
    console.log('其他')
  },
  // 摇一摇
  4 (vm) {
    if( eventMaps[4] ) return;
    eventMaps[4] = true
    // if( isInY1Y ) return;
    // isInY1Y = true;
    var svgRoot = getSVGDocument( utils.getId('page-svg-y-y') );
    var yNode = svgRoot.getElementsByTagName('image')[1];
    
    var SHAKE_THRESHOLD = 5000;
    var last_update = 0;
    var animSpe = 25;
    var x, y, z, lastX = 0, lastY = 0, lastZ = 0;
    var count = 0
    function deviceMotionHandler(eventData) {
      var acceleration =eventData.accelerationIncludingGravity;
      var curTime = new Date().getTime();
      // 摇一摇次数已满
      // if( Y1YNum >= Y1YMax ) return;
      if ((curTime-last_update)> 10) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;

        if(Math.abs(x-lastX) > animSpe || Math.abs(y-lastY) > animSpe) { 
          yNode = utils.getId('page-svg-y-y').getSVGDocument().getElementsByTagName('image')[1];
          if( !yNode.classList.contains('y1y') ) {
            yNode.setAttribute('class', 'images-animate y1y');
          }
          audio.play();

          // 是否请求数据中
          if( !isY1YReq ) {
            // last_update = 0
            // 摇摇次数限制次数在
            // 请求数据成功是才能递增 
            isY1YReq = true
            utils.ajax({
              url: URL + 'test.php',
              dataType: 'json',
              type: 'post',
              data: {a:1},
              success ( req ) {
                isY1YReq = false;
                Y1YNum++;
                console.log(req);
              },
              error ( xhr ) {
                console.log(xhr)
              }
            });
          }
        }
        var speed = Math.abs(x +y + z - lastX - lastY - lastZ) / diffTime * 10000;
        // if (speed > SHAKE_THRESHOLD) {
        // }
        lastX = x;
        lastY = y;
        lastZ = z;
      }
    }
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion',deviceMotionHandler,false);
    } else {
      console.log('不支持?');
    }
  },
  // 抢红包
  5 (vm) {
    // if( eventMaps[5] ) return;
    // eventMaps[5] = true;
    var l = timinggrab.querySelectorAll('.list');
    for(var i = 0, len = l.length; i < len; i++ ) {
      var flip = l[i].querySelectorAll('.flip');
      l[i].classList.add('active');
      vm.timinggrabData[i].status = 0;
      anm(flip[0], flip[1]);
    }
  }
}
function dialog ( num, cb ) {
  var html;
  var str = parseInt(num, 10);

  clearTimeout(dialogTimer);
  maskNode.style.display = 'block';
  dialogNode.style.display = 'block';
  dialogNode.classList.remove('bounce-out');
  dialogNode.classList.add('bounce-in');
  html =  isNaN(str) ? num : template[num].join('');
  dialogNode.innerHTML = html;
}

// 音频的各个时间的监听
audio.addEventListener('play', function (e){
  console.log(e)
});
audio.addEventListener('ended', function (e){
  console.log(e)
});
audio.addEventListener('canplay', function (e){
  console.log(e)
});
// 音频播放在 ios 系统需要有用户触发才可以
// 这里利用 弹出层的点击, 来触发音频的播放, 然后马上暂停
// 等摇一摇时候再次触发播放就正常了
// 所以需要在摇一摇界面先弹出层, 用于介绍下规则, 顺便也处理下 ios 音频播放的问题
Hammer(maskNode).on('tap', function () {
  clearTimeout(dialogTimer);
  dialogNode.classList.remove('bounce-in');
  dialogNode.classList.add('bounce-out');
  dialogTimer = setTimeout(function () {
    maskNode.style.display = 'none';
    dialogNode.style.display = 'none';
    if( vm.$data.pageQueue.indexOf(5) > -1 && vm.subPageNum == 4 ) {
      // console.log('进入play')
      isPlauAudio = true;
      audio.play();
      audio.pause();
      handleMaps[4].call(null, vm);
    }
  }, 400)
});
// 抢贡献值
Hammer(rush).on('tap', function (ev){
  var target  = ev.target;
  active(vm, target);
  target.disabled = true;
  utils.ajax({
    url: URL + 'test.php',
    dataType: 'json',
    type: 'post',
    data: {a:1},
    success ( req ) {
      vm.taskDetail.isGrab = true;
    },
    error ( xhr ) {
      console.log(xhr)
    }
  });
});

// 抢红包
Hammer(timinggrab).on('tap', function (ev) {
  var target = ev.target;
  var flip, firstNode, lastNode, idx, row;
  if( target.classList.contains('timinggrab') ) {
    return
  };
  while( !target.classList.contains('list') ) {
    target = target.parentNode;
  }
  idx = target.getAttribute('data-idx');
  flip = target.querySelectorAll('.flip');
  firstNode = flip[0];
  lastNode = flip[1];

  if( target.classList.contains('active') ) {
    target.classList.remove('active');
    firstNode = flip[1];
    lastNode = flip[0];
    anm(firstNode,lastNode);
    vm.timinggrabData[idx].status = 1;
    return;
  }
  vm.timinggrabData[idx].status = 0;
  target.classList.add('active');
  anm(firstNode,lastNode); 
});
Hammer(lottoBtn).on('tap', function (ev) {
  if( ev.target.disabled ) return;
  handleMaps[2](vm);
});
Hammer(lottoIsWinBtn).on('tap', function () {
  setTimeout(function (){vm.lottoStartEnd = false;},100);
});
// 抢红包 翻排
var anm = (first, last) => {
  first.classList.add('out');
  first.classList.remove('in');
  setTimeout(function () {
    last.classList.add("in")
    last.classList.remove("out");
  }, 225);
}
var getSVGDocument = ( dom ) => {
  return dom.getSVGDocument().getElementsByTagName('svg')[0];
}
var createNS = (tag) => {
  return doc.createElementNS(utils.NS, tag)
};
var transEnd = () => {
  for(var i = 0, len = nodePage.length; i < len; i++ ) {
    isAnimateEnd.push(0);
  }
  for(var i = 0, len = nodePage.length; i < len; i++ ) {
    (function (k) {
      nodePage[ k ].addEventListener(TRANSITIONEND, function () {
        if( this.classList.contains(PAGELEAVE) ) {
          this.classList.remove(PAGELEAVE);
        }
        if( this.classList.contains(BACKLEAVE) ) {
          this.classList.remove(BACKLEAVE);
          vm.pageQueue.pop();
        }
        setTimeout(function (){
          isAnimateEnd[ k ] = 0;
        },30)
      })      
    }(i));
  }
}
// 点击 active 样式处理函数
var active = (vm, target) => {
  target.classList.add('active');
  setTimeout(function () {
    target.classList.remove('active');
  },200);
}
// header 右侧按钮的处理函数
var info = (vm, target) => {
  var len = vm.pageQueue.length;
  var num;
  active(vm, target);
  if( !len ) return;
  num = vm.pageQueue[ len -1 ];
  if( num == 1 ) {
    dialog(0);
  }
}
// 需要处理 active 样式的节点
var tapActive = (vm) => {
  for(var i = 0, len = activeNode.length; i < len; i++ ) {
    (function (k) {
      Hammer(activeNode[k]).on('tap', function (ev) {
        active(vm, ev.target);
      });
    }(i));
  }
}
// 后退按钮处理函数
var backHandle = (vm) => {
  var backBtn = doc.querySelectorAll('.h-back');
  for(var i = 0, len = backBtn.length; i < len; i++ ) {
    (function (k){
      Hammer(backBtn[ k ]).on('tap', function(ev) {
        var target = ev.target;
        active(vm, target);
        if( /1/.test(isAnimateEnd.join(''))  ) return;
        isAnimateEnd[k] = 1;
        if ( vm.pageQueue.length <= 1 ) {
          isAnimateEnd[k] = 0;
          return
        };
        pageOut(vm);
      });
    }(i));
  }
};
// 首页点击事件处理函数
var idxPageClk = (vm) => {
  var t = vm;
  var idxPageSvgRoot = getSVGDocument( utils.getId('page-svg-idx') );
  var rect = idxPageSvgRoot.getElementsByTagName('rect');
  var arr = [
    1,2,3,4,
    1,2,3,4
  ];
  for(var i = 0, len = rect.length; i < len; i++ ) {
    (function (k){
      if( k == 3 || k == 7 ) return;
      Hammer(rect[k]).on('tap', function(ev) {
        active(vm, ev.target);
        if( /1/.test(isAnimateEnd.join('')) ) return;
        var next = arr[k];
        isAnimateEnd[ next ] = 1;
        vm.pageQueue.push( next );
        pageIn( vm );
      })
    }(i));   
  }
}
var gamePageclk = (vm) => {
  var gamePageSvgRoot = getSVGDocument( utils.getId('page-svg-game') );
  var rect = gamePageSvgRoot.getElementsByTagName('rect');
  for(var i = 0, len = rect.length; i < len; i++ ) {
    (function (k){
      Hammer(rect[k]).on('tap', function(ev) {
        var target = ev.target, lastNum = 0;
        active(vm, target);
        if( /1/.test(isAnimateEnd.join('')) ) return;
        lastNum = k + 2;
        vm.subPageNum = lastNum;
        
        vm.pageQueue.push(5);
        if( lastNum == 4 ) {
          pageIn(vm, undefined, function () {
            setTimeout(function () {
              dialog('5-2');
            }, 400)
          });
          return
        } else {
          if( lastNum != 2 ) {
            handleMaps[lastNum].call(target, vm);
          }
        }
        pageIn(vm)
      })
    }(i));   
  }  
}
var pageIn = ( vm, type, cb ) => {
  var len = vm.pageQueue.length, next, prev, pnum = len - 2;
  if( !len ) return;
  next = vm.pageQueue[ len-1 ];
  prev = pnum < 0 ? 0 : pnum;  
  if( next >= nodePage.length ) {
    next = nodePage.length - 1
  }
  if( type == undefined ) {
    nodePage[ prev ].classList.add(PAGELEAVE);
    nodePage[ next ].classList.add(PAGEENTER);
    if( cb ) {
      cb();
    }
    return;
  }
  nodePage[ next ].classList.remove(PAGEENTER);
  nodePage[ next ].classList.add(BACKLEAVE);
  if( cb ) {
    cb();
  }
  // 后退时需要还原的数据
  // setTimeout(function () {
  // 猜大小, 翻排

  // },300);
}
var pageOut = ( vm ) => {
  pageIn(vm, 'out');
}
// 头部右侧按钮点击处理函数
var hInfoHandle = (vm) => {
  for(var i = 0, len = hInfo.length; i < len; i++ ) {
    (function (k){
      var hammertime = new Hammer(hInfo[k], {});
      hammertime.on('tap', function(ev) {
        var target = ev.target;
        // var cls = target.classList;
        // cls = slice.call(cls);
        while( !target.classList.contains('h-info') 
          /*!/(^|\s)h-info(\s|$)/.test(cls.join(' '))*/ ) {
          target = target.parentNode;
          // cls = slice.call( target.classList );
        }
        info(vm, target);
      })
    }(i));
  }
}
var listTapHandle = (vm) => {
  // list tap
  taskList = doc.querySelectorAll('.task-list')[0],
  Hammer(taskList).on('tap', function (ev) {
    var lastNum = vm.pageQueue[vm.pageQueue.length - 1];
    var target = ev.target;
    var parent = target.parentNode;
    
    if( lastNum!== undefined ){
      vm.subPageNum = 1;
      vm.pageQueue.push(5);
      handleMaps[1].call(target, vm, taskList);
    }
  });
}
var vmReady = (vm) => {
  // var bool = false;
  nodePage = doc.querySelectorAll('.pages-controller');
  hInfo = doc.querySelectorAll('.h-info');
  signstarInfo = doc.querySelector('#signstar-info');
  signstarGo = doc.querySelector('#signstar-go');
  hash = hash ? parseInt(hash): 0;

  handleMaps[signstarInfo.id].call(signstarInfo, vm);
  handleMaps[signstarGo.id].call(signstarGo, vm);
  if( nodePage.length ) {
    setTimeout(function () {
      transEnd();
      backHandle(vm);
      idxPageClk(vm);
      gamePageclk(vm);
      listTapHandle(vm);

      // 获取 task 列表
      utils.ajax({
        url: URL + 'test.php',
        dataType: 'json',
        type: 'post',
        // data: {a:1},
        success ( req ) {
          console.log('任务列表获取完成')
          // vm.taskData = req.data;
        },
        error ( xhr ) {
          
        }
      });

      if( hash || vm.pageQueue.length > 1 ) {
        if( vm.pageQueue.length > 1 ) {
          hash = vm.pageQueue[ vm.pageQueue.length - 1 ];
        } else {
          vm.pageQueue.push( parseInt(hash) );
        }
        isAnimateEnd[ hash >= isAnimateEnd.length ? hash - 1 : hash ] = 1;
        // 测试用
        pageIn( vm
          // , undefined
          // , function () {
          //   if( hash == 5 && vm.subPageNum ) {
          //     handleMaps[vm.subPageNum](vm)
          //   }
          // }
        );
      }
      if( hInfo.length ) {
        hInfoHandle(vm);
      }
    },200);
    /*
    get user info
     */
    return
  }
  lopNum++;
  if( lopNum >= lopMax ) {
    alert('加载失败')
    return;
  }
  setTimeout(function () {
    vmReady(vm);
  },1000);
}
function getUserInfo () {
  utils.ajax({
    url: '',
    type: 'PSOT',
    success () {},
    error () {}
  })
}
//aa
function startVm () {
  vm = new Vue({
    el: '#' + wrapper,
    data: {
      page: page,
      pageQueue: [0,5],
      currentPage: 0,
      type: 0,
      subPageNum: 2,
      isAnimateEnd: isAnimateEnd,

      // isTaskShare: false,
      isSignIn: false,
      y1yIsB: false,
      // userInfo: {
      //   score: 0,
      // },
      // 定时抢数据
      timinggrabData: testData.timinggrab,
      // 任务列表
      taskData: testData.taskData,
      taskDetail: {},
      // 猜大小相关
      score: userInfo.score,
      bet: testData.bet,
      // 投注数
      betNum: '',
      // 应出现的点数
      lotNum: 0,
      //是否命中
      isWin: false,
      // 猜的大小
      lotSts: '',
      lottoStartEnd: false
    },
    watch: {
      betNum (v, o) {
        var score = this.score, betNum = this.betNum;
        if( userInfo.score >= betNum ) {
          this.score = userInfo.score - this.betNum;
        } else {
          alert('积分不足');
        }
      }
    },
    computed: {
      // isShowView:
      subTitle: function () {
        return subTitle[this.subPageNum];
      },

    },
    ready () {
      var t = this;
      vmReady(t);
    }
  });
  window.vm = vm;  
}
startVm();





