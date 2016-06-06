function callClientFunction(funName, args) {
  var jobj = {"function": funName, "args": args};
  var uAgent = navigator.userAgent;
  var funStr = JSON.stringify(jobj);
  var URL;
  funStr = funStr.replace(/[\u4e00-\u9fa5]/g, function (w) {
    return "\\u" + w.charCodeAt(0).toString(16);
  });

  if( uAgent.match(/(iPhone\sOS)/) ) {
    funStr = encodeURIComponent('function:'+funStr);
    URL = "nativeApi://" + funStr;
  } else {
    funStr = encodeURIComponent(funStr);
    URL = "nativeApi://function:" + funStr;
  }
  window.location.href = URL;
};