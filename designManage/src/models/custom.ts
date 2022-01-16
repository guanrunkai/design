import api from '@/services'
import { Effect } from 'dva'
import { Reducer } from 'redux'

export const CUSTOM_INFO = 'custom/customInfo'
export const CUSTOM_INFO_UPDATE = 'custom/customInfoUpdate'
export const CUSTOM_INFO_RESET = 'custom/customInfoReset'

export interface ICustomState {
  id: number
  orgName: string
  keyword: string
}

export interface ISettingsModel {
  namespace: 'custom'
  state: ICustomState
  effects: {
    customInfo: Effect
    customInfoUpdate: Effect
    customInfoReset: Effect
  }
  reducers: {
    updateState: Reducer
  }
}

const { customInfo, customInfoUpdate, customInfoReset } = api

const CustomModal: ISettingsModel = {
  namespace: 'custom',

  state: {
    id: 0,
    orgName: '',
    keyword: ''
  },

  effects: {
    *customInfo({ callback }, { call, put }) {
      const response = yield call(customInfo)
      if (!response) return
      yield put({
        type: 'updateState',
        payload: response
      })
      if (callback && response) callback()
    },
    *customInfoUpdate({ payload, callback }, { call, put }) {
      const response = yield call(customInfoUpdate, payload)
      if (callback && response) callback()
    },
    *customInfoReset({ callback }, { call }) {
      const response = yield call(customInfoReset)
      if (callback && response) callback()
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

export default CustomModal
