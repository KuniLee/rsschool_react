import React, { MouseEvent, Component, createRef, RefObject } from 'react'
import validate, { getCleanMessages, resetInputs } from '@/utils/validation'

import MyInput from '@components/UI/MyInput'
import MySelect from '@components/UI/MySelect'
import MyButton from '@components/UI/MyButton'
import MyRadioList from '@components/UI/MyRadioList'

export type FormInputs = {
  title: RefObject<HTMLInputElement>
  date: RefObject<HTMLInputElement>
  select: RefObject<HTMLSelectElement>
  sex: RefObject<HTMLInputElement>
}

export type FormState = {
  submitDisable: boolean
  errors: Record<keyof FormInputs, string>
}

class MyForm extends Component<unknown, FormState> {
  state = {
    submitDisable: true,
    errors: {
      title: '',
      date: '',
      select: '',
      sex: '',
    },
  }
  inputs: FormInputs = {
    title: createRef<HTMLInputElement>(),
    date: createRef<HTMLInputElement>(),
    select: createRef<HTMLSelectElement>(),
    sex: createRef<HTMLInputElement>(),
  }

  private handleSubmit = (ev: MouseEvent) => {
    ev.preventDefault()
    const { isValid, errors } = validate(this.inputs)
    if (isValid) this.createNewCard()
    else this.setState({ submitDisable: !isValid, errors })
  }

  private createNewCard() {
    this.setState({ submitDisable: true, errors: getCleanMessages(this.state.errors) })
    alert('created')
    resetInputs(this.inputs)
  }

  private handleChange = (target: string) => {
    this.setState((prev) => {
      const errors = { ...prev.errors, [target]: '' }
      const submitDisable = Object.values(errors).some((el) => el)
      return { submitDisable, errors }
    })
  }

  render() {
    const {
      submitDisable,
      errors: { title: titleError, date: dateError, select: selectError, sex: sexError },
    } = this.state
    const { title, date, select, sex } = this.inputs

    return (
      <form className="bg-green-100 p-4 rounded mt-1 max-w-[400px]">
        <MyInput onChange={() => this.handleChange('title')} eMessage={titleError} placeholder="Insert title..." ref={title} type="text">
          Title
        </MyInput>
        <MyInput onChange={() => this.handleChange('date')} eMessage={dateError} ref={date} type="date">
          Date
        </MyInput>
        <MySelect
          onChange={() => this.handleChange('select')}
          eMessage={selectError}
          defaultName="Choose something"
          options={[
            { name: '123', value: 'gg' },
            { name: '234', value: 'second' },
          ]}
          ref={select}
        />
        <MyRadioList
          onChange={() => this.handleChange('sex')}
          ref={sex}
          defaultValue="default"
          options={[
            { name: 'Male', value: 'male' },
            { name: 'Female', value: 'female' },
          ]}
          eMessage={sexError}
        />
        <MyButton disabled={submitDisable} onClick={this.handleSubmit}>
          Create
        </MyButton>
      </form>
    )
  }
}

export default MyForm
