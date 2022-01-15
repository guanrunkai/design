import React from 'react'
import Icon from '@ant-design/icons'
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import classnames from 'classnames'
import MSIcon from '../MSIcon'
import styles from './index.less'

import DetailSvg from '@/assets/icons/common/detail.svg'
import DownloadSvg from '@/assets/icons/common/download.svg'
import DeleteSvg from '@/assets/icons/common/delete.svg'
import EditSvg from '@/assets/icons/common/edit.svg'
import UploadSvg from '@/assets/icons/common/upload.svg'

interface IProps extends React.HTMLAttributes<any> {
  type?: keyof typeof mapTypeToSvg
  svg?: React.ComponentType
  svgProps?: CustomIconComponentProps
  bordered?: boolean
  size?: 'large'
  disabled?: boolean
  active?: boolean
  className?: string
  onClick?: (e?: any) => void
}

const mapTypeToSvg = {
  detail: { icon: DetailSvg, title: '详情' },
  download: { icon: DownloadSvg, title: '下载' },
  delete: { icon: DeleteSvg, title: '删除' },
  edit: { icon: EditSvg, title: '编辑' },
  upload: { icon: UploadSvg, title: '上传' }
}

const MSIconButton: React.FC<IProps> = ({
  title,
  type,
  svg,
  svgProps,
  bordered = true,
  size,
  disabled,
  active,
  className,
  onClick,
  ...restProps
}) => {
  let svgComponent = null
  let svgTitle = title
  if (type && mapTypeToSvg[type]) {
    const currentType = mapTypeToSvg[type]
    svgComponent = currentType.icon
    if (!title) {
      svgTitle = currentType.title
    }
  } else if (svg) {
    svgComponent = svg
  } else {
    throw new Error('调用 MSIconButton 组件时，请确认能找到对应的 icon')
  }

  const buttonCls = classnames(styles.ms_icon_button, className, {
    [styles.border]: !!bordered,
    [styles.large]: size === 'large',
    [styles.disabled]: !!disabled,
    [styles.active]: !!active
  })

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!disabled) {
      onClick && onClick(e)
    }
  }

  return (
    <Icon
      className={buttonCls}
      title={svgTitle}
      component={MSIcon(svgComponent, svgProps)}
      onClick={handleClick}
      {...restProps}
    />
  )
}

export default MSIconButton
