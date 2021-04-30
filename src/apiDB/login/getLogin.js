import DB from '../indexedDB'
import menu from '@/router/loginMenu'

async function service (data) {
  let msg = '', _index = -1, hasList;

  let isOpen = await DB.openDB("xtyDB", 'UserInformationTable', 1);

  if (isOpen) {
    hasList = await DB.getAllData(isOpen, 'UserInformationTable');

    if (hasList) {
      _index = hasList.findIndex(item => item.name === data.name && item.password === data.password );

      if (_index !== -1) {
        DB.close(isOpen);
        msg = '登录成功';
      } else {
        msg = '账号密码错误';
      }
    } else {
      msg = '数据查询失败';
    }
  } else {
    msg = '数据库连接失败';
  }

  return new Promise((resolver, reject) => {
    if (hasList) {
      if (_index !== -1) {
        resolver({
          code: '00',
          msg: msg,
          data: {
            token: Math.floor(Math.random() * 10000000000000000),
            userName: '许天佑',
            menu
          }
        })
      } else {
        resolver({
          code: '01',
          msg: msg
        })
      }
    } else {
      reject({
        code: '9999',
        msg: msg
      })
    }
  })
}
export default service