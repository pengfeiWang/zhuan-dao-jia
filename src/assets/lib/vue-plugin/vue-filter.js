'use strict';
import utils from 'utils';
import Vue from 'vue';
var digitsRE = /(\d{3})(?=\d)/g;
var flag;

Vue.filter('subString', function ( string = '', length = 0, last = '...' ) {
  if( string.length <= length + 3 ) {
    return string;
  }
  string = string.substring(0, length);
  if( string >=  length + 3 ) {
    string = string.substring(0, length-3);
  }
  return string.substring(0, length) + last
});
Vue.filter('dateFormat', function ( time = '', format = 'yyyy-MM-dd', php = true ) {
  var y,m,d,h,s,t,isNum,splitArr;
  isNum = /^\d+$/.test(time);
  if( !isNum ) {
    t = time.replace(/(-|\s|\:)+/g, ',');
    if( t ) {
      splitArr = t.split(',');
      y = splitArr[0]||'00';
      m = splitArr[1]-1||'00';
      d = splitArr[2]||'00';
      h = splitArr[3]||'00';
      s = splitArr[4]||'00';
    }
    time = +new Date(y,m,d,h,s);
    php = false;
  }
  if(php && isNum) time = +(time) * 1000;
  return utils.dateFormat(time, format);
});
Vue.filter('currency', function (value, _currency, _isFloat) {
  value = parseFloat(value) / 100;
  if (!isFinite(value) || !value && value !== 0) return '';
  _currency = _currency != null ? _currency : '$';
  var stringified = Math.abs(value).toFixed(2);
  var _int = stringified.slice(0, -3);
  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
  var _float = !_isFloat ? stringified.slice(-3) : '';
  var sign = value < 0 ? '-' : '';
  return _currency + sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
});

