import { IconType } from 'antd/lib/notification'
import request from '@/utils/request'
import apis from './api'

type ApiName = keyof typeof apis
type ApiResponse = Record<ApiName, (opt?: any) => Promise<any>>

const gen = (params: string) => {
  let url = params
  let method = 'GET'
  let errorType: IconType = 'error'

  const paramsArray = params.split(' ')
  if (paramsArray.length >= 2) {
    method = paramsArray[0]
    url = paramsArray[1]
  }
  if (paramsArray.length === 3) {
    errorType = (paramsArray[2] || 'error') as IconType
  }

  return (opt?: any) => {
    if (opt instanceof FormData) {
      return request(`/api${url}`, { method, body: opt }, errorType)
    }
    const options = method === 'GET' ? { params: opt } : { body: opt }
    return request(`/api${url}`, { method, ...options }, errorType)
  }
}

const APIFunction: ApiResponse = {} as ApiResponse
for (const key in apis) {
  if (apis.hasOwnProperty(key)) {
    APIFunction[key as ApiName] = gen(apis[key as ApiName])
  }
}

export default APIFunction
