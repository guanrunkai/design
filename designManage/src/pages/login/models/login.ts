import { Effect, Reducer } from 'umi'
import api from '@/services'
// import { MS_LOGIN_TOKEN } from '@/utils/constant'

export interface ILoginModelState {
  code: string
}

interface IModel {
  state: ILoginModelState
  effects: {
    getCode: Effect
    // login: Effect
  }
  reducers: {
    updateState: Reducer<ILoginModelState>
  }
}

const { authCode } = api

const LoginModel: IModel = {
  state: {
    code: ''
  },
  effects: {
    *getCode(_, { call, put }) {
      const response = yield call(authCode)
      if (response) {
        yield put({
          type: 'updateState',
          payload: {
            code: response.image
          }
        })
      }
    },
    // *login({ payload, callback }, { call }) {
    //   const response = yield call(authLogin, payload)
    //   if (response) {
    //     localStorage.setItem(MS_LOGIN_TOKEN, 'yes')
    //     history.replace('/')
    //   } else {
    //     if (callback) callback()
    //   }
    // }
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

export default LoginModel
