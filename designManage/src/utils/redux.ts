import { Effect, Reducer } from 'umi'
import { getTableInfoFromResponse } from './common'

export interface ICommonModelState {
  [x: string]: any
}

type IDataType = 'normal' | 'tableData'
interface IEffectItem {
  name: string
  withCall?: boolean
  callFn?: Function
  putKey?: string
  dataType?: IDataType
  dataTranslateFn?: Function
  shouldCheckResBeforeCallback?: boolean
  callbackWithResponse?: boolean
}
export type IEffects = IEffectItem[]

interface IPutDataProps extends Pick<IEffectItem, 'dataType' | 'dataTranslateFn'> {
  data: any
  payload: any
}
const getPutData = ({ dataType, data, payload, dataTranslateFn }: IPutDataProps) => {
  let putData = data
  if (dataType === 'tableData') {
    putData = getTableInfoFromResponse(putData, payload)
  }
  if (dataTranslateFn) {
    putData = dataTranslateFn(putData)
  }
  return putData
}

const genEffect = (
  {
    name,
    withCall = true,
    callFn,
    putKey,
    dataType = 'normal',
    dataTranslateFn,
    shouldCheckResBeforeCallback = true,
    callbackWithResponse
  }: IEffectItem = {} as IEffectItem
): Effect => {
  if (!name) throw new Error(`CommonModel's effect should has name field!`)

  let _callbackWithResponse = true
  if (!callbackWithResponse && dataType === 'tableData') {
    _callbackWithResponse = false
  }

  return function* ({ payload, callback, onFinish }, { put }) {
    let response: any = void 0

    if (withCall && callFn) {
      response = yield callFn(payload)
    }

    if (response) {
      if (putKey) {
        yield put({
          type: 'updateState',
          payload: { [putKey]: getPutData({ dataType, data: response, payload, dataTranslateFn }) }
        })
      }
    }

    if (response || !shouldCheckResBeforeCallback) {
      if (_callbackWithResponse) {
        callback && callback(response)
      } else {
        callback && callback()
      }
    }

    onFinish && onFinish()
  }
}

interface IGenerateCommonModelProps<State> {
  namespace?: string
  initialState?: State
  effectList: IEffects
  customModel?: {
    effects?: Record<string, Effect>
    reducers?: Record<string, Reducer>
  }
}
interface IGenerateCommonModelReturns<State> {
  namespace?: string
  state: State
  effects: Record<string, Effect>
  reducers: Record<string, Reducer>
}
const generateCommonModel = <State = Record<string, any>>(
  {
    namespace,
    initialState = {} as State,
    effectList,
    customModel
  }: IGenerateCommonModelProps<State> = {} as IGenerateCommonModelProps<State>
): IGenerateCommonModelReturns<State> => {
  const effects: Record<string, Effect> = {}
  const reducers: Record<string, Reducer> = {
    updateState(curState, { payload }) {
      return { ...curState, ...payload }
    }
  }

  for (const effect of effectList) {
    effects[effect.name] = genEffect(effect)
  }

  const result: IGenerateCommonModelReturns<State> = {
    state: initialState,
    effects: {
      ...effects,
      ...customModel?.effects
    },
    reducers: {
      ...reducers,
      ...customModel?.reducers
    }
  }

  if (namespace) {
    result.namespace = namespace
  }

  return result
}

export { generateCommonModel }
