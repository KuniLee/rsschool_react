import React, { ComponentPropsWithoutRef, Component } from 'react'

const ButtonStyles =
  'text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none'

class MyButton extends Component<ComponentPropsWithoutRef<'button'>> {
  render() {
    return (
      <button {...this.props} className={ButtonStyles}>
        {this.props.children}
      </button>
    )
  }
}

export default MyButton
