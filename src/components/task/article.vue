<template>
<div  class="pages-controller" v-show="show" transition="art">
  <div class="gol-header">
    <div class="h-back" v-el:back data-article="article"><span class="icon-arrow-left2"></span>返回</div>
    <h1 class="h-title" >
      任务
    </h1>
  </div> 
  <div class="gol-wrapper doc-header">
    <div class="page">
      <div class="article-inner">
        <div class="task-detail">
          <div class="img-box"></div>
          <div class="bottom">
            <ul class="task-list" v-show="!taskDetail.missonOverFlg" transition="shareShow">
              <li style="background:#F1F1F1">
                <img v-bind:src="taskDetail.bigPicUrl" alt="">
                <span class="title">{{taskDetail.missonTitle}}</span>
                <div class="text ellipsis-2">  
                  {{taskDetail.desc}}
                </div>
                <div class="footer">
                  <span class="fr">
                    结束时间: {{taskDetail.endTime}}
                  </span>
                    <!-- 昨天: --> {{taskDetail.time}}
                </div>
              </li>
            </ul>
            <div class="share-box" v-show="!!taskDetail.missonOverFlg" transition="shareShow">
              <p class="txt-green txt-green tac padding-20">快快分享给小伙伴   大家一起赚到家</p>
              <!-- <embed src="../../assets/images/share.svg" alt="" style="width:100%;"  type="image/svg+xml" > -->
              <Share></Share>
            </div>
          </div>
          <div class="footer">
            <button type="button" v-el:rush v-bind:disabled="!!taskDetail.missonOverFlg">立即抢贡献值</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>

import Share from './share';
import golMdule from '../../module/index';


var 
  doc = document,
  {back} = golMdule;
var rush = (vm) => {
  var button = vm.$els.rush;
  Hammer(button).on('tap', function (ev) {
    if( vm.$root.isTranslate ) {
      return;
    }
    var reqObj = utils.extend({}, config.reqParam);
    reqObj.adId = vm.taskDetail.adId
    utils.ajax({
      url: config.URL + 'doShareMisson.do',
      type: 'post',
      dataType: 'json',
      data: reqObj,
      success (res) {
        if(res.rescode == 100) {
          vm.taskDetail.missonOverFlg = true;
          vm.$dispatch('child-show', vm.parentIdx);

        }
        
      },
      error (xhr) {
        utils.dialog('没抢到')
      }
    });
    
  })
} 
export default {
  data () {
    return {
      taskDetail: {
        missonOverFlg: 0
      },
      missonOverFlg: 0,
      parentIdx: '',
      show: false,
      pts: this.$parent.pts
    }
  },
  methods: {
    isBol () {
      this.missonOverFlg = !!(+this.taskDetail.missonOverFlg)
    }
  }
  ,components: {Share}
  ,ready () {
    var t = this;
    rush(t);
    back(t);
    t.$on('setData', function (data, idx) {
      for(var i in data){
        if( i == 'missonOverFlg') {
          data[i] = +data[i]
        }
      }
      t.taskDetail = data;
      console.log(t.taskDetail)
      t.parentIdx = idx;
      t.pts = t.$parent.pts
      t.$parent.pts = false
      t.show = true;
    });
    window.articleVm = t
  }
}
</script>