import 'moment/locale/zh-cn'
import 'antd/dist/antd.less'

import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { connect, useDispatch } from 'dva'
import cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { MSNoData } from '@/components'

import type { IConnectProps, IConnectState } from '@/models/connect'

import Loading from '@/pages/Loading'

import BasicHeader from './components/BasicHeader'
import Breadcrumbs from './components/Breadcrumbs'
import ErrorFallback from './components/ErrorFallback'
import styles from './styles/BasicLayout.less'

const { Content } = Layout

interface IProps extends React.Props<any>, IConnectProps {}

const BasicLayout: React.FC<IProps> = props => {
  const { children, app, user } = props
  const { collapsed } = app
  // const {
  //   userInfo: { username, roleIds }
  // } = user
  const dispatch = useDispatch()
  const isInLoginLayout = ['/login', '/404', '/500'].some(
    item => location.pathname.indexOf(item) === 0
  )

  const token = cookies.get('token')

  // useEffect(() => {
  //   if (token && !username) {
  //     getUserInfo(dispatch)
  //   }
  // }, [token, username, dispatch])

  // useEffect(() => {
  //   if (token && username) {
  //     dispatch({
  //       type: QUERY_UNDO_COUNT
  //     })
  //   }
  // }, [token, username, location.pathname])

  // 针对登录页面，单独设置布局
  if (isInLoginLayout) {
    return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
  }

  // if (!roleIds.length) return <Loading />
  const username = '123'
  return (
    <ConfigProvider locale={zhCN} renderEmpty={() => <MSNoData />}>
      <Layout className={styles.horizontal_layout}>
        <BasicHeader collapsed={collapsed} username={username} undoCount={1000} />
        <Content className={styles.horizontal_content}>
          <Breadcrumbs />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className={styles.horizontal_main}>{children}</div>
          </ErrorBoundary>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default connect(({ app, user }: IConnectState) => ({
  app,
  user
}))(BasicLayout)
