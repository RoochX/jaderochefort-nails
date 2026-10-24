// Fonctions « système » de l'outil web : sauvegarde dans le navigateur, photos, création des images et du PDF.
// Remplace le pont Electron de la version de bureau ; l'interface (app.js) appelle window.outil.
(function () {
  const CLE = 'nailss-by-jade:affiches:v1'
  const clone = (o) => JSON.parse(JSON.stringify(o))
  const attendre = (ms) => new Promise((r) => setTimeout(r, ms))

  function choisirFichier (accept) {
    return new Promise((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = accept
      input.addEventListener('change', () => resolve(input.files[0] || null), { once: true })
      input.click()
    })
  }

  // Réduit la photo (max 1600 px, JPEG) pour qu'elle tienne dans l'espace de sauvegarde du navigateur.
  async function compresserPhoto (fichier) {
    const url = URL.createObjectURL(fichier)
    try {
      const img = await new Promise((resolve, reject) => {
        const i = new Image()
        i.onload = () => resolve(i)
        i.onerror = () => reject(new Error('Cette photo n’a pas pu être lue. Essaie une photo JPEG ou PNG.'))
        i.src = url
      })
      const ratio = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight))
      const c = document.createElement('canvas')
      c.width = Math.round(img.naturalWidth * ratio)
      c.height = Math.round(img.naturalHeight * ratio)
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
      return c.toDataURL('image/jpeg', 0.85)
    } finally {
      URL.revokeObjectURL(url)
    }
  }

  // Zone hors écran où chaque visuel est affiché à sa vraie taille avant d'être converti en image.
  function zoneRendu () {
    let z = document.getElementById('rendu-cache')
    if (!z) {
      z = document.createElement('div')
      z.id = 'rendu-cache'
      z.setAttribute('aria-hidden', 'true')
      document.body.appendChild(z)
    }
    return z
  }

  async function creerPng (donnees, visuelId) {
    const v = Gabarits.visuels(donnees).find((x) => x.id === visuelId)
    const z = zoneRendu()
    z.innerHTML = v.rendu()
    const page = z.firstElementChild
    await document.fonts.ready
    await Promise.all([...page.querySelectorAll('img')].map((i) => i.decode().catch(() => {})))
    const options = { width: 1080, height: 1350, pixelRatio: 1, backgroundColor: null }
    // Premier passage « à blanc » : Safari charge parfois les polices seulement au deuxième essai.
    await htmlToImage.toBlob(page, options).catch(() => {})
    await attendre(60)
    const blob = await htmlToImage.toBlob(page, options)
    z.innerHTML = ''
    return new File([blob], v.fichier, { type: 'image/png' })
  }

  const surMobile = () => window.matchMedia('(pointer: coarse)').matches

  // Sur téléphone, le partage doit partir d'un toucher : on affiche une fenêtre une fois les fichiers prêts.
  function proposerPartage (fichiers, titre) {
    return new Promise((resolve) => {
      const d = document.createElement('dialog')
      d.className = 'fenetre-partage'
      const n = fichiers.length
      d.innerHTML = `
        <p class="fp-titre">${n > 1 ? `Tes ${n} fichiers sont prêts` : 'Ton fichier est prêt'}</p>
        <p class="fp-texte">Choisis « Enregistrer l’image » pour le garder dans tes photos, ou Instagram pour publier directement.</p>
        <div class="fp-actions">
          <button type="button" class="btn" data-r="annuler">Annuler</button>
          <button type="button" class="btn principal" data-r="partager">Enregistrer ou partager</button>
        </div>`
      document.body.appendChild(d)
      const fin = (r) => { d.close(); d.remove(); resolve(r) }
      d.addEventListener('cancel', () => fin(null))
      d.querySelector('[data-r="annuler"]').addEventListener('click', () => fin(null))
      d.querySelector('[data-r="partager"]').addEventListener('click', async () => {
        try {
          await navigator.share({ files: fichiers, title: titre })
          fin('partage')
        } catch (err) {
          if (err.name === 'AbortError') return
          fin(await telecharger(fichiers))
        }
      })
      d.showModal()
    })
  }

  async function remettre (fichiers, titre) {
    if (surMobile() && navigator.canShare && navigator.canShare({ files: fichiers })) {
      return proposerPartage(fichiers, titre)
    }
    return telecharger(fichiers)
  }

  async function telecharger (fichiers) {
    for (const f of fichiers) {
      const url = URL.createObjectURL(f)
      const a = document.createElement('a')
      a.href = url
      a.download = f.name
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 4000)
      await attendre(400)
    }
    return 'telechargement'
  }

  window.outil = {
    async charger () {
      try {
        const brut = localStorage.getItem(CLE)
        if (brut) return JSON.parse(brut)
      } catch { /* données illisibles : on repart des valeurs de départ */ }
      return clone(window.DONNEES_PAR_DEFAUT)
    },
    async parDefaut () { return clone(window.DONNEES_PAR_DEFAUT) },
    async enregistrer (donnees) {
      try {
        localStorage.setItem(CLE, JSON.stringify(donnees))
      } catch (err) {
        if (err.name === 'QuotaExceededError') throw new Error('L’espace de sauvegarde est plein. Retire une photo ou supprime une affiche.')
        throw err
      }
      return true
    },
    async choisirImage () {
      const f = await choisirFichier('image/*')
      return f ? compresserPhoto(f) : null
    },
    async exporterImage (donnees, visuelId) {
      const f = await creerPng(donnees, visuelId)
      return remettre([f], 'Nailss by Jade')
    },
    async exporterCarrousel (donnees, ids) {
      const fichiers = []
      for (const id of ids) fichiers.push(await creerPng(donnees, id))
      return remettre(fichiers, 'Nailss by Jade')
    },
    async imprimer (donnees) {
      let zone = document.getElementById('impression')
      if (!zone) {
        zone = document.createElement('div')
        zone.id = 'impression'
        document.body.appendChild(zone)
      }
      zone.innerHTML = Gabarits.imprimable(donnees)
      await document.fonts.ready
      window.print()
      return 'impression'
    },
    async exporterDonnees (donnees) {
      const date = new Date().toISOString().slice(0, 10)
      const f = new File([JSON.stringify(donnees, null, 2)], `sauvegarde-nailss-by-jade-${date}.json`, { type: 'application/json' })
      return remettre([f], 'Sauvegarde Nailss by Jade')
    },
    async importerDonnees () {
      const f = await choisirFichier('application/json,.json')
      if (!f) return null
      let d
      try { d = JSON.parse(await f.text()) } catch { throw new Error('Ce fichier n’est pas une sauvegarde valide.') }
      if (!d || !d.tarifs || !d.politiques || !d.marque) throw new Error('Ce fichier n’est pas une sauvegarde de l’outil.')
      return d
    }
  }
})()
