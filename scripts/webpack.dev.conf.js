const webpack = require('webpack')
const path = require('path')
const config = require('./config').dev
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./scripts/dev-client.js'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  devtool: config.sourceMap,
  output: {
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath
  },
  devServer: {
    hot: true,
    contentBase: config.assetsRoot,
    publicPath: config.assetsPublicPath
  },
  plugins: [
    new webpack.DefinePlugin(config.defines),
    //new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.index,
      template: config.template,
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
