/* eslint-disable */
const baseConfig = require('./webpack.base.conf.js')
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * Webpack Plugins
 */
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig, {

  plugins: [

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),

    // new webpack.NoEmitOnErrorsPlugin(),

    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../src/index.test.html'),
    // }),

  ]
})
// node api
// const compiler = webpack(buildConfig, (err, stats) => {
//   if (err) throw err;
//   process.stdout.write(`${stats.toString({
//     colors: true,
//     modules: true,
//     children: true,
//     chunks: true,
//     chunkModules: true,
//   })}\n`);
// });
