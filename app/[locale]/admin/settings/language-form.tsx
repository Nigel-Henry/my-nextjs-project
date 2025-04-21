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
import { LanguageField, UseFieldArrayProps } from '@/types/form'
import { TrashIcon } from 'lucide-react'
import React, { useEffect, useMemo } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'

export default function LanguageForm({
  form,
  id,
}: {
  form: UseFormReturn<ISettingInput>
  id: string
}) {
  const { fields, append, remove } = useFieldArray<ISettingInput>({
    control: form.control,
    name: 'availableLanguages',
  } as UseFieldArrayProps<ISettingInput>)

  const {
    setValue,
    watch,
    control,
    formState: { errors },
  } = form

  const availableLanguages = watch('availableLanguages')
  const defaultLanguage = watch('defaultLanguage')

  // Memoize the validation of language codes
  const validLanguageCodes = useMemo(
    () => availableLanguages.map((lang) => lang.code),
    [availableLanguages]
  )

  useEffect(() => {
    if (!validLanguageCodes.includes(defaultLanguage)) {
      setValue('defaultLanguage', validLanguageCodes[0] || '')
    }
  }, [validLanguageCodes, defaultLanguage, setValue])

  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`availableLanguages.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Name</FormLabel>}
                    <FormControl>
                      <Input {...field} placeholder="Name" />
                    </FormControl>
                    <FormMessage>
                      {errors.availableLanguages?.[index]?.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`availableLanguages.${index}.code`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Code</FormLabel>}
                    <FormControl>
                      <Input {...field} placeholder="Code" />
                    </FormControl>
                    <FormMessage>
                      {errors.availableLanguages?.[index]?.code?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <div>
                {index === 0 && <div>Action</div>}
                <Button
                  type="button"
                  disabled={fields.length === 1}
                  variant="outline"
                  className={index === 0 ? 'mt-2' : ''}
                  onClick={() => remove(index)}
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                name: '',
                code: '',
              } as LanguageField)
            }
          >
            Add Language
          </Button>
        </div>

        <FormField
          control={control}
          name="defaultLanguage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Language</FormLabel>
              <FormControl>
                <Select
                  value={field.value || ''}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages
                      .filter((x) => x.code)
                      .map((lang, index) => (
                        <SelectItem key={index} value={lang.code}>
                          {lang.name} ({lang.code})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{errors.defaultLanguage?.message}</FormMessage>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

// Current Date and Time (UTC): 2025-04-21 02:40:17
// Current User's Login: ibrahim-lasfar