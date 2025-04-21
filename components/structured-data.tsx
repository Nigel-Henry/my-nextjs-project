import React from 'react'

export interface StructuredDataProps {
  data: {
    '@context': string
    '@type': string
    [key: string]: unknown
  }
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      key={`structured-data-${data['@type']}`}
    />
  )
}

// Current Date and Time (UTC): 2025-04-20 15:59:45
// Current User's Login: ibrahim-lasfar
