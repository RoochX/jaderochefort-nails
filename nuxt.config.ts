import tailwindcss from '@tailwindcss/vite'
import { faqItems } from './app/data/faq'

const baseURL = (process.env.BASE_URL || '/').replace(/\/?$/, '/')

const beautySalonSchema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Nailss by Jade',
  description: 'Services de nail art à Drummondville, Québec',
  url: 'https://jaderochefort.com',
  email: 'jaderochefort7@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Drummondville',
    addressRegion: 'QC',
    addressCountry: 'CA'
  },
  priceRange: '$$',
  sameAs: ['https://www.instagram.com/nailss_by_jade/']
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item: { question: string; answer: string }) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
}

export default defineNuxtConfig({
  srcDir: 'app/',
  ssr: false,
  nitro: {
    preset: 'static'
  },
  devtools: { enabled: true },
  modules: ['@nuxt/icon'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    baseURL,
    head: {
      htmlAttrs: {
        lang: 'fr-CA'
      },
      meta: [
        { name: 'description', content: 'Services de nail art, ongles en gel et french manucure à Drummondville, Québec. Réserve ton rendez-vous sur Instagram.' },
        { property: 'og:title', content: 'Nailss by Jade | Nail Art à Drummondville' },
        { property: 'og:description', content: 'Services de nail art, ongles en gel et french manucure à Drummondville, Québec.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://jaderochefort.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Nailss by Jade | Nail Art à Drummondville' },
        { name: 'twitter:description', content: 'Services de nail art, ongles en gel et french manucure à Drummondville, Québec.' },
        { name: 'robots', content: 'noindex, nofollow' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(beautySalonSchema)
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(faqSchema)
        }
      ]
    }
  }
})
