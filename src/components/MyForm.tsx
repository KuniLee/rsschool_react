import React, { MouseEvent, Component, createRef, RefObject } from 'react'
import validate from '@/utils/validation'

import MyInput from '@components/UI/MyInput'
import MySelect from '@components/UI/MySelect'
import MyButton from '@components/UI/MyButton'

export type FormInputs = {
  title: RefObject<HTMLInputElement>
  date: RefObject<HTMLInputElement>
  select: RefObject<HTMLSelectElement>
}

export type FormState = {
  submitDisable: boolean
  errors: Record<keyof FormInputs, string>
}

class MyForm extends Component<never, FormState> {
  state = {
    submitDisable: true,
    errors: {
      title: '',
      date: '',
      select: '',
    },
  }
  inputs: FormInputs = {
    title: createRef<HTMLInputElement>(),
    date: createRef<HTMLInputElement>(),
    select: createRef<HTMLSelectElement>(),
  }

  private handleSubmit = (ev: MouseEvent) => {
    ev.preventDefault()
    for (const key in this.inputs) {
      const errorMsg = validate(key, this.inputs[key as keyof FormInputs].current?.value || '')
      this.setState((prev) => ({
        errors: { ...prev.errors, [key]: errorMsg },
      }))
    }
    this.setState((prev) => ({
      submitDisable: Object.values(prev.errors).some((el) => el),
    }))
  }
  private handleChange = (target: string) => {
    this.setState((prev) => ({
      submitDisable: Object.values(prev.errors).some((el) => el),
      errors: { ...prev.errors, [target]: '' },
    }))
  }

  render() {
    const {
      submitDisable,
      errors: { title: titleError, date: dateError, select: selectError },
    } = this.state
    const { title, date, select } = this.inputs

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
        <MyButton disabled={submitDisable} onClick={this.handleSubmit}>
          Create
        </MyButton>
      </form>
    )
  }
}

export default MyForm
