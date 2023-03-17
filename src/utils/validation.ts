import { FormInputs } from '@components/MyForm'

const validateFunctions: Record<keyof FormInputs, (value: string) => string> = {
  title: (value: string) => {
    if (value.length < 3) return 'Title must be more then 3 symbols'
    else if (value.length > 20) return 'Title must not be longer then 20 symbols'
    return ''
  },
  date: (date: string) => {
    if (!date) return 'Set the date'
    else if (new Date(date) < new Date()) return "Date cannot be less than today's date"
    return ''
  },
  select: (value: string) => {
    if (value === 'default') return 'Choose something'
    return ''
  },
}
export default function (type: string, value: string) {
  return validateFunctions[type as keyof FormInputs](value)
}
