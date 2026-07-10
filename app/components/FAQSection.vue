<script setup lang="ts">
import { faqItems } from '~/data/faq'
import type { FAQItem } from '~/data/faq'

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section id="faq" class="py-16 md:py-24 bg-fuchsia-50/40 scroll-mt-16">
    <div class="max-w-3xl mx-auto px-4">
      <div class="text-center mb-12">
        <p class="text-violet-600 font-medium text-sm tracking-wide uppercase mb-2">FAQ</p>
        <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900">Questions fréquentes</h2>
      </div>
      <div class="space-y-2">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="bg-white rounded-xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-sm"
        >
          <button
            @click="toggle(index)"
            class="w-full flex items-center justify-between px-4 md:px-6 py-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <span class="font-medium text-gray-900 text-sm md:text-base pr-4">{{ item.question }}</span>
            <Icon
              :name="openIndex === index ? 'mdi:chevron-up' : 'mdi:chevron-down'"
              size="20"
              class="text-gray-400 flex-shrink-0 transition-transform duration-300"
            />
          </button>
          <Transition name="slide-down">
            <div
              v-if="openIndex === index"
              class="px-4 md:px-6 pb-4"
            >
              <p class="text-gray-600 text-sm md:text-base leading-relaxed">{{ item.answer }}</p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
