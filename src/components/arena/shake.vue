<template>
<!-- 竞技场 -->
<div class="pages-controller" v-show="show" transition="art">
  <div class="gol-header" style="opacity:1">
    <div class="h-back" v-el:back data-article="article"><span class="icon-arrow-left2"></span>后退</div>
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
      <div style="position:absolute; bottom:20px; left:0; right:0; text-align:center;">摇一摇, 要出好运气</div>
    </div>
  </div>
</div>
</template>

<script>
import golMdule from '../../module/index';
var { back } = golMdule;
var isBind = false, isShake, numShake = 0, maxShake = 10;
var startShake = (vm) => {
  if(!isBind){
    utils.dialog('5-2');
  }
  
  var shakeImg = utils.getId('shakeImg');
  var SHAKE_THRESHOLD = 5000;
  var last_update = 0;
  var animSpe = 25;
  var x, y, z, lastX = 0, lastY = 0, lastZ = 0;
  var count = 0;
  var audio = document.getElementsByTagName('audio')[ 0 ];
    function deviceMotionHandler(eventData) {
      var acceleration =eventData.accelerationIncludingGravity;
      var curTime = new Date().getTime();
      // 摇一摇次数已满
      if( numShake >= maxShake ) {
        utils.dialog('超出限制')
        return;
      }
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

          audio.play();

          // 是否请求数据中
          if( !isShake ) {
            // last_update = 0
            // 摇摇次数限制次数在
            // 请求数据成功是才能递增 
            isShake = true
            utils.ajax({
              url: config.URL + 'test.php',
              dataType: 'json',
              type: 'post',
              data: {a:1},
              success ( req ) {
                isShake = false;
                // numShake++;
              },
              error ( xhr ) {
                isShake = false;
                utils.dialog('没摇到')
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
export default {
  data () {
    return {
      show: false,
      pts: this.$parent.pts
    }
  },
  ready () {
    var t = this;
    back(t);
    
    t.$on('arenaTap', function (num) {
      var bol = (num == 2)
      if( bol ) {
        t.pts = t.$parent.pts
        t.$parent.pts = false
        isShake, numShake = 0, maxShake = 10;
        setTimeout(function(){startShake(t)},300);
      }
      //0 骰子, 1 其他, 2 摇一摇, 3 翻牌 
      t.show = bol;
    });
  }
}
</script>
