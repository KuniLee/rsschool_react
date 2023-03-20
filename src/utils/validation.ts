import { FormInputs, FormState } from '@components/MyForm'

type ValidatingInputs = Omit<FormInputs, 'notifications'>

const validateFunctions: Record<keyof ValidatingInputs, (el: HTMLInputElement | HTMLSelectElement) => string> = {
  name: ({ value }) => {
    if (!/^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$/.test(value)) return 'Name must consist of 2-20 Latin letters and numbers'

    return ''
  },
  date: ({ value: date }) => {
    if (!date) return 'Set the date'
    else if (new Date(date) > new Date()) return "Date of Birth cannot be more than today's date"
    return ''
  },
  select: ({ value }) => {
    if (value === 'default') return 'Choose something'
    return ''
  },
  sex: ({ value }) => {
    if (value === 'default') return 'Choose one of the options'
    return ''
  },
  avatar: (el) => {
    if ('files' in el && el.files && el.files.length === 1) {
      if (el.files[0].size > 1024 * 1024) return 'Image size shouldn`t be more then 1Mb'
    }
    return ''
  },
}
export default function (refs: FormInputs) {
  const errors = Object.entries(refs).reduce((acc: Partial<FormState['errors']>, [key, { current }]) => {
    if (!(key in validateFunctions && current)) return acc
    acc[key as keyof ValidatingInputs] = validateFunctions[key as keyof ValidatingInputs](current)
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
