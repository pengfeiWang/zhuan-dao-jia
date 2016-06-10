<template>
<!-- 现金专区 -->
<div class="pages-controller money-page" v-show="pts==5" transition="expand">
  <div class="gol-header" style="opacity:1">
    <button type="button" class="h-back" ><span class="icon-arrow-left2"></span>返回</button>
    <h1 class="h-title" >
      现金专区
    </h1>
    <!-- <div class="h-info" ><span class="icon-help-with-circle"></span></div> -->
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page" >
        <div class="money-page-box">
          <ul id="listBox">
            <li v-for="item in btn" data-idx="{{$index}}">
              <div class="inner">
                <div class="content">
                  <div class="bg"></div>
                  <div class="title">{{item.title}}</div>
                </div>
              </div>
            </li>
          </ul>
          
        </div>
    </div>
  </div>
</div>
<List></List>
</template>

<script>
import List from './list';
var listTap = (vm) => {
  var box = document.getElementById('listBox');
  var rootVm = vm.$root;
  Hammer(box).on('tap', function (ev) {
    var target = ev.target, pt, idx;

    if( !box.contains(target) ) {
      return;
    }
    if( rootVm.isTranslate ) {
      return;
    }
    pt = target;
    while( pt.tagName.toLowerCase() !== 'li' ) {
      pt = pt.parentNode;
    }
    idx = pt.getAttribute('data-idx');
    utils.setActive(vm, pt.children[0].children[0]);

    vm.$broadcast('moneyList', vm.btn[idx])
  })
}

export default {
  data () {
    return {
      
      btn: [
        {id:1, title:'厨卫电器'},
        {id:2, title:'家具建材'},
        {id:3, title:'家用电器'},
        {id:4, title:'生活服务'},
        {id:5, title:'汽车用品'},
        {id:6, title:'生活家电'},
        {id:7, title:'随机'}
      ],
      pts: this.$root.show
    }
  },
  components: {List},
  ready () {
    var t = this;
    listTap(t);
    t.$on('pageTab', function (num) {
      t.pts = num;
      // if(num ==5){
      //   init(t)
      // }
    });
  }
}
</script>

