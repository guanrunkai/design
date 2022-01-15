import React, { FC } from 'react'
import { isEmptyArray, sortByArr } from '@/utils/common'
import { LIBRARY_LEAK_TYPE_ORDER } from '@/utils/order'
import styles from './index.less'
import MSOmit from '../MSOmit'

interface IProps {
  types: string[]
}

const MSRiskType: FC<IProps> = ({ types }) => {
  const list = types || []
  const sortedLeakType = sortByArr(list, LIBRARY_LEAK_TYPE_ORDER)
  const [firstItem = '', ...otherItems] = sortedLeakType
  //  当 firstItem 不为"非最新版"时文字颜色标红
  return (
    <span className={styles.riskTypeWrapper}>
      <span className={firstItem === '非最新版' ? '' : styles.highLevel}>{firstItem}</span>
      <MSOmit
        hide={isEmptyArray(otherItems)}
        content={list.map((item, index: number) => (
          <div key={item + index} className={styles.popMore}>
            {item}
          </div>
        ))}
      />
    </span>
  )
}

export default MSRiskType
