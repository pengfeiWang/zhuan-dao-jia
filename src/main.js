import Vue from 'vue'
import App from './App';
import utils from 'utils'
import Hammer from 'hammer'
import template from './data/template'


// callClientFunction('getUserInfo')
var 
  doc = document,
  dialog,
  dialogTimer,
  audio,
  // 头右侧按钮
  hInfo,
  // 遮罩
  maskNode,
  // 弹窗
  dialogNode;

var isAndroid = /Android/g.test(navigator.userAgent);
if(isAndroid){
  document.documentElement.classList.add('android')
}
Vue.transition('expand', {
  afterEnter: function (el) {
    var rootVm = this.$root;
    if( rootVm.isBack ) {
      rootVm.isBack = false;
      rootVm.$el.classList.remove('back')
    }
    rootVm.$el.classList.remove('art')
    setTimeout(function(){rootVm.isTranslate = false},200)
  },
  beforeEnter: function (el) {
    this.$root.isTranslate = true;
  }
  ,beforeLeave: function (el) {
    this.$root.isTranslate = true;
  }
});
Vue.transition('art', {
  afterEnter: function (el) {
    var rootVm = this.$root;
    rootVm.$el.classList.remove('art')
    rootVm.$el.classList.remove('detail')
    setTimeout(function(){rootVm.isTranslate = false},200)
  }
  ,beforeEnter: function (el) {
    this.$root.isTranslate = true;
  }
  ,beforeLeave: function (el) {
    this.$root.isTranslate = true;
  }
});
utils.dialog = dialog  = (num, cb) => {
  var html;
  var str = parseInt(num, 10);

  clearTimeout(dialogTimer);
  if( cb ) {
    utils.dialogCb = cb;
  }
  maskNode.style.display = 'block';
  dialogNode.style.display = 'block';
  dialogNode.classList.remove('bounce-out');
  dialogNode.classList.add('bounce-in');
  html =  isNaN(str) ? num : template[num].join('');
  dialogNode.innerHTML = html;

}
var dialogInit = (vm) => {
  Hammer(maskNode).on('tap', function () {
    clearTimeout(dialogTimer);
    dialogNode.classList.remove('bounce-in');
    dialogNode.classList.add('bounce-out');
    dialogTimer = setTimeout(function () {
      maskNode.style.display = 'none';
      dialogNode.style.display = 'none';
      if( vm.show == 3 ) {
        audio.muted = true;
        audio.play();
        audio.pause();
        audio.muted = false; 
      }
      if( utils.dialogCb ) {
        utils.dialogCb();
        utils.dialogCb = null
      }
    }, 400);
  })
}
// 后退按钮处理函数
var backHandle = (vm) => {
  var backBtn = document.querySelectorAll('.h-back');
  var hd = ( node ) => {
    Hammer(node).on('tap', function(ev) {
      if( vm.isTranslate ) return;
      if( node.getAttribute('data-article') ){
        return;
      }
      utils.setActive(vm, node);
      if( vm.show == 1 ) {
        callClientFunction('returnBack')
        return;
      }
      vm.isBack = true;
      vm.$el.classList.add('back')
      // var target = ev.target;
      
      vm.show = vm.oldShow;
    });
  }
  for(var i = 0, len = backBtn.length; i < len; i++ ) {
    hd(backBtn[ i ]);
  }
};
// header 右侧按钮的处理函数
var info = (vm, target) => {
  if(vm.show == 2) {
    dialog(0);
    return;
  }
  if(vm.show == 4) {
    dialog(1);
    return;
  }
  if( vm.show == 5 ) {
    dialog(5);
    return;
  }

}
// 头部右侧按钮点击处理函数
var hInfoHandle = (vm) => {
  var hd = ( node ) => {
    Hammer(node).on('tap', function (){
      utils.setActive(vm, node);
      info(vm, node);
    })
  }
  for(var i = 0, len = hInfo.length; i < len; i++ ) {
    hd(hInfo[ i ]);
  }
}

var advAudio = () => {
  // 音频的各个时间的监听
  audio.addEventListener('play', function (e){
    // console.log(e)
  });
  audio.addEventListener('ended', function (e){
    // console.log(e)
  });
  audio.addEventListener('canplay', function (e){
    // console.log(e)
  });
}

window.pageVM = new Vue({
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
    show ( n ) {
      this.$broadcast('pageTab', n)
    }
  },
  events: {
    'child-show': function (num) {
      this.show = num;
    }
  },
  computed: {
    pageWidth () {},
    pageHeight () {}
  },
  components: { App },
  ready () {
    callClientFunction('getUserInfo')
    // 头右侧按钮
    hInfo = doc.querySelectorAll('.h-info');
    // 遮罩
    maskNode = doc.querySelector('#mask');
    // 弹窗
    dialogNode = doc.querySelector('#dialog');
    // 音频标签
    audio = doc.querySelectorAll('audio')[0];

    backHandle(this);
    dialogInit(this);
    hInfoHandle(this);
    advAudio(this);
  }
})

