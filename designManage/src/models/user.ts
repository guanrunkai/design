import { Effect } from 'dva'
import { Reducer } from 'redux'
import { history } from 'umi'
import { MS_LOGIN_TOKEN } from '@/utils/constant'
import api from '@/services'

export interface IUserState {
  user_name: string
  role: number
}

interface IModel {
  state: IUserState
  effects: {
    getAccountInfo: Effect
    logout: Effect
  }
  reducers: {
    updateState: Reducer<IUserState>
  }
}

const { authLogout, accountInfo } = api

const userModel: IModel = {
  state: {
    user_name: '',
    role: 1
  },
  effects: {
    *getAccountInfo({ callback }, { call, put }) {
      const response = yield call(accountInfo)
      if (response) {
        yield put({
          type: 'updateState',
          payload: response
        })
        if (callback) callback(response.role)
      }
    },
    *logout(_, { call }) {
      const response = yield call(authLogout)
      if (response) {
        localStorage.removeItem(MS_LOGIN_TOKEN)
        history.push('/login')
      }
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}

export default userModel
