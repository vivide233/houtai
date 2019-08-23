const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const pathObj = require('./path');
console.log('==================>', pathObj.common + '/styles')
module.exports = {
  entry: pathObj.app,
  output: {
    filename: 'bundle.js',
    path: pathObj.dist
  },
  resolve: {
    alias: {
      'assets': pathObj.assets,
      '@': pathObj.common,
      '@styles': pathObj.common + '/styles',
      '@components': pathObj.common + '/components'
    },
    extensions: [".js", ".json", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
          test: /\.(png|svg|jpg|gif|jpeg)$/,
          use:[{
            loader: 'url-loader',
            options:{
              // limit: 10000,
              // outputPath: '/images'
            }
          }],
      },
      {
        test:/\.(woff|woff2|eot|ttf|otf)$/,
        use:[{
          loader: 'url-loader',
          options:{
            // limit: 10000,
            // outputPath: '/fonts'
          }
        }],
    },
    ]
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: pathObj.html
    })
  ]
};