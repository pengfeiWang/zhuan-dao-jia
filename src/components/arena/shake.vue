<template>
<!-- 竞技场 -->
<div class="pages-controller" v-show="show" transition="art">
  <div class="gol-header" style="opacity:1">
    <div class="h-back" v-el:back data-article="article"><span class="icon-arrow-left2"></span>返回</div>
    <h1 class="h-title" >
      摇一摇
    </h1>
  </div>  
  <div class="gol-wrapper doc-header">
    <div class="page" style="overflow-y: hidden;">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 750 1294" style="enable-background:new 0 0 750 1294;position: absolute;top: 0;left: 0;bottom: 0;right: 0;margin: auto;">
        <style type="text/css">
          @-webkit-keyframes byi{
              0%{-webkit-transform: rotateZ(-20deg);transform: rotateZ(-40deg);}
              100%{-webkit-transform: rotateZ(10deg);transform: rotateZ(20deg);}
          } 
          .images-animate {
            -webkit-transform: rotateZ(0);
            transform: rotateZ(0);
            -webkit-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
          }
          .y1y{
            -webkit-animation:byi .5s ease-out backwards;
            animation:byi .5s ease-out backwards;
          }
        </style>  
        <image style="overflow:visible;" width="750" height="1294" xlink:href="./static/images/y-y.jpg" transform="matrix(1 0 0 1 0 0)">
        </image>
        <image class="images-animate" id="shakeImg" style="overflow:visible;" x="200" y="620" width="287" height="255"  xlink:href="./static/images/y-phone.png" transform="matrix(1 0 0 1 231.5 599.7857)">
      </svg>
      <div style="position:absolute; bottom:30px; left:0; right:0; text-align:center; color:#6eb92b; font-size:16px;">摇一摇, 摇出好运气</div>
    </div>
  </div>
</div>
</template>

<script>
import golMdule from '../../module/index';
var { back } = golMdule;
var isBind = false, isShake, numShake = 0, maxShake = 10;
var deviceMotionHandler
var startShake = (vm) => {
  isShake = true;
  if(!isBind){
    utils.dialog('5-2', function (){
      isShake = false;
    });
  }
  
  var shakeImg = utils.getId('shakeImg');
  var SHAKE_THRESHOLD = 5000;
  var last_update = 0;
  var animSpe = 25;
  var x, y, z, lastX = 0, lastY = 0, lastZ = 0;
  var count = 0;
  var audio = document.getElementsByTagName('audio')[ 0 ];

  var outFalse = function () {
    // setTimeout(function (){
      isShake = false;
    // }, 500);
  }
    deviceMotionHandler = function deviceMotionHandler(eventData) {
      var acceleration = eventData.accelerationIncludingGravity;
      var curTime = new Date().getTime();
      if( isShake ) return;
      if ((curTime-last_update) > 30) {

        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;

        if(Math.abs(x-lastX) > animSpe || Math.abs(y-lastY) > animSpe) { 
          
          if( !shakeImg.classList.contains('y1y') ) {
            shakeImg.setAttribute('class', 'images-animate y1y');
            setTimeout(function (){
              shakeImg.setAttribute('class', 'images-animate');
            },300);
          }

          // 摇一摇次数已满
          if( vm.numShake == 0 ) {

            // window.removeEventListener('devicemotion',deviceMotionHandler);
            isShake = true;
            utils.dialog('每天最多只能摇5次')
            return;
          }

          audio.play();
          // 是否请求数据中
          if( !isShake ) {
            // last_update = 0
            // 摇摇次数限制次数在
            // 请求数据成功是才能递增 
            isShake = true
            utils.ajax({
              url: config.URL + 'doShake.do',
              dataType: 'json',
              type: 'post',
              data: window.config.reqParam,
              success (res) {
                vm.numShake = res.data.availableCount
                if(res.rescode == 100) {

                  utils.dialog(
                    '恭喜本次赚取<span style="color:red; font-weight:bold;">' + 
                    (res.data.earnDevoteValue || 0) + '</span>点贡献值', 
                    outFalse)
                } else {
                  utils.dialog(res.message,outFalse)
                }
              },
              error ( xhr ) {
                utils.dialog('可惜~~~什么也没摇到',outFalse)
              }
            });
          }
        }
        // var speed = Math.abs(x +y + z - lastX - lastY - lastZ) / diffTime * 10000;
        // if (speed > SHAKE_THRESHOLD) {
        // }
        lastX = x;
        lastY = y;
        lastZ = z;
      }
    }
  if (window.DeviceMotionEvent && !isBind) {
    isBind = true
    window.addEventListener('devicemotion',deviceMotionHandler,false);
  } else {
    console.log('不支持?');
  }  
}
var init = (vm) => {
  utils.ajax({
    url: config.URL + 'initShake.do',
    type: 'post',
    dataType: 'json',
    data: window.config.reqParam,
    success (res) {
      
      if( res.rescode == 100 ) {
        vm.numShake = res.data.availableCount
        if( res.data.availableCount > 0 ) {
          setTimeout(function(){
            startShake(vm)
          },300);
        } else {
          utils.dialog('每天最多只能摇5次')
        }
      } else {
        utils.dialog(res.message);
      }
      
    },
    error (xhr) {
      utils.dialog('暂无数据')
    }
  });
}
export default {
  data () {
    return {
      show: false,
      numShake: 0,
      pts: this.$parent.pts
    }
  },
  watch: {
    numShake ( v ) {
      if( +v && deviceMotionHandler ){
        window.removeEventListener('devicemotion',deviceMotionHandler);
        window.addEventListener('devicemotion',deviceMotionHandler,false);
      } else if( !(+v) && deviceMotionHandler ) {
        window.removeEventListener('devicemotion',deviceMotionHandler);
      }
    }
  },
  ready () {
    var t = this;
    back(t, null, function () {
      window.removeEventListener('devicemotion',deviceMotionHandler);
    });
    t.$on('arenaTap', function (num) {
      var bol = (num == 2)
      if( bol ) {
        t.pts = t.$parent.pts
        t.$parent.pts = false;
        t.numShake = 0;
        maxShake = 10;
        init(t);
        
      }
      //0 骰子, 1 其他, 2 摇一摇, 3 翻牌 
      t.show = bol;
    });
  }
}
</script>
