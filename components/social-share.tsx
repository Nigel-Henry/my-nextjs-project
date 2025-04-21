'use client'

import { Twitter, Facebook, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SocialShareProps {
  url: string
  title: string
  description: string
}

interface ShareLink {
  name: string
  icon: React.ComponentType<{ className?: string }>
  url: string
  className: string
}

export default function SocialShare({
  url,
  title,
  description,
}: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks: ShareLink[] = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      className: 'hover:text-blue-400',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: 'hover:text-blue-600',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      className: 'hover:text-blue-700',
    },
  ]

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex space-x-4">
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="icon"
          onClick={() => handleShare(link.url)}
          className={`text-gray-600 ${link.className}`}
          aria-label={`Share on ${link.name}`}
        >
          <link.icon className="h-5 w-5" />
        </Button>
      ))}
    </div>
  )
}

// Current Date and Time (UTC): 2025-04-19 23:17:55
// Current User's Login: ibrahim-lasfar
