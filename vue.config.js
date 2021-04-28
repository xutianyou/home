const path = require('path')

module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  css: {
    loaderOptions: {
      // 全局less modifyVars
      // less: {
      //   lessOptions: {
      //     modifyVars: {
      //       colorTheme: '#4B8BEE'
      //     },
      //     javascriptEnabled: true,
      //   },
      // },
      postcss: {
        plugins: [
          // 设计稿宽度的1/10，一般为75
          require('postcss-px2rem')({remUnit: 136.8}),
        ]
      }
    }
  }
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/less/base.less'),
      ],
    })
}