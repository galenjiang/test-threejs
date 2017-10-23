/* eslint-disable */
const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  context: path.resolve(__dirname, '../src'),

  entry: {
    main: isDevelopment
      ? ['../build/dev-client', './app']
      : ['./app']
  },

  output: {
    path: path.resolve(__dirname, isDevelopment ? '../server' : '../dist'),
    publicPath: '/',                                                               // default ''
    filename: isDevelopment ? '[name].js' :'[name]-[hash:8].js',
    // chunkFilename: isServer ? '[id].chunk.js' : '[name].js'
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      // { enforce: "pre", test: /\.ts$/, loader: "source-map-loader" },
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
        // use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              // name: '[name].[ext]?[hash]'
            }
          }
        ]
      },

      // {
      //   test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      //   loader: 'file',
      //   query: {
      //     limit: 10000,
      //     name: '[name].[ext]'
      //   }
      // },

      {
        test: /\.css$/,
        use: isDevelopment ? ['style-loader', 'css-loader','postcss-loader'] :
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader']
          })
      },

    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),   // built in config
        // NODE_ENV_BUILD: JSON.stringify(env),
      }
    }),
    new ExtractTextPlugin({ filename: '[name]-[hash].css' }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity,
    //   filename: isServer ? 'vendor.js' : 'vendor-[hash].js'
    // }),
  ],

  devtool: isDevelopment ? 'cheap-module-source-map' :'eval-source-map'
}
