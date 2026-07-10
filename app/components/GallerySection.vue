<script setup lang="ts">
const instagramUrl = 'https://www.instagram.com/nailss_by_jade/'

const config = useRuntimeConfig()
const baseURL = config.app.baseURL

const images = [
  '572516858_17877637593423260_2957552499574864634_n.jpg',
  '591167701_17882239821423260_3525943042638664568_n.jpg',
  '592104504_17881491015423260_6234504207636889470_n.jpg',
  '642899685_17892235587423260_167752332746886281_n.jpg',
  '645765584_17892921216423260_62178731648198765_n.jpg',
  '658212154_17898685758423260_3386606408666925994_n.jpg',
  '670451995_17904348081423260_4387472491031328302_n.jpg',
  '670876667_17900491059423260_286971452978608333_n.jpg',
  '681999587_17901138609423260_7307157495429812775_n.jpg'
]
</script>

<template>
  <section id="galerie" class="py-16 md:py-24 bg-fuchsia-50/40 scroll-mt-16">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <p class="text-violet-600 font-medium text-sm tracking-wide uppercase mb-2">Galerie</p>
        <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900">Mes créations</h2>
        <p class="text-gray-500 mt-3 max-w-md mx-auto">Un aperçu de mon travail. Suis-moi sur Instagram pour voir mes dernières réalisations.</p>
      </div>
      <ClientOnly>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          <div v-for="(img, i) in images" :key="i" class="aspect-square overflow-hidden rounded-lg md:rounded-xl bg-gray-100">
            <img
              :src="baseURL + 'images/' + img"
              :alt="`Création nail art ${i + 1}`"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
        <template #fallback>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            <div v-for="i in 9" :key="i" class="aspect-square rounded-lg md:rounded-xl bg-gray-200 animate-pulse" />
          </div>
        </template>
      </ClientOnly>
      <div class="text-center mt-8">
        <NuxtLink
          :to="instagramUrl"
          target="_blank"
          class="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-pink-400 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:opacity-95 active:opacity-80 active:scale-[0.97] transition-all text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        >
          <Icon name="mdi:instagram" size="18" />
          Voir plus sur Instagram
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
