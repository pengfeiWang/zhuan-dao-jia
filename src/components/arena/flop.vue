<template>
<!-- 竞技场 -->
<div class="pages-controller" v-show="show" transition="art">
  <div class="gol-header" style="opacity:1">
    <div class="h-back" v-el:back data-article="article"><span class="icon-arrow-left2"></span>后退</div>
    <h1 class="h-title" >
      定时红包抢现金
    </h1>
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page" >
      <div class="article-inner" style="padding-top:20px;">
          <div class="timinggrab" id="timinggrab">
            <div class="list" v-for="it in timinggrabData" v-bind:class="{'active':!it.isGrab}" data-idx="{{$index}}">
              <div class="inner">
                <div class="flip out">
                  <div class="icon">
                    {{{$index | renderSrc }}}
                  </div>
                  <div class="desc" >
                    <p v-for="sit in it.desc">{{sit}}</p>
                  </div> 
                </div>
                <div class="flip in"></div>
              </div>
            </div>
          </div>
          <div class="padding-20 txt-red">
            <p class="fz16 padding-bottom-5">规则说明：</p>
            <p class="fz12 padding-bottom-5">1、定时红包有4波，包括起床红包、午休红包、晚餐红包和睡前红包。</p>
            <p class="fz12 padding-bottom-5">2、定时红包发放数量有限，抢完为止。</p>
            <p class="fz12 padding-bottom-5">3、定时红包对所有会员开放。</p>
          </div>
      </div>    
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import golMdule from '../../module/index';
var { back, getUser } = golMdule;
// 测试数据
var timinggrab =[
    {
      ico: '',
      id: 1,
      status: 0,
      isGrab: false,
      desc: [
        '起床红包',
        '01:17开始抢, 消除起床气'
      ],
      desc1: [
        '起床红包',
        '01:17开始抢, 消除起床气'
      ]
    },
    {
      ico: '',
      id: 2,
      status: 1,
      isGrab: false,
      desc: [
        '午休红包',
        '12:17开始抢, 精神一下午'
      ],
      desc1: [
        '午休红包',
        '12:17开始抢, 精神一下午'
      ]
    },
    {
      ico: '',
      id: 3,
      status: 1,
      isGrab: false,
      desc: [
        '晚餐红包',
        '17:17开始抢, 健胃又消食'
      ],
      desc1: [
        '晚餐红包',
        '17:17开始抢, 健胃又消食'
      ]
    },
    {
      ico: '',
      id: 4,
      status: 1,
      isGrab: false,
      desc: [
        '睡前红包',
        '22:17开始抢, 一夜睡香香'
      ],
      desc1: [
        '睡前红包',
        '22:17开始抢, 一夜睡香香'
      ]
    }    
];

Vue.filter('renderSrc', function ( idx ) {
  var s = '<img src="./static/images/h-t-' + idx + '.png" alt="">';
  return s;
});
var anm = (first, last) => {
  first.classList.add('out');
  first.classList.remove('in');
  setTimeout(function () {
    last.classList.add("in")
    last.classList.remove("out");
  }, 225);
}
var getALL = (vm) => {
  // 获取用户信息
  getUser(function (data){
  // vm.$root.userInfo = data;
  });
  // 获取列表
  ;(function () {
    utils.ajax({
      url: config.URL +'test.php',
      type: 'post',
      dataType: 'json',
      data: {},
      success (res) {
        // vm.timinggrabData = list
      },
      error (xhr) {}
    });
  });
}
var start = (vm) => {
  var timinggrab = document.querySelector('#timinggrab')
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
    if(vm.timinggrabData[idx].isGrab)return;
    utils.ajax({
      url: config.URL +'test.php',
      type: 'post',
      dataType: 'json',
      data: {},
      success (res) {
        if( res ) { //可以抢
          vm.timinggrabData[idx].isGrab = true;
          firstNode = flip[1];
          lastNode = flip[0];
          anm(firstNode,lastNode);
        } else {
          utils.dialog('还没到时间哦...')
        }
      },
      error (xhr) {
        utils.dialog('数据出错')
      }
    }); 
   });  
}
export default {
  data () {
    return {
      show: false,
      pts: this.$parent.pts,
      timinggrabData: timinggrab
    }
  },
  ready () {
    var t = this;
    back(t);
    getALL(t);
    start(t);
    t.$on('arenaTap', function (num) {
      var bol = (num == 3)
      if( bol ) {
        t.pts = t.$parent.pts
        t.$parent.pts = false
      }
      getALL(t);
      //0 骰子, 1 其他, 2 摇一摇, 3 翻牌 
      t.show = bol;
    });
    window.flopVM = this;
  }
}
</script>
