import type { FormData, IUser } from '../CreationForm'

export default async function (data: FormData): Promise<IUser> {
  const newUser: IUser = {
    ...data,
    id: Date.now(),
    avatar: await readFile(data.avatar),
  }

  Reflect.deleteProperty(newUser, 'agreement')

  return newUser
}

function readFile([file]: FileList): Promise<string> {
  if (!file) return Promise.resolve('')

  return new Promise((resolve, reject) => {
    const fr = new FileReader()

    fr.onload = () => {
      if (!fr.result) reject()
      else resolve(fr.result.toString())
    }
    fr.onerror = reject
    fr.readAsDataURL(file)
  })
}
