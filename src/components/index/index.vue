<template>
<!-- 游戏入口 -->
<div class="pages-controller" v-show="pts==1" transition="expand">
  <div class="gol-header" style="opacity:1">
    <div class="h-back" ><span class="icon-arrow-left2"></span>后退</div>
    <h1 class="h-title image-title" >
      <img src="../../assets/images/title.png" alt="">
    </h1>
    <!-- <div class="h-info" >&nbsp;</div> -->
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page" style="overflow-y:-hidden">
      <svg version="1.1" id="index" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 750 1294" style="enable-background:new 0 0 750 1294; opacity:1;position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto;" xml:space="preserve">
        <g>
          <image style="overflow:visible;opacity:1" width="750" height="1294" xlink:href="./static/images/page-1.png"></image>
        </g>
        <g id="g">
          <rect x="129" y="217" width="156" height="120"  class="st0"/>
          <rect x="557" y="369" width="158" height="98.8" class="st0"/>
          <rect x="45" y="589" width="162" height="120" class="st0"/>
          <rect x="207" y="995" width="168" height="116" class="st0"/>
          <rect x="165" y="353" width="180" height="196" class="st0"/>
          <rect x="497" y="469.8" width="180" height="178" class="st0"/>
          <rect x="165" y="727" width="210" height="222" class="st0"/>
          <rect x="511" y="971" width="204" height="236" class="st0"/>
        </g>
      </svg>
    </div>
  </div>
</div>
</template>

<script>
import utils from 'utils'
import Hammer from 'hammer'
// 首页点击切换页面
var pageViewTab = ( vm ) => {
  var 
    rootVm = vm.$root,
    svg = utils.getId('index'),
    id = utils.getId('g'),
    rect = id.getElementsByTagName('rect'),
    len = rect.length,
    i = 0,
    arr = [
      1,2,3,4,
      1,2,3,4
    ];
  var tapHd = ( key ) => {
    Hammer(rect[ key ]).on('tap', function (ev){
      if( rootVm.isTranslate ) {
        return;
      }
      
      rootVm.olsShow = rootVm.show;
      vm.$dispatch('child-show', arr[key]+1)
    });
  }
  svg.onload = function (){
    for( ; i < len; i++ ) {
      tapHd(i);
    }
  }       
}

export default {
  data () {
    return {
      pts: this.$root.show
    }
  }
  ,
  ready () {
    var t = this;
    t.$on('pageTab', function (num) {
      t.pts = num;
    });
    pageViewTab(t);
    window.indexVm = t
  }
}
</script>