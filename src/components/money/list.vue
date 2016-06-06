<template>
<!-- 现金专区 -->
<div class="pages-controller money-list" v-show="show" transition="art" style="background-color: -red;">
  <div class="gol-header" style="opacity:1">
    <button type="button" class="h-back" v-el:back data-article="article">
        <span class="icon-arrow-left2"></span>后退
    </button>
    <h1 class="h-title" >
      {{title}}
    </h1>
    <div class="h-info" ><span class="icon-help-with-circle"></span></div>
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page" >
      <div class="list-box" id="box">
        <button type="button" v-for="item in list" data-idx="{{$index}}" v-bind:disabled="item.isHand">
          <div class="inner">
            <div class="cont">
              <div class="b">LED电视</div>
              <div class="s">55英寸</div>
              <div class="x">4K(3840*2160)</div>
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
    document.body.classList.add('detail')
    pt = target;
    while( pt.tagName.toLowerCase() !== 'button' ) {
      pt = pt.parentNode;
    }
    if(pt.disabled)return;
    idx = pt.getAttribute('data-idx');
    utils.setActive(vm, pt.children[0].children[0]);

    vm.$broadcast('moneyDetail', vm.list[idx])
  })
}
export default {
  data () {
    return {
      title: '',
      list: [1,2,3,4,5,6,7,8,9,11,12,13,14,15],
      show: false,
      pts: this.$parent.pts,
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
    });
  }
}
</script>