import utils from 'utils';
import Vue from 'vue';
let defaultOps = {
  error: '../../images/nopic.png',
  loading: '../../images/loading.svg'
}
exports.install = function (Vue, options = defaultOps) {
  options.error = options.error || defaultOps.error
  options.loading = options.loading || defaultOps.loading
  /* set the vue directive */
  Vue.directive('isloaded', {
    init: {
      error: options.error,
      loading: options.loading,
      hasbind: false
    },
    update: function(src, old) {
      var t = this;
      (function (s,o){
        t.el.src = t.init.loading;
        if( !s  ) return;
        if( s == o ) return;
        var _this = t;
        if( !/^http\:\/\/[\w\W]+/i.test(src) ) {
          s = utils.getConfig().options.shareurl + '/' + s;
        }
        var nImage = new Image();
        nImage.onload = function () {
          if( _this.el && _this.el.nodeType == 1 && _this.el.tagName == 'IMG' ) {
            _this.el.src = s
          }
          
          // _this.el.loaded = true;
        }
        nImage.onerror = function () {
          if( _this.el && _this.el.nodeType == 1 && _this.el.tagName == 'IMG' ) {
            _this.el.src = _this.init.error
          }
        }
        nImage.src = s;
      })(src,old);
    }
  })
}