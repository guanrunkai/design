import { useState, useCallback, useMemo } from 'react'
import { history } from 'umi'
import { getSearchParams } from '@/utils/common'

interface IQuery {
  page?: number
}

const keyWhiteList = ['pattern']

/**
 * 对 query 对象进行处理，
 * 因为从 window.location 中拿下来的都是 string 类型，
 * 所以需要转换为相应的类型再 setState
 * @param query 需要进行处理的 query 对象
 * @returns 处理后的 query 对象
 */
function format(query: any) {
  const keys = Object.keys(query)
  for (const key of keys) {
    const value = query[key]
    //  白名单中不做处理
    if (keyWhiteList.includes(key)) continue
    //  转换 number 类型                                    // --- 添加条件 （此处情况是设置初始Query为 ''时） Number('') = 0
    if (query.hasOwnProperty(key) && !isNaN(Number(value)) && value !== '') {
      query[key] = Number(value)
    }
    //  转换 boolean 类型
    if (query.hasOwnProperty(key) && value === 'true') {
      query[key] = true
    }
    if (query.hasOwnProperty(key) && value === 'false') {
      query[key] = false
    }
  }
  return query
}

/**
 * query 参数记忆Hook，将 query 参数添加到 location 后面，并在刷新页面时自动解析 location 的 query
 * @param initQuery 初始化 query 参数
 */
function useQueryMemo<T extends IQuery>(
  initQuery: T,
  rememberOnLocation = true
): [T, (query?: T) => void] {
  const { search, pathname } = location

  const searchQuery: T = useMemo(() => getSearchParams(search), [search])

  //  location.query 取得所有参数皆为 string 类型，应当将 number 类型转换回来
  const formatedQuery = useMemo(() => format(searchQuery), [searchQuery])

  const [query, setQuery] = useState<T>({ ...initQuery, ...formatedQuery })

  const updateQuery = useCallback(
    (curQuery = query) => {
      const newQuery = {
        ...query,
        ...curQuery,

        page: curQuery.page || 1
      }
      if (rememberOnLocation) history.replace({ pathname, query: newQuery })
      setQuery(newQuery)
    },
    [query, rememberOnLocation, pathname]
  )

  return [query, updateQuery]
}
export default useQueryMemo
