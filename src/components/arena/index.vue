<template>
<!-- 竞技场 -->
<div class="pages-controller" v-show="pts==3" transition="expand">
  <div class="gol-header" style="opacity:1">
    <div class="h-back" ><span class="icon-arrow-left2"></span>返回</div>
    <h1 class="h-title" >
      竞技场
    </h1>
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page" style="overflow-y:-hidden">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 750 1294" style="enable-background:new 0 0 750 1294;position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto;" xml:space="preserve">
        <g>
          <image style="overflow:visible; opacity:1" width="750" height="1294" xlink:href="./static/images/page-2.png" >
          </image>
        </g>
        <g v-el:g>
          <rect x="132.3" y="201.3" class="st0" width="267.9" height="313.5"/>
          <rect x="494.8" y="358" class="st0" width="165" height="156.8"/>
          <rect x="132.3" y="538.8" class="st0" width="242.7" height="369"/>
          <rect x="413.8" y="844.8" class="st0" width="246" height="309"/>
        </g>
      </svg>
    </div>
  </div>

</div>
  <Lotto></Lotto>
  <Shake></Shake>
  <Flop></Flop>
</template>

<script>
import Lotto from './lotto';
import Shake from './shake';
import Flop from './flop';
var btnTap = (vm) => {
  var rootVm = vm.$root;
  var rect = vm.$els.g.getElementsByTagName('rect');
  var hd = (num) => {
    var node = rect[ num ];
    Hammer( node ).on('tap', function () {
      if( rootVm.isTranslate ) {
        return;
      }
      vm.$broadcast('arenaTap', num)
    })
  }
  for(var i = 0, len = rect.length; i < len; i++) {
    hd(i);
  }
}
export default {
  data () {
    return {
      pts: this.$root.show
    }
  },
  components: {
    Lotto, Shake, Flop
  },
  ready () {
    var t = this;
    btnTap(t);
    t.$on('pageTab', function (num) {
      t.pts = num;
    });
  }
}
</script>
