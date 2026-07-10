<script setup lang="ts">
useHead({
  title: 'Mentions légales — Nailss by Jade',
  meta: [
    { name: 'description', content: 'Mentions légales du site Nailss by Jade — artisane en nail art à Drummondville, Québec.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-white py-16 md:py-24">
    <div class="max-w-3xl mx-auto px-4">
      <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 mb-8 transition-colors">
        &larr; Retour à l’accueil
      </NuxtLink>
      <h1 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-8">Mentions légales</h1>

      <div class="prose prose-sm prose-gray max-w-none space-y-8">
        <section>
          <h2 class="font-display text-xl font-semibold text-gray-900 mb-3">Propriétaire du site</h2>
          <p class="text-gray-600 leading-relaxed">
            <strong>Jade Rochefort</strong><br />
            Nailss by Jade<br />
            Drummondville, Québec, Canada<br />
            Courriel&nbsp;: bonjour@jaderochefort.com<br />
            Instagram&nbsp;: @nailss_by_jade
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-semibold text-gray-900 mb-3">Hébergement</h2>
          <p class="text-gray-600 leading-relaxed">
            Ce site est hébergé via <strong>GitHub Pages</strong> (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis).
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-semibold text-gray-900 mb-3">Propriété intellectuelle</h2>
          <p class="text-gray-600 leading-relaxed">
            L’ensemble du contenu de ce site (textes, photographies, illustrations, logos) est la propriété exclusive de Jade Rochefort, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation est interdite.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-semibold text-gray-900 mb-3">Responsabilité</h2>
          <p class="text-gray-600 leading-relaxed">
            Les informations présentées sur ce site sont fournies à titre indicatif. Jade Rochefort ne peut être tenue responsable des erreurs ou omissions, ni des dommages directs ou indirects résultant de l’utilisation du site.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-semibold text-gray-900 mb-3">Liens externes</h2>
          <p class="text-gray-600 leading-relaxed">
            Le site contient des liens vers Instagram. Jade Rochefort n’est pas responsable du contenu ou des pratiques de ces plateformes tierces.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
