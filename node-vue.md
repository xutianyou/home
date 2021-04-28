# 安装nodejs

npm install cnpm -g --registry=https://registry.npm.taobao.org
输入命令检查：cnpm -v

清除 cache 
npm cache clean --force
设置镜像（不使用淘宝镜像）
npm set registry https://registry.npmjs.org/


安装vue-cli: cnpm install -g @vue/cli

npm uninstall vue-cli -g 卸载vue-cli

npm install -g @vue/cli 安装vue-cli

vue --version 验证

手动安装 vue-cli-plugin-axios


# 初始化项目--新建api文件夹，

## config文件夹--配置环境变量--搭配xios--新建index.js
```
// 一些全局的config配置
const modeUrlObj = {
  // 生产环境
  'production': {
    baseURL: 'http://xxx:9091/pro/',
    authBaseURL: ''
  },
  // 开发环境
  'development': {
    baseURL: 'http://xxxx:9091/dev/',
    authBaseURL: ''
  },
  // 测试环境
  'test': {
    baseURL: 'http://xxxx:9091/test/',
    authBaseURL: ''
  }
}
export default modeUrlObj[process.env.NODE_ENV]
```

```
// 更改package.json文件
"scripts": {
    "dev": "vue-cli-service serve",
    "test": "vue-cli-service serve --mode test",
    "build": "vue-cli-service build",
    "build:test": "vue-cli-service build --mode test",
    "lint": "vue-cli-service lint"
  }
```

## utils文件夹--配置axios--新建request.js
```
import axios from 'axios'
import config from '../config/index' // 路径配置

// 创建axios 实例
const service = axios.create({
    baseURL: config.baseURL, // api的base_url
    timeout: 10000 // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
    config => {
        // 这里可以自定义一些config 配置

        return config
    },
    error => {
        //  这里处理一些请求出错的情况

        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        // 这里处理一些response 正常放回时的逻辑

        return res
    },
    error => {
        // 这里处理一些response 出错时的逻辑

        return Promise.reject(error)
    }
)

export default service
```
directive文件夹--存放指令

# 使用less 注意‘--save-dev’

## npm i less-loader less --save-dev 
## npm i style-resources-loader --save-dev 
```
const path = require('path')

module.exports = {
    chainWebpack: config => {
      const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
      types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    }
    //  pluginOptions: {
    //   'style-resources-loader': {
    //    preProcessor: 'less',
    //    patterns: [
    //        path.resolve(__dirname, './src/css/bass.less')
    //    ]
    //   }
    // }
}
function addStyleResource (rule) {
    rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                // 需要全局导入的less
                path.resolve(__dirname, './src/css/base.less')
            ]
        })
}
```