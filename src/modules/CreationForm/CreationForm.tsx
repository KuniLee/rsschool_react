import React, { FC, useState } from 'react'

import MyInput from '@/UI/MyInput'
import MyButton from '@/UI/MyButton'
import MyFileInput from '@/UI/MyFileInput'
import { useForm } from 'react-hook-form'
import validateOptions from './helpers/validateOptions'
import countries from './constants/countries'
import MySelect from '@/UI/MySelect'
import type { Genders } from './types'
import MsgBox from '@/UI/MsgBox'
import { genders } from './types'
import MyRadio from '@/UI/MyRadio'
import MyCheckbox from '@/UI/MyCheckbox'
import createUser from './helpers/createUser'
import Popup from '@components/Popup'

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

export type IUser = Omit<FormData, 'avatar' | 'agreement'> & {
  avatar: string
  id: number
}

type FormProps = {
  addUser: (user: IUser) => void
}

const CreationForm: FC<FormProps> = ({ addUser }) => {
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
    <form onSubmit={onSubmit} className="mt-1 rounded bg-green-100 p-4">
      <Popup onOk={() => setPopup(false)} msg={'User created!'} open={popup} />
      <div className="mb-2 grid items-start gap-x-2 md:grid-cols-2">
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

export default CreationForm
