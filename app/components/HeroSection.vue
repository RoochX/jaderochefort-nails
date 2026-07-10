<script setup lang="ts">
const instagramUrl = "https://www.instagram.com/nailss_by_jade/";
</script>

<template>
  <section class="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-violet-500/10 via-white to-pink-300/10">
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80"
        alt="Nail art"
        class="w-full h-full object-cover opacity-15 md:opacity-20"
        loading="eager"
        fetchpriority="high"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
    </div>
    <div class="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24 w-full">
      <div class="max-w-2xl">
        <p class="text-violet-600 font-medium text-sm md:text-base tracking-wide uppercase mb-3">Nail art à Drummondville</p>
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          L’art du nail art,
          <span class="bg-gradient-to-r from-violet-500 to-pink-400 bg-clip-text text-transparent">autrement</span>
        </h1>
        <p class="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
           Des créations uniques, faites à la main, pour des ongles qui te ressemblent. Chaque design raconte une histoire.
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <NuxtLink
            :to="instagramUrl"
            target="_blank"
            class="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-pink-400 text-white px-8 py-3.5 rounded-full font-medium shadow-lg hover:shadow-xl hover:opacity-95 active:opacity-80 active:scale-[0.97] transition-all text-sm md:text-base"
          >
            <Icon name="mdi:instagram" size="20" />
            Réserver sur Instagram
          </NuxtLink>
          <NuxtLink
            to="#services"
            class="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-8 py-3.5 rounded-full font-medium hover:border-violet-300 hover:text-violet-600 active:bg-gray-100 active:scale-[0.97] transition-all text-sm md:text-base"
          >
            Découvrir mes services
            <Icon name="mdi:arrow-down" size="18" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
  </section>
</template>
