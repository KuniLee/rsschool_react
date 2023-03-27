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
  errors: Record<keyof Omit<FormInputs, 'notifications'>, string>
}

type FormProps = {
  addUser: (user: IUser) => void
}

class MyForm extends Component<FormProps, FormState> {
  state = {
    popup: false,
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
    else this.setState({ errors })
  }

  private async createNewCard() {
    this.props.addUser(await getUser(this.inputs))
    this.setState({ errors: getCleanMessages(this.state.errors), popup: true })
    if (this.formRef.current) this.formRef.current.reset()
  }

  private closePopup = (ev: MouseEvent) => {
    ev.preventDefault()
    this.setState({ popup: false })
  }

  render() {
    const {
      popup,
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
          <MyInput eMessage={nameError} placeholder="Insert firstname..." ref={name} type="text">
            Firstname
          </MyInput>
          <MyInput eMessage={surnameError} placeholder="Insert surname..." ref={surname} type="text">
            Surname
          </MyInput>
          <MyFileInput desc="PNG or JPG. (MAX 5Mb)" accept="image/png,image/jpeg" eMessage={avatarError} ref={avatar}>
            Avatar
          </MyFileInput>
          <MyInput eMessage={dateError} ref={date} type="date">
            Date of Birth
          </MyInput>
          <MySelect
            eMessage={selectError}
            defaultName="Choose country..."
            options={countries.map(({ code, name }) => ({ name, value: code }))}
            ref={select}>
            Country
          </MySelect>
          <MsgBox title="Sex" eMessage={sexError}>
            {genders.map((radio, idx) => (
              <MyRadio ref={sex[idx]} key={radio} value={radio} name="sex">
                {radio}
              </MyRadio>
            ))}
          </MsgBox>
          <MyCheckbox ref={notifications}>I want to get notifications</MyCheckbox>
          <MsgBox eMessage={agreeError}>
            <MyCheckbox ref={agreement}>Agree with license agreement</MyCheckbox>
          </MsgBox>
        </div>
        <MyButton className="justify-self-start" onClick={this.handleSubmit}>
          Create
        </MyButton>
      </form>
    )
  }
}

export default MyForm
