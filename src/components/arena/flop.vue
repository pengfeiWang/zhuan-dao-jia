<template>
<!-- 竞技场 -->
<div class="pages-controller" v-show="show" transition="art">
  <div class="gol-header" style="opacity:1">
    <div class="h-back" v-el:back data-article="article"><span class="icon-arrow-left2"></span>返回</div>
    <h1 class="h-title" >
      定时红包抢现金
    </h1>
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page" >
      <div class="article-inner" style="padding-top:20px;">
          <div class="timinggrab" id="timinggrab">
            <div class="list" v-for="it in timinggrabData"  data-idx="{{$index}}">
              <div class="inner">
                <div class="flip out">
                  <div class="icon">
                    {{{$index | renderSrc }}}
                  </div>
                  <div class="desc" >
                    <p v-for="sit in it.desc">{{sit}}</p>
                  </div> 
                </div>
                <div class="flip in">
                  <div class="icon">
                    {{{$index | renderSrc }}}
                  </div>
                  <div class="desc" >
                    <p v-for="sit in it.desc">{{sit}}</p>
                  </div> 
                </div>
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
<Flopdetail></Flopdetail>
</template>

<script>
import Vue from 'vue'
import Flopdetail from './flop/flop-detail'
import golMdule from '../../module/index';
var { back, getUser } = golMdule;
var arrTip = [
  '开始抢, 消除起床气',
  '开始抢, 精神一下午',
  '开始抢, 精神一下午',
  '开始抢, 健胃又消食'
]
var timinggrabNode;
// 测试数据
var timinggrab =[
    {
      ico: '',
      id: 1,
      status: 0,
      overFlg: false,
      desc: [
        '起床红包',
        '01:17开始抢, 消除起床气'
      ]

    },
    {
      ico: '',
      id: 2,
      status: 1,
      overFlg: false,
      desc: [
        '午休红包',
        '12:17开始抢, 精神一下午'
      ]
    },
    {
      ico: '',
      id: 3,
      status: 1,
      overFlg: false,
      desc: [
        '晚餐红包',
        '17:17开始抢, 健胃又消食'
      ]
    },
    {
      ico: '',
      id: 4,
      status: 1,
      overFlg: false,
      desc: [
        '睡前红包',
        '22:17开始抢, 一夜睡香香'
      ]
    }    
];

Vue.filter('renderSrc', function ( idx ) {
  var s = '<img src="./static/images/h-t-' + idx + '.png" alt="">';
  return s;
});
var anm = (first, last, cb) => {
  first.classList.add('out');
  first.classList.remove('in');
  setTimeout(function () {
    last.classList.add("in")
    last.classList.remove("out");
    if(cb) {
      setTimeout(cb,500)
    };
    // first.parentNode.parentNode.classList.remove('active')
  }, 225);
}

var start = (vm) => {
  timinggrabNode = document.querySelector('#timinggrab');

  // 抢红包
  Hammer(timinggrabNode).on('tap', function (ev) {
    var target = ev.target;
    var flip, firstNode, lastNode, idx, row, reqData = window.config.reqParam;
    if( target.classList.contains('timinggrab') ) {
      return
    };
    while( !target.classList.contains('list') ) {
      target = target.parentNode;
    }
    idx = +(target.getAttribute('data-idx'));
    flip = target.querySelectorAll('.flip');
    firstNode = flip[0];
    lastNode = flip[1];



    if(vm.timinggrabData[idx].overFlg){
      utils.dialog('已经抢过了');
      return;
    }
    reqData.doKind = idx+1;
    utils.ajax({
      url: config.URL +'doTimeRedPaper.do',
      type: 'post',
      dataType: 'json',
      data: reqData,
      success (res) {
        if( res.rescode == 100 ) { //可以抢
          document.body.classList.add('detail');
          vm.timinggrabData[idx].overFlg = true;
          firstNode = flip[1];
          lastNode = flip[0];
          anm(firstNode,lastNode, function (){
            utils.dialog((res.message||'暂无红包数据'), function() {
              vm.$broadcast('flopDetail', res.data)
            })
          });
        } else {
          utils.dialog(res.message)
        }
      },
      error (xhr) {
        utils.dialog('暂无红包数据')
      }
    }); 
   });  
}
var init = (vm) => {
  utils.ajax({
    url: config.URL + 'initTimeRedPaper.do',
    type: 'post',
    dataType: 'json',
    data: window.config.reqParam,
    success (res) {
      if(res.rescode == 100){
        // for(var i = 0, len = vm.timinggrabData.length; i < len; i++ ) {
        //   vm.timinggrabData[i].overFlg = parseInt(res.data['overFlg'+(i+1)],10);
        //   vm.timinggrabData[i].desc[1] = res.data['doTime'+(i+1)] + arrTip[i];
        // }
        
        for(var i = 0, len = timinggrab.length; i < len; i++ ) {
          var o = utils.extend({},timinggrab[i], {overFlg:parseInt(res.data['overFlg'+(i+1)],10)});
          o.desc[1] = res.data['doTime'+(i+1)] + arrTip[i];
          vm.timinggrabData.$set(i, o)

        }
        setTimeout(function (){   
          var l = timinggrabNode.querySelectorAll('.list');
          for(var i = 0, len = l.length; i < len; i++ ) {
            var flip = l[i].querySelectorAll('.flip');
            if( vm.timinggrabData[i].overFlg ) {
              anm(flip[1], flip[0]);
            } else {
              anm(flip[0], flip[1]);
            }
            
          }  
        },0);        
      } else {
        utils.dialog(res.message);
      }
    },
    error () {
      utils.dialog('暂无红包数据')
    }
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
  components:{Flopdetail},
  ready () {
    var t = this;
    back(t);
    start(t);
    t.$on('arenaTap', function (num) {
      var bol = (num == 3)
      if( bol ) {
        init(t);
        t.pts = t.$parent.pts
        t.$parent.pts = false
      }

  

      //0 骰子, 1 其他, 2 摇一摇, 3 翻牌 
      t.show = bol;
    });
    window.flopVM = this;
  }
}
</script>
