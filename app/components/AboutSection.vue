<script setup lang="ts">
const instagramUrl = "https://www.instagram.com/nailss_by_jade/";
</script>

<template>
  <section id="a-propos" class="py-16 md:py-24 bg-white scroll-mt-16">
    <div class="max-w-6xl mx-auto px-4">
      <div class="max-w-2xl mx-auto text-center">
        <div>
          <p class="text-violet-600 font-medium text-sm tracking-wide uppercase mb-2">À propos</p>
          <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">Salut, c’est Jade!</h2>
          <div class="text-gray-600 space-y-3 leading-relaxed">
            <p>
              Les ongles, c’est ma passion depuis longtemps. J’ai suivi une formation en pose américaine en gel chez Ongles&nbsp;DW (2026) pour en faire
              mon métier, et je crée des designs uniques qui mettent en valeur ta personnalité.
            </p>
            <p>
              Mon approche? Un service personnalisé, dans une ambiance détendue, à mon domicile à Drummondville. Chaque cliente est unique, et chaque pose est
              conçue sur mesure pour toi.
            </p>
            <p>J’utilise des produits de qualité et je reste à l’affût des tendances pour t’offrir un résultat soigné qui dure. D’ailleurs, je garantis mes poses pendant 1&nbsp;semaine.</p>
          </div>
          <NuxtLink
            :to="instagramUrl"
            target="_blank"
            class="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-violet-500 to-pink-400 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:opacity-95 active:opacity-80 active:scale-[0.97] transition-all text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <Icon name="mdi:instagram" size="18" />
            Suis-moi sur Instagram
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
