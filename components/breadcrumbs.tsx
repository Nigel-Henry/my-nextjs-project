'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import StructuredData from './structured-data'
import { Fragment, useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaItem {
  '@type': 'ListItem'
  position: number
  name: string
  item: string
}

interface BreadcrumbSchema {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbSchemaItem[]
  [key: string]: unknown
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const [schema, setSchema] = useState<BreadcrumbSchema | null>(null)

  useEffect(() => {
    const generateSchema = () => {
      const paths = pathname.split('/').filter(Boolean)
      const items: BreadcrumbItem[] = paths.map((path, index) => ({
        name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        url: '/' + paths.slice(0, index + 1).join('/'),
      }))

      const schemaData: BreadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: window.location.origin + item.url,
        })),
      }

      setSchema(schemaData)
    }

    generateSchema()
  }, [pathname])

  const paths = pathname.split('/').filter(Boolean)

  if (paths.length <= 1) return null

  return (
    <>
      {schema && <StructuredData data={schema} />}
      <nav
        className="flex"
        aria-label="Breadcrumb"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol className="flex items-center space-x-2">
          <li
            itemScope
            itemType="https://schema.org/ListItem"
            itemProp="itemListElement"
          >
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700"
              itemProp="item"
            >
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          {paths.map((path, index) => (
            <Fragment key={path}>
              <ChevronRight
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <li
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                <Link
                  href={'/' + paths.slice(0, index + 1).join('/')}
                  className={`${
                    index === paths.length - 1
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  itemProp="item"
                  aria-current={index === paths.length - 1 ? 'page' : undefined}
                >
                  <span itemProp="name">
                    {path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')}
                  </span>
                </Link>
                <meta itemProp="position" content={`${index + 2}`} />
              </li>
            </Fragment>
          ))}
        </ol>
      </nav>
    </>
  )
}

// Current Date and Time (UTC): 2025-04-21 02:48:16
// Current User's Login: ibrahim-lasfar