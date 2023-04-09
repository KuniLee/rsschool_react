import React, { ComponentPropsWithoutRef, Component } from 'react'

const ButtonStyles =
  'text-white bg-blue-500 hover:bg-blue-800 ' +
  'font-medium disabled:cursor-not-allowed disabled:bg-blue-300 rounded-lg px-4 py-2 '

class MyButton extends Component<ComponentPropsWithoutRef<'button'>> {
  render() {
    return (
      <button {...this.props} className={ButtonStyles + this.props.className}>
        {this.props.children}
      </button>
    )
  }
}

export default MyButton
