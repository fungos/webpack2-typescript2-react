const _ = require('lodash');
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json', '.css', '.jsx'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]'
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "sass-loader"
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
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