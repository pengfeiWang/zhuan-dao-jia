<template>
<!-- 0 首页, 1 任务, 2 竞技场 , 3 签到, 5 暂定详情-->
<div id="page-wrapper" class="page-wrapper">
  <Index></Index>
  <!-- <Task></Task> -->
  <Sign></Sign>
  <Arena></Arena>
  <!-- <Money></Money> -->
  <audio src="./static/images/5018.mp3">您的浏览器不支持 audio 标签。</audio>
  <div id="mask" class="mask"></div>
  <div id="dialog" class="dialog"></div>  
</div>
</template>

<script>

import Index from './components/index/index'
import Task from './components/task/index'
import Arena from './components/arena/index'
import Sign from './components/sign/index'
import Money from './components/money/index'
export default {
  components: {
    Index,/*Task,*/ Arena, Sign /*,Money*/ 
  }
}
</script>
<style src="./assets/css/style.scss" lang="scss"></style>
<style>
  .st0{fill:rgba(0,0,0,0.5);}
  .active{fill:rgba(194,13,35,0.4);}
    /* 必需 */
  .expand-transition,
  .art-transition,
  .shareShow-transition {
    transition: all .6s cubic-bezier(0.18, 0.79, 0.43, 0.99);
  }
  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .expand-enter,
  .art-enter,
  .detail .art-enter{
    transform: translateX(100%)
  }
  .shareShow-enter{
    opacity: 0;
  }
  .expand-leave {
    opacity: 0;
    transform: translateX(-30%)
  }
  .shareShow-leave{
    opacity: 0;
  }
  .back .expand-enter,
  .art .expand-enter{
    transform: translateX(-30%)
  }
  .back .expand-leave {
    transform: translateX(100%)
  }
  .art-leave{
    opacity: 0;
    transform: translateX(100%)
  }
  .detail .art-enter{
    transform: translateX(100%)
  }
  .detail .art-leave{
    opacity: 0;
    transform: translateX(-30%)
  }
  .detail.art .art-enter{
    transform: translateX(-30%)
  }
  .detail.art .art-leave{
    opacity: 0;
    transform: translateX(100%)
  }

</style>