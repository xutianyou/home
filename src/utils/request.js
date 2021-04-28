// import cookies from 'vue-cookies'
import axios from 'axios'
import config from '../config/index' // 路径配置
import { Message } from 'element-ui'

// 创建axios 实例
const service = axios.create({
  baseURL: config.baseURL, // api的base_url
  timeout: 10000 // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
  configData => {
    // 这里可以自定义一些config 配置
    // const token = cookies.get('token');
    return configData
  },
  error => {
    //  这里处理一些请求出错的情况

    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const { status, data } = response
    console.log('接口正常', data)
    // 这里处理一些response 正常放回时的逻辑
    if (status === 200) {
      if (data && data.code !== '00') {
        Message({
          message: data.msg,
          type: 'error'
        });
      }
      return data;
    }
  },
  error => {
    // 这里处理一些response 出错时的逻辑
    console.log('接口异常')
    return Promise.reject(error)
  }
)

export default service