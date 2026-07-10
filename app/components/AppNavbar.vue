<script setup lang="ts">
const isMenuOpen = ref(false)

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'À propos', href: '#a-propos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' }
]

const instagramUrl = 'https://www.instagram.com/nailss_by_jade/'
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-500 to-pink-400 bg-clip-text text-transparent font-display">
        Nailss by Jade
      </NuxtLink>
      <div class="hidden md:flex items-center gap-6">
        <NuxtLink v-for="link in links" :key="link.href" :to="link.href" class="text-gray-600 hover:text-violet-600 active:text-violet-800 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded">
          {{ link.label }}
        </NuxtLink>
        <NuxtLink :to="instagramUrl" target="_blank" class="inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-500 to-pink-400 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 active:opacity-80 transition-opacity shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
          <Icon name="mdi:instagram" size="16" />
          Instagram
        </NuxtLink>
      </div>
      <button class="md:hidden p-2 text-gray-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded" @click="isMenuOpen = !isMenuOpen" :aria-label="isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'" :aria-expanded="isMenuOpen.toString()">
        <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" size="28" />
      </button>
    </div>
    <Transition name="slide-down">
      <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
      <NuxtLink v-for="link in links" :key="link.href" :to="link.href" class="block text-gray-600 hover:text-violet-600 active:text-violet-800 transition-colors py-2.5 px-2 font-medium rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" @click="isMenuOpen = false">
        {{ link.label }}
      </NuxtLink>
      <NuxtLink :to="instagramUrl" target="_blank" class="inline-flex items-center justify-center gap-1.5 w-full bg-gradient-to-r from-violet-500 to-pink-400 text-white px-4 py-3 rounded-full text-sm font-medium mt-2 active:opacity-80 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" @click="isMenuOpen = false">
        <Icon name="mdi:instagram" size="16" />
        Réserver sur Instagram
      </NuxtLink>
    </div>
    </Transition>
  </nav>
  <div class="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 px-3 py-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
    <NuxtLink :to="instagramUrl" target="_blank" class="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-violet-500 to-pink-400 text-white py-3 rounded-full font-medium text-sm shadow-lg hover:opacity-95 active:opacity-80 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
      <Icon name="mdi:instagram" size="18" />
      Réserver sur Instagram
    </NuxtLink>
  </div>
</template>
