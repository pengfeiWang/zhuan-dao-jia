<template>
<!-- 任务 -->
<div class="pages-controller"  v-show="pts==2" transition="expand">
  <div class="gol-header" style="opacity:1">
    <div class="h-back" ><span class="icon-arrow-left2"></span>返回</div>
    <h1 class="h-title" >
      任务
    </h1>
    <div class="h-info" ><span class="icon-help-with-circle"></span></div>
  </div>  
  <div class="gol-wrapper doc-header" id="task-controller">
    <div class="page" >
      <ul class="task-list" v-el:task-box>
        <li v-for="it in taskData" data-idx="{{$index}}">
          <img v-bind:src="it.smallPicUrl" alt="">
          <span class="title">{{it.missonTitle}}</span>
          <div class="text ellipsis-2">  
            {{it.desc}}
            VIP {{it.vipDevoteValue}} 贡献值 普通会员 {{it.nonVipDevoteValue}} 贡献值 投放次数 {{it.missionCount}} 剩余次数 {{it.missionRestCount}}
          </div>
          <div class="footer">
            <span class="fr">
              结束时间: {{it.endTime}}
            </span>
              <!-- 昨天: --> {{it.startTime}}
          </div>
        </li>
      </ul>

      <div class="scroll-pull" v-show="isPullUp">
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
<Art></Art>
</template>

<script>
import Art from './article';

var listTap = ( vm ) => {
  var t = vm;
  var taskBox = t.$els.taskBox;
  Hammer(taskBox).on('tap', function (ev) {
    if( vm.$root.isTranslate ) {
      return;
    }
    var target = ev.target;
    var pt, idx, data;
    if( taskBox.contains(target) ){
      if( target.tagName.toLowerCase() != 'li' ) {
        pt = target.parentNode;
        while( pt.tagName.toLowerCase() !== 'li' ) {
          pt = pt.parentNode;
        }       
      } else {
        pt = target;
      }
      idx = pt.getAttribute('data-idx');
      data = t.taskData[idx];
      if( data.isGrab ) {
        utils.dialog('您已经抢过了!!!');
        return false;
      }
      t.$broadcast('setData', data, idx)
      t.taskDetail = data;
    }
  })  
}
var init = (vm) => {
  // 获取任务列表
  utils.ajax({
    url: config.URL +'initShareMisson.do',
    type: 'post',
    dataType: 'json',
    data: window.config.reqParam,
    success (res) {
      if( res.rescode == 100 ) {
        vm.taskData = res.list;
        setTimeout(function (){winScroll(vm);}, 300)
      }
    },
    error (xhr) {}
  }); 
}
var winScroll = (vm) => {
  var rootNode = document.getElementById('task-controller');
  var page = rootNode.querySelectorAll('.page')[0];
  var loadTxt = ['上拉加载更多', '数据加载中...', '已经到最后一条'];
  var isEnd = false;

  var taskBox = vm.$els.taskBox;
  if( taskBox.offsetHeight > page.offsetHeight) {
    vm.isPullUp = true
  } else {
    vm.isPullUp = false
  }
  page.addEventListener('scroll', function (e) {
    var rootHeight = rootNode.offsetHeight;
    var scrollHeight = page.scrollHeight;
    var top = page.scrollTop;
    var pageSize = 0;
    var reqObj = utils.extend({}, window.config.reqParam);
    var taskBox = vm.$els.taskBox;
    if( taskBox.offsetHeight > page.offsetHeight) {
      vm.isPullUp = true
    } else {
      vm.isPullUp = false
    }
    if( taskBox.offsetHeight > rootHeight && !vm.pullUpLoadStatus && !isEnd ) {
 
      if( (scrollHeight - top - 50) <= rootHeight ) {
        vm.pullUpLoadStatus = true;
        reqObj.adId = vm.taskData[ vm.taskData.length-1 ].adId;
        // vm.pullUpLoadTxt = loadTxt[1]
        // 获取任务列表
        utils.ajax({
          url: config.URL +'addMoreShareMisson.do',
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
                vm.taskData.push(res.list[i])
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
      isPullUp: false,
      taskData: [],
      pts: this.$root.show
    }
  }
  ,events: {
    'child-show': function (num) {
      this.taskData[num].missonOverFlg = true;
    }
  }
  ,components: { Art }
  ,ready () {
    var t = this;
    listTap(t);
    winScroll(t);
    t.$on('pageTab', function (num) {
      if( num == 2 ) {
        if(!t.taskData.length)init(t);  
      }
      t.pts = num;
    });

    window.taskVM = t;
    
  }
}
</script>

