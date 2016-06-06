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
      <img v-bind:src="data.adPicUrl" alt="">  
    </div>
  </div>
</div>
</template>

<script>
import golMdule from '../../../module/index';
var { back, getUser } = golMdule;

export default {
  data () {
    return {
      show: false,
      pts: this.$parent.pts,
      data: {}
    }
  },
  ready () {
    var t = this;
    back(t, 'show');
    t.$on('flopDetail', function (data) {
      t.pts = t.$parent.pts
      t.$parent.show = false;
      t.show = true;
      t.data = data;
    });
  }
}
</script>
