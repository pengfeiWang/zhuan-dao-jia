<template>
<!-- 竞技场 -->
<div class="pages-controller" v-show="pts==4" transition="expand">
  <div class="gol-header" style="opacity:1">
    <div class="h-back" ><span class="icon-arrow-left2"></span>后退</div>
    <h1 class="h-title" >
      签到
    </h1>
    <div class="h-info" ><span class="icon-help-with-circle" style="font-size:12px"></span></div>
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page signstar_wrapper">
      <div class="content" >
        <p>
          给五星好评, 在送1000积分 <button type="button" v-el:signstar-go>GO</button>
        </p>
        <p v-el:signstar-info>
          签到规则 <span class="icon-help-with-circle txt-fff" style="padding:10px; display: inline-block;" ></span>
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import template from '../../data/template'
var go = (vm) => {
  var btn = vm.$els.signstarGo;
  Hammer(btn).on('tap', function (ev) {
    console.log('ajax 请求签到');
    utils.ajax({
      url: config.URL +'test.php',
      type: 'post',
      dataType: 'json',
      data: {
        uid: ''
      },
      success (res) {
        // 判断
      },
      error (xhr) {}
    }); 
  });
}
var infoTip = (vm) => {
  var btn = vm.$els.signstarInfo;
  Hammer(btn).on('tap', function (ev) {
    utils.dialog(template[1].join(''))
  });
}
export default {
  data () {
    return {
      pts: this.$root.show
    }
  },
  ready () {
    var t = this;
    go(t);
    infoTip(t);
    t.$on('pageTab', function (num) {
      t.pts = num;
    });
  }
}
</script>
