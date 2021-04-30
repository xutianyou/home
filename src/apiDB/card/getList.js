import DB from '../indexedDB'

async function service (userName) {
	let msg = '', hasList, list = [];
	let isOpen = await DB.openDB(userName, 'data', 1);

	if (isOpen) {
		// 获取账号列表信息
		hasList = await DB.getAllData(isOpen, 'data');

		if (hasList) {
      list = hasList.map(item => {
        return {
          id: item.id,
          name: item.name,
          operationTime: item.operationTime,
          updateTime: item.updateTime,
          userName: item.userName,
          header: item.header,
          body: item.body
        }
      })
			msg = '获取成功';
      console.log('list', list)
		} else {
			msg = '数据查询失败';
		}
	} else {
		msg = '数据库连接失败';
	}

	return new Promise((resolver, reject) => {
		if (hasList) {
			resolver({
				code: '00',
        list,
				msg
			})
		} else {
			reject({
				code: '9999',
				msg
			})
		}
	})
}
export default service