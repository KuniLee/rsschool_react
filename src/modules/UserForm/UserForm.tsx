import React, { FC, useState } from 'react'

import Input from '@/UI/Input'
import MyButton from '@/UI/MyButton'
import MyFileInput from '@/UI/FileInput'
import { useForm } from 'react-hook-form'
import validateOptions from './helpers/validateOptions'
import countries from './constants/countries'
import MySelect from '@/UI/Select'
import MsgBox from '@/UI/MsgBox'
import { genders } from './types'
import MyRadio from '@/UI/Radio'
import Checkbox from '@/UI/Checkbox'
import Popup from '@components/Popup'
import { useAppDispatch } from '@/hooks/redux'
import { addUser } from '@/modules/UserForm/store/usersSlice'
import createUser from '@/modules/UserForm/helpers/createUser'
import type { FormData } from './store/usersSlice'

const UserForm: FC = () => {
  const [popup, setPopup] = useState(false)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ reValidateMode: 'onSubmit' })

  const onSubmit = handleSubmit(async (data) => {
    dispatch(addUser(await createUser(data)))
    setPopup(true)
    reset()
  })

  return (
    <form data-testid="form" onSubmit={onSubmit} className="mt-2 rounded bg-gray-700 p-4">
      <Popup onClose={() => setPopup(false)} open={popup}>
        <p className="mb-2">User created!</p>
      </Popup>
      <div className="mb-2 grid items-start gap-x-2 md:grid-cols-2">
        <Input
          {...register('firstName', validateOptions.firstName)}
          eMessage={errors.firstName?.message}
          placeholder="Insert firstname..."
          type="text">
          Firstname
        </Input>
        <Input
          {...register('surName', validateOptions.surName)}
          eMessage={errors.surName?.message}
          placeholder="Insert surname..."
          type="text">
          Surname
        </Input>
        <MyFileInput
          {...register('avatar', validateOptions.avatar)}
          desc="PNG or JPG. (MAX 5Mb)"
          accept="image/png, image/jpeg"
          eMessage={errors.avatar?.message}>
          Avatar
        </MyFileInput>
        <Input {...register('date', validateOptions.date)} eMessage={errors.date?.message} type="date">
          Date of Birth
        </Input>
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
        <Checkbox {...register('notifications')}>I want to get notifications</Checkbox>
        <MsgBox eMessage={errors.agreement?.message}>
          <Checkbox {...register('agreement', validateOptions.agreement)}>Agree with license agreement</Checkbox>
        </MsgBox>
      </div>
      <MyButton className="justify-self-start">Create</MyButton>
    </form>
  )
}

export default UserForm
