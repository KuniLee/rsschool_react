import { describe, it } from 'vitest'
import AnimeCard from '@/modules/Catalog/components/AnimeCard/AnimeCard'
import { fireEvent, render, screen } from '@testing-library/react'
import { AnimeInfo } from '@/modules/Catalog/types'

describe('Cards Component:', () => {
  it('should be rendered...', function () {
    const card: AnimeInfo = {
      mal_id: 1,
      images: {
        jpg: {
          image_url: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg',
          small_image_url: 'https://cdn.myanimelist.net/images/anime/4/19644t.jpg',
          large_image_url: 'https://cdn.myanimelist.net/images/anime/4/19644l.jpg',
        },
        webp: {
          image_url: 'https://cdn.myanimelist.net/images/anime/4/19644.webp',
          small_image_url: 'https://cdn.myanimelist.net/images/anime/4/19644t.webp',
          large_image_url: 'https://cdn.myanimelist.net/images/anime/4/19644l.webp',
        },
      },
      title: 'Cowboy Bebop',
      title_english: 'Cowboy Bebop',
      aired: {
        string: 'Apr 3, 1998 to Apr 24, 1999',
      },
      rating: 'R - 17+ (violence & profanity)',
      score: 8.75,
      synopsis:
        "Crime is timeless. By the year 2071, humanity has expanded across the galaxy, filling the surface of other planets with settlements like those on Earth. These new societies are plagued by murder, drug use, and theft, and intergalactic outlaws are hunted by a growing number of tough bounty hunters.\n\nSpike Spiegel and Jet Black pursue criminals throughout space to make a humble living. Beneath his goofy and aloof demeanor, Spike is haunted by the weight of his violent past. Meanwhile, Jet manages his own troubled memories while taking care of Spike and the Bebop, their ship. The duo is joined by the beautiful con artist Faye Valentine, odd child Edward Wong Hau Pepelu Tivrusky IV, and Ein, a bioengineered Welsh Corgi.\n\nWhile developing bonds and working to catch a colorful cast of criminals, the Bebop crew's lives are disrupted by a menace from Spike's past. As a rival's maniacal plot continues to unravel, Spike must choose between life with his newfound family or revenge for his old wounds.\n\n[Written by MAL Rewrite]",
      genres: [
        {
          mal_id: 1,
          name: 'Action',
        },
        {
          mal_id: 46,
          name: 'Award Winning',
        },
        {
          mal_id: 24,
          name: 'Sci-Fi',
        },
      ],
    }

    const openHandler = vi.fn()

    render(<AnimeCard card={card} openCard={openHandler} />)
    expect(screen.getByAltText(/product image/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(card.title)
    fireEvent.click(screen.getByTestId('card'))
    expect(openHandler).toBeCalledTimes(1)
  })
})
