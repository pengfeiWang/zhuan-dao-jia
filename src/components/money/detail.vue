<template>
<!-- <link rel="stylesheet" href="../dist/static/css/mui.min.css"> -->
<!-- 现金专区 -->
<div class="pages-controller money-detail" v-show="show" transition="art" style="background-color: -red;">
  <div class="gol-header" style="opacity:1">
    <button type="button" class="h-back" v-el:back data-article="article">
        <span class="icon-arrow-left2"></span>返回
    </button>
    <h1 class="h-title" >
      商品详情
    </h1>
    <!-- <div class="h-info" ><span class="icon-help-with-circle"></span></div> -->
  </div> 
  <div class="gol-footer">
  <button type="button" v-bind:disabled="isTap" id="btn">
    <span>{{timeNum}}</span>
    轻轻一点就赚钱
  </button>
    
  </div> 
  <div class="gol-wrapper doc-header doc-footer">
    <div class="page" >
      <div class="detail-box">
        
        <img v-bind:src="listData.bigPicUrl">


      </div>
    </div>
  </div>
</div>
</template>
<script>
import Vue from 'vue'

import golMdule from '../../module/index';
var { back, getUser } = golMdule;
Vue.filter('toBool', function (s){
  return !!+(s);
})
var getList = (vm) => {
  // utils.ajax({
  //   url: '',
  //   type: '',
  //   dataType: '',
  //   success (res) {
  //     // vm.btn = []
  //   },
  //   error () {}
  // });
}
var btnTap = (vm) => {
  var btn = document.getElementById('btn');
  var rootVm = vm.$root;
  Hammer(btn).on('tap', function (ev) {
    var target = ev.target, pt, idx;
    if(btn.disabled) return;
    var reqObj = utils.extend({}, config.reaParam);
    if( rootVm.isTranslate) {
      return;
    }
    vm.isTap = true;
    reqObj.adId = vm.listData.adId
    utils.ajax({
      url: config.URL + 'doCashRedPaper.do',
      type: 'post',
      dataType: 'json',
      data: reqObj,
      success (res) {
        // if(res.rescode == 100){
        //   if(+res.data.successFlg){
        //     utils.dialog()
        //   }
        // } else {
          utils.dialog(res.message)
        // }
      },
      error () {}
    });
  })
}
var timeDown = (vm) => {
  var time = () => {
    vm.timeNum-=1;
    if(vm.timeNum==0){
      vm.isTap = false;
    }
    if(vm.timeNum > 0) {
      setTimeout(time,1000);
    }
  }
  time();
}
export default {
  data () {
    return {
      show: false,
      timeNum: 5,
      isTap: true,
      listData: {},
      pts: this.$parent.pts,
    }
  },
  watch: {
    timeNum (v) {
      // v<=0 && 
    }
  },
  ready () {
    var t = this;
    back(t, 'show');
    btnTap(t);
    t.$on('moneyDetail', function (data) {
      t.timeNum = 5;
      t.pts = t.$parent.show
      t.$parent.show = false;
      t.show = true;
      t.listData = data;
      setTimeout(function (){timeDown(t)},300);
    });
  }
}
</script>