import { ISettingInput } from './index'

export type FieldArrayPath<T> = {
  [K in keyof T]: T[K] extends (infer V)[] ? K : never
}[keyof T]

export type ArrayFieldValue<
  T,
  K extends FieldArrayPath<T>,
> = T[K] extends (infer V)[] ? V : never

export interface UseFieldArrayProps<T> {
  control: any
  name: FieldArrayPath<T>
}

export type CarouselField = {
  title: string
  url: string
  image: string
  buttonCaption: string
  isPublished: boolean
}

export type PaymentMethodField = {
  name: string
  commission: number
}

export type LanguageField = {
  name: string
  code: string
}

export type DeliveryDateField = {
  name: string
  daysToDeliver: number
  shippingPrice: number
  freeShippingMinPrice: number
}

export type CurrencyField = {
  name: string
  code: string
  symbol: string
  convertRate: number
}
