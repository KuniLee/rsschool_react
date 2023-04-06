import axios from 'axios'
import { Mocked } from 'vitest'

vi.mock('axios')

const mockedAxios = axios as Mocked<typeof axios>

it('test', () => {})
