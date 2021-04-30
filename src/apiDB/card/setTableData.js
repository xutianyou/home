import DB from '../indexedDB'

async function service (obj) {
  const userName = obj.userName;
  const data = obj.data;
	let msg = '', hasList, hasName = false, isAdd;
	let isOpen = await DB.openDB(userName, 'data', 1);

	if (isOpen) {
		// 获取账号列表信息
		hasList = await DB.getAllData(isOpen, 'data');

		if (hasList) {
			hasName = hasList.some(item => item.name === data.name);

			if (!hasName) {
				// data表添加新的数据表
				isAdd = await DB.setData(isOpen, 'data', {
          ...data,
          operationTime: new Date(),
          updateTime: new Date(),
          userName: obj.userName
        });

				DB.close(isOpen);
				isOpen = null;

				if (isAdd) {
					msg = '新增数据成功';
				} else {
					msg = '新增数据失败';
				}
			} else {
				msg = '数据表已存在';
			}
		} else {
			msg = '数据查询失败';
		}
	} else {
		msg = '数据库连接失败';
	}

	return new Promise((resolver, reject) => {
		if (isAdd) {
			resolver({
				code: '00',
				msg
			})
		} else if (hasName){
			resolver({
				code: '01',
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