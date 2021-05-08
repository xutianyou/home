import DB from '../indexedDB'

async function service (data) {
  const {userName, id} = data;
	let msg = '', isDel;
	let isOpen = await DB.openDB(userName, 'data', 1);

	if (isOpen) {
		// 获取账号列表信息
		isDel = await DB.delData(isOpen, 'data', id);

		if (isDel) {
			msg = '删除成功';
		} else {
			msg = '删除失败';
		}
	} else {
		msg = '数据库连接失败';
	}
  DB.close(isOpen);
	return new Promise((resolver, reject) => {
		if (isDel) {
			resolver({
				code: '00',
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