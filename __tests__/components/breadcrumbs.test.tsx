import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Breadcrumbs from '@/components/breadcrumbs'

jest.mock('next/navigation', () => ({
  usePathname: () => '/shop/products/category',
}))

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

describe('Breadcrumbs', () => {
  it('renders breadcrumb navigation', () => {
    render(<Breadcrumbs />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
  })
})

// Current Date and Time (UTC): 2025-04-19 23:40:30
// Current User's Login: ibrahim-lasfar
