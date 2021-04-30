import request from '@/apiDB/index'

export function setTableData (data)  {
  return request({
    url: '/tableData',
    method: 'post',
    data
  })
}

export function getList (data)  {
  return request({
    url: '/getList',
    method: 'post',
    data
  })
}