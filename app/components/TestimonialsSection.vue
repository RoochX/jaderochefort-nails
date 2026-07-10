<script setup lang="ts">
import { testimonials } from '~/data/testimonials'

const current = ref(0)
const total = testimonials.length

function next() {
  current.value = (current.value + 1) % total
}

function prev() {
  current.value = (current.value - 1 + total) % total
}

let interval = setInterval(next, 5000)

onUnmounted(() => {
  clearInterval(interval)
})

watch(current, () => {
  clearInterval(interval)
  interval = setInterval(next, 5000)
})
</script>

<template>
  <section id="testimonials" class="py-16 md:py-24 bg-white scroll-mt-16">
    <div class="max-w-3xl mx-auto px-4 text-center">
      <p class="text-violet-600 font-medium text-sm tracking-wide uppercase mb-2">Témoignages</p>
      <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-12">Ce que mes clientes disent</h2>
      <div class="relative">
        <Transition name="fade" mode="out-in">
          <div :key="current" class="bg-fuchsia-50/60 rounded-2xl p-6 md:p-10 border border-fuchsia-100/50 min-h-[200px] md:min-h-[180px] flex flex-col justify-center">
            <Icon name="mdi:format-quote-open" class="text-violet-300/40 text-4xl md:text-5xl mb-4" />
            <p class="text-gray-700 text-base md:text-lg leading-relaxed italic mb-6">
              « {{ testimonials[current].text }} »
            </p>
            <p class="font-display font-semibold text-gray-900">{{ testimonials[current].name }}</p>
          </div>
        </Transition>
        <div class="flex items-center justify-center gap-3 mt-6">
          <button @click="prev" class="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-fuchsia-100 text-gray-400 hover:text-violet-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" aria-label="Témoignage précédent">
            <Icon name="mdi:chevron-left" size="24" />
          </button>
          <div class="flex gap-2">
            <button
              v-for="(_, i) in testimonials"
              :key="i"
              @click="current = i"
              class="w-2.5 h-2.5 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              :class="i === current ? 'bg-gradient-to-r from-violet-500 to-pink-400 w-6' : 'bg-gray-300 hover:bg-gray-400'"
              :aria-label="`Témoignage ${i + 1}`"
            />
          </div>
          <button @click="next" class="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-fuchsia-100 text-gray-400 hover:text-violet-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" aria-label="Témoignage suivant">
            <Icon name="mdi:chevron-right" size="24" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
