import { useState, useMemo } from 'react'

type Key = number | string | boolean
export type CheckStatus = 'all' | 'part' | 'none'

interface Params {
  checkList: (string | number | Record<string, any>)[]
  initialCheckedKeys?: Key[]
  mainKey?: string
}

export interface UseCheckListReturns {
  /** 'none' - 未选择, 'part' - 选择部分, 'all' - 全选 */
  checkStatus: 'none' | 'part' | 'all'
  /** 设置选择的 key */
  setCheckedKeys: (keys: Key[]) => void
  /** 所有可选择的 key, 根据传入的 checkList 生成 */
  allKeys: Key[]
  /** 当前选择的 key */
  checkedKeys: Key[]
  /** 当前选择的 key 所对应的数据 */
  checkedData: any[]
  /** 选择单个 */
  checkOne: (key: Key) => void
  /** 取消选择单个 */
  uncheckOne: (key: Key) => void
  /** 置反单个选择 */
  toggleCheckOne: (key: Key) => void
  /** 全部选择 */
  checkAll: () => void
  /** 全部取消选择 */
  uncheckAll: () => void
  /** 置反所有选择(若是未选择或选择部分，则全选; 否则，全部取消选择) */
  toggleCheckAll: () => void
}
export type UseCheckListReturnKeys = keyof ReturnType<typeof useCheckList>

const getInitKeys = (allKeys: Key[], initialCheckedKeys?: Key[]) => {
  if (!Array.isArray(initialCheckedKeys)) return []
  const result = initialCheckedKeys.filter(key => allKeys.includes(key))
  return [...new Set(result)]
}

/**
 * 针对可选择的列表类数据(table, checkbox等)的选择操作的封装，支持单选、多选、全选等操作，可获取当前选择key、当前选择数据、当前选择状态等
 * @param params.checkList [必须] 选项列表 - string, number, object 数组，为 object 数组时，可传 mainKey 字段来规定主键
 * @param params.initialCheckedKeys [可选] 初始选中的 key
 * @param params.mainKey [可选] checkList为 object 数组，规定数据主键，dataItem[mainKey] 将作为操作的 key
 * @returns result.checkStatus {String} - 'none': 未选择, 'part': 选择部分, 'all': 全选
 * @returns result.setCheckedKeys {Function} - 设置选择的 key
 * @returns result.allKeys {Array} - 所有可选择的 key, 根据传入的 checkList 生成
 * @returns result.checkedKeys {Array} - 当前选择的 key
 * @returns result.checkedData {Array} - 当前选择的 key 所对应的数据
 * @returns result.checkOne {Function} - 选择单个
 * @returns result.uncheckOne {Function} - 取消选择单个
 * @returns result.toggleCheckOne {Function} - 置反单个选择
 * @returns result.checkAll {Function} - 全部选择
 * @returns result.uncheckAll {Function} - 全部取消选择
 * @returns result.toggleCheckAll {Function} - 置反所有选择(若是未选择或选择部分，则全选; 否则，全部取消选择)
 */
function useCheckList(params: Params): UseCheckListReturns {
  const { checkList, initialCheckedKeys, mainKey = 'id' } = params

  const allKeys = useMemo<Key[]>(() => {
    if (mainKey) {
      return checkList.map(item => (item as Record<string, any>)?.[mainKey])
    } else {
      return checkList.slice()
    }
  }, [checkList, mainKey])

  const [checkedKeys, setCheckedKeys] = useState<Key[]>(getInitKeys(allKeys, initialCheckedKeys))

  const checkStatus = useMemo<CheckStatus>(() => {
    if (checkedKeys.length === 0) {
      return 'none'
    } else if (checkedKeys.length < allKeys.length) {
      return 'part'
    } else {
      return 'all'
    }
  }, [checkedKeys, allKeys])

  const checkedData = useMemo<Params['checkList']>(
    () =>
      checkList.filter(item => {
        if (mainKey) {
          return checkedKeys.includes((item as Record<string, any>)[mainKey])
        } else {
          return checkedKeys.includes(item as string | number)
        }
      }),
    [checkedKeys, checkList, mainKey]
  )

  const actions = useMemo(() => {
    const _setCheckedKeys = (keys: Key[]) => {
      let _keys = keys.filter(key => allKeys.includes(key))
      _keys = [...new Set(_keys)]
      setCheckedKeys(_keys)
    }

    const checkOne = (key: Key) => {
      const list = [...checkedKeys]
      if (allKeys.includes(key) && !checkedKeys.includes(key)) {
        list.push(key)
        setCheckedKeys(list)
      }
    }

    const uncheckOne = (key: Key) => {
      const list = [...checkedKeys]
      const index = list.indexOf(key)
      if (index !== -1) {
        list.splice(index, 1)
        setCheckedKeys(list)
      }
    }

    const toggleCheckOne = (key: Key) => {
      const list = [...checkedKeys]
      const index = list.indexOf(key)
      if (index !== -1) {
        list.splice(index, 1)
        setCheckedKeys(list)
      } else if (allKeys.includes(key)) {
        list.push(key)
        setCheckedKeys(list)
      }
    }

    const checkAll = () => setCheckedKeys(allKeys)

    const uncheckAll = () => setCheckedKeys([])

    const toggleCheckAll = () => {
      if (checkStatus === 'all') {
        setCheckedKeys([])
      } else {
        setCheckedKeys(allKeys)
      }
    }

    return {
      setCheckedKeys: _setCheckedKeys,
      checkOne,
      uncheckOne,
      toggleCheckOne,
      checkAll,
      uncheckAll,
      toggleCheckAll
    }
  }, [allKeys, checkStatus, checkedKeys])

  return { checkStatus, allKeys, checkedKeys, checkedData, ...actions }
}

export default useCheckList
