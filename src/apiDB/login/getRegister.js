import DB from '../indexedDB'

async function service (data) {
	let msg = '', hasList, hasName = false, isAdd, setUserData;
	let isOpen = await DB.openDB("xtyDB", 'UserInformationTable', 1);

	if (isOpen) {
		// 获取账号列表信息
		hasList = await DB.getAllData(isOpen, 'UserInformationTable');

		if (hasList) {
			hasName = hasList.some(item => item.name === data.name);

			if (!hasName) {
				// UserInformationTable表添加新用户登录账号密码
				isAdd = await DB.setData(isOpen, 'UserInformationTable', { 
					name: data.name,
					password: data.password
				});

				if (isAdd) {
					// 为新用户新建独立资料库，库名为用户账号
					let isOpenUser = await DB.openDB(data.name, [{
						name: 'user',
						data: {
							keyPath: 'id',
							autoIncrement: true
						}
					},{
						name: 'data',
						data: {
							keyPath: 'id',
							autoIncrement: true
						}
					}], 1);

					if (isOpenUser) {
						// user表添加新用户所有基本信息
						setUserData = await DB.setData(isOpenUser, 'user', { 
							name: data.name,
							password: data.password,
							theme: 'blue',
							img: ''
						});
					} else {
						console.log('新增用户个人信息库失败');
					}
				}

				DB.close(isOpen);
				isOpen = null;

				if (isAdd && setUserData) {
					msg = '新增用户成功';
				} else {
					msg = '新增数据插入失败';
				}
			} else {
				msg = '用户名已存在';
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