var path = require('path')
var config = require('./build/config')
var utils = require('./build/utils')
var projectRoot = path.resolve(__dirname, './')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var SvgStore = require('webpack-svgstore-plugin');

function utilfy(){
  return new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      hoist_funs : false,  // hoist function declarations
      hoist_vars : true
    },
    mangle: {
      // except:['require', 'exports', 'module', 'window']
    },
    preserveComments: 'some'
  }) 
}
module.exports = {
  watch: true,
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js' 
  },
  // devtool: '#eval-source-map',
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'utils': path.resolve(__dirname, 'src/assets/lib/utils'),
      'hammer': path.resolve(__dirname, 'src/assets/lib/hammer/hammer'),
      'images': path.resolve(__dirname, 'src/assets/images'),
      'components': path.resolve(__dirname, 'src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      // {
      //   test: /\.mp3$/,
      //   loader: 'url',
      //   query: {
      //     // limit: 10000,
      //     name: utils.assetsPath('images/[name].[hash:7].[ext]')
      //   }
      // },
      // { test: /\.svg(\?.*)?$/, loader: 'inline' },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline',
      //   query: {
      //     limit: 10000,
      //     name: utils.assetsPath('images/[name].[hash:7].[ext]')
      //   }
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.scss$/,
        // include: projectRoot,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders()
  },
  plugins: [
    config.dev ? function () {}: utilfy(),
    new webpack.DefinePlugin({
      'process.env': config.dev ? '"development"' : '"production"'
    }),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module, count) {
    //     return (
    //       module.resource &&
    //       module.resource.indexOf(
    //         path.join(__dirname, './node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vue',
    //   name: 'vue',
    //   chunks: ['app']
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'commons',
    //   filename:'commons.js',
    //   chunks: ['utils', 'hammer']
    // }),
    new HtmlWebpackPlugin({
      filename: 'game.html',
      template: 'game.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: false
    })
  ]
}
