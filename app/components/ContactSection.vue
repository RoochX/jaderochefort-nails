<script setup lang="ts">
const instagramUrl = "https://www.instagram.com/nailss_by_jade/";
</script>

<template>
  <section id="contact" class="py-16 md:py-24 bg-white scroll-mt-16">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-12">
        <p class="text-violet-600 font-medium text-sm tracking-wide uppercase mb-2">Contact</p>
        <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900">Prenons rendez-vous</h2>
        <p class="text-gray-500 mt-3">Le moyen le plus rapide est de m’&eacute;crire sur Instagram!</p>
      </div>
      <div class="max-w-lg mx-auto text-center">
        <div class="bg-fuchsia-50/60 rounded-2xl p-8 md:p-10 shadow-sm border border-fuchsia-100">
          <h3 class="font-display text-xl font-semibold text-gray-900 mb-6">Coordonnées</h3>
          <div class="space-y-5">
            <div class="flex items-center gap-4 justify-center">
              <div class="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:map-marker-outline" class="text-violet-600" size="20" />
              </div>
              <div class="text-left">
                <p class="font-medium text-gray-900">Drummondville</p>
                <p class="text-gray-500 text-sm">Québec, Canada</p>
              </div>
            </div>
            <div class="flex items-center gap-4 justify-center">
              <div class="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:email-outline" class="text-violet-600" size="20" />
              </div>
              <div class="text-left">
                <p class="font-medium text-gray-900">Courriel</p>
                <a href="mailto:jaderochefort7@gmail.com" class="text-violet-600 hover:text-violet-700 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded">jaderochefort7@gmail.com</a>
              </div>
            </div>
            <div class="flex items-center gap-4 justify-center">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-400 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:instagram" class="text-white" size="20" />
              </div>
              <div class="text-left">
                <p class="font-medium text-gray-900">Instagram</p>
                <NuxtLink
                  :to="instagramUrl"
                  target="_blank"
                  class="text-violet-600 hover:text-violet-700 active:text-violet-800 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                >
                  @nailss_by_jade
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="mt-8 pt-6 border-t border-fuchsia-200">
            <NuxtLink
              :to="instagramUrl"
              target="_blank"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-pink-400 text-white px-8 py-3.5 rounded-full font-medium shadow-md hover:shadow-lg hover:opacity-95 active:opacity-80 active:scale-[0.97] transition-all text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <Icon name="mdi:instagram" size="20" />
              Réserver sur Instagram
            </NuxtLink>
          </div>
        </div>
        <div v-if="false">
          <h3 class="font-display text-xl font-semibold text-gray-900 mb-4">Envoyer un message</h3>
          <form action="https://formspree.io/f/xxxxxx" method="POST" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ton nom"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-shadow invalid:border-red-400 invalid:focus:ring-red-500"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Courriel</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="ton@courriel.com"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-shadow invalid:border-red-400 invalid:focus:ring-red-500"
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                placeholder="Ton message..."
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-shadow resize-none invalid:border-red-400 invalid:focus:ring-red-500"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-gradient-to-r from-violet-500 to-pink-400 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:opacity-95 active:opacity-80 active:scale-[0.98] transition-all text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
