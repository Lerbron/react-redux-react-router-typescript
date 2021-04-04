const proxySetting = {
  '/toutiao/': {
      target: 'http://v.juhe.cn/',
      changeOrigin: true,
  },
}

module.exports = proxySetting