import {
  CarouselSchema,
  CartSchema,
  DeliveryDateSchema,
  OrderInputSchema,
  OrderItemSchema,
  PaymentMethodSchema,
  ProductInputSchema,
  ReviewInputSchema,
  SettingInputSchema,
  ShippingAddressSchema,
  SiteCurrencySchema,
  SiteLanguageSchema,
  UserInputSchema,
  UserNameSchema,
  UserSignInSchema,
  UserSignUpSchema,
  WebPageInputSchema,
} from '@/lib/validator'
import { z } from 'zod'

// Base interfaces
export interface ISiteInfo {
  name: string
  slogan: string
  description: string
  url: string
  logo: string
  keywords: string
  email: string
  phone: string
  author: string
  copyright: string
  address: string
  [key: string]: unknown
}

export interface ICommonSettings {
  pageSize: number
  isMaintenanceMode: boolean
  freeShippingMinPrice: number
  defaultTheme: string
  defaultColor: string
}

export interface ISettingInput {
  site: ISiteInfo
  common: ICommonSettings
  availableLanguages: Array<{
    name: string
    code: string
  }>
  carousels: Array<{
    title: string
    url: string
    image: string
    buttonCaption: string
    isPublished: boolean
  }>
  defaultLanguage: string
  availableCurrencies: Array<{
    name: string
    code: string
    symbol: string
    convertRate: number
  }>
  defaultCurrency: string
  availablePaymentMethods: Array<{
    name: string
    commission: number
  }>
  defaultPaymentMethod: string
  availableDeliveryDates: Array<{
    name: string
    daysToDeliver: number
    shippingPrice: number
    freeShippingMinPrice: number
  }>
  defaultDeliveryDate: string
  [key: string]: unknown
}

// Site configuration types
export type SiteLanguage = z.infer<typeof SiteLanguageSchema>
export type SiteCurrency = z.infer<typeof SiteCurrencySchema>
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>
export type DeliveryDate = z.infer<typeof DeliveryDateSchema>
export type ICarousel = z.infer<typeof CarouselSchema>

// Review types
export type IReviewInput = z.infer<typeof ReviewInputSchema>
export type IReviewDetails = IReviewInput & {
  _id: string
  createdAt: string
  user: {
    name: string
  }
}

// Product types
export type IProductInput = z.infer<typeof ProductInputSchema>

// Order types
export type IOrderInput = z.infer<typeof OrderInputSchema>
export type IOrderList = IOrderInput & {
  _id: string
  user: {
    name: string
    email: string
  }
  createdAt: Date
}
export type OrderItem = z.infer<typeof OrderItemSchema>
export type Cart = z.infer<typeof CartSchema>
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>

// User types
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
export type IUserSignUp = z.infer<typeof UserSignUpSchema>
export type IUserName = z.infer<typeof UserNameSchema>

// Webpage types
export type IWebPageInput = z.infer<typeof WebPageInputSchema>

// Client setting types
export type ClientSetting = ISettingInput & {
  currency: string
}

// Data structure types
export type Data = {
  settings: ISettingInput[]
  webPages: IWebPageInput[]
  users: IUserInput[]
  products: IProductInput[]
  reviews: {
    title: string
    rating: number
    comment: string
  }[]
  headerMenus: {
    name: string
    href: string
  }[]
  carousels: {
    image: string
    url: string
    title: string
    buttonCaption: string
    isPublished: boolean
  }[]
}

// Current Date and Time (UTC): 2025-04-20 15:59:45
// Current User's Login: ibrahim-lasfar
