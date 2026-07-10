<script setup lang="ts">
const services = [
  {
    title: 'Ongles en gel',
    description: "Pose et remplissage d'ongles en gel pour un rendu naturel et durable. Résultat impeccable pendant 3 \u00e0 4 semaines.",
    icon: 'mdi:sparkles'
  },
  {
    title: 'Nail art',
    description: 'Designs personnalisés, motifs tendance et créations uniques. Laisse libre cours à ton imagination.',
    icon: 'mdi:brush'
  },
  {
    title: 'French manucure',
    description: 'La French manucure classique ou revisité, élégante et intemporelle. Parfaite pour toutes les occasions.',
    icon: 'mdi:heart-outline'
  },
  {
    title: 'Soins des mains',
    description: 'Soin complet des mains avec hydratation en profondeur. Des mains douces et des cuticules bien entretenues.',
    icon: 'mdi:hand-back-left-outline'
  }
]
</script>

<template>
  <section id="services" class="py-16 md:py-24 bg-white scroll-mt-16">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <p class="text-violet-600 font-medium text-sm tracking-wide uppercase mb-2">Services</p>
        <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900">Ce que je propose</h2>
        <p class="text-gray-500 mt-3 max-w-md mx-auto">Des services adaptés à tes besoins, réalisés avec passion et professionnalisme.</p>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <div v-for="service in services" :key="service.title" class="group bg-fuchsia-50/60 hover:bg-fuchsia-50 rounded-xl p-4 md:p-6 transition-all hover:shadow-md border border-transparent hover:border-fuchsia-200">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-violet-500 to-pink-400 flex items-center justify-center mb-3 md:mb-4">
            <Icon :name="service.icon" class="text-white" size="22" />
          </div>
          <h3 class="font-display font-semibold text-gray-900 text-sm md:text-lg mb-1.5 md:mb-2">{{ service.title }}</h3>
          <p class="text-gray-500 text-xs md:text-sm leading-relaxed">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
