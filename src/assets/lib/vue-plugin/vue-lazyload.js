import Vue from 'vue';
exports.install = function (Vue, options = {}) {

  /* set the vue directive */
  options.error = '../../images/nopic.png';
  // options.loading = 'data:image/svg+xml;charset=utf-8,<svg class="svg-loading" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"40px\" height=\"40px\" viewBox=\"0 0 50 50\" style=\"enable-background:new 0 0 50 50;\" xml:space=\"preserve\"><path fill=\"#000\" d=\"M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z\"></path></svg>';

    options.loading = '../../images/loading.gif';


  Vue.directive('lazy', {
    init: {
      error: options.error,
      loading: options.loading,
      hasbind: false
    },
    img: [],
    /* set the img show with it state */
    show() {
      let winH = window.screen.availHeight * window.devicePixelRatio
      let top = document.documentElement.scrollTop || document.body.scrollTop

      for (let item of this.img) {
        //img in viewport and unload and less than 5 attempts
        if (item.y < (top + winH) && !item.loaded && item.testCount < 5) {
          item.testCount++;
          this.loadImageAsync(item.el, item.src).then((url) => {
            item.loaded = true
            item.el.setAttribute('src', item.src)
            item.el.removeAttribute('lazy')
          }, (error) => {
            item.el.setAttribute('lazy','error')
            item.el.setAttribute('src', this.init.error)
          })
        }
      }
    },
    /**
     * get the img load state
     * @param  {object} image's dom
     * @param  {string} image url
     * @return {Promise} image load
     */
    loadImageAsync(el, url) {
      el.setAttribute('src', this.init.loading)
      el.setAttribute('lazy', 'loading');
      // 
      // el.classList.add('vue-lazy-loadig');
      return new Promise(function(resolve, reject) {
        let image = new Image();
        image.src = url;

        image.onload = function() {
          resolve(url);
        };

        image.onerror = function() {
          reject(new Error('Could not load image at ' + url));
        };

      });
    },
    /**
     * get the dom coordinates
     * @param  {object} images
     * @return {object} coordinates
     */
    getPst(el) {
      let ua = navigator.userAgent.toLowerCase();
      let isOpera = (ua.indexOf('opera') != -1);
      let isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof  
      if (el.parentNode === null || el.style.display == 'none') {
        return false;
      }
      let parent = null;
      let pos = [];
      let box;
      if (el.getBoundingClientRect) // IE  
      {
        box = el.getBoundingClientRect();
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        return {
          x: box.left + scrollLeft,
          y: box.top + scrollTop
        };
      } else
      if (document.getBoxObjectFor) // gecko  
      {
        box = document.getBoxObjectFor(el);
        let borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
        let borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
        pos = [box.x - borderLeft, box.y - borderTop];
      } else // safari & opera  
      {
        pos = [el.offsetLeft, el.offsetTop];
        parent = el.offsetParent;
        if (parent != el) {
          while (parent) {
            pos[0] += parent.offsetLeft;
            pos[1] += parent.offsetTop;
            parent = parent.offsetParent;
          }
        }
        if (ua.indexOf('opera') != -1 ||
          (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
          pos[0] -= document.body.offsetLeft;
          pos[1] -= document.body.offsetTop;
        }
      }
      if (el.parentNode) {
        parent = el.parentNode;
      } else {
        parent = null;
      }
      while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors  
        pos[0] -= parent.scrollLeft;
        pos[1] -= parent.scrollTop;
        if (parent.parentNode) {
          parent = parent.parentNode;
        } else {
          parent = null
        }
      }
      return {
        x: pos[0],
        y: pos[1]
      };
    },
    bind: function(src) {
      let self = this
     if(!this.init.hasbind){
        this.init.hasbind = true
        window.addEventListener('scroll', function(){self.show()}, false);
      }
    },
    update: function(src) {
      this.el.setAttribute('src', this.init.loading)
      this.el.setAttribute('lazy', 'loading')
      this.vm.$nextTick(() => {
        let pos = this.getPst(this.el);
        this.img.push({
          testCount: 0,
          loaded: false,
          el: this.el,
          src: src,
          x: pos.x,
          y: pos.y
        })
        this.show()
      })

      this.el.addEventListener('click', () => {
        this.show()
      })
    },
    unbind: function() { 
      window.removeEventListener('scroll', function(){this.show()}, false);
    }

  })
}