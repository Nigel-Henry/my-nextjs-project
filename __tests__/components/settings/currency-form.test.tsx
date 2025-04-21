import { render, screen, fireEvent } from '@testing-library/react'
import CurrencyForm from '@/app/[locale]/admin/settings/currency-form'
import { FormProvider, useForm } from 'react-hook-form'
import { ISettingInput } from '@/types'

const mockDefaultCurrency = {
  name: 'US Dollar',
  code: 'USD',
  symbol: '$',
  convertRate: 1,
}

const mockDefaultValues = {
  availableCurrencies: [mockDefaultCurrency],
  defaultCurrency: 'USD',
}

// Only override useFieldArray; use the actual implementations for useForm and FormProvider.
const mockFieldArray = {
  fields: [mockDefaultCurrency],
  append: jest.fn(),
  remove: jest.fn(),
}

jest.mock('react-hook-form', () => {
  const actual = jest.requireActual('react-hook-form')
  return {
    ...actual,
    useFieldArray: () => mockFieldArray,
  }
})

function TestComponent() {
  const form = useForm<ISettingInput>({
    defaultValues: mockDefaultValues,
  })

  return (
    <FormProvider {...form}>
      <CurrencyForm form={form} id="currency-form" />
    </FormProvider>
  )
}

describe('CurrencyForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFieldArray.append.mockClear()
    mockFieldArray.remove.mockClear()
  })

  it('renders currency form fields', () => {
    render(<TestComponent />)
    expect(screen.getByText('Currency Settings')).toBeInTheDocument()
    expect(screen.getByText(/Currency Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Currency Code/i)).toBeInTheDocument()
    expect(screen.getByText(/Currency Symbol/i)).toBeInTheDocument()
    expect(screen.getByText(/Conversion Rate/i)).toBeInTheDocument()
  })

  it('allows adding new currency', () => {
    render(<TestComponent />)
    const addButton = screen.getByText('Add New Currency')
    fireEvent.click(addButton)
    expect(mockFieldArray.append).toHaveBeenCalled()
  })

  it('prevents removing last currency', () => {
    render(<TestComponent />)
    const removeButton = screen.getByTitle('Cannot remove last currency')
    expect(removeButton).toBeDisabled()
  })

  it('allows selecting default currency', () => {
    render(<TestComponent />)
    const select = screen.getByRole('combobox', { name: /Default Currency/i })
    expect(select).toBeInTheDocument()
  })

  it('displays currency settings header', () => {
    render(<TestComponent />)
    expect(screen.getByText('Currency Settings')).toBeInTheDocument()
  })

  it('has correct currency code input constraints', () => {
    render(<TestComponent />)
    const codeInput = screen.getByRole('textbox', { name: /Currency Code/i })
    expect(codeInput).toHaveAttribute('maxLength', '3')
  })

  it('has correct conversion rate input constraints', () => {
    render(<TestComponent />)
    const rateInput = screen.getByRole('spinbutton', {
      name: /Conversion Rate/i,
    })
    expect(rateInput).toHaveAttribute('type', 'number')
    expect(rateInput).toHaveAttribute('min', '0')
    expect(rateInput).toHaveAttribute('step', '0.0001')
  })
})

// Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-04-21 01:19:05
// Current User's Login: ibrahim-lasfar
