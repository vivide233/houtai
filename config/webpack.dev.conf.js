 const merge = require('webpack-merge');
 const common = require('./webpack.base.conf.js');
 const pathObj = require('./path');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'source-map',
   devServer: {
     open: true,
     contentBase: pathObj.dist
   }
 });
