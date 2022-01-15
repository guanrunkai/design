import React from 'react'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
// https://ant-design.gitee.io/docs/react/faq-cn#%E6%88%91%E7%9A%84%E7%BB%84%E4%BB%B6%E9%BB%98%E8%AE%A4%E8%AF%AD%E8%A8%80%E6%98%AF%E8%8B%B1%E6%96%87%E7%9A%84%EF%BC%9F%E5%A6%82%E4%BD%95%E5%88%87%E5%9B%9E%E4%B8%AD%E6%96%87%E7%9A%84%E3%80%82
import 'moment/locale/zh-cn'
import { connect } from 'dva'
import { IConnectState, IConnectProps } from '@/models/connect'
import { ErrorBoundary } from 'react-error-boundary'
import BasicHeader from './components/BasicHeader'
import BasicSider from './components/BasicSider'
import Breadcrumbs from './components/Breadcrumbs'
import styles from './styles/BasicLayout.less'
import { MSNoData } from '@/components'
import ErrorFallback from './components/ErrorFallback'

const { Content } = Layout

interface IProps extends React.Props<any>, IConnectProps {}

const BasicLayout: React.FC<IProps> = props => {
  const { children, app, user } = props
  const { collapsed, layout } = app
  const { user_name, role } = user
  const isInLoginLayout = ['/login', '/404', '/500'].some(
    item => location.pathname.indexOf(item) === 0
  )

  // 针对登录页面，单独设置布局
  if (isInLoginLayout) {
    return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
  }

  return (
    <ConfigProvider locale={zhCN} renderEmpty={() => <MSNoData />}>
      {layout !== 'horizontal' ? (
        <Layout>
          <BasicHeader mode={layout} collapsed={collapsed} username={user_name} />
          <Layout>
            <BasicSider pathname={window.location.pathname} collapsed={collapsed} role={role} />
            <Layout
              className={styles.main_container_wrapper}
              style={{ marginLeft: collapsed ? '60px' : '160px' }}
            >
              <Breadcrumbs />
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <div className={styles.main_container}>{children}</div>
              </ErrorBoundary>
            </Layout>
          </Layout>
        </Layout>
      ) : (
        <Layout className={styles.horizontal_layout}>
          <BasicHeader mode={layout} collapsed={collapsed} username={user_name} role={role} />
          <Content className={styles.horizontal_content}>
            <Breadcrumbs />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <div className={styles.horizontal_main}>{children}</div>
            </ErrorBoundary>
          </Content>
        </Layout>
      )}
    </ConfigProvider>
  )
}

export default connect(({ app, user }: IConnectState) => ({
  app,
  user
}))(BasicLayout)
