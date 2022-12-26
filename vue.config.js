module.exports = {
  devServer: {
    host: 'localhost',
    port: 31943,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:19992',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      }
    },
    disableHostCheck: true
  },
  transpileDependencies: [
    'vuetify'
  ]
}
