<script setup lang="ts">
useHead({
  title: 'Politique de confidentialité — Nailss by Jade',
  meta: [
    { name: 'description', content: 'Politique de confidentialité et utilisation des cookies — Nailss by Jade, services de nail art à Drummondville.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-white py-16 md:py-24">
    <div class="max-w-3xl mx-auto px-4">
      <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 mb-8 transition-colors">
        &larr; Retour à l’accueil
      </NuxtLink>
      <h1 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-8">Politique de confidentialité</h1>

      <div class="prose prose-sm prose-gray max-w-none space-y-8">
        <section>
          <h2 class="font-display text-xl font-semibold text-gray-900 mb-3">Collecte de renseignements</h2>
          <p class="text-gray-600 leading-relaxed">
            Ce site ne collecte aucun renseignement personnel. Aucun formulaire n’est actif et aucune donnée n’est stockée sur un serveur.
          </p>
          <p class="text-gray-600 leading-relaxed">
            Si tu communiques avec Jade via Instagram ou par courriel, les renseignements que tu partages (nom, adresse courriel, numéro de téléphone) sont conservés uniquement dans le cadre de la relation client et ne sont jamais revendus ni partagés.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-semibold text-gray-900 mb-3">Utilisation des cookies</h2>
          <p class="text-gray-600 leading-relaxed">
            Ce site n’utilise <strong>aucun cookie</strong> de traçage, de publicité ou d’analyse (pas de Google Analytics, Meta Pixel ou autre service du genre).
          </p>
          <p class="text-gray-600 leading-relaxed">
            Aucune donnée de navigation n’est collectée, stockée ou partagée.
          </p>
          <p class="text-gray-600 leading-relaxed">
            Aucun cookie tiers n’est déposé lors de ta visite sur ce site.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-semibold text-gray-900 mb-3">Liens vers Instagram</h2>
          <p class="text-gray-600 leading-relaxed">
            Ce site contient des liens vers Instagram. En cliquant sur ces liens, tu quittes le site Nailss by Jade et es soumis à la politique de confidentialité d’Instagram (Meta Platforms, Inc.).
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-semibold text-gray-900 mb-3">Hébergement</h2>
          <p class="text-gray-600 leading-relaxed">
            Ce site est hébergé par GitHub Pages. GitHub peut collecter des informations techniques dans le cadre de son service d’hébergement. Consulte la <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" class="text-violet-600 hover:text-violet-700 underline">Politique de confidentialité de GitHub</a> pour plus de détails.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p class="text-gray-600 leading-relaxed">
            Pour toute question concernant cette politique de confidentialité, tu peux me joindre par courriel à bonjour@jaderochefort.com ou sur Instagram à @nailss_by_jade.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
