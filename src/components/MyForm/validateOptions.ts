import { RegisterOptions } from 'react-hook-form'
import { FormData } from '@/components/MyForm/MyForm'

const validateOptions: Record<keyof FormData, RegisterOptions> = {
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
      size: ([img]) => (img.size > 5 * 1024 * 1024 ? 'Image size shouldn`t be more then 5Mb' : true),
    },
  },
}

export default validateOptions
