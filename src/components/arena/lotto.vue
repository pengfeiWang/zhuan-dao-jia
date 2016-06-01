<template>
<!-- 竞技场 -->
<div class="pages-controller lotto" v-show="show" transition="art">
  <div class="gol-header" style="opacity:1">
    <button type="button" class="h-back" v-el:back data-article="article"><span class="icon-arrow-left2"></span>后退</button>
    <h1 class="h-title" >
      猜大小
    </h1>
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page" style="overflow-y:hidden">
      <Temp></Temp>
      <Desc></Desc>    
    </div>
  </div>
</div>
</template>

<script>
import golMdule from '../../module/index';
import Temp from './lotto/lotto-template'
import Desc from './lotto/lotto-layer'
var { back } = golMdule;

export default {
  data () {
    return {
      show: false,
      pts: this.$parent.pts
    }
  },
  components: {
    Temp,Desc
  },
  ready () {
    var t = this;
    back(t);
    // console.log(t.$parent.pts)
    t.$on('arenaTap', function (num) {
      var bol = (num == 0)
      if( bol ) {
        t.pts = t.$parent.pts
        t.$parent.pts = false
      }
      this.$broadcast('init')
      //0 骰子, 1 其他, 2 摇一摇, 3 翻牌 
      t.show = bol;
    });
  }
}
</script>
