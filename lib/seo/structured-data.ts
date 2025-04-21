export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

export const generateReviewSchema = (review: {
  itemReviewed: string
  reviewRating: number
  author: string
  reviewBody: string
  datePublished: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'Product',
    name: review.itemReviewed,
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.reviewRating,
  },
  author: {
    '@type': 'Person',
    name: review.author,
  },
  reviewBody: review.reviewBody,
  datePublished: review.datePublished,
})

export const generateArticleSchema = (article: {
  headline: string
  image: string
  datePublished: string
  dateModified: string
  authorName: string
  description: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.headline,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified,
  author: {
    '@type': 'Person',
    name: article.authorName,
  },
  description: article.description,
})
