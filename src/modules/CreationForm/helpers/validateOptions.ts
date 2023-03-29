import { RegisterOptions } from 'react-hook-form'
import { FormData } from '../CreationForm'

const validateOptions: Partial<Record<keyof FormData, RegisterOptions>> = {
  firstName: {
    required: 'This field is required',
    pattern: {
      value: /^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$/,
      message: 'Firstname must consist of 2-20 Latin letters and numbers',
    },
  },
  surName: {
    required: 'This field is required',
    pattern: {
      value: /^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$/,
      message: 'Surname must consist of 2-20 Latin letters and numbers',
    },
  },
  avatar: {
    required: 'You should upload an image',
    validate: {
      type: ([img]) =>
        !['image/png', 'image/jpeg'].includes(img.type) ? 'The file should be an image (png, jpeg)' : true,
      size: ([img]) => (img.size > 5 * 1024 * 1024 ? 'Image size should not exceed 5 MB.' : true),
    },
  },
  date: {
    required: 'Set the date',
    valueAsDate: true,
    validate: {
      beforeNow: (date: Date) => {
        return date > new Date() ? "Date of Birth cannot be more than today's date" : true
      },
    },
  },
  country: {
    validate: {
      default: (value: string) => {
        return value === 'default' ? 'Choose country' : true
      },
    },
  },
  sex: {
    required: 'Choose one of the options',
  },
  agreement: {
    required: 'You should agree!',
  },
}

export default validateOptions
