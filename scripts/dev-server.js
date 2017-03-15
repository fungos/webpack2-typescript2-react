require('./check-versions')()

var config = require('./config').dev
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
console.log('The compiler is starting a new compilation...')
  hotMiddleware.publish({ action: 'reload' })
})

// proxy api requests
Object.keys(config.proxyTable).forEach(function (context) {
  var options = config.proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.assetsPublicPath, config.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + config.port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(config.port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  if (config.autoOpenBrowser) {
    opn(uri)
  }
})
