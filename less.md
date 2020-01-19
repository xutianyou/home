@vuecli 

内部使用less
1: vue ui 安装 less、less-loader

.vue 文件使用 <style lang="less"></style>

外部使用less--全局引入
1: vue ui 安装 style-resources-loader
2: 根目录新增vue.config.js文件
方法1：
const path = require('path')
module.exports = {
    pluginOptions: {
	    'style-resources-loader': {
	    	preProcessor: 'less',
	    	patterns: [
	      		path.resolve(__dirname, '@/styles/bass.less')
	    	]
	    }
  	}
}

方法2：
const path = require('path')
module.exports = {
    chainWebpack: config => {
    	const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    	types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  	}
}
function addStyleResource (rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        // 需要全局导入的less
        path.resolve(__dirname, './src/styles/base.less')
      ]
    })
}

3. 在main文件中引入 import '@/styles/bass.less'
4: .vue 文件使用 
<style lang="less" scoped>
	@import '~@/styles/home.less';
</style>
