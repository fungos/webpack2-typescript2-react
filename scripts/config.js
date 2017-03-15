var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let VERSION = '0.1.0'

module.exports = {
  prod: {
    index: 'index.html',
    template: 'src/index.html',
    assetsRoot: resolve('/build/prod'),
    assetsSubDirectory: './static',
    assetsPublicPath: '/',
    sourceMap: false,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // set to true to open a build report at the end of compilation
    bundleAnalyzerReport: false,
    defines: {
      FRONTEND_VERSION: JSON.stringify(VERSION),
      SERVER_ADDRESS: JSON.stringify(""),
      RELEASE: true,
      DEBUG: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }
  },
  dev: {
    index: 'index.html',
    template: 'src/index.html',
    port: 8080,
    // automatically open browser when building dev, if not set will be false
    autoOpenBrowser: true,
    assetsRoot: resolve('/build/dev'),
    assetsSubDirectory: './static',
    assetsPublicPath: '/',
    // cheap-module-eval-source-map is faster for development
    sourceMap: 'cheap-module-eval-source-map', // 'source-map'
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    defines: {
      SERVER_ADDRESS: JSON.stringify("http://localhost:8118"),
      FRONTEND_VERSION: JSON.stringify('dev ' + VERSION),
      RELEASE: false,
      DEBUG: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('dev')
      }
    }
  }
}
