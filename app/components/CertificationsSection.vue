<script setup lang="ts">
const { certifications } = useCertifications()
</script>

<template>
  <section id="certifications" class="py-16 md:py-24 bg-fuchsia-50/40 scroll-mt-16">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <p class="text-violet-600 font-medium text-sm tracking-wide uppercase mb-2">Certifications</p>
        <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900">Ma formation</h2>
        <p class="text-gray-500 mt-3 max-w-md mx-auto">Des compétences reconnues pour des services de qualité.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
        <div v-for="cert in certifications" :key="cert.title" class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-pink-400 flex items-center justify-center mb-4">
            <Icon :name="cert.icon" class="text-white" size="24" />
          </div>
          <h3 class="font-display font-semibold text-gray-900 text-lg mb-1">{{ cert.title }}</h3>
          <p class="text-gray-500 text-sm">{{ cert.issuer }}</p>
          <p class="text-violet-600 text-xs font-medium mt-2">{{ cert.year }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
