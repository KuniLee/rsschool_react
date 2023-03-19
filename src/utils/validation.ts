import { FormInputs, FormState } from '@components/MyForm'

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
  sex: (value: string) => {
    if (value === 'default') return 'Choose one of the options'
    return ''
  },
}
export default function (refs: FormInputs) {
  const errors = Object.entries(refs).reduce((acc: Partial<FormState['errors']>, [key, { current }]) => {
    acc[key as keyof FormInputs] = validateFunctions[key as keyof FormInputs](current?.value || '')
    return acc
  }, {}) as FormState['errors']
  return { isValid: Object.values(errors).every((el) => !el), errors }
}

export function getCleanMessages(errors: FormState['errors']) {
  const newErrors = { ...errors }
  for (const newErrorsKey in newErrors) {
    newErrors[newErrorsKey as keyof FormState['errors']] = ''
  }
  return newErrors
}

export function resetInputs(refs: FormInputs) {
  for (const newErrorsKey in refs) {
    const target = refs[newErrorsKey as keyof FormInputs].current
    if (!target) continue
    switch (target.tagName) {
      case 'INPUT':
        target.value = ''
        break
      case 'SELECT':
        target.value = 'default'
    }
  }
}
