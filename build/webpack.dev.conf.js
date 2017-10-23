/* eslint-disable */
const baseConfig = require('./webpack.base.conf.js')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const chalk = require('chalk')

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),

    new webpack.HotModuleReplacementPlugin(),

    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'defer'
    // }),

    // new webpack.NamedModulesPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: true
    // }),
  ],
  devServer: {
    stats: {
      colors: true,
    },
    contentBase: path.join(__dirname, '../server'),
    historyApiFallback: true,
    hot: true,
    publicPath: '/',
  }
})

// // node api:
// new WebpackDevServer(webpack(devConfig), {
//   stats: {
//     colors: true,
//   },
//   // publicPath: '',

//   contentBase: path.join(__dirname, '../server'),
//   hot: true,
//   historyApiFallback: true,
//   // inline: true,    // cli only TODO: is it work ok?
// }).listen(8080, '0.0.0.0', (err) => {
//   if (err) throw err;
//   console.log(chalk.yellow('[webpack-dev-server]', 'http://localhost:8080/'));
// });
