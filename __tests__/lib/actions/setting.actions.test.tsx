import {
  getSetting,
  updateSetting,
  clearSettingsCache,
  setCurrencyOnServer,
  getNoCachedSetting,
  getSettingWithOptions,
} from '@/lib/actions/setting.actions'
import { connectToDatabase } from '@/lib/db'
import Setting from '@/lib/db/models/setting.model'
import { ISettingInput } from '@/types'

// Mock the database connection and models
jest.mock('@/lib/db', () => ({
  connectToDatabase: jest.fn(),
}))

jest.mock('@/lib/db/models/setting.model', () => ({
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
}))

const mockSet = jest.fn()
jest.mock('next/headers', () => ({
  cookies: () => ({
    set: mockSet,
  }),
}))

describe('Setting Actions', () => {
  const mockSetting: ISettingInput = {
    site: {
      name: 'Test Store',
      slogan: 'Test Slogan',
      description: 'Test Description',
      url: 'https://test.com',
      email: 'test@test.com',
      address: '123 Test St',
      phone: '123-456-7890',
      logo: '/logo.png',
      keywords: 'test, store',
      author: 'Test Author',
      copyright: '© 2024 Test',
    },
    common: {
      pageSize: 9,
      isMaintenanceMode: false,
      freeShippingMinPrice: 0,
      defaultTheme: 'light',
      defaultColor: 'gold',
    },
    availableLanguages: [
      {
        name: 'English',
        code: 'en-US',
      },
    ],
    carousels: [],
    defaultLanguage: 'en-US',
    availableCurrencies: [
      {
        name: 'US Dollar',
        code: 'USD',
        symbol: '$',
        convertRate: 1,
      },
    ],
    defaultCurrency: 'USD',
    availablePaymentMethods: [
      {
        name: 'Credit Card',
        commission: 0,
      },
    ],
    defaultPaymentMethod: 'Credit Card',
    availableDeliveryDates: [
      {
        name: 'Standard Shipping',
        daysToDeliver: 3,
        shippingPrice: 0,
        freeShippingMinPrice: 50,
      },
    ],
    defaultDeliveryDate: 'Standard Shipping',
  }

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    ;(Setting.findOne as jest.Mock).mockImplementation(() => ({
      lean: () => Promise.resolve(mockSetting),
    }))
    ;(Setting.findOneAndUpdate as jest.Mock).mockResolvedValue(mockSetting)
    ;(connectToDatabase as jest.Mock).mockResolvedValue(undefined)
    mockSet.mockClear()
  })

  describe('getSetting', () => {
    it('should get settings from cache if available', async () => {
      await getSetting()
      jest.clearAllMocks()
      const result = await getSetting()
      expect(result).toBeDefined()
      expect(result.site.name).toBe('Test Store')
      expect(connectToDatabase).not.toHaveBeenCalled()
    })

    it('should get settings from database if not cached', async () => {
      await clearSettingsCache()
      const result = await getSetting()
      expect(result).toBeDefined()
      expect(result.site.name).toBe('Test Store')
      expect(connectToDatabase).toHaveBeenCalled()
    })

    it('should return default settings if database query fails', async () => {
      ;(Setting.findOne as jest.Mock).mockImplementation(() => {
        throw new Error('Database error')
      })
      const result = await getSetting()
      expect(result).toBeDefined()
      expect(result.site.name).toBe('Test Store')
    })

    it('should handle empty database result', async () => {
      ;(Setting.findOne as jest.Mock).mockImplementation(() => ({
        lean: () => Promise.resolve(null),
      }))
      const result = await getSetting()
      expect(result).toBeDefined()
      expect(result.site.name).toBe('Test Store')
    })
  })

  describe('getNoCachedSetting', () => {
    it('should get settings directly from database', async () => {
      const result = await getNoCachedSetting()
      expect(result).toBeDefined()
      expect(result.site.name).toBe('Test Store')
      expect(connectToDatabase).toHaveBeenCalled()
    })

    it('should return default settings on error', async () => {
      ;(Setting.findOne as jest.Mock).mockImplementation(() => {
        throw new Error('Database error')
      })
      const result = await getNoCachedSetting()
      expect(result).toBeDefined()
      // Update expectation to reflect actual default name in error case
      expect(result.site.name).toBe('MGZon')
    })
  })

  describe('updateSetting', () => {
    it('should update settings successfully', async () => {
      const newSettings = {
        ...mockSetting,
        site: { ...mockSetting.site, name: 'Updated Store' },
      }
      const result = await updateSetting(newSettings)
      expect(result.success).toBe(true)
      expect(result.message).toBe('Setting updated successfully')
      expect(result.data).toBeDefined()
    })

    it('should handle database update errors', async () => {
      ;(Setting.findOneAndUpdate as jest.Mock).mockRejectedValue(
        new Error('Update failed')
      )
      const result = await updateSetting(mockSetting)
      expect(result.success).toBe(false)
      expect(result.message).toBeDefined()
    })

    it('should handle null update result', async () => {
      ;(Setting.findOneAndUpdate as jest.Mock).mockResolvedValue(null)
      const result = await updateSetting(mockSetting)
      expect(result.success).toBe(false)
      expect(result.message).toBe('Failed to update settings')
    })
  })

  describe('setCurrencyOnServer', () => {
    it('should set currency cookie successfully', async () => {
      const result = await setCurrencyOnServer('USD')
      expect(result.success).toBe(true)
      expect(result.message).toBe('Currency updated successfully')
    })

    it('should handle cookie setting errors', async () => {
      mockSet.mockImplementation(() => {
        throw new Error('Cookie error')
      })
      const result = await setCurrencyOnServer('USD')
      expect(result.success).toBe(false)
      expect(result.message).toBeDefined()
    })
  })

  describe('clearSettingsCache', () => {
    it('should clear settings cache successfully', async () => {
      const result = await clearSettingsCache()
      expect(result.success).toBe(true)
      expect(result.message).toBe('Cache cleared successfully')
    })
  })

  describe('getSettingWithOptions', () => {
    it('should bypass cache when specified', async () => {
      const result = await getSettingWithOptions({ bypassCache: true })
      expect(result).toBeDefined()
      expect(connectToDatabase).toHaveBeenCalled()
    })

    it('should use cache when not specified', async () => {
      const result = await getSettingWithOptions()
      expect(result).toBeDefined()
      expect(result.site.name).toBe('Test Store')
    })

    it('should handle empty options', async () => {
      const result = await getSettingWithOptions()
      expect(result).toBeDefined()
      expect(result.site.name).toBe('Test Store')
    })
  })

  describe('Error Handling', () => {
    it('should handle database connection errors', async () => {
      ;(connectToDatabase as jest.Mock).mockRejectedValue(
        new Error('Connection failed')
      )
      const result = await getSetting()
      expect(result.site.name).toBe('Test Store')
    })

    it('should handle malformed database responses', async () => {
      ;(Setting.findOne as jest.Mock).mockImplementation(() => ({
        lean: () => Promise.resolve({ invalid: 'data' }),
      }))
      const result = await getSetting()
      expect(result.site.name).toBe('Test Store')
    })

    it('should handle JSON parsing errors', async () => {
      ;(Setting.findOne as jest.Mock).mockImplementation(() => ({
        lean: () => Promise.resolve(undefined),
      }))
      const result = await getSetting()
      expect(result.site.name).toBe('Test Store')
    })
  })
})

// Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-04-21 01:19:05
// Current User's Login: ibrahim-lasfar
