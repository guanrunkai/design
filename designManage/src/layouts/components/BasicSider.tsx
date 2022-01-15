import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import Icon from '@ant-design/icons'
import { connect, Link } from 'umi'
import MSIcon from '@/components/MSIcon'
import { menuRoutesData, IRoute } from 'config/routes.config'
import styles from '../styles/BasicSider.less'

import DashboardSvg from '@/assets/icons/menu/dashboard.svg'
import DashboardActiveSvg from '@/assets/icons/menu/dashboard_active.svg'
import AccountSvg from '@/assets/icons/menu/account.svg'
import AccountActiveSvg from '@/assets/icons/menu/account_active.svg'
import HelpSvg from '@/assets/icons/menu/help.svg'
import HelpActiveSvg from '@/assets/icons/menu/help_active.svg'
import { IConnectState } from '@/models/connect'
import { useMenuStatus } from '@/hooks'

interface IProps extends ReturnType<typeof mapStateToProps> {
  collapsed: boolean
  role: number
  pathname: string
}

const { Sider } = Layout
const { SubMenu, Item } = Menu

const mapNameToIcon: MS.objectAny = {
  dashboard: DashboardSvg,
  dashboard_active: DashboardActiveSvg,
  account: AccountSvg,
  account_active: AccountActiveSvg,
  rule: HelpSvg,
  rule_active: HelpActiveSvg,
  help: HelpSvg,
  help_active: HelpActiveSvg
}

// 获取当前路由的父级。比如：'/threats/events' -> 'threats'
const getRouteFather = (pathname: string) => pathname.split('/')[1]

// 根据路由配置项，动态生成菜单
const getMenusNode = (pathname: string, role: number) =>
  menuRoutesData.map((routeItem: IRoute) => {
    const { active, routes, exclude, title: t, path, noShowInMenu } = routeItem

    if (noShowInMenu) return null

    const activeMenuName = active === getRouteFather(pathname) ? `${active}_active` : active
    const icon = MSIcon(mapNameToIcon[activeMenuName || 'dashboard'], {
      width: '14px',
      height: '14px'
    })

    if (routes) {
      if (exclude && exclude.includes(role)) return null
      return (
        <SubMenu
          key={active}
          title={
            <span>
              <Icon component={icon} />
              <span>{t}</span>
            </span>
          }
        >
          {routes.map(
            (item: IRoute) =>
              !item.noShowInMenu &&
              !(item.exclude && item.exclude.includes(role)) && (
                <Item key={item.path}>
                  <Link to={item.path!} replace={window.location.pathname === item.path}>
                    {item.title}
                  </Link>
                </Item>
              )
          )}
        </SubMenu>
      )
    } else {
      if (exclude && exclude.includes(role)) return null
      return (
        <Item key={path}>
          <Link to={path!} replace={window.location.pathname === path}>
            <Icon component={icon} />
            <span>{t}</span>
          </Link>
        </Item>
      )
    }
  })

const BasicSider: React.FC<IProps> = props => {
  const { pathname, collapsed, role, app } = props
  const { theme, layout } = app
  const [fold, setFold] = useState<boolean>(collapsed)
  const { rootMenuKeys, openKeys, selectedKeys, handleOpenKeys } = useMenuStatus(menuRoutesData)

  useEffect(() => {
    setFold(collapsed)
  }, [collapsed])

  const handleOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1) || ''
    if (rootMenuKeys.indexOf(latestOpenKey) === -1) {
      handleOpenKeys(keys)
    } else {
      handleOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  const menuSider = (
    <Menu
      mode={layout === 'horizontal' ? 'horizontal' : 'inline'}
      theme={theme}
      inlineIndent={20}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={handleOpenChange}
    >
      {getMenusNode(pathname, role || 0)}
    </Menu>
  )

  return (
    <>
      {layout !== 'horizontal' ? (
        <Sider width={160} collapsedWidth={60} collapsed={fold} className={styles.vertical_sider}>
          {menuSider}
        </Sider>
      ) : (
        menuSider
      )}
    </>
  )
}

const mapStateToProps = ({ app }: IConnectState) => ({
  app
})
export default connect(mapStateToProps)(BasicSider)
