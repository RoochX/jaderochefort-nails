// Interface de l'éditeur : formulaire, aperçu en direct, sauvegarde automatique et exports.
// Les fonctions de sauvegarde et d'export viennent de stockage.js (window.outil).
(function () {
  const $ = (s) => document.querySelector(s)
  const form = $('#formulaire')
  const cadre = $('#cadre')
  const scene = $('#scene')
  const statut = $('#statut')

  let data = null
  let onglet = 'tarifs'
  let afficheIndex = 0
  let minuterie = null

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

  // ---------- Accès aux données par chemin ("tarifs.niveaux.0.nom") ----------
  function lire (chemin) { return chemin.split('.').reduce((o, k) => (o == null ? o : o[k]), data) }
  function ecrire (chemin, valeur) {
    const cles = chemin.split('.')
    const fin = cles.pop()
    const parent = cles.reduce((o, k) => o[k], data)
    parent[fin] = valeur
  }

  // ---------- Petits constructeurs de champs ----------
  const texte = (label, chemin, aide = '') => `
    <label class="champ">${esc(label)}
      <input type="text" data-chemin="${chemin}" value="${esc(lire(chemin))}">
      ${aide ? `<span class="aide">${esc(aide)}</span>` : ''}
    </label>`
  const zone = (label, chemin, lignes = false) => {
    const v = lire(chemin)
    return `
    <label class="champ">${esc(label)}
      <textarea data-chemin="${chemin}" ${lignes ? 'data-lignes="1"' : ''} rows="${lignes ? 4 : 3}">${esc(lignes ? (v || []).join('\n') : v)}</textarea>
    </label>`
  }

  // ---------- Formulaires par onglet ----------
  const formulaires = {
    tarifs () {
      const niveaux = data.tarifs.niveaux.map((n, i) => `
        <div class="bloc">
          <div class="bloc-tete"><strong>${esc(n.nom || 'Niveau')}</strong>
            <button type="button" class="btn petit danger" data-action="retirer-niveau" data-i="${i}" ${data.tarifs.niveaux.length <= 1 ? 'disabled' : ''}>Retirer</button>
          </div>
          <div class="rangee">${texte('Nom', `tarifs.niveaux.${i}.nom`)}${texte('Durée', `tarifs.niveaux.${i}.duree`)}</div>
          <div class="rangee">${texte('Prix pose ($)', `tarifs.niveaux.${i}.pose`)}${texte('Prix remplissage ($)', `tarifs.niveaux.${i}.remplissage`)}</div>
          ${zone('Exemples de designs (un par ligne)', `tarifs.niveaux.${i}.exemples`, true)}
        </div>`).join('')
      return `
        <section class="groupe">
          <h2>Titre</h2>
          ${texte('Titre', 'tarifs.titre')}
          ${texte('Sous-titre', 'tarifs.sousTitre')}
        </section>
        <section class="groupe">
          <h2>Niveaux</h2>
          <p class="aide">Écris seulement le chiffre pour les prix : le symbole $ s’ajoute tout seul. Les exemples apparaissent sur la page « Niveaux » et sur le PDF.</p>
          ${niveaux}
          <button type="button" class="btn" data-action="ajouter-niveau" ${data.tarifs.niveaux.length >= 4 ? 'disabled' : ''}>Ajouter un niveau</button>
        </section>
        <section class="groupe">
          <h2>Dépose et garantie</h2>
          <div class="rangee">${texte('Durée de la dépose', 'tarifs.depose.duree')}${texte('Prix de la dépose ($)', 'tarifs.depose.prix')}</div>
          ${texte('Titre de la garantie', 'tarifs.garantie.titre')}
          ${zone('Texte de la garantie', 'tarifs.garantie.texte')}
          ${zone('Note sous le tableau', 'tarifs.note')}
        </section>`
    },
    niveaux () {
      return `
        <section class="groupe">
          <h2>Page des niveaux</h2>
          <p class="aide">Les niveaux, leurs prix et leurs exemples se modifient dans l’onglet Tarifs.</p>
          ${texte('Titre', 'niveaux.titre')}
          ${zone('Note en bas de page', 'niveaux.note')}
        </section>`
    },
    politiques () {
      const items = data.politiques.items.map((it, i) => `
        <div class="bloc">
          <div class="bloc-tete"><strong>${esc(it.titre || 'Politique')}</strong>
            <button type="button" class="btn petit danger" data-action="retirer-politique" data-i="${i}">Retirer</button>
          </div>
          ${texte('Titre', `politiques.items.${i}.titre`)}
          ${zone('Texte', `politiques.items.${i}.texte`)}
          <label class="case"><input type="checkbox" data-chemin="politiques.items.${i}.important" ${it.important ? 'checked' : ''}> Mettre en évidence (fond mauve)</label>
        </div>`).join('')
      return `
        <section class="groupe">
          <h2>Page « Bon à savoir »</h2>
          ${texte('Titre', 'politiques.titre')}
          ${items}
          <button type="button" class="btn" data-action="ajouter-politique" ${data.politiques.items.length >= 6 ? 'disabled' : ''}>Ajouter une politique</button>
          <p class="aide">Jusqu’à 6 politiques tiennent sur une image.</p>
          ${zone('Note en bas de page', 'politiques.note')}
        </section>`
    },
    affiches () {
      const liste = data.affiches
      if (!liste.length) {
        return `<section class="groupe"><h2>Affiches</h2><p class="aide">Crée une affiche pour annoncer une promotion, une nouveauté ou tes disponibilités.</p>
          <button type="button" class="btn principal" data-action="ajouter-affiche">Créer une affiche</button></section>`
      }
      afficheIndex = Math.min(afficheIndex, liste.length - 1)
      const a = liste[afficheIndex]
      const p = `affiches.${afficheIndex}`
      const options = liste.map((x, i) => `<option value="${i}" ${i === afficheIndex ? 'selected' : ''}>${esc(x.nom || 'Sans nom')}</option>`).join('')
      return `
        <section class="groupe">
          <h2>Affiche à modifier</h2>
          <label class="champ">Choisir une affiche<select data-action="choisir-affiche">${options}</select></label>
          <div class="rangee">
            <button type="button" class="btn" data-action="ajouter-affiche">Nouvelle</button>
            <button type="button" class="btn" data-action="dupliquer-affiche">Dupliquer</button>
            <button type="button" class="btn danger" data-action="retirer-affiche">Supprimer</button>
          </div>
        </section>
        <section class="groupe">
          <h2>Contenu</h2>
          ${texte('Nom de l’affiche (pour toi seulement)', `${p}.nom`)}
          ${texte('Petit texte au-dessus', `${p}.surtitre`)}
          ${texte('Grand titre', `${p}.titre`)}
          ${texte('Sous-titre', `${p}.sousTitre`)}
          ${zone('Texte', `${p}.texte`)}
          <label class="champ">Fond
            <select data-chemin="${p}.fond">
              ${[['clair', 'Clair'], ['mauve', 'Mauve'], ['violet', 'Violet foncé']].map(([v, l]) => `<option value="${v}" ${a.fond === v ? 'selected' : ''}>${l}</option>`).join('')}
            </select>
          </label>
        </section>
        <section class="groupe">
          <h2>Photo</h2>
          ${a.image ? `<img class="photo-apercu" src="${esc(a.image)}" alt="Photo choisie">` : '<p class="aide">Ajoute une photo de tes ongles pour une affiche plus vivante. Sans photo, le titre prend toute la place.</p>'}
          <div class="rangee">
            <button type="button" class="btn" data-action="choisir-photo">${a.image ? 'Changer la photo' : 'Choisir une photo'}</button>
            ${a.image ? '<button type="button" class="btn danger" data-action="retirer-photo">Retirer la photo</button>' : ''}
          </div>
        </section>`
    },
    imprimable () {
      return `
        <section class="groupe">
          <h2>Liste de prix à imprimer</h2>
          <p class="aide">Format lettre (8,5 × 11 po). Elle reprend automatiquement les tarifs, les niveaux et les politiques des autres onglets. Clique sur « Créer le PDF à imprimer », puis choisis « Enregistrer en PDF » (ou ton imprimante) dans la fenêtre d’impression.</p>
        </section>`
    },
    general () {
      return `
        <section class="groupe">
          <h2>Informations générales</h2>
          ${texte('Nom de l’entreprise', 'marque.nom')}
          ${texte('Ville', 'marque.ville')}
          ${texte('Compte Instagram', 'marque.instagram')}
          <label class="champ">Couleur d’accent
            <span class="couleurs">
              <input type="color" data-chemin="marque.accent" value="${esc(data.marque.accent)}">
              <button type="button" class="btn petit" data-couleur="#ec4899">Rose</button>
              <button type="button" class="btn petit" data-couleur="#8b5cf6">Violet</button>
              <button type="button" class="btn petit" data-couleur="#f472b6">Rose pâle</button>
            </span>
          </label>
        </section>
        <section class="groupe">
          <h2>Copie de sécurité</h2>
          <p class="aide">Tes modifications sont gardées dans ce navigateur seulement. Exporte une copie de temps en temps : elle te permet aussi de retrouver ton travail sur un autre appareil.</p>
          <div class="rangee">
            <button type="button" class="btn" data-action="exporter-donnees">Exporter mes données</button>
            <button type="button" class="btn" data-action="importer-donnees">Importer une copie</button>
          </div>
        </section>
        <section class="groupe">
          <h2>Remettre à zéro</h2>
          <p class="aide">Remet tous les textes et les prix tels qu’ils étaient au départ. Tes affiches seront supprimées.</p>
          <button type="button" class="btn danger" data-action="reinitialiser">Tout réinitialiser</button>
        </section>`
    }
  }

  // ---------- Aperçu ----------
  function visuelCourant () {
    if (onglet === 'imprimable') return { id: 'imprimable', nom: 'Liste de prix imprimable (lettre)', fichier: null }
    const tous = Gabarits.visuels(data)
    if (onglet === 'affiches') {
      const a = data.affiches[afficheIndex]
      return a ? tous.find((v) => v.id === 'affiche:' + a.id) : null
    }
    if (onglet === 'general') return tous[0]
    return tous.find((v) => v.id === onglet)
  }

  function rendreApercu () {
    const v = visuelCourant()
    $('#btn-image').disabled = !v || v.id === 'imprimable'
    if (!v) { cadre.innerHTML = ''; $('#titre-apercu').textContent = 'Aucune affiche'; return }
    $('#titre-apercu').textContent = v.id === 'imprimable' ? v.nom : `${v.nom} · 1080 × 1350`
    cadre.innerHTML = v.id === 'imprimable' ? Gabarits.imprimable(data) : v.rendu()
    ajusterEchelle()
  }

  function ajusterEchelle () {
    const page = cadre.firstElementChild
    if (!page) return
    const w = page.offsetWidth
    const h = page.offsetHeight
    const r = scene.getBoundingClientRect()
    const mobile = window.matchMedia('(max-width: 900px)').matches
    // Sur téléphone, l'aperçu prend la largeur de l'écran ; sur ordinateur, il tient dans la zone visible.
    const s = mobile ? Math.min((r.width - 32) / w, (window.innerHeight * 0.62) / h, 1) : Math.min((r.width - 56) / w, (r.height - 56) / h, 1)
    cadre.style.width = w + 'px'
    cadre.style.height = h + 'px'
    cadre.style.transform = `scale(${s})`
    cadre.style.margin = `${-(h - h * s) / 2}px ${-(w - w * s) / 2}px`
  }

  function rendreFormulaire () {
    form.innerHTML = formulaires[onglet]()
    document.querySelectorAll('.onglets button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.onglet === onglet)))
    rendreApercu()
  }

  // ---------- Sauvegarde ----------
  function planifierSauvegarde () {
    statut.textContent = 'Modifications non enregistrées'
    clearTimeout(minuterie)
    minuterie = setTimeout(async () => {
      try {
        await window.outil.enregistrer(data)
        statut.textContent = 'Enregistré'
      } catch {
        statut.textContent = 'L’enregistrement a échoué. Réessaie une modification.'
      }
    }, 500)
  }

  // ---------- Événements ----------
  form.addEventListener('submit', (e) => e.preventDefault())
  form.addEventListener('input', (e) => {
    const el = e.target
    if (!el.dataset.chemin) return
    let v = el.type === 'checkbox' ? el.checked : el.value
    if (el.dataset.lignes) v = v.split('\n').map((x) => x.trim()).filter(Boolean)
    ecrire(el.dataset.chemin, v)
    if (el.dataset.chemin.endsWith('.nom') && onglet === 'affiches') {
      const opt = form.querySelector(`select[data-action="choisir-affiche"] option[value="${afficheIndex}"]`)
      if (opt) opt.textContent = v || 'Sans nom'
    }
    rendreApercu()
    planifierSauvegarde()
  })
  form.addEventListener('change', (e) => {
    if (e.target.dataset.action === 'choisir-affiche') {
      afficheIndex = Number(e.target.value)
      rendreFormulaire()
    }
  })

  const nouvelId = () => Math.random().toString(36).slice(2, 9)

  const actions = {
    'ajouter-niveau' () { data.tarifs.niveaux.push({ nom: 'Nouveau', duree: '1 h', pose: '', remplissage: '', exemples: [] }) },
    'retirer-niveau' (i) { if (confirm('Retirer ce niveau?')) data.tarifs.niveaux.splice(i, 1); else return false },
    'ajouter-politique' () { data.politiques.items.push({ titre: 'Nouvelle politique', texte: '', important: false }) },
    'retirer-politique' (i) { if (confirm('Retirer cette politique?')) data.politiques.items.splice(i, 1); else return false },
    'ajouter-affiche' () {
      data.affiches.push({ id: nouvelId(), nom: 'Nouvelle affiche', surtitre: '', titre: 'Ton titre ici', sousTitre: '', texte: '', image: null, fond: 'clair' })
      afficheIndex = data.affiches.length - 1
    },
    'dupliquer-affiche' () {
      const copie = JSON.parse(JSON.stringify(data.affiches[afficheIndex]))
      copie.id = nouvelId(); copie.nom = (copie.nom || 'Affiche') + ' (copie)'
      data.affiches.splice(afficheIndex + 1, 0, copie); afficheIndex++
    },
    'retirer-affiche' () {
      if (!confirm('Supprimer cette affiche?')) return false
      data.affiches.splice(afficheIndex, 1); afficheIndex = Math.max(0, afficheIndex - 1)
    },
    async 'choisir-photo' () {
      let img
      try {
        img = await window.outil.choisirImage()
      } catch (err) {
        alert(err.message)
        return false
      }
      if (!img) return false
      data.affiches[afficheIndex].image = img
    },
    'retirer-photo' () { data.affiches[afficheIndex].image = null },
    async 'exporter-donnees' () {
      await avecStatut('Préparation de la copie…', () => window.outil.exporterDonnees(data))
      return false
    },
    async 'importer-donnees' () {
      try {
        const d = await window.outil.importerDonnees()
        if (!d) return false
        if (!confirm('Remplacer tout ce qui est dans l’outil par cette copie?')) return false
        data = d; data.affiches = data.affiches || []; afficheIndex = 0
      } catch (err) {
        alert(err.message)
        return false
      }
    },
    async reinitialiser () {
      if (!confirm('Tout réinitialiser? Tes modifications et tes affiches seront perdues.')) return false
      data = await window.outil.parDefaut(); afficheIndex = 0
    }
  }

  form.addEventListener('click', async (e) => {
    const coul = e.target.closest('[data-couleur]')
    if (coul) {
      data.marque.accent = coul.dataset.couleur
      rendreFormulaire(); planifierSauvegarde(); return
    }
    const btn = e.target.closest('button[data-action]')
    if (!btn || !actions[btn.dataset.action]) return
    const r = await actions[btn.dataset.action](Number(btn.dataset.i))
    if (r === false) return
    rendreFormulaire(); planifierSauvegarde()
  })

  document.querySelector('.onglets').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-onglet]')
    if (!b) return
    onglet = b.dataset.onglet
    rendreFormulaire()
  })

  // ---------- Exports ----------
  const messages = {
    partage: 'Fichier prêt',
    telechargement: 'Fichier téléchargé',
    impression: 'Choisis « Enregistrer en PDF » dans la fenêtre d’impression'
  }

  async function avecStatut (message, travail) {
    const avant = statut.textContent
    statut.textContent = message
    const boutons = document.querySelectorAll('.actions .btn')
    boutons.forEach((b) => { b.dataset.etait = b.disabled; b.disabled = true })
    try {
      const r = await travail()
      statut.textContent = messages[r] || avant
    } catch (err) {
      statut.textContent = 'L’export a échoué. Réessaie.'
      alert('L’export a échoué : ' + err.message)
    } finally {
      boutons.forEach((b) => { b.disabled = b.dataset.etait === 'true' })
    }
  }

  $('#btn-image').addEventListener('click', () => {
    const v = visuelCourant()
    if (!v || v.id === 'imprimable') return
    avecStatut('Création de l’image…', () => window.outil.exporterImage(data, v.id))
  })
  $('#btn-carrousel').addEventListener('click', () => {
    avecStatut('Création des 3 images…', () => window.outil.exporterCarrousel(data, ['tarifs', 'niveaux', 'politiques']))
  })
  $('#btn-pdf').addEventListener('click', () => {
    avecStatut('Préparation du PDF…', () => window.outil.imprimer(data))
  })

  window.addEventListener('resize', ajusterEchelle)

  // ---------- Démarrage ----------
  window.outil.charger().then((d) => {
    data = d
    data.affiches = data.affiches || []
    statut.textContent = 'Enregistré'
    rendreFormulaire()
    document.fonts.ready.then(ajusterEchelle)
  })
})()
