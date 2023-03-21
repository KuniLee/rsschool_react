import { genders, Genders, IUser } from '@/types'
import { FormInputs } from '@components/MyForm/MyForm'

export default async function (inputs: FormInputs): Promise<IUser> {
  function isOfGendersType(value: string): value is Genders {
    return genders.includes(value)
  }
  const sex = inputs.sex.find(({ current }) => current?.checked)?.current?.value || ''
  if (!isOfGendersType(sex)) throw Error('parse form problem')
  return {
    id: Date.now(),
    name: inputs.name.current?.value || '',
    date: new Date(inputs.date.current?.value || 0),
    country: inputs.select.current?.value || '',
    notifications: inputs.notifications.current?.checked || false,
    sex,
    avatar: await readFile(inputs.avatar.current),
  }
}

function readFile(input: HTMLInputElement | null): Promise<string | null> {
  if (!input || !input.files || input.files.length === 0) return Promise.resolve(null)
  const file = input.files[0]
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => {
      if (!fr.result) {
        reject()
        return
      }
      resolve(fr.result as string)
    }
    fr.onerror = reject
    fr.readAsDataURL(file)
  })
}
