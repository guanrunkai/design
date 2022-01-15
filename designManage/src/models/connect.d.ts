import { ILoginModelState, IAppModalState, IUserState, ConnectProps, Loading, Dispatch } from 'umi'
import { match } from 'react-router-dom'

interface IAllStates {
  login: ILoginModelState
  app: IAppModalState
  user: IUserState
}

// 改写 umi 中 Loading 的类型定义，使提示更智能。
interface ILoading extends Loading {
  effects: {
    [key: string]: boolean
  }
  models: Record<keyof IAllStates, boolean>
}

/**
 * 各个 model 数据源和 loading
 */
export interface IConnectState extends IAllStates {
  loading: ILoading
}

/**
 * 改写 umi 中 ConnectProps 的类型定义：
 * 1. 保持 dispatch 一直存在；（使用时，需要绑定数据到组件，即调用 dva 的 connect 方法）
 * 2. 新增 loading 值（使用时，需要在调用 connect 函数中显示声明）
 * 3. 增加 match 泛型支持
 */
export interface IConnectProps<TP extends { [TK in keyof TP]?: string } = {}>
  extends ConnectProps<TP>,
    IAllStates {
  dispatch: Dispatch
  loading: boolean
  match?: match<TP>
}
