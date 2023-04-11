import React, { Component } from 'react'
import countries from '@/modules/UserForm/constants/countries'
import noImage from '@assets//noImage.png'
import { IUser } from '@/modules/UserForm'

export type UserCardProps = {
  user: IUser
}

class UserCard extends Component<UserCardProps> {
  render() {
    const { avatar, firstName, surName, date, id, sex, country, notifications } = this.props.user

    return (
      <div
        data-testid="card"
        className="flex w-full max-w-sm flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow">
        <img className="max-h-[200px] self-center rounded-t-lg" src={avatar || noImage} alt={`avatar:${id}`} />
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
          {firstName} {surName}
        </h5>
        <ul className="text-sm text-gray-900">
          <li>Date of Birth: {date.toDateString()}</li>
          <li>Sex: {sex}</li>
          <li>Country: {countries.find((el) => el.code === country)?.name}</li>
          <li>Notifications: {String(notifications)}</li>
        </ul>
      </div>
    )
  }
}

export default UserCard
