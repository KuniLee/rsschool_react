import React, { ChangeEvent, Component, ComponentPropsWithoutRef, RefObject } from 'react'
import MyRadio from '@components/UI/MyRadio'

type MyRadioListProps = ComponentPropsWithoutRef<'div'> & {
  innerref: React.ForwardedRef<HTMLInputElement>
  eMessage: string
  options: Array<{ name: string; value: string }>
}

class MyRadioList extends Component<MyRadioListProps> {
  private changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    const { current } = this.props.innerref as RefObject<HTMLInputElement>
    if (current?.value) current.value = ev.target.value
  }

  render() {
    const { options, eMessage, defaultValue, children, ...props } = this.props
    return (
      <div className="pb-5">
        <p className="block mb-1 text-sm font-medium text-gray-900">{children}</p>
        <input defaultValue={defaultValue} ref={this.props.innerref} className="hidden"></input>
        <div className={eMessage && 'rounded border border-red-300'} {...props}>
          {options.map((radio) => (
            <MyRadio onChange={this.changeHandler} key={radio.value} value={radio.value} name="sex">
              {radio.name}
            </MyRadio>
          ))}
        </div>
        {eMessage && <p className="absolute text-sm text-red-600 dark:text-red-500">{eMessage}</p>}{' '}
      </div>
    )
  }
}

export default React.forwardRef<HTMLInputElement, Omit<MyRadioListProps, 'innerref'>>((props, ref) => <MyRadioList innerref={ref} {...props} />)
