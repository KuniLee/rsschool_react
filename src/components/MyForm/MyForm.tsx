import React, { MouseEvent, Component, createRef, RefObject } from 'react'
import validate, { getCleanMessages } from '@/utils/validation'

import MyInput from '@components/UI/MyInput'
import MySelect from '@components/UI/MySelect'
import MyButton from '@components/UI/MyButton'
import MsgBox from '@components/UI/MsgBox'
import MyCheckbox from '@components/UI/MyCheckbox'
import MyFileInput from '@components/UI/MyFileInput'
import countries from '@/utils/countries'
import Popup from '@components/Popup'
import MyRadio from '@components/UI/MyRadio'
import { genders, IUser } from '@/types'
import getUser from '@/utils/getUserFromForm'

export type FormInputs = {
  name: RefObject<HTMLInputElement>
  surname: RefObject<HTMLInputElement>
  date: RefObject<HTMLInputElement>
  select: RefObject<HTMLSelectElement>
  sex: RefObject<HTMLInputElement>[]
  notifications: RefObject<HTMLInputElement>
  avatar: RefObject<HTMLInputElement>
  agreement: RefObject<HTMLInputElement>
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
      surname: '',
      name: '',
      date: '',
      select: '',
      sex: '',
      avatar: '',
      agreement: '',
    },
  }
  formRef = createRef<HTMLFormElement>()
  inputs: FormInputs = {
    name: createRef<HTMLInputElement>(),
    surname: createRef<HTMLInputElement>(),
    date: createRef<HTMLInputElement>(),
    select: createRef<HTMLSelectElement>(),
    sex: genders.map(() => createRef<HTMLInputElement>()),
    notifications: createRef<HTMLInputElement>(),
    avatar: createRef<HTMLInputElement>(),
    agreement: createRef<HTMLInputElement>(),
  }

  private handleSubmit = (ev: MouseEvent) => {
    ev.preventDefault()
    const { isValid, errors } = validate(this.inputs)
    if (isValid) this.createNewCard()
    else this.setState({ submitDisable: !isValid, errors })
  }

  private async createNewCard() {
    this.props.addUser(await getUser(this.inputs))
    this.setState({ submitDisable: true, errors: getCleanMessages(this.state.errors), popup: true })
    if (this.formRef.current) this.formRef.current.reset()
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
    this.setState({ popup: false })
  }

  render() {
    const {
      popup,
      submitDisable,
      errors: {
        name: nameError,
        surname: surnameError,
        date: dateError,
        select: selectError,
        sex: sexError,
        avatar: avatarError,
        agreement: agreeError,
      },
    } = this.state
    const { name, avatar, date, select, sex, notifications, agreement, surname } = this.inputs
    return (
      <form ref={this.formRef} className="bg-green-100 p-4 rounded mt-1">
        <Popup onOk={this.closePopup} msg={'User created!'} open={popup} />
        <div className="grid md:grid-cols-2 gap-x-2 items-start mb-2">
          <MyInput
            onChange={() => this.handleChange('name')}
            eMessage={nameError}
            placeholder="Insert firstname..."
            ref={name}
            type="text">
            Firstname
          </MyInput>
          <MyInput
            onChange={() => this.handleChange('surname')}
            eMessage={surnameError}
            placeholder="Insert surname..."
            ref={surname}
            type="text">
            Surname
          </MyInput>
          <MyFileInput
            desc="PNG or JPG. (MAX 1Mb)"
            accept="image/png, image/jpeg"
            eMessage={avatarError}
            ref={avatar}
            onChange={() => this.handleChange('avatar')}>
            Avatar
          </MyFileInput>
          <MyInput onChange={() => this.handleChange('date')} eMessage={dateError} ref={date} type="date">
            Date of Birth
          </MyInput>
          <MySelect
            onChange={() => this.handleChange('select')}
            eMessage={selectError}
            defaultName="Choose country..."
            options={countries.map(({ code, name }) => ({ name, value: code }))}
            ref={select}>
            Country
          </MySelect>
          <MsgBox title="Sex" eMessage={sexError}>
            {genders.map((radio, idx) => (
              <MyRadio onChange={() => this.handleChange('sex')} ref={sex[idx]} key={radio} value={radio} name="sex">
                {radio}
              </MyRadio>
            ))}
          </MsgBox>
          <MyCheckbox onChange={() => this.handleChange('notifications')} ref={notifications}>
            I want to get notifications
          </MyCheckbox>
          <MsgBox eMessage={agreeError}>
            <MyCheckbox onChange={() => this.handleChange('agreement')} ref={agreement}>
              Agree with license agreement
            </MyCheckbox>
          </MsgBox>
        </div>
        <MyButton className="justify-self-start" disabled={submitDisable} onClick={this.handleSubmit}>
          Create
        </MyButton>
      </form>
    )
  }
}

export default MyForm
