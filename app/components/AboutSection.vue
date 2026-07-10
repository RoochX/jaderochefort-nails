<script setup lang="ts">
const instagramUrl = "https://www.instagram.com/nailss_by_jade/";
</script>

<template>
  <section id="a-propos" class="py-16 md:py-24 bg-white scroll-mt-16">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div class="w-48 md:w-72 flex-shrink-0">
          <div class="aspect-square rounded-2xl bg-gradient-to-br from-violet-200 to-pink-200 overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80"
              alt="Jade Rochefort"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <p class="text-violet-600 font-medium text-sm tracking-wide uppercase mb-2">À propos</p>
          <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">Salut, c’est Jade!</h2>
          <div class="text-gray-600 space-y-3 leading-relaxed">
            <p>
              Passionnée par l’art des ongles depuis toujours, j’ai décidé de transformer ma passion en art. Diplômée en stylisme d’ongles (2026), je crée des
              designs uniques qui mettent en valeur ta personnalité.
            </p>
            <p>
              Mon approche? Un service personnalisé, dans une ambiance détendue, à mon domicile à Drummondville. Chaque cliente est unique, et chaque pose est
              conçue sur mesure pour toi.
            </p>
            <p>J’utilise des produits de qualité et je reste à l’affût des dernières tendances pour t’offrir un résultat impeccable qui dure dans le temps.</p>
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
