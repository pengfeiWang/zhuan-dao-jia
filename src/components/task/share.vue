<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 2354 523" style="enable-background:new 0 0 2354 523;" xml:space="preserve">
    <g>
        <image style="overflow:visible;" width="645" height="119" xlink:href="./static/images/share.png" transform="matrix(3.4382 0 0 3.4382 77 55.9264)">
        </image>
    </g>
    <g v-el:share-box>
      <rect class="st0" width="441.7" height="523"/>
      <rect x="441.7" class="st0" width="471" height="523"/>
      <rect x="912.8" class="st0" width="489" height="523"/>
      <rect x="1401.8" class="st0" width="474" height="523"/>
      <rect x="1875.9" class="st0" width="478.1" height="523"/>
    </g>
  </svg>
</template>
<script>
var share = (vm) => {
  var rectPt = vm.$els.shareBox;
  var rect = rectPt.children;
  var hd = (node) => {
    Hammer(node).on('tap', function (ev) {
      console.log('ajax处理')
    });
  }
  for( var i = 0, len = rect.length; i < len; i++ ) {
    hd(rect[ i ])
  }
} 
export default {
  data () {
    return {
    }
  },
  ready () {
    var t = this;
    var rootVm = t.$root;
    var rectPt = t.$els.shareBox;
    share(t)
  }
}
</script>