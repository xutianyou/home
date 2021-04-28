// 一些全局的config配置
const modeUrlObj = {
  // 生产环境
  'production': {
    baseURL: 'http://127.0.0.1:3000/',
    authBaseURL: ''
  },
  // 开发环境
  'development': {
    baseURL: '',
    authBaseURL: ''
  },
  // 测试环境
  'test': {
    baseURL: 'http://127.0.0.1:3000/',
    authBaseURL: ''
  }
}

export default modeUrlObj[process.env.NODE_ENV]