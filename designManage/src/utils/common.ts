import { parse, stringify } from 'qs'
import {
  delay,
  downloadFileByFetch,
  downloadFiles,
  typeOf,
  isEmptyArray,
  objectToFormData,
  computedNextPage,
  pick,
  patterns as _patterns,
  omit,
  uuid
} from '@moresec/utils'
import md5 from 'md5'
import { message, notification } from 'antd'
import cookies from 'js-cookie'
import { Key } from 'react'

export const isEmpty = (val: any) => {
  return val === '' || val === void 0 || val === null || (Array.isArray(val) && val.length === 0)
}

const patterns = {
  ..._patterns,
  url: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
  host: /(?:[\w-]+\.)+(?:[\w-]+)(?::\d+)?/,
  hostWithSub: /(?:[\w-]+\.)+(?:[\w-]+)(?::\d+)?(.*)/
}

// 简单判断一个对象是都为空对象（忽略不可枚举属性）
export const isEmptyObject = (obj: object): boolean => {
  if (!obj) return true
  return obj && Object.keys(obj).length === 0
}
// 获取唯一key
export const getUid = () => new Date().valueOf() + Math.random().toString(36).slice(-6)
/**
 * 超过最大字符长度时截取前面部分并打上'...'，其中中文算两个字符长度
 * @param {string} str 需要截取的字符串
 * @param {number} maxLen 最大字符长度
 * @returns {string} 处理后的字符串
 */
export const clipString = (str: string, maxLen: number): string => {
  if (getStringLen(str) > maxLen) {
    let len = 0
    for (let i = 0; i < str.length; i++) {
      const char = str[i]
      len += isChineseChar(char) ? 2 : 1
      if (len >= maxLen) {
        return `${str.slice(0, i + 1)}...`
      }
    }
  }
  return str
}
// 获取 url 参数对象
export const getSearchParams = (search: string) => parse(search, { ignoreQueryPrefix: true })

// 获取请求参数的字符串形式
export const getSignString = (url: string, body: MS.objectAny) => {
  const keys = Object.keys(body).sort()
  const newArgs: MS.objectAny = {}
  let bodyString = url
  keys.forEach(key => {
    newArgs[key.toLowerCase()] = body[key]
  })
  for (const k in newArgs) {
    if (newArgs.hasOwnProperty(k)) {
      bodyString += `&${k}=${newArgs[k]}`
    }
  }

  return bodyString.substr(1)
}

// 根据接口请求body计算签名
export function getSign(url: string, body = {}) {
  return md5(getSignString(url, body))
}

export const handleExcelDownload = (url: string) => {
  downloadFileByFetch(url, {
    method: 'GET',
    headers: {
      Authorization: cookies.get('token') as string
    }
  })
}
/**
 * 根据一个既定数组内容的顺序排序源数组
 * 例：sortByArr(['a', 'b',],['b', 'a']) => ['b', 'a']
 * key 参数存在时，原数组应该为对象数组，按原数组中每一项的键为 key 的 value 排序
 * 例：sortByArr([{a: 'y'}, {a: 'x'}], ['x','y'], 'a') => [{a: 'x'}, {a: 'y'}]
 * @param sourceArr 需要排序的数组
 * @param orderArr 既定顺序的数组
 * @param key 原数组为对象数组时，按每个对象的这个 key 作排序
 * @returns 返回浅拷贝后排序的新数组
 */
export const sortByArr = <T>(sourceArr: T[] = [], orderArr: string[] = [], key?: string) => {
  const targetArr = [...sourceArr]
  const sortFunc = (prev: T, next: T) => {
    const prevValue = key ? (prev as any)[key] : prev
    const nextValue = key ? (next as any)[key] : next
    return orderArr.indexOf(prevValue) - orderArr.indexOf(nextValue)
  }
  return targetArr.sort(sortFunc)
}

/**
 * 判断一个字符是不是中文
 * @param {string} char 要检验的字符
 * @returns {boolean} 是否为中文
 */
const isChineseChar = (char: string): boolean => {
  const c = char.charCodeAt(0)
  return !((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f))
}

/**
 * 判断字符串长度，其中中文算两个字符长度
 * @param {string} str 字符串
 * @returns {number}
 */
export const getStringLen = (str: string): number => {
  let len = 0
  for (const char of str) {
    len += isChineseChar(char) ? 2 : 1
  }
  return len
}

interface IListResponse {
  total: number
  pageNo: number
  pageSize: number
  pages?: number
  list: any[]
}
interface IRequestPayload {
  page: number // 页码
  limit: number // 每页数量
}
/**
 * 从获取列表类的响应中获取存储到 redux 中数据
 * @param response 请求的响应
 */
export function getTableInfoFromResponse(
  response: IListResponse,
  requestPayload: IRequestPayload
): IMSTableData<any> {
  if (!response.list?.length) {
    return {
      list: [],
      pagination: { total: 0, current: 1, pageSize: requestPayload.limit }
    }
  }
  return {
    list: response.list,
    pagination: {
      total: response.total,
      current: requestPayload.page,
      pageSize: requestPayload.limit
    }
  }
}

/**
 * 校验上传文件的大小
 * @param file 待校验的文件
 * @param limitSize 限制的大小(单位:M)
 */
export const limitFileSizeCheck = (file: File, limitSize = 100) => {
  if (file.size / (1024 * 1024) > limitSize) {
    message.warning(`上传的文件大小不能超过${limitSize}M！`)
    return false
  }
  return true
}

const getFileExt = (fileName: string) => {
  const lastSpotIndex = fileName.lastIndexOf('.')
  if (lastSpotIndex === -1) return ''
  return fileName.slice(lastSpotIndex + 1) || ''
}
export const downloadFile = (addr: string) => {
  downloadFileByFetch(addr, {
    headers: {
      Authorization: cookies.get('token') as string
    }
  })
}

const ALLOW_UPLOAD_FILE_TYPES = [
  'txt',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'jpg',
  'jpeg',
  'png',
  'bmp',
  'pdf',
  'zip',
  'rar'
]

/**
 * 校验上传文件的类型是否符合要求
 * @param fileName 文件名
 */
export function uploadFileTypeCheck(
  fileName: string,
  withWarning = true,
  allowFileType = ALLOW_UPLOAD_FILE_TYPES
) {
  const ext = getFileExt(fileName)
  if (!allowFileType.includes(ext)) {
    if (withWarning) {
      message.warning(`上传的文件类型只能是 ${allowFileType.join(', ')}！`)
    }
    return false
  }
  return true
}

interface IDownloadParams {
  /** 请求url */
  url: string
  /** 请求参数 */
  requestParams?: any
  /** 自定义 fetch 请求参数 */
  customFetchParams?: Record<string, any>
  /** 请求方法(get, post) */
  requestMethod?: 'get' | 'post'
  /** 接口返回成功的回调 */
  requestSuccessCallback?: () => void
  /** 下载完成的回调 */
  downloadSuccessCallback?: () => void
  /** 请求成功状态码 */
  successCode?: number
  /** 失败回调 */
  failCallback?: (err: string) => void
}
export function enhancedGetDownLoadMethod({
  url,
  requestParams,
  customFetchParams,
  requestMethod = 'get',
  requestSuccessCallback,
  failCallback,
  downloadSuccessCallback,
  successCode = 2000
}: IDownloadParams) {
  let requestUrl = url
  let fetchParams: Record<string, any> = customFetchParams || {}

  if (!customFetchParams) {
    if (requestMethod === 'post') {
      fetchParams = {
        method: 'POST',
        body: JSON.stringify(requestParams),
        headers: {
          Authorization: cookies.get('token') as string,
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    } else if (requestMethod === 'get') {
      if (requestParams) requestUrl = `${url}?${stringify(requestParams)}`
      fetchParams = {
        headers: { Authorization: cookies.get('token') as string }
      }
    }
  }

  const wrapFailCallback = (err: { code: number; msg: string; message: string } | string) => {
    let errMessage = '下载出错！'
    let requestError = err
    try {
      requestError = JSON.parse(requestError as string)
      if (typeof requestError === 'object' && requestError.code !== successCode) {
        errMessage = requestError.msg || requestError.message || errMessage
      }
    } catch (error) {}
    notification.error({ message: ' 下载出错', description: errMessage })
    failCallback && failCallback(errMessage)
  }

  return () => {
    downloadFileByFetch(
      requestUrl,
      fetchParams,
      requestSuccessCallback,
      wrapFailCallback,
      downloadSuccessCallback
    )
  }
}

function isNumber(value: any): value is number {
  return typeOf(value) === 'number' && isFinite(value)
}

function getSum<T extends Record<string, any>>(arr: T[], key: keyof T): number
// eslint-disable-next-line no-redeclare
function getSum(arr: number[]): number
// eslint-disable-next-line no-redeclare
function getSum<T extends number | Record<string, any>>(
  arr: T extends number ? number[] : Record<string, any>[],
  key?: T extends number ? never : keyof T
): number {
  let sum = 0
  for (const item of arr) {
    if (isNumber(item)) {
      sum += item
    } else if (key) {
      sum += item[key]
    }
  }
  return sum
}

// refer: https://blog.csdn.net/weixin_43794749/article/details/103738173
export function getPercentValue(valueList: number[], idx: number, precision: number) {
  // 判断是否为空
  if (!valueList[idx]) {
    return 0
  }
  // 求和
  const sum = valueList.reduce(function (acc, val) {
    return acc + (isNaN(val) ? 0 : val)
  }, 0)
  if (sum === 0) {
    return 0
  }
  // 10的2次幂是100，用于计算精度。
  const digits = Math.pow(10, precision)
  // 扩大比例100，
  const votesPerQuota = valueList.map(function (val) {
    return ((isNaN(val) ? 0 : val) / sum) * digits * 100
  })
  // 总数，扩大比例意味的总数要扩大
  const targetSeats = digits * 100
  // 再向下取值，组成数组
  const seats = votesPerQuota.map(function (votes) {
    return Math.floor(votes)
  })
  // 再新计算合计，用于判断与总数量是否相同，相同则占比会100%
  let currentSum = seats.reduce(function (acc, val) {
    return acc + val
  }, 0)
  // 余数部分的数组：原先数组减去向下取值的数组，得到余数部分的数组
  const remainder = votesPerQuota.map(function (votes, index) {
    return votes - seats[index]
  })
  // 给最大最大的余额加1，凑个占比100%；
  while (currentSum < targetSeats) {
    //  找到下一个最大的余额，给其加1
    let max = Number.NEGATIVE_INFINITY
    let maxId = -1
    for (let i = 0, len = remainder.length; i < len; ++i) {
      if (remainder[i] > max) {
        max = remainder[i]
        maxId = i
      }
    }
    // 对最大项余额加1
    ++seats[maxId]
    // 已经增加最大余数加1，则下次判断就可以不需要再判断这个余额数。
    remainder[maxId] = 0
    // 总的也要加1，为了判断是否总数是否相同，跳出循环。
    ++currentSum
  }
  // 这时候的seats就会总数占比会100%
  return seats[idx] / digits
}

/**
 * 安全的 JSON.parse
 * @param data 给定的数据
 * @param defaultValue 默认值
 */
export function safeJsonParse(data: any, defaultValue: any = {}) {
  try {
    return JSON.parse(data) ?? defaultValue
  } catch (err) {
    return defaultValue
  }
}

/**
 * 计算 Form 表单 Item label 的宽度
 * @param count 表单 Item label 最多的字的个数
 */
export const computeFormLabelWidth = (count: number) => `${count * 14 + 20}px`

export {
  delay,
  downloadFiles,
  typeOf,
  isEmptyArray,
  objectToFormData,
  getSum,
  computedNextPage,
  pick,
  omit,
  patterns,
  uuid
}

export function showPercent(num: number, placeholder = '-') {
  return isNaN(num) ? placeholder : `${Number(num)}%`
}

type ICompareFn = (a: any, b: any) => number
/**
 * 获取 item 插入 array 的 index
 * @param array 已排序的数组
 * @param item 带插入的元素
 * @param compareFn 元素比较的方法
 */
export function getInsertIndex(array: any[], item: any, compareFn: ICompareFn) {
  let low = 0
  let high = array.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const compareResult = compareFn(item, array[mid])
    if (compareResult >= 0) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return low
}

export function getTreeExpandFirstKeys(tree: any) {
  const result: string[] = []
  const firstChild = tree[0]
  if (!firstChild) return result
  function saveKeys(_firstChild: any) {
    result.push(_firstChild.key)
  }
  saveKeys(firstChild)
  return result
}

// 安全需求 将对象数组转换成Number Table多选
export const handleStringArrToNumber = (selectedKeys: Key[]) => {
  return selectedKeys.map(item => Number(item))
}
