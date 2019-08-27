const merge = require('webpack-merge');
const common = require('./webpack.base.conf.js');
const pathObj = require('./path');
const history = require('connect-history-api-fallback');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: '/'
  },
  devServer: {
    open: true,
    contentBase: pathObj.dist,
    proxy: {
      "/ospmgr/*": {
        target: "https://osp-di1.sit.cmrh.com",
        changeOrigin: true,
        secure: false
      }
    },

    before(app){
      app.use(history({ from: /\/*/, to: 'index.html'}))
    }
  }
})
