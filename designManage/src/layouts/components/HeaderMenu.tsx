import Icon from '@ant-design/icons'
import { Menu } from 'antd'
import type { IRoute } from 'config/routes.config'
import { menuRoutesData } from 'config/routes.config'
import React, { useEffect, useState } from 'react'
import { Link, useSelector } from 'umi'

import AuditSvg from '@/assets/icons/menu/audit.svg'
import AuditActiveSvg from '@/assets/icons/menu/audit_active.svg'
import DashboardSvg from '@/assets/icons/menu/dashboard.svg'
import DashboardActiveSvg from '@/assets/icons/menu/dashboard_active.svg'
import HelpSvg from '@/assets/icons/menu/help.svg'
import HelpActiveSvg from '@/assets/icons/menu/help_active.svg'
import KnowLedgeSvg from '@/assets/icons/menu/knowledge.svg'
import KnowLedgeActiveSvg from '@/assets/icons/menu/knowledge_active.svg'
import LeakSvg from '@/assets/icons/menu/leak.svg'
import LeakActiveSvg from '@/assets/icons/menu/leak_active.svg'
import ProjectSvg from '@/assets/icons/menu/project.svg'
import ProjectActiveSvg from '@/assets/icons/menu/project_active.svg'
import ReportsSvg from '@/assets/icons/menu/reports.svg'
import ReportsActiveSvg from '@/assets/icons/menu/reports_active.svg'
import SettingsSvg from '@/assets/icons/menu/settings.svg'
import SettingsActiveSvg from '@/assets/icons/menu/settings_active.svg'
import MSIcon from '@/components/MSIcon'
import useAccess from '@/hooks/useAccess'
import type { IConnectState } from '@/models/connect'

import styles from '../styles/HeaderMenu.less'

interface IProps {
  collapsed: boolean
  roleIds: number[]
  pathname: string
}

const { SubMenu, Item } = Menu

const mapNameToIcon: MS.objectAny = {
  dashboard: DashboardSvg,
  dashboard_active: DashboardActiveSvg,
  project: ProjectSvg,
  project_active: ProjectActiveSvg,
  leak: LeakSvg,
  leak_active: LeakActiveSvg,
  knowledge: KnowLedgeSvg,
  knowledge_active: KnowLedgeActiveSvg,
  report: ReportsSvg,
  report_active: ReportsActiveSvg,
  config: SettingsSvg,
  config_active: SettingsActiveSvg,
  audits: AuditSvg,
  audits_active: AuditActiveSvg,
  notification: SettingsSvg,
  notification_active: SettingsActiveSvg,
  help: HelpSvg,
  help_active: HelpActiveSvg
}

const selector = ({ user }: IConnectState) => ({ user })

// 获取当前路由的父级。比如：'/threats/events' -> 'threats'
const getRouteFather = (pathname: string) => pathname.split('/')[1]

const getCurrentActiveMenuItemKey = (pathname: string) => {
  const pathArray = pathname.split('/')
  return pathArray[2]
    ? [`/${pathArray[1]}`, `/${pathArray[1]}/${pathArray[2]}`]
    : [`/${pathArray[1]}`]
}

const hasAccessRole = (accessKey: string | string[] = '', access: any) => {
  const isUnAuthorizedRoute =
    accessKey &&
    (Array.isArray(accessKey)
      ? accessKey.every(item => !access[item])
      : access[accessKey] === false)
  return !isUnAuthorizedRoute
}

// 根据路由配置项，动态生成菜单
const getMenusNode = (pathname: string) =>
  menuRoutesData
    .filter(x => !x.noShowInMenu )
    .map(routeItem => {
      const { active, routes, title: t, path, subMenu = false } = routeItem

      const activeMenuName = active === getRouteFather(pathname) ? `${active}_active` : active
      const icon = MSIcon(mapNameToIcon[activeMenuName || 'dashboard'], {
        fill: '#808ca3',
        width: '16px',
        height: '16px'
      })

      if (routes && subMenu) {
        return (
          <SubMenu
            key={active}
            popupClassName={styles.subMenu}
            popupOffset={[-19, 0]}
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
                (
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

const HeaderMenu: React.FC<IProps> = props => {
  const { pathname } = props
 

  const [currentMenu, setCurrentMenu] = useState<string[]>(getCurrentActiveMenuItemKey(pathname))

  useEffect(() => {
    setCurrentMenu(getCurrentActiveMenuItemKey(pathname))
  }, [pathname])

  return (
    <Menu mode="horizontal" selectedKeys={currentMenu} className={styles.headerMenu}>
      {getMenusNode(pathname)}
    </Menu>
  )
}

export default HeaderMenu
