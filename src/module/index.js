'use strict';
var obj = {
  back (vm, param, cb) {
    var hBack = vm.$els.back;
    var rootVm = vm.$root;
    Hammer(hBack).on('tap', function () {
      if( obj.isTranslate(vm) ) {
        return;
      }
      if(hBack.disabled) return;

      rootVm.$el.classList.add('art');
      if(param){
        rootVm.$el.classList.add('detail');
      }
      if(cb){
        cb();
      }
      vm.show = false;
      vm.$parent[param?param:'pts'] = vm.pts
    })
  },
  isTranslate (vm) { return vm.$root.isTranslate; },
  getUser (cb) {
    var t = this;
    utils.ajax({
      url: config.URL +'test.php',
      type: 'post',
      dataType: 'json',
      data: {},
      success (res) {
        if(cb){
          cb(res)
        }
      },
      error (xhr) {}
    });   
  },
  getBet (cb) {
    var t = this;
    utils.ajax({
      url: config.URL +'test.php',
      type: 'post',
      dataType: 'json',
      data: {},
      success (res) {
        if(cb){
          cb(res)
        }
      },
      error (xhr) {}
    });     
  }
}
export default obj
