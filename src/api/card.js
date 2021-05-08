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
export function deleteTableData (data)  {
  return request({
    url: '/deleteTableData',
    method: 'post',
    data
  })
}