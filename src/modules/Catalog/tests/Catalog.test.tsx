import { describe, it } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import Catalog from '@/modules/Catalog'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { responseData } from './mockData'
import { renderWithProviders } from '@/utils/test-utils'
import userEvent from '@testing-library/user-event'

const server = setupServer()

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('Catalog component', () => {
  it('should show a message on getting no card...', async () => {
    const emptyResponse = {
      pagination: {
        last_visible_page: 1,
        has_next_page: false,
        current_page: 1,
        items: {
          count: 0,
          total: 0,
          per_page: 10,
        },
      },
      data: [],
    }

    server.use(
      rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
        return res(ctx.json(emptyResponse), ctx.delay(150))
      })
    )

    renderWithProviders(<Catalog />)
    expect(await screen.findByText(/no cards/i)).toBeInTheDocument()
  })
  //
  it('should show a request error message...', async () => {
    server.use(
      rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errorMessage: `Server Error`,
          })
        )
      })
    )
    renderWithProviders(<Catalog />)
    expect(screen.getByPlaceholderText('Search something..')).toBeInTheDocument()
    expect(await screen.findByText(/Server Error/i)).toBeInTheDocument()
  })

  it('should render some cards...', async () => {
    server.use(
      rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
        return res(ctx.json(responseData), ctx.delay(50))
      })
    )
    renderWithProviders(<Catalog />)
    const cards = await screen.findAllByTestId('card')

    expect(cards.length).toBe(2)
  })

  it('should send a right http-request...', async () => {
    let searchParams = ''

    server.use(
      rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
        searchParams = req.url.search

        return res(ctx.json(responseData), ctx.delay(50))
      })
    )
    renderWithProviders(<Catalog />)
    await waitFor(() => {
      expect(searchParams).toBe('?q=&limit=12&page=1')
    })
    await userEvent.type(screen.getByPlaceholderText('Search something..'), 'anime search string')
    await userEvent.click(screen.getByRole('button', { name: /go/i }))
    await waitFor(() => {
      expect(searchParams).toBe('?q=anime+search+string&limit=12&page=1')
    })
  })

  it('should change pages...', async () => {
    const firstData = responseData
    const secondData: typeof responseData = JSON.parse(JSON.stringify(firstData))

    secondData.pagination.current_page = 2
    server.use(
      rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
        const page = Number(req.url.searchParams.get('page'))

        if (page === 1) return res(ctx.json(firstData), ctx.delay(50))
        else if (page === 2) return res(ctx.json(secondData), ctx.delay(50))
      })
    )

    renderWithProviders(<Catalog />)
    expect(await screen.findByText('1')).toHaveClass('bg-blue-700')
    await userEvent.click(screen.getByText('2'))

    expect(await screen.findByText('2')).toHaveClass('bg-blue-700')
  })

  it('should open card...', async () => {
    server.use(
      rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
        return res(ctx.json(responseData), ctx.delay(50))
      })
    )
    renderWithProviders(<Catalog />)
    await userEvent.click(await screen.findByRole('heading', { name: responseData.data[0].title }))
    expect(screen.getByText(new RegExp(responseData.data[0].synopsis.slice(0, 30), 'i'))).toBeInTheDocument()
  })
})
