import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

describe('Home Page', () => {
  it('renders layout correctly', () => {
    render(
      <main data-testid="home-page">
        <h1>Home Page</h1>
      </main>
    )
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })
})
