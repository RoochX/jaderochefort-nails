<script setup lang="ts">
import { navLinks as links, instagramUrl } from '~/data/site'
</script>

<template>
  <footer class="bg-gray-900 text-gray-300 py-10 md:py-14">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <div>
          <h3 class="font-display text-xl font-bold text-white mb-3">Nailss by Jade</h3>
          <p class="text-sm leading-relaxed text-gray-400">
            Nail art à Drummondville, Québec. Des créations uniques pour des ongles qui te ressemblent.
          </p>
        </div>
        <div>
          <h4 class="font-medium text-white mb-3 text-sm uppercase tracking-wide">Navigation</h4>
          <ul class="space-y-1.5">
            <li v-for="link in links" :key="link.href">
              <NuxtLink :to="link.href" class="text-sm text-gray-400 hover:text-violet-400 transition-colors">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-medium text-white mb-3 text-sm uppercase tracking-wide">Suis-moi</h4>
          <NuxtLink
            :to="instagramUrl"
            target="_blank"
            class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-pink-400 active:text-pink-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            <Icon name="mdi:instagram" size="16" />
            @nailss_by_jade
          </NuxtLink>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div class="flex items-center gap-4">
          <NuxtLink to="/mentions-legales" class="hover:text-violet-400 transition-colors">Mentions légales</NuxtLink>
          <NuxtLink to="/politique-confidentialite" class="hover:text-violet-400 transition-colors">Confidentialité &amp; cookies</NuxtLink>
        </div>
        <p>&copy; {{ new Date().getFullYear() }} Jade Rochefort &mdash; Nailss by Jade. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>
