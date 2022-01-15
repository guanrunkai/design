import React from 'react'
import { Breadcrumb } from 'antd'
import { Route } from 'antd/lib/breadcrumb/Breadcrumb'
import { Link } from 'umi'
import { menuRoutesData, IRoute } from 'config/routes.config'
import styles from '../styles/Breadcrumbs.less'

const itemRender = (route: Route, _params: any, routes: Route[], paths: string[]) => {
  const last = routes.indexOf(route) === routes.length - 1
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
  )
}

const Breadcrumbs = () => {
  // 排除特殊页面，不用显示面包屑
  const hideBreadcrumbList = ['/page-that-hide-bc', '/page-that-hide-bc2']
  const hideBc = hideBreadcrumbList.includes(location.pathname)
  if (hideBc) return null

  const getBreadcrumb = (): Route[] => {
    const currentBreadcrumb: Route[] = [{ path: '/', breadcrumbName: '首页' }]
    const breadcrumbs = location.pathname.split('/').filter(item => item !== '/' && !!item)

    const getItem = (index: number, routeData: IRoute[]) => {
      if (index > breadcrumbs.length - 1) return
      for (const { breadcrumb = '', title = '', routes } of routeData) {
        if (breadcrumb === `/${breadcrumbs[index]}`) {
          currentBreadcrumb.push({
            path: breadcrumb,
            breadcrumbName: title
          })
          if (routes) {
            getItem(index + 1, routes)
          }
          break
        }
      }
    }
    getItem(0, menuRoutesData)
    return currentBreadcrumb
  }
  const routes = getBreadcrumb()

  return <Breadcrumb className={styles.breadcrumbs} itemRender={itemRender} routes={routes} />
}

export default Breadcrumbs
