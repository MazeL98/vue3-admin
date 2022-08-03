const path = require('path')
// 分析打包后各个包大小
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// gzip压缩配置
const compressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

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
  configureWebpack: {
    name: 'MazeL-Admin',
    optimization: {
      splitChunks: {
        minSize: 20000,
        cacheGroups: {
          // 业务代码公共部分
          // 第三方库
          libs: {
            test: /[\\/]node_modules[\\/]/,
            name: 'chunk-libs',
            priority: 10,
            chunks: 'initial'
          },
          elementPlus: {
            test: /[\\/]node_modules[\\/]element-plus/,
            name: 'chunk-elementPlus',
            priority: 20,
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new compressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      })
    ],
    externals: {
      vue: 'Vue',
      'element-plus': 'ElementPlus'
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
          name: '/static/fonts/[name].[ext]'
        }
        return options
      })
      .end()
  }
}
