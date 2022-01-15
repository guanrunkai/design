import React from 'react'
import { DatePicker } from 'antd'
import { RangeValue } from 'rc-picker/lib/interface'
import moment, { Moment } from 'moment'
import { DATE_FORMAT_WITH_SECOND, DEFAULT_TIME } from '@/utils/constant'
import { Condition } from './index'

const { RangePicker } = DatePicker

const MSQueryDateRange: React.FC<Condition<'dateRange'>> = props => {
  const { defaultValue, onChange = () => void 0 } = props
  const defaultRange: RangeValue<Moment> = Array.isArray(defaultValue)
    ? [
        defaultValue[0] ? moment(defaultValue[0], DATE_FORMAT_WITH_SECOND) : null,
        defaultValue[1] ? moment(defaultValue[1], DATE_FORMAT_WITH_SECOND) : null
      ]
    : null
  const handleDateChange = (_: RangeValue<Moment>, dateStrings: string[]) => {
    if (dateStrings[0] === '' && dateStrings[1] === '') {
      onChange('', '')
    } else {
      onChange(dateStrings[0], dateStrings[1])
    }
  }
  const handleDateOk = (dates: RangeValue<Moment>) => {
    if (!dates) {
      onChange('', '')
    } else {
      onChange(
        dates[0] ? dates[0].format(DATE_FORMAT_WITH_SECOND) : '',
        dates[1] ? dates[1].format(DATE_FORMAT_WITH_SECOND) : ''
      )
    }
  }

  return (
    <RangePicker
      style={{ width: 368 }}
      value={defaultRange}
      showTime={DEFAULT_TIME}
      format={DATE_FORMAT_WITH_SECOND}
      onChange={handleDateChange}
      onCalendarChange={handleDateChange}
      onOk={handleDateOk}
      placeholder={['开始时间', '结束时间']}
      ranges={{
        今天: [moment().startOf('day'), moment()],
        最近7天: [moment().subtract(1, 'week'), moment()],
        最近1月: [moment().subtract(1, 'month'), moment()]
      }}
    />
  )
}

export default MSQueryDateRange
