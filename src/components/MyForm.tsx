import React, { MouseEvent, Component, createRef, RefObject } from 'react'
import validate, { getCleanMessages, resetInputs } from '@/utils/validation'

import MyInput from '@components/UI/MyInput'
import MySelect from '@components/UI/MySelect'
import MyButton from '@components/UI/MyButton'
import MyRadioList from '@components/UI/MyRadioList'
import MyCheckbox from '@components/UI/MyCheckbox'
import MyFileInput from '@components/UI/MyFileInput'
import countries from '@/utils/countries'

export type FormInputs = {
  name: RefObject<HTMLInputElement>
  date: RefObject<HTMLInputElement>
  select: RefObject<HTMLSelectElement>
  sex: RefObject<HTMLInputElement>
  notifications: RefObject<HTMLInputElement>
  avatar: RefObject<HTMLInputElement>
}

export type FormState = {
  submitDisable: boolean
  errors: Record<keyof Omit<FormInputs, 'notifications'>, string>
}

class MyForm extends Component<unknown, FormState> {
  state = {
    submitDisable: true,
    errors: {
      name: '',
      date: '',
      select: '',
      sex: '',
      avatar: '',
    },
  }
  inputs: FormInputs = {
    name: createRef<HTMLInputElement>(),
    date: createRef<HTMLInputElement>(),
    select: createRef<HTMLSelectElement>(),
    sex: createRef<HTMLInputElement>(),
    notifications: createRef<HTMLInputElement>(),
    avatar: createRef<HTMLInputElement>(),
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
      errors: { name: titleError, date: dateError, select: selectError, sex: sexError, avatar: avatarError },
    } = this.state
    const { name, avatar, date, select, sex, notifications } = this.inputs

    return (
      <form className="bg-green-100 p-4 rounded mt-1 max-w-[400px]">
        <MyInput onChange={() => this.handleChange('name')} eMessage={titleError} placeholder="Insert name..." ref={name} type="text">
          Name
        </MyInput>
        <MyFileInput onChange={() => this.handleChange('avatar')} desc="PNG or JPG. (MAX 1Mb)" accept="image/png, image/jpeg" eMessage={avatarError} ref={avatar}>
          Avatar
        </MyFileInput>
        <MyInput onChange={() => this.handleChange('date')} eMessage={dateError} ref={date} type="date">
          Date of Birth
        </MyInput>
        <MySelect
          onChange={() => this.handleChange('select')}
          eMessage={selectError}
          defaultName="Choose country"
          options={countries.map(({ code, name }) => ({
            name,
            value: code,
          }))}
          ref={select}
        />
        <MyRadioList
          onChange={() => this.handleChange('sex')}
          ref={sex}
          defaultValue="default"
          options={[
            { name: 'Male', value: 'male' },
            { name: 'Female', value: 'female' },
            { name: 'Other', value: 'other' },
          ]}
          eMessage={sexError}
        >
          Sex
        </MyRadioList>
        <MyCheckbox ref={notifications}>I want to get notifications</MyCheckbox>
        <MyButton disabled={submitDisable} onClick={this.handleSubmit}>
          Create
        </MyButton>
      </form>
    )
  }
}

export default MyForm
