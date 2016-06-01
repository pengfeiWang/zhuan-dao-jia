<template>
<!-- 任务 -->
<div class="pages-controller"  v-show="pts==2" transition="expand">
  <div class="gol-header" style="opacity:1">
    <div class="h-back" ><span class="icon-arrow-left2"></span>后退</div>
    <h1 class="h-title" >
      任务
    </h1>
    <div class="h-info" ><span class="icon-help-with-circle"></span></div>
  </div>  
  <div class="gol-wrapper doc-header" id="task-controller">
    <div class="page" >
      <ul class="task-list" v-el:task-box>
        <li v-for="it in taskData" data-idx="{{$index}}">
          <img src="../../assets/images/Earth Horizon.jpg" alt="">
          <span class="title">{{it.title}}</span>
          <div class="text ellipsis-2">  
            {{it.desc}}
          </div>
          <div class="footer">
            <span class="fr">
              结束时间: {{it.endTime}}
            </span>
              昨天: {{it.time}}
          </div>
        </li>
      </ul>

      <div class="scroll-pull">
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
var getTaskList = (vm) => {
  // 获取任务列表
  utils.ajax({
    url: config.URL +'test.php',
    type: 'post',
    dataType: 'json',
    data: {},
    success (res) {
      // t.taskData = res.list;
    },
    error (xhr) {}
  }); 
}
var winScroll = (vm) => {
  var rootNode = document.getElementById('task-controller');
  var page = rootNode.querySelectorAll('.page')[0];
  var loadTxt = ['上拉加载更多', '数据加载中...', '已经到最后一条'];
  var isEnd = false;
  page.addEventListener('scroll', function (e) {
    var rootHeight = rootNode.offsetHeight;
    var scrollHeight = page.scrollHeight;
    var top = page.scrollTop;
    var pageSize = 0;
    if( scrollHeight > rootHeight && !vm.pullUpLoadStatus && !isEnd ) {
      console.log('rootHeight: ', rootHeight, 'scrollHeight: ', scrollHeight, 'top: ', top)
      if( (scrollHeight - top - 50) <= rootHeight ) {
        vm.pullUpLoadStatus = true;
        // vm.pullUpLoadTxt = loadTxt[1]
        // 获取任务列表
        utils.ajax({
          url: config.URL +'test.php',
          type: 'post',
          dataType: 'json',
          data: {},
          success (res) {
            vm.pullUpLoadStatus = false;
            if( !res.data ) {
              isEnd = true;
              vm.pullUpLoadTxt = loadTxt[2]
            } else {
              for(var i = 0, len = res.list.length; i < len; i++) {
                // vm.taskData.push(res.list[i])
              }
              
              isEnd = false;
              vm.pullUpLoadTxt = loadTxt[0]
            }
            console.log(res)
            // t.taskData = res.list;
          },
          error (xhr) {}
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
      taskData: [
        {
          id: 0,
          title: '任务标题1',
          desc: '任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务',
          endTime: '2016-01-01',
          time: '01-01',
          isGrab: false
        },
        {
          id: 1,
          title: '任务标题2',
          desc: '任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务',
          endTime: '2016-01-01',
          time: '01-01',
          isGrab: false
        },
        {
          id: 0,
          title: '任务标题1',
          desc: '任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务',
          endTime: '2016-01-01',
          time: '01-01',
          isGrab: false
        },
        {
          id: 1,
          title: '任务标题2',
          desc: '任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务',
          endTime: '2016-01-01',
          time: '01-01',
          isGrab: false
        },
        {
          id: 0,
          title: '任务标题1',
          desc: '任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务',
          endTime: '2016-01-01',
          time: '01-01',
          isGrab: false
        },
        {
          id: 1,
          title: '任务标题2',
          desc: '任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务',
          endTime: '2016-01-01',
          time: '01-01',
          isGrab: false
        },
        {
          id: 0,
          title: '任务标题1',
          desc: '任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务',
          endTime: '2016-01-01',
          time: '01-01',
          isGrab: false
        },
        {
          id: 1,
          title: '任务标题2',
          desc: '任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务',
          endTime: '2016-01-01',
          time: '01-01',
          isGrab: false
        }
      ],
      pts: this.$root.show
    }
  }
  ,events: {
    'child-show': function (num) {
      this.taskData[num].isGrab = true;
    }
  }
  ,components: { Art }
  ,ready () {
    var t = this;
    listTap(t);
    getTaskList(t);
    winScroll(t);
    t.$on('pageTab', function (num) {
      t.pts = num;
      getTaskList(t);
    });

    window.taskVM = t;
    
  }
}
</script>

