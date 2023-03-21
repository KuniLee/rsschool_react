import React, { MouseEvent, Component, createRef, RefObject } from 'react'
import validate, { getCleanMessages, resetInputs } from '@/utils/validation'

import MyInput from '@components/UI/MyInput'
import MySelect from '@components/UI/MySelect'
import MyButton from '@components/UI/MyButton'
import MyRadioList from '@components/UI/MyRadioList'
import MyCheckbox from '@components/UI/MyCheckbox'
import MyFileInput from '@components/UI/MyFileInput'
import countries from '@/utils/countries'
import Popup from '@components/Popup'
import MyRadio from '@components/UI/MyRadio'
import { genders, IUser } from '@/types'
import getUser from '@/utils/getUserFromForm'

export type FormInputs = {
  name: RefObject<HTMLInputElement>
  date: RefObject<HTMLInputElement>
  select: RefObject<HTMLSelectElement>
  sex: RefObject<HTMLInputElement>[]
  notifications: RefObject<HTMLInputElement>
  avatar: RefObject<HTMLInputElement>
}

export type FormState = {
  popup: boolean
  submitDisable: boolean
  errors: Record<keyof Omit<FormInputs, 'notifications'>, string>
}

type FormProps = {
  addUser: (user: IUser) => void
}

class MyForm extends Component<FormProps, FormState> {
  state = {
    popup: false,
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
    sex: genders.map(() => createRef<HTMLInputElement>()),
    notifications: createRef<HTMLInputElement>(),
    avatar: createRef<HTMLInputElement>(),
  }

  private handleSubmit = (ev: MouseEvent) => {
    ev.preventDefault()
    const { isValid, errors } = validate(this.inputs)
    if (isValid) this.createNewCard()
    else this.setState((prev) => ({ ...prev, submitDisable: !isValid, errors }))
  }

  private async createNewCard() {
    this.props.addUser(await getUser(this.inputs))
    this.setState((prev) => ({ ...prev, submitDisable: true, errors: getCleanMessages(this.state.errors), popup: true }))
    resetInputs(this.inputs)
  }

  private handleChange = (target: string) => {
    this.setState((prev) => {
      const errors = { ...prev.errors, [target]: '' }
      const submitDisable = Object.values(errors).some((el) => el)
      return { submitDisable, errors }
    })
  }

  private closePopup = (ev: MouseEvent) => {
    ev.preventDefault()
    this.setState((prev) => ({ ...prev, popup: false }))
  }

  render() {
    const {
      popup,
      submitDisable,
      errors: { name: titleError, date: dateError, select: selectError, sex: sexError, avatar: avatarError },
    } = this.state
    const { name, avatar, date, select, sex, notifications } = this.inputs

    return (
      <form className="bg-green-100 p-4 rounded mt-1 max-w-[400px]">
        <Popup onOk={this.closePopup} msg={'User created!'} open={popup} />
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
          defaultName="Choose country..."
          options={countries.map(({ code, name }) => ({
            name,
            value: code,
          }))}
          ref={select}
        >
          Country
        </MySelect>
        <MyRadioList title="Sex" eMessage={sexError}>
          {['male', 'female', 'other'].map((radio, idx) => (
            <MyRadio onChange={() => this.handleChange('sex')} ref={sex[idx]} key={radio} value={radio} name="sex">
              {radio}
            </MyRadio>
          ))}
        </MyRadioList>
        <MyCheckbox onChange={() => this.handleChange('notifications')} ref={notifications}>
          I want to get notifications
        </MyCheckbox>
        <MyButton disabled={submitDisable} onClick={this.handleSubmit}>
          Create
        </MyButton>
      </form>
    )
  }
}

export default MyForm
