import axios from 'axios'
import { vi, describe, it, Mocked } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Catalog from '@/modules/Catalog'
import { responseData } from './mockData'
import userEvent from '@testing-library/user-event'

vi.mock('axios')

const mockedAxios = axios as Mocked<typeof axios>

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

    mockedAxios.get.mockResolvedValueOnce({ data: emptyResponse })

    render(<Catalog />)
    expect(await screen.findByText(/no cards/i)).toBeInTheDocument()
  })

  it('should show a request error message...', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Error message'))
    render(<Catalog />)
    expect(screen.getByPlaceholderText('Search something..')).toBeInTheDocument()
    expect(await screen.findByText(/Error message/i)).toBeInTheDocument()
  })

  it('should render some cards...', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: responseData })
    render(<Catalog />)
    const cards = await screen.findAllByTestId('card')

    expect(cards.length).toBe(2)
  })

  it('should send a right http-request...', async () => {
    render(<Catalog />)
    await waitFor(() => {
      expect(mockedAxios.get).toBeCalledWith('https://api.jikan.moe/v4/anime', {
        params: { limit: 12, page: 1 },
      })
    })
    await userEvent.type(screen.getByPlaceholderText('Search something..'), 'anime search string')
    await userEvent.click(screen.getByRole('button', { name: /go/i }))
    expect(mockedAxios.get).toBeCalledWith('https://api.jikan.moe/v4/anime', {
      params: { limit: 12, page: 1, q: 'anime search string' },
    })
  })

  it('should change pages...', async () => {
    const firstData = responseData
    const secondData: typeof responseData = JSON.parse(JSON.stringify(firstData))

    secondData.pagination.current_page = 2

    mockedAxios.get.mockResolvedValueOnce({ data: firstData }).mockResolvedValueOnce({ data: secondData })
    render(<Catalog />)
    expect(await screen.findByText('1')).toHaveClass('bg-blue-700')
    await userEvent.click(screen.getByText('2'))
    responseData.pagination.current_page = 2
    mockedAxios.get.mockResolvedValueOnce({ data: responseData })
    expect(await screen.findByText('2')).toHaveClass('bg-blue-700')
  })

  it('should open card...', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: responseData })
    render(<Catalog />)
    await userEvent.click(await screen.findByRole('heading', { name: responseData.data[0].title }))
    expect(screen.getByText(new RegExp(responseData.data[0].synopsis.slice(0, 30), 'i'))).toBeInTheDocument()
  })
})
