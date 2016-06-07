<template>
<!-- 现金专区 -->
<div class="pages-controller money-list" v-show="show" transition="art" style="background-color: -red;">
  <div class="gol-header" style="opacity:1">
    <button type="button" class="h-back" v-el:back data-article="article">
        <span class="icon-arrow-left2"></span>返回
    </button>
    <h1 class="h-title" >
      {{title}}
    </h1>
    <div class="h-info" ><span class="icon-help-with-circle"></span></div>
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page" >
      <div class="list-box" id="box">
        <button type="button" v-for="item in list" data-idx="{{$index}}" v-bind:disabled="toBol(item.cashOverFlg)">
          <div class="inner">
            <div class="cont">
              <div class="b">{{item.adName}}</div>
             <!--  <div class="s">55英寸</div>
              <div class="x">4K(3840*2160)</div> -->
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
<Detail></Detail>
</template>
<script>
import golMdule from '../../module/index';
import Detail from './detail';
import Vue from 'vue'

Vue.filter('toBool', function (s){
  return !!+(s);
})
var { back, getUser } = golMdule;
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
var listTap = (vm) => {
  var box = document.getElementById('box');
  var rootVm = vm.$root;
  Hammer(box).on('tap', function (ev) {
    var target = ev.target, pt, idx;

    if( !box.contains(target) || rootVm.isTranslate) {
      return;
    }
    
    pt = target;
    while( pt.tagName.toLowerCase() !== 'button' ) {
      pt = pt.parentNode;
    }
    if(pt.disabled){
       utils.dialog('已经抢过了')
      return
    };
    document.body.classList.add('detail')
    idx = pt.getAttribute('data-idx');
    utils.setActive(vm, pt.children[0].children[0]);

    vm.$broadcast('moneyDetail', vm.list[idx])
  })
}
var init = (vm) => {
  utils.ajax({
    url: config.URL + 'initCashRedPaper.do',
    type: 'post',
    dataType: 'json',
    data: config.reqParam,
    success (res) {
      if(res.rescode ==100){
        vm.list = res.list
      } else {
        utils.dialog(res.message)
      }
    },
    error () {
      utils.dialog('暂无数据')
    }
  });
}
export default {
  data () {
    return {
      title: '',
      list: [],
      show: false,
      pts: this.$parent.pts,
    }
  },
  methods: {
    toBol (v) {
      return typeof v == 'string' ? !!(+v) : !!v
    }
  },
  components: {Detail},
  ready () {
    var t = this;
    back(t);
    listTap(t);
    t.$on('moneyList', function (data) {
      t.pts = t.$parent.pts
      t.$parent.pts = false
      t.title = data.title;
      t.show = true;
      // if(!t.list.length){
        init(t);
      // }
      
    });
  }
}
</script>