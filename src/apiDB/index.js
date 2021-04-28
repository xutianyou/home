import login from './login/getLogin'
import register from './login/getRegister'

const arr = {
	login,
	register
}

function service (data) {
	// 去除URL‘/login’前面的‘/’，对应import login
	const _url = data.url.replace('/', '')
  return arr[_url](data.data)
}
export default service