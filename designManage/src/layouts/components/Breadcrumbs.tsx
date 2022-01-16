import React from 'react'
import { Breadcrumb } from 'antd'
import { Route } from 'antd/lib/breadcrumb/Breadcrumb'
import { Link } from 'umi'
import pathToRegexp from 'path-to-regexp'
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
  const hideBreadcrumbList = [
    '/dashboard',
    '/project/sca-detail/:projectId/comp/:id',
    '/project/sca-task/:projectId/scan/:taskId',
    '/project/sca-task/:projectId/add',
    '/project/sca-detail/:projectId/liscense/:id',
    '/config/baseline-security-req/detail/:id'
  ]
  let hideBc = false
  for (const item of hideBreadcrumbList) {
    if (location.pathname === item || pathToRegexp(item).test(location.pathname)) {
      hideBc = true
      break
    }
  }
  if (hideBc) return null

  const getBreadcrumb = (): Route[] => {
    const currentBreadcrumb: Route[] = []
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

  return (
    <div className={styles.breadcrumbsWrapper}>
      <span>当前位置：</span>
      <Breadcrumb
        className={styles.breadcrumbs}
        separator=">"
        itemRender={itemRender}
        routes={routes}
      />
    </div>
  )
}

export default Breadcrumbs
