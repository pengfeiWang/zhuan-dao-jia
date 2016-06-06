<template>
<!-- 竞技场 -->
<div class="pages-controller" v-show="pts==4" transition="expand">
  <div class="gol-header" style="opacity:1">
    <div class="h-back" id="h-back"><span class="icon-arrow-left2"></span>后退</div>
    <h1 class="h-title" >
      签到
    </h1>
    <div class="h-info" ><span class="icon-help-with-circle" style="font-size:12px"></span></div>
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page signstar_wrapper">
      <img v-bind:src="data.adPicUrl" alt="" style="pos">
      <div class="content" >
        <p>
          给五星好评, 在送1000积分 <button type="button" v-el:signstar-go v-bind:disabled="data.flag">GO</button>
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
import template from '../../data/template';
var backBtn;
var go = (vm) => {
  var btn = vm.$els.signstarGo;
  Hammer(btn).on('tap', function (ev) {
    console.log('ajax 请求签到');
    if(!vm.data || !vm.data.adId) return;
    var d = utils.extend({}, config.reqParam, {adId: vm.data.adId})
    utils.ajax({
      url: config.URL +'doSign.do',
      type: 'post',
      dataType: 'json',
      data: d,
      success (res) {
        // 判断
        // if(res.rescode == 100) {

        // } else {
          utils.dialog(res.message)
        // }
      },
      error (xhr) {
        utils.dialog('暂无数据');
      }
    }); 
  });
}
var infoTip = (vm) => {
  var btn = vm.$els.signstarInfo;
  Hammer(btn).on('tap', function (ev) {
    utils.dialog(template[1].join(''))
  });
}
var init = (vm) => {
  var rootVm = vm.$root;

  utils.ajax({
    url: config.URL + 'initSign.do',
    type: 'POST',
    dataType: 'json',
    data: config.reqParam,
    success (res) {
      if( res.rescode == 100 ) {
        vm.data = res.data;
      } else {
        utils.dialog(res.message)
      }
    },
    error (xhr) {
      setTimeout(function () {
        utils.dialog('暂时无任务数据'/*, function () {
          vm.isBack = true;
          vm.$root.$el.classList.add('back')
          vm.$root.show = vm.$root.oldShow;        
        }*/);        
      }, 200);
    }
  });
}
export default {
  data () {
    return {
      data: {},
      pts: this.$root.show
    }
  },
  ready () {
    var t = this;
    backBtn = document.getElementById('h-back');
    go(t);
    infoTip(t);
    t.$on('pageTab', function (num) {
      if( num == 4 ) {
        init(t);
      }
      t.pts = num;  
    });
  }
}
</script>
