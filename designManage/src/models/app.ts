import { Effect, Reducer } from 'umi'
import { IConnectState } from '@/models/connect'

export interface IAppModalState {
  collapsed: boolean
  layout: 'horizontal' | 'vertical' // vertical 同 antd/Menu mode="inline"
  theme: 'dark' | 'light'
}

interface IModel {
  state: IAppModalState
  effects: {
    toggleSider: Effect
  }
  reducers: {
    updateState: Reducer<IAppModalState>
  }
}

const AppModel: IModel = {
  state: {
    collapsed: false,
    layout: 'horizontal',
    theme: 'dark'
  },

  effects: {
    *toggleSider({ payload }, { put, select }) {
      const collapsed =
        payload === 'hover' ? false : yield select(({ app }: IConnectState) => !app.collapsed)
      yield put({
        type: 'updateState',
        payload: {
          collapsed
        }
      })
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default AppModel
