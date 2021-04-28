// import request from '@/utils/request'
import request from '@/apiDB/index'

export function getLogin (data)  {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getRegister (data)  {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function getUserInfo () {
  return request({
    url: '/api/userinfo',
    method: 'get'
  })
}