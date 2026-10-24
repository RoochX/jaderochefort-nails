<script setup lang="ts">
import { niveaux, depose } from '~/data/tarifs'
import { instagramUrl } from '~/data/site'
</script>

<template>
  <section id="tarifs" class="py-16 md:py-24 bg-fuchsia-50/40 scroll-mt-16">
    <div class="max-w-5xl mx-auto px-4">
      <div class="text-center mb-12">
        <p class="text-violet-600 font-medium text-sm tracking-wide uppercase mb-2">Tarifs</p>
        <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900">Liste de prix</h2>
        <p class="text-gray-500 mt-3 max-w-xl mx-auto">
          Pose américaine en gel (gel-x) ou builder gel sur ongle naturel. Le prix dépend du niveau de design choisi.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div
          v-for="niveau in niveaux"
          :key="niveau.nom"
          class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col"
        >
          <div class="flex items-baseline justify-between mb-1">
            <h3 class="font-display text-2xl font-semibold text-gray-900">{{ niveau.nom }}</h3>
            <span class="text-sm text-gray-500">{{ niveau.duree }}</span>
          </div>
          <dl class="mt-3 mb-5 divide-y divide-gray-100 border-y border-gray-100">
            <div class="flex justify-between py-2.5">
              <dt class="text-gray-600 text-sm">Pose</dt>
              <dd class="font-semibold text-gray-900 text-lg">{{ niveau.pose }}</dd>
            </div>
            <div class="flex justify-between py-2.5">
              <dt class="text-gray-600 text-sm">Remplissage</dt>
              <dd class="font-semibold text-gray-900 text-lg">{{ niveau.remplissage }}</dd>
            </div>
          </dl>
          <p class="text-xs font-medium uppercase tracking-wide text-violet-600 mb-2">Exemples</p>
          <ul class="space-y-1.5 text-sm text-gray-600">
            <li v-for="ex in niveau.exemples" :key="ex" class="flex gap-2">
              <Icon name="mdi:check" class="text-pink-400 flex-shrink-0 mt-0.5" size="16" />
              <span>{{ ex }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
        <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <h3 class="font-display text-xl font-semibold text-gray-900">Dépose</h3>
            <p class="text-sm text-gray-500">{{ depose.duree }}</p>
          </div>
          <p class="font-semibold text-gray-900 text-lg">{{ depose.prix }}</p>
        </div>
        <div class="bg-violet-50 rounded-2xl p-6 border border-violet-100">
          <h3 class="font-display text-xl font-semibold text-violet-700">Garantie 1&nbsp;semaine</h3>
          <p class="text-sm text-gray-600 mt-1">Un bris ou un décollement? Écris-moi sans tarder.</p>
        </div>
      </div>

      <p class="text-center text-sm text-gray-500 mt-8 max-w-xl mx-auto">
        Remplissage aux 3&nbsp;semaines. Un dépôt de 10&nbsp;$ confirme ta réservation. Tu as une photo d’inspiration? Envoie-la-moi et je te confirme le niveau et le prix.
      </p>
      <div class="text-center mt-6">
        <NuxtLink
          :to="instagramUrl"
          target="_blank"
          class="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-pink-400 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:opacity-95 active:opacity-80 active:scale-[0.97] transition-all text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        >
          <Icon name="mdi:instagram" size="18" />
          Réserver sur Instagram
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
