webpackHotUpdate(1,{

/***/ 104:
/***/ function(module, exports) {

	module.exports = "\n<!-- 竞技场 -->\n<div class=\"pages-controller\" v-show=\"show\" transition=\"art\">\n  <div class=\"gol-header\" style=\"opacity:1\">\n    <div class=\"h-back\" v-el:back data-article=\"article\"><span class=\"icon-arrow-left2\"></span>后退</div>\n    <h1 class=\"h-title\" >\n      定时红包抢现金\n    </h1>\n  </div>  \n  <div class=\"gol-wrapper doc-header\">\n    <div class=\"page\" >\n      <div class=\"article-inner\" style=\"padding-top:20px;\">\n          <div class=\"timinggrab\" id=\"timinggrab\">\n            <div class=\"list\" v-for=\"it in timinggrabData\"  data-idx=\"{{$index}}\">\n              <div class=\"inner\">\n                <div class=\"flip\" v-bind:class=\"{'in':!it.overFlg, 'out':it.overFlg}\">\n                  <div class=\"icon\">\n                    {{{$index | renderSrc }}}\n                  </div>\n                  <div class=\"desc\" >\n                    <p v-for=\"sit in it.desc\">{{sit}}</p>\n                  </div> \n                </div>\n                <div class=\"flip\" v-bind:class=\"{'out':it.overFlg,'in':!it.overFlg}\">\n                  <div class=\"icon\">\n                    {{{$index | renderSrc }}}\n                  </div>\n                  <div class=\"desc\" >\n                    <p v-for=\"sit in it.desc\">{{sit}}</p>\n                  </div> \n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"padding-20 txt-red\">\n            <p class=\"fz16 padding-bottom-5\">规则说明：</p>\n            <p class=\"fz12 padding-bottom-5\">1、定时红包有4波，包括起床红包、午休红包、晚餐红包和睡前红包。</p>\n            <p class=\"fz12 padding-bottom-5\">2、定时红包发放数量有限，抢完为止。</p>\n            <p class=\"fz12 padding-bottom-5\">3、定时红包对所有会员开放。</p>\n          </div>\n      </div>    \n    </div>\n  </div>\n</div>\n";

/***/ }

})