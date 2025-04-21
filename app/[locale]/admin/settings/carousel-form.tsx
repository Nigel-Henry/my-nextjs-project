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
import { toast } from '@/hooks/use-toast'
import { UploadButton } from '@/lib/uploadthing'
import { ISettingInput } from '@/types'
import { CarouselField, UseFieldArrayProps } from '@/types/form'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { useFieldArray, UseFormReturn } from 'react-hook-form'

interface CarouselFormProps {
  form: UseFormReturn<ISettingInput>
  id: string
}

export default function CarouselForm({ form, id }: CarouselFormProps) {
  const { fields, append, remove } = useFieldArray<ISettingInput>({
    control: form.control,
    name: 'carousels',
  } as UseFieldArrayProps<ISettingInput>)

  const {
    watch,
    formState: { errors },
  } = form

  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>Carousels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex justify-between gap-1 w-full">
              <FormField
                control={form.control}
                name={`carousels.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Title</FormLabel>}
                    <FormControl>
                      <Input {...field} placeholder="Title" />
                    </FormControl>
                    <FormMessage>
                      {errors.carousels?.[index]?.title?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`carousels.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>URL</FormLabel>}
                    <FormControl>
                      <Input {...field} placeholder="URL" />
                    </FormControl>
                    <FormMessage>
                      {errors.carousels?.[index]?.url?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`carousels.${index}.buttonCaption`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Caption</FormLabel>}
                    <FormControl>
                      <Input {...field} placeholder="Button Caption" />
                    </FormControl>
                    <FormMessage>
                      {errors.carousels?.[index]?.buttonCaption?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name={`carousels.${index}.image`}
                  render={({ field }) => (
                    <FormItem>
                      {index === 0 && <FormLabel>Image</FormLabel>}
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watch(`carousels.${index}.image`) && (
                  <Image
                    src={watch(`carousels.${index}.image`)}
                    alt="Carousel image"
                    className="w-full object-cover object-center rounded-sm"
                    width={192}
                    height={68}
                  />
                )}
                {!watch(`carousels.${index}.image`) && (
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]?.url) {
                        form.setValue(`carousels.${index}.image`, res[0].url)
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast({
                        variant: 'destructive',
                        description: `Error: ${error.message}`,
                      })
                    }}
                  />
                )}
              </div>
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
                title: '',
                url: '',
                image: '',
                buttonCaption: '',
                isPublished: true,
              } as CarouselField)
            }
          >
            Add Carousel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
