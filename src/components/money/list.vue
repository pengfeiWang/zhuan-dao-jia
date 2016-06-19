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
  <div class="gol-wrapper doc-header" id="money-controller">
    <div class="page" >
      <div class="list-box" id="box">
        <button type="button" v-for="item in list" data-idx="{{$index}}" v-bind:disabled="toBol(item.cashOverFlg)" v-bind:class="{'active':toBol(item.cashOverFlg)}">
          <div class="inner">
            <div class="cont">
              <div class="b">{{item.adName}}</div>
             <!--  <div class="s">55英寸</div>
              <div class="x">4K(3840*2160)</div> -->
            </div>
          </div>
        </button>
      </div>
      <div class="scroll-pull" v-show="pullUpAll">
            <span class="scroll-loadTxt" v-show="!pullUpLoadStatus">{{pullUpLoadTxt}}</span>
            <!-- 加载更多loading图标 -->
            <div class="loading-spinner-outer" v-show="pullUpLoadStatus">
              <div class="loading-spinner">
                <span class="loading-top"></span>
                <span class="loading-right"></span>
                <span class="loading-bottom"></span>
                <span class="loading-left"></span>
              </div>
            </div>
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
  var reqObj = utils.extend({}, config.reqParam);
  reqObj.adKind = vm.adKind;
  utils.ajax({
    url: config.URL + 'initCashRedPaper.do',
    type: 'post',
    dataType: 'json',
    data: reqObj,
    success (res) {
      if(res.rescode ==100){
        // var list = res.list;
        // for(var i = 0, len = list.length; i < len; i++){
        //   list[i].cashOverFlg = +list[i].cashOverFlg
        // }
        vm.list = res.list
        setTimeout(function (){winScroll(vm);},200)
      } else {
        utils.dialog(res.message)
      }
    },
    error () {
      utils.dialog('暂无数据')
    }
  });
}
var winScroll = (vm) => {
  var rootNode = document.getElementById('money-controller');
  var page = rootNode.querySelectorAll('.page')[0];
  var box = document.getElementById('box');
  var loadTxt = ['上拉加载更多', '数据加载中...', '已经到最后一条'];
  var isEnd = false;
  var rootHeight = rootNode.offsetHeight;
  var scrollHeight = page.scrollHeight;
  if(box.offsetHeight > rootHeight ){
    vm.pullUpAll = false
  } else {
    vm.pullUpAll = true
  }
  page.addEventListener('scroll', function (e) {
    var rootHeight = rootNode.offsetHeight;
    var scrollHeight = page.scrollHeight;
    var top = page.scrollTop;
    var box = document.getElementById('box');
    var pageSize = 0;
    var reqObj = utils.extend({}, config.reqParam)
    if(box.offsetHeight > rootHeight ){
      vm.pullUpAll = true
    } else {
      vm.pullUpAll = false
    }
    if( scrollHeight > rootHeight && !vm.pullUpLoadStatus && !isEnd ) {
 
      if( (scrollHeight - top - 50) <= rootHeight ) {
        vm.pullUpLoadStatus = true;
        reqObj.adKind = vm.adKind;
        // vm.pullUpLoadTxt = loadTxt[1]
        // 获取任务列表
        utils.ajax({
          url: config.URL +'addMoreCashRedPaper.do',
          type: 'post',
          dataType: 'json',
          data: reqObj,
          success (res) {
            vm.pullUpLoadStatus = false;
            if( !res.list ) {
              isEnd = true;
              vm.pullUpLoadTxt = loadTxt[2]
            } else {
              for(var i = 0, len = res.list.length; i < len; i++) {
                // res.list[i].cashOverFlg = +res.list[i].cashOverFlg
                vm.list.push(res.list[i])
              }
              
              isEnd = false;
              vm.pullUpLoadTxt = loadTxt[0]
            }
          },
          error (xhr) {
            vm.pullUpLoadTxt = loadTxt[2]
          }
        }); 
      }
    }
    // console.log(e);
  })  
}
export default {
  data () {
    return {
      pullUpLoadTxt: '上拉加载更多',
      pullUpLoadStatus: false,
      pullUpAll: false,
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
    window.sttt = t
    setTimeout(function (){winScroll(t);},200)
    t.$on('moneyList', function (data) {
      t.pts = t.$parent.pts
      t.$parent.pts = false
      t.title = data.title;
      t.adKind = data.id
      t.show = true;
      // if(!t.list.length){
        init(t);
        
      // }
     
    });
  }
}
</script>