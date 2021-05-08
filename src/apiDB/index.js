import login from './login/getLogin'
import register from './login/getRegister'
import tableData from './card/setTableData'
import getList from './card/getList'
import deleteTableData from './card/deleteTableData'

const arr = {
	login,
	register,
	tableData,
	getList,
	deleteTableData
}

function service (data) {
	// 去除URL‘/login’前面的‘/’，对应import login
	const _url = data.url.replace('/', '')
  return arr[_url](data.data)
}
export default service