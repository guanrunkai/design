declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.jpg'
declare module '*.svg'

// 扩展 Location ，支持 query 字段
interface MSLocation extends Location {
  query: any
}

interface IPagination {
  total: number
  current: number
  pageSize: number
  pageSizeOptions?: string[]
}

declare namespace MS {
  type pagination = IPagination
  // 针对一类常量对象，允许任意的 key
  type objectAny = Record<string, any>
}

interface Window {
  hasError: boolean
}
