import React, { Component } from 'react'
import { IUser } from '@/types'
import countries from '@/utils/countries'
import noImage from '@assets//noImage.png'

export type UserCardProps = {
  user: IUser
}

class UserCard extends Component<UserCardProps> {
  render() {
    const { avatar, name, date, sex, country, notifications } = this.props.user
    return (
      <div data-testid="card" className="p-5 w-full flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <img className="self-center max-h-[200px] rounded-t-lg" src={avatar || noImage} alt="product image" />
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">{name}</h5>
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
