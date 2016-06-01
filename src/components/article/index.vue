<template>
<!-- 任务 -->
<div class="pages-controller" v-show="pts==6" transition="expand">
  <div class="gol-header" style="opacity:1">
    <div class="h-back" ><span class="icon-arrow-left2"></span>后退</div>
    <h1 class="h-title" >
      {{title}}
    </h1>
    <div class="h-info" ><span class="icon-help-with-circle"></span></div>
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page" >
      {{{msg}}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: '标题',
      msg: '',
      pts: this.$root.show
    }
  },
  ready () {
    var t = this;
    t.$on('pageTab', function (num) {
      t.pts = num;
    });
  }
}
</script>

