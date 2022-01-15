import { useState, useEffect } from 'react'
import { useDispatch, history } from 'umi'

interface IQuery {
  page?: number
  limit?: number
}

/**
 * query 参数记忆Hook，将 query 参数添加到 location 后面，并在刷新页面时自动解析 location 的 query
 * @param initQuery       初始化 query 参数
 * @param effectType            fetch 地址
 * @param effectCallback  fetch 请求后的回调
 */
function useQueryAndFetch<T extends IQuery>(
  initQuery: T,
  effectType: string,
  effectCallback?: () => void
) {
  const dispatch = useDispatch()
  const [query, setQuery] = useState<T>({
    ...initQuery,
    page: Number(initQuery.page) || 1,
    limit: Number(initQuery.limit) || 10
  })
  const [isFirstQuery, setIsFirstQuery] = useState<boolean>(true)

  const updateQuery = (queryParams: Partial<T> = {}) => {
    const newQueryParams = {
      ...query,
      ...queryParams,
      page: queryParams.page || 1
    }
    setQuery(newQueryParams)
  }

  useEffect(() => {
    if (JSON.stringify(initQuery) !== JSON.stringify(query) || !isFirstQuery) {
      const nextUrlParams: MS.objectAny = JSON.parse(JSON.stringify(query))
      for (const k in query) {
        if (typeof query[k] === 'object') {
          nextUrlParams[k] = JSON.stringify(query[k])
        }
      }
      history.replace({ pathname: location.pathname, query: nextUrlParams })
    }
    setIsFirstQuery(false)

    dispatch({ type: effectType, payload: query })
    effectCallback && effectCallback()
  }, [query])

  return {
    query,
    updateQueryAndFetch: updateQuery
  }
}

export default useQueryAndFetch
