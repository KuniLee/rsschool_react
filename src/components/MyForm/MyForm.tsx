import React, { FC, useState } from 'react'

import MyInput from '@components/UI/MyInput'
import MyButton from '@components/UI/MyButton'
import MyFileInput from '@components/UI/MyFileInput'
import { useForm } from 'react-hook-form'
import validateOptions from '@components/MyForm/validateOptions'
import countries from '@/utils/countries'
import MySelect from '@components/UI/MySelect'
import type { Genders, IUser } from '@/types'
import MsgBox from '@components/UI/MsgBox'
import { genders } from '@/types'
import MyRadio from '@components/UI/MyRadio'
import MyCheckbox from '@components/UI/MyCheckbox'
import createUser from '@components/MyForm/createUser'
import Popup from '@components/Popup'

type FormProps = {
  addUser: (user: IUser) => void
}

export type FormData = {
  firstName: string
  surName: string
  avatar: FileList
  date: Date
  country: string
  sex: Genders
  notifications: boolean
  agreement: boolean
}

const MyForm: FC<FormProps> = ({ addUser }) => {
  const [popup, setPopup] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ reValidateMode: 'onSubmit' })

  const onSubmit = handleSubmit(async (data) => {
    addUser(await createUser(data))
    setPopup(true)
    reset()
  })

  return (
    <form onSubmit={onSubmit} className="bg-green-100 p-4 rounded mt-1">
      <Popup onOk={() => setPopup(false)} msg={'User created!'} open={popup} />
      <div className="grid md:grid-cols-2 gap-x-2 items-start mb-2">
        <MyInput
          {...register('firstName', validateOptions.firstName)}
          eMessage={errors.firstName?.message}
          placeholder="Insert firstname..."
          type="text">
          Firstname
        </MyInput>
        <MyInput
          {...register('surName', validateOptions.surName)}
          eMessage={errors.surName?.message}
          placeholder="Insert surname..."
          type="text">
          Surname
        </MyInput>
        <MyFileInput
          {...register('avatar', validateOptions.avatar)}
          desc="PNG or JPG. (MAX 5Mb)"
          accept="image/png, image/jpeg"
          eMessage={errors.avatar?.message}>
          Avatar
        </MyFileInput>
        <MyInput {...register('date', validateOptions.date)} eMessage={errors.date?.message} type="date">
          Date of Birth
        </MyInput>
        <MySelect
          {...register('country', validateOptions.country)}
          eMessage={errors.country?.message}
          defaultName="Choose country..."
          options={countries.map(({ code, name }) => ({ name, value: code }))}>
          Country
        </MySelect>
        <MsgBox title="Sex" eMessage={errors.sex?.message}>
          {genders.map((radio) => (
            <MyRadio {...register('sex', validateOptions.sex)} key={radio} value={radio} name="sex">
              {radio}
            </MyRadio>
          ))}
        </MsgBox>
        <MyCheckbox {...register('notifications')}>I want to get notifications</MyCheckbox>
        <MsgBox eMessage={errors.agreement?.message}>
          <MyCheckbox {...register('agreement', validateOptions.agreement)}>Agree with license agreement</MyCheckbox>
        </MsgBox>
      </div>
      <MyButton className="justify-self-start">Create</MyButton>
    </form>
  )
}

export default MyForm
