'use strict';
var obj = {
  back (vm) {
    var hBack = vm.$els.back;
    var rootVm = vm.$root;
    Hammer(hBack).on('tap', function () {
      if( obj.isTranslate(vm) ) {
        return;
      }
      if(hBack.disabled) return;
      rootVm.$el.classList.add('art')
      vm.show = false;
      vm.$parent.pts = vm.pts
    })
  },
  isTranslate (vm) { return vm.$root.isTranslate; },
  getUser (cb) {
    var t = this;
    console.log(config.UID)
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
