import Icon from '@ant-design/icons'
import { Divider, Layout, Modal } from 'antd'
import classnames from 'classnames'
import React from 'react'
import { history, Link,  useDispatch } from 'umi'

import { MSIcon } from '@/components'

import logoutSvg from '../../assets/icons/common/logout.svg'
import AlarmSvg from '../../assets/icons/notification/alarm.svg'
import styles from '../styles/BasicHeader.less'
import HeaderMenu from './HeaderMenu'

interface IProps {
  collapsed: boolean
  username: string
  undoCount: number
}

const { Header } = Layout
const { confirm } = Modal

const BasicHeader: React.FC<IProps> = props => {
  const dispatch = useDispatch()
  const { collapsed, username, undoCount=1000} = props
  const displayUsername =
    username.length <= 17 ? <div>{username}</div> : <div>{`${username.slice(0, 10)}...`}</div>
  const displayUndoCount = undoCount > 999 ? '999+' : undoCount
  const handleLogout = () => {
    confirm({
      className: 'my-ant-modal',
      title: '提示',
      content: '确认退出登录吗？',
      onOk: () => {
        //TODO
        history.push('/login')
      }
    })
  }

  const handleToProfile = () => {
    history.push('/config/account?type=profile')
  }

  return (
    <>
      <Header className={styles.header}>
        <div className={classnames(styles.left, { [styles.logo_hide]: collapsed })}>
          <Link to="/" className={styles.logo_wrapper}>
            <img src={`/home/moresec/dsmp/HOMELOGO.png?${Math.random()}`} alt="logo" />
          </Link>
          <HeaderMenu pathname={window.location.pathname} collapsed={collapsed} roleIds={[]} />
        </div>

        <div className={styles.right}>
          <span className={styles.username} onClick={handleToProfile}>
            {displayUsername}
          </span>

          <span className={styles.notification_container}>
            <Divider type="vertical" style={{ backgroundColor: '#3cd0be', height: 14 }} />
            <Link to="/notification" className={styles.notification}>
              <Icon component={MSIcon(AlarmSvg, { width: '16px', height: '14px' })} />
              {undoCount > 0 ? (
                <span className={styles.notification_count}>{displayUndoCount}</span>
              ) : (
                ''
              )}
            </Link>
            <Divider type="vertical" style={{ backgroundColor: '#3cd0be', height: 14 }} />
          </span>

          <div className={styles.logout} onClick={handleLogout}>
            <Icon component={MSIcon(logoutSvg, { width: '16px', height: '14px' })} />
          </div>
        </div>
      </Header>
    </>
  )
}

export default BasicHeader
