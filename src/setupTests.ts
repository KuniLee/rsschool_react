import matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'
import { fetch, Headers, Request, Response } from 'cross-fetch'

expect.extend(matchers)

global.fetch = fetch
global.Headers = Headers
global.Request = Request
global.Response = Response
