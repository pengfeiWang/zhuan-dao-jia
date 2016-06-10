// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true
  },
  dev: false,
  //bold  
  //italic  
  //underline  
  //inverse  
  //yellow  
  //cyan  
  //white  
  //magenta  
  //green  
  //red  
  //grey  
  //blue  
  //rainbow  
  //zebra  
  //random    
  colorsThemes:{  
    silly: 'rainbow',  
    input: 'grey',  
    verbose: 'cyan',  
    prompt: 'red',  
    info: 'green',  
    data: 'blue',  
    help: 'cyan',  
    warn: 'yellow',  
    debug: 'magenta',  
    error: 'red'  
  }
}
