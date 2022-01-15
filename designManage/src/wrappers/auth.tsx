import { Redirect, connect, IRoute } from 'umi'
import React from 'react'
import { IConnectState, IConnectProps } from '@/models/connect'

interface IProps extends IConnectProps, IRoute {}

export default connect(({ user }: IConnectState) => ({
  ...user
}))((props: IProps) => {
  const { route, role = 1 } = props
  const { exclude } = route
  if (exclude && exclude.includes(role)) {
    return <Redirect to="/404" />
  } else {
    return props.children
  }
})
