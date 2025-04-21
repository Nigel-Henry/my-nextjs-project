'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ISettingInput } from '@/types'
import { CurrencyField, UseFieldArrayProps } from '@/types/form'
import { TrashIcon } from 'lucide-react'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'

interface CurrencyFormProps {
  form: UseFormReturn<ISettingInput>
  id: string
}

export default function CurrencyForm({ form, id }: CurrencyFormProps) {
  // Initialize field array for currencies with proper typing
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'availableCurrencies',
  } as UseFieldArrayProps<ISettingInput>)

  const {
    setValue,
    watch,
    control,
    formState: { errors },
  } = form

  const availableCurrencies = watch('availableCurrencies')
  const defaultCurrency = watch('defaultCurrency')

  // Memoize valid currencies
  const validCurrencies = useMemo(() => {
    return (
      availableCurrencies?.filter((currency): currency is CurrencyField =>
        Boolean(currency?.code)
      ) || []
    )
  }, [availableCurrencies])

  // Handle default currency validation
  useEffect(() => {
    const validCodes = validCurrencies.map((currency) => currency.code)
    if (defaultCurrency && !validCodes.includes(defaultCurrency)) {
      setValue('defaultCurrency', '')
    }
  }, [validCurrencies, defaultCurrency, setValue])

  // Memoize add currency handler
  const handleAddCurrency = useCallback(() => {
    const newCurrency: CurrencyField = {
      name: '',
      code: '',
      symbol: '',
      convertRate: 1,
    }
    append(newCurrency)
  }, [append])

  return (
    <Card id={id} className="shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Currency Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 border rounded-lg bg-background"
            >
              {/* Name Field */}
              <FormField
                control={control}
                name={`availableCurrencies.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && (
                      <FormLabel className="text-sm font-medium">
                        Currency Name
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="US Dollar"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage>
                      {errors.availableCurrencies?.[index]?.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Code Field */}
              <FormField
                control={control}
                name={`availableCurrencies.${index}.code`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && (
                      <FormLabel className="text-sm font-medium">
                        Currency Code
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="USD"
                        className="w-full uppercase"
                        maxLength={3}
                      />
                    </FormControl>
                    <FormMessage>
                      {errors.availableCurrencies?.[index]?.code?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Symbol Field */}
              <FormField
                control={control}
                name={`availableCurrencies.${index}.symbol`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && (
                      <FormLabel className="text-sm font-medium">
                        Currency Symbol
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="$"
                        className="w-full"
                        maxLength={3}
                      />
                    </FormControl>
                    <FormMessage>
                      {errors.availableCurrencies?.[index]?.symbol?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Convert Rate Field */}
              <FormField
                control={control}
                name={`availableCurrencies.${index}.convertRate`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && (
                      <FormLabel className="text-sm font-medium">
                        Conversion Rate
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.0001"
                        min="0"
                        placeholder="1.0000"
                        className="w-full"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value)
                          field.onChange(isNaN(value) ? 0 : value)
                        }}
                      />
                    </FormControl>
                    <FormMessage>
                      {
                        errors.availableCurrencies?.[index]?.convertRate
                          ?.message
                      }
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex items-end justify-end lg:justify-center">
                {index === 0 && (
                  <div className="hidden lg:block h-6 mb-2">Actions</div>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={`${
                    fields.length === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-destructive hover:text-destructive-foreground'
                  }`}
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  title={
                    fields.length === 1
                      ? 'Cannot remove last currency'
                      : 'Remove currency'
                  }
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Remove currency</span>
                </Button>
              </div>
            </div>
          ))}

          {/* Add Currency Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleAddCurrency}
            className="w-full"
          >
            Add New Currency
          </Button>
        </div>

        {/* Default Currency Selection */}
        <FormField
          control={control}
          name="defaultCurrency"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium">
                Default Currency
              </FormLabel>
              <Select value={field.value || ''} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select default currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {validCurrencies.map((currency, index) => (
                    <SelectItem key={index} value={currency.code}>
                      {currency.name} ({currency.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>{errors.defaultCurrency?.message}</FormMessage>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

// Current Date and Time (UTC): 2025-04-20 19:05:48
// Current User's Login: ibrahim-lasfar
