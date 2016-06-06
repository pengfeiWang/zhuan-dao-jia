'use strict';
const gulp = require('gulp');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
// const through = require('through2');
// const sass = require('gulp-sass');
// const htmlmin = require('gulp-htmlmin');
// const autoprefixer = require('gulp-autoprefixer');
// const minifycss = require('gulp-minify-css');
const changed = require('gulp-changed');
const gulpSequence = require('gulp-sequence');
const del = require('del');
const webpack = require('gulp-webpack');
const config = require('./build/config');
const cfg = require('./webpack.config.js') 
const colors = require('colors') 
// const cfg = require('config/index.js');
const options = {
  removeComments: true,
  //清除HTML注释
  // collapseWhitespace: true,//压缩HTML
  collapseBooleanAttributes: false,
  //省略布尔属性的值 <input checked="true"/> ==> <input />
  removeEmptyAttributes: true,
  //删除所有空格作属性值 <input id="" /> ==> <input />
  removeScriptTypeAttributes: false,
  //删除<script>的type="text/javascript"
  removeStyleLinkTypeAttributes: false,
  //删除<style>和<link>的type="text/css"
  minifyJS: false,//压缩页面JS
  minifyCSS: false//压缩页面CSS
};

const dist = 'dist';
colors.setTheme(config.colorsThemes)

function modify(modifier) {
  return through.obj(function(file, encoding, done) {
    var content = modifier(String(file.contents));
    file.contents = new Buffer(content);
    this.push(file);
    done();
  });
}
function wrapDefine(data) {
  var sTart = 'define(function ( require, exports, module ) {\n';
  var sEnd = '\n});'
  if(/(exports\[\'default\'\]|exports\.default)/.test(data)) {
    sEnd = '\nmodule.exports = exports.default;\n});'
  }
  return sTart + data + sEnd;
}
const srcDft = [
  'src/*.js',
  'src/**/*.js',
  'src/**/*.vue',

  'src/assets/lib*/utils.js',
  'src/assets/lib*/vue-plugin/*.js',
  '!src/assets/lib*/seajs/*',
  '!src/assets/lib*/vue/*',
  '!src/assets/lib*/touch/*',
  '!src/assets/lib*/hammer/*'
];
var imgDef = [
'src/*.mp3','src/**/*.mp3','src/*.svg','src/**/*.svg', 'src/*.jpg', 'src/*.png', 'src/*.gif', 'src/**/*.jpg', 'src/**/*.png', 'src/**/*.gif'
]
var fontDef = [
  'src/*.ttf', 'src/**/*.ttf','src/font',
]
const copyDef = [
  'src/*.css',
  'src/**/*.css',
  'src/assets/font-demo/*',
  'src/assets/lib*/*',
  'src/assets/lib*/**/*',
  '!src/assets/',
  '!src/assets/lib*/utils.js',
  '!src/assets/lib*/vue-plugin/*.js',
].concat(imgDef).concat(fontDef);
const htmlDef = ['src/*.html','src/**/*.html'];
const scssDef = ['src/*.scss','src/**/*.scss','!src/_*.scss'];

const jsMin = [dist+'/*.js', dist+'/**/*.js'];
const cssMin = [dist+'/*.css', dist+'/**/*.css', '!'+dist+'/**/*.min.css']
const htmlMin = [dist+'/*.html', dist+'/**/*.html']

// 拷贝文件
gulp.task('copyfiles', function (){
  console.log('///**********************'.bold)
  console.log('         拷贝文件'.help.bold)
  console.log('**********************///'.bold)
  gulp.src(copyDef, {base: 'src/assets/'})
  .pipe(changed(dist))
  .pipe(gulp.dest(dist+'/static/'));
});
// 编译js
gulp.task('buildjs', function () {
  console.log('///**********************'.bold)
  console.log('         开始编译'.green.bold)
  console.log('**********************///'.bold)
  return gulp.src(srcDft)
    .pipe(changed(dist))
    .pipe(webpack( cfg ))
    .on('error', function(err) {
      console.log('buildjs Error!', err.message);
      this.end();
    })
    .pipe(gulp.dest(dist))
});
gulp.task('scss', function (){
    gulp.src('src/**/*.scss')
    .pipe(changed(dist, {extension: '.scss'}))
    .pipe(sass({outputStyle: 'expanded', sourceComments: true}).on('error', sass.logError))
    .on('error', function(err) {
      console.log('scss Error!', err.message);
      this.end();
    })
    .pipe(autoprefixer({ browsers: ['> 1%'], cascade: false }))
    .pipe(gulp.dest(dist));
})
// 监听任务 运行语句 gulp watch
gulp.task('watchs',  function (){
  gulp.watch(srcDft, ['buildjs']);
  gulp.watch('src/**/*.scss', ['scss'])
  gulp.watch(copyDef,['copyfiles'])
});
// 删除
gulp.task('delete', function (cb){
  console.log('///**********************'.bold)
  console.log('         删除文件'.error.bold)
  console.log('**********************///'.bold)
  return del('dist/*', cb)
})
// 注册缺省任务
gulp.task('default', ['delete'], gulpSequence('copyfiles', 'buildjs', 'watchs'));