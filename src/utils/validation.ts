import { FormInputs, FormState } from '@components/MyForm'

type ValidatingInputs = Omit<FormInputs, 'notifications' | 'sex'>
type ValidatingInputsArray = Pick<FormInputs, 'sex'>
type ValidateFunctionsType = Record<keyof ValidatingInputs, (el: HTMLInputElement | HTMLSelectElement) => string> & Record<keyof ValidatingInputsArray, (elArr: HTMLInputElement[]) => string>

const validateFunctions: ValidateFunctionsType = {
  name: ({ value }) => {
    if (!/^[a-zA-Z][a-zA-Z0-9-_.\s]{1,20}$/.test(value)) return 'Name must consist of 2-20 Latin letters and numbers'
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
  sex: (elArr) => {
    if (elArr.every((el) => !el.checked)) return 'Choose one of the options'
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
  const errors = Object.entries(refs).reduce((acc: Partial<FormState['errors']>, [key, ref]) => {
    if (!(key in validateFunctions)) return acc
    if (Array.isArray(ref)) {
      acc[key as keyof ValidatingInputsArray] = validateFunctions[key as keyof ValidatingInputsArray](ref.map((el) => el.current as HTMLInputElement))
    } else acc[key as keyof ValidatingInputs] = validateFunctions[key as keyof ValidatingInputs](ref.current as HTMLInputElement | HTMLSelectElement)
    return acc
  }, {}) as unknown as FormState['errors']
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
    const ref = refs[newErrorsKey as keyof FormInputs]
    if (Array.isArray(ref)) {
      ref.forEach((el) => ((el.current as HTMLInputElement).checked = false))
    } else if (ref.current)
      switch (ref.current.tagName) {
        case 'INPUT':
          ;(ref.current as HTMLInputElement).value = ''
          ;(ref.current as HTMLInputElement).checked = false
          break
        case 'SELECT':
          ref.current.value = 'default'
      }
  }
}
