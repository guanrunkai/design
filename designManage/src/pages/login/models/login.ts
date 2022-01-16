import { Effect, Reducer, history } from 'umi'
import api from '@/services'
import { DSMP_LOGIN_TOKEN } from '@/utils/constant'
import { logout } from '@/utils/request'

export const TO_LOGIN = 'login/login'
export const OTP_CODE = 'login/otpCode'
export const OTP_LOGIN = 'login/otpLogin'
export const TO_LOGOUT = 'login/logout'
export const IS_FIRST_LOGIN = 'login/isUnmodifiedPwd'
export const FORGET_PWD = 'login/forgetPwd'
export const RESET_PWD = 'login/resetPwd'

export interface ILoginModelState {
  uuid: string
  QRcode: string
}

interface IModel {
  state: ILoginModelState
  effects: {
    login: Effect
    otpCode: Effect
    otpLogin: Effect
    logout: Effect
    isUnmodifiedPwd: Effect
    forgetPwd: Effect
    resetPwd: Effect
  }
  reducers: {
    updateState: Reducer<ILoginModelState>
  }
}

const {
  authLogin,
  otpQRCode,
  otpLogin,
  authLogout,
  UnbindEngine,
  isUnmodifiedPwd,
  forgetPwd,
  resetPwd
} = api

const LoginModel: IModel = {
  state: {
    uuid: '',
    QRcode: ''
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(authLogin, payload)
      if (!response) return
      const { uuid } = response
      yield put({
        type: 'updateState',
        payload: {
          uuid
        }
      })
      if (callback) callback(uuid)
    },

    *otpCode({ payload, callback }, { call, put }) {
      const response = yield call(otpQRCode, payload)
      // TODO 后端返回需要修改 不要返回 null
      yield put({ type: 'updateState', payload: { QRcode: response === true ? '' : response } })
      if (callback) callback(response)
    },
    *otpLogin({ payload, callback }, { call }) {
      const response = yield call(otpLogin, payload)
      if (!response) return
      localStorage.setItem(DSMP_LOGIN_TOKEN, 'true')
      history.replace('/')
      if (callback) callback(response)
      // 登录成功调用 用户关联引擎解绑提醒
      yield call(UnbindEngine)
    },
    *logout(_, { call }) {
      const response = yield call(authLogout)
      if (response) {
        logout()
      }
    },
    *isUnmodifiedPwd({ payload, callback }, { call }) {
      const response = yield call(isUnmodifiedPwd, payload)
      if (response) callback && callback(response)
    },
    *forgetPwd({ payload, callback }, { call }) {
      const response = yield call(forgetPwd, payload)
      if (!response) return
      if (response) callback && callback(response)
    },
    *resetPwd({ payload, callback }, { call }) {
      const response = yield call(resetPwd, payload)
      if (response) callback && callback()
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

export default LoginModel
