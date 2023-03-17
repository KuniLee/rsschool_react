import React, { ChangeEvent, Component, createRef } from 'react'

import MyInput from '@components/UI/MyInput'

class MyForm extends Component {
  input1 = createRef<HTMLInputElement>()
  input2 = createRef<HTMLInputElement>()
  handler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  render() {
    return (
      <form className="mt-1 max-w-[400px]">
        <MyInput eMessage="cec" onChange={this.handler} placeholder="Insert title..." ref={this.input1} type="text">
          Title
        </MyInput>
        <MyInput eMessage="" onChange={this.handler} ref={this.input2} type="date">
          Date
        </MyInput>
        {/*<select id="countries" className={classes.input}>*/}
        {/*  <option selected>Choose a country</option>*/}
        {/*  <option value="US">United States</option>*/}
        {/*  <option value="CA">Canada</option>*/}
        {/*  <option value="FR">France</option>*/}
        {/*  <option value="DE">Germany</option>*/}
        {/*</select>*/}
      </form>
    )
  }
}

export default MyForm
