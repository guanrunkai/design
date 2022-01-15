// 以空格划分数据。第一个是请求类型，默认GET
// 第二个是请求地址；第三个是处理错误的方式：error | info | warning，默认error
// 当写第三个数据时，请求类型必填。 如 'GET /log/download info'

const apis = {
  // auth
  authCode: '/auth/verifycode',
  authLogin: 'POST /login',
  authLogout: 'POST /logout',

  // account
  accountInfo: '/user/profile'
}

export default apis
