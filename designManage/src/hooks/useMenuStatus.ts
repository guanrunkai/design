import { IRoute } from 'config/routes.config'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

// 获取当前侧边栏菜单默认被打开、选中的菜单项
export default function useMenuStatus(
  menuList: IRoute[] = []
): {
  rootMenuKeys: (string | undefined)[]
  openKeys: string[]
  selectedKeys: string[]
  handleOpenKeys: (...args: any[]) => void
  handleSelectedKeys: (...args: any[]) => void
} {
  const location = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  // 获取一级菜单的key
  const rootMenuKeys: (string | undefined)[] = useMemo(() => {
    return menuList.map(menu => menu.active).filter(Boolean)
  }, [menuList])
  const pathnameFather = location.pathname.split('/')[1]

  useEffect(() => {
    const pathArray = location.pathname.split('/')
    const pathFather = pathArray[1]
    const pathSub = pathArray[2]
    setSelectedKeys(pathSub ? [`/${pathFather}/${pathSub}`] : [`/${pathFather}`])
  }, [location.pathname])

  useEffect(() => {
    setOpenKeys([pathnameFather])
  }, [pathnameFather])

  return {
    rootMenuKeys,
    openKeys,
    selectedKeys,
    handleOpenKeys: setOpenKeys,
    handleSelectedKeys: setSelectedKeys
  }
}
