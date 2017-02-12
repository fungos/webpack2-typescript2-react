const _ = require('lodash');
const path = require('path')
const config = require('./config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const modules = resolve('node_modules');

const VENDOR_LIBS = _.keys(require('../package.json').dependencies);

module.exports = {
  entry: {
    app: './src/main.tsx',
    vendor: VENDOR_LIBS
  },
  output: {
    filename: '[name].js',
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: true
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.tsx?$/,
        use: [
            'react-hot-loader',
            'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      }
    ]
  }
}