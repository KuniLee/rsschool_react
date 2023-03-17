import React, { ChangeEvent, Component, createRef } from 'react'

import MyInput from '@components/UI/MyInput'
import MySelect from '@components/UI/MySelect'

class MyForm extends Component {
  input1 = createRef<HTMLInputElement>()
  input2 = createRef<HTMLInputElement>()
  input3 = createRef<HTMLSelectElement>()
  handler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e.target.value)
  }

  render() {
    return (
      <form className="mt-1 max-w-[400px]">
        <MyInput eMessage="cec" placeholder="Insert title..." ref={this.input1} type="text">
          Title
        </MyInput>
        <MyInput eMessage="" ref={this.input2} type="date">
          Date
        </MyInput>
        <MySelect
          eMessage="f"
          defaultName="Choose"
          options={[
            { name: '123', value: 'gg' },
            { name: '234', value: 'second' },
          ]}
          ref={this.input3}
        />
      </form>
    )
  }
}

export default MyForm
