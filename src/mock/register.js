import Mock from 'mockjs';

function register (option) {
  const source = JSON.parse(option.body)

  if (source) {
		// 新增用户
    return {
			code: '00',
			msg: '成功'
    }
  } else {
    return {
      code: '01',
      msg: `失败！`
    }
  }
}

Mock.mock('/register', 'post', register);

Mock.setup({
  timeout: 500
})