import { FC } from 'react'
import cx from 'classnames'

type AlertProps = {
  type: 'danger' | 'warning'
  data: {
    title: string
    text: string
  }
}

const Classes: Record<AlertProps['type'], { title: string; text: string }> = {
  danger: { text: 'border-red-400 bg-red-100 text-red-700', title: 'bg-red-500 text-white' },
  warning: { text: 'border-orange-400 bg-orange-100 text-orange-700', title: 'bg-orange-500 text-white' },
}

export const Alert: FC<AlertProps> = ({ type, data }) => {
  return (
    <div className="py-2">
      <div className={cx('rounded-t-lg px-4 py-2 font-bold', Classes[type].title)}>{data.title}</div>
      <div className={cx('rounded-b-lg border border-t-0 px-4 py-3', Classes[type].text)}>
        <p>{data.text}</p>
      </div>
    </div>
  )
}
export default Alert
