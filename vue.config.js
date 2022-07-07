const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://127.0.0.1:3000',
        pathRewrite: { ['^' + process.env.VUE_APP_BASE_API]: '' },
        changeOrigin: true
      }
    }
  },
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.module
      .rule('fonts')
      .test(/.(ttf|otf|eot|woff|woff2)$/)
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options = {
          // limit: 10000,
          name: '/static/fonts/[name].[ext]'
        }
        return options
      })
      .end()
  }
}

// if (isDev) {
//   console.log('now it is development')
//   configuration.devServer = {
//     proxy: {
//       '/api/*': {
//         target: 'http://127.0.0.1:3000',
//         pathRewrite: { '^/api': '' },
//         changeOrigin: true
//       }
//     }
//   }
// }
// module.exports = configuration
