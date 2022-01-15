import fetch from 'isomorphic-fetch'
import { notification } from 'antd'
import { IconType } from 'antd/lib/notification'
import { history } from 'umi'
import { stringify } from 'qs'
import pathToRegexp, { Key } from 'path-to-regexp'
import cookies from 'js-cookie'
import { typeOf, isEmptyObject, getSign } from '@/utils/common'
import { DSMP_LOGIN_TOKEN } from '@/utils/constant'

const __DEV__ = process.env.API_ENV === 'dev'
const MOCK_URL = 'http://192.168.180.58/mock/145'

interface IApiResponse {
  code: number
  message: string
  data?: any
}

const codeMessage: MS.objectAny = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限',
  403: '用户得到授权，但是访问是被禁止的',
  404: '请求地址不存在',
  406: '请求的格式不可得',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

const progressURL: MS.objectAny = {}

export const logout = () => {
  localStorage.removeItem(DSMP_LOGIN_TOKEN)
  cookies.remove('token')
  history.push('/login')
}

const checkStatus = (response: Response) => {
  const { status, statusText } = response
  if (status >= 200 && status < 300) {
    return response
  }

  const errorText = codeMessage[status] || statusText
  if (status === 401) {
    logout()
  } else {
    if (status !== 410) {
      notification.error({
        message: `请求错误 ${status}`,
        description: errorText
      })
    }
  }
  const error = new Error(errorText)
  error.name = `${status} \n ${response}`
  throw error
}

/**
 * 检查 api 接口的返回结果。
 * 若返回成功（ok: true），根据 data 的值，包装一层后返回 data；
 * 若不成功（ok: false），根据请求里的 errorType 字段，给出对应的错误类型提示，并返回 null；
 * 若 data 值为 “未登录”，直接退出登录。
 * @param errorType 错误类型
 * @param response api返回的数据
 */
const checkCode = (errorType: IconType = 'error', response: IApiResponse) => {
  const { code, message, data } = response
  if (code === 2000) {
    return typeOf(data) === 'null' || data === void 0 || data === '' ? true : data
  }

  // TOKEN 过期
  if (code === 2102) {
    logout()
    return null
  }

  // 2103 用户被锁定
  if (code === 2103) {
    logout()
    return null
  }

  // 2105: 无权限
  if (code === 2105) {
    logout()
    return null
  }

  // 许可证过期
  if (code === 4202) {
    history.replace('/expire')
    return null
  }

  // TOKEN错误
  if (code === 2107 || code === 2111 || code === 401 || message === '当前用户未登录') {
    logout()
    return null
  }
  // 一些提示性错误
  if (code === 3517) {
    notification.warning({
      message: '提示',
      description: message || data
    })
    return null
  }

  notification[errorType]({
    message: '提示',
    description: message || data
  })
  return null
}

/**
 * 请求信息
 * @param  {string} 请求接口地址
 * @param  {RequestInit} options 请求体
 * @param  {string} 处理错误的类型 error warning info
 * @return Promise<any> 包括 data 或者 err 的对象
 */
const request = (url: string, options: RequestInit, errorType: IconType = 'error') => {
  const newOptions: any = {
    credentials: 'include',
    ...options
  }
  const { method = 'GET' } = options
  let compileUrl = ''
  const sign = getSign(url, newOptions.body)
  const controller = new AbortController()
  const { signal } = controller

  if (['POST', 'PUT', 'DELETE'].includes(method)) {
    const match = pathToRegexp.parse(url)
    const currentController = progressURL[`${sign}`]
    if (currentController) {
      currentController.abort()
    }
    progressURL[`${sign}`] = controller

    if (newOptions.body instanceof FormData) {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers
      }
      for (const item of match) {
        if (typeOf(item) === 'object' && (<Key>item).name) {
          const val = newOptions.body.get((<Key>item).name)
          compileUrl += `/${val}`
        } else {
          compileUrl += item
        }
      }
    } else {
      compileUrl = pathToRegexp.compile(url)(newOptions.body)
      for (const item of match) {
        if (typeOf(item) === 'object' && (<Key>item).name) {
          delete newOptions.body[(<Key>item).name]
        }
      }
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers
      }
      newOptions.body = options.headers ? newOptions.body : JSON.stringify(newOptions.body)
    }
  } else if (method === 'GET') {
    const { params = {} } = newOptions
    const shallowData = { ...params }
    const match = pathToRegexp.parse(url)
    // query参数中 : 导致解析失败
    const [host, ...query] = url.split('?')
    compileUrl =
      pathToRegexp.compile(host)(params) + (query.length !== 0 ? `?${query.join('?')}` : '')
    for (const item of match) {
      if (typeOf(item) === 'object' && (<Key>item).name) {
        delete shallowData[(<Key>item).name]
      }
    }
    // shallowData.timestamp = new Date().getTime()

    compileUrl = isEmptyObject(shallowData) ? compileUrl : `${compileUrl}?${stringify(shallowData)}`
  }

  newOptions.headers = newOptions.headers || {}
  if (cookies.get('token')) {
    newOptions.headers.Authorization = cookies.get('token')
  }
  newOptions.signal = signal

  return fetch(compileUrl, newOptions)
    .then(res => {
      if (__DEV__ && res.status === 404) {
        return fetch(`${MOCK_URL}${compileUrl}`)
      }
      return res
    })
    .then(response => {
      // 请求成功清除控制器对象
      delete progressURL[`${sign}`]
      return checkStatus(response)
    })
    .then(response => {
      if (response!.status === 204) {
        return response!.text()
      }
      return response!.json()
    })
    .then(checkCode.bind(null, errorType))
    .catch(e => {
      if (e.name === 'TypeError') {
        notification.error({
          message: '出错了',
          description: '接口出现未知错误，请联系管理员！'
        })
      }
      return Promise.reject(e)
    })
}

export default request
