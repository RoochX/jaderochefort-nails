// Gabarits des visuels. Chaque fonction reçoit les données et retourne le HTML d'une page.
// Partagé par l'aperçu (index.html) et par le rendu d'export (rendu.html).
(function () {
  const NBSP = '\u00a0'

  function esc (v) {
    return String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  }

  // Typographie OQLF automatique : espaces insécables et apostrophe typographique.
  function typo (v) {
    let s = String(v ?? '')
      .replace(/'/g, '’')
      .replace(/ +([:$%])/g, NBSP + '$1')
      .replace(/(\d) +(h|min|semaines?|doigts?)\b/g, '$1' + NBSP + '$2')
      .replace(/(\d)\s?h\s?(\d\d)\b/g, '$1' + NBSP + 'h' + NBSP + '$2')
    return esc(s)
  }

  const prix = (v) => {
    const t = String(v ?? '').trim()
    if (!t) return ''
    return typo(/\$\s*$/.test(t) ? t : t + ' $')
  }

  const accentBar = (d) => `<div class="barre" style="background:${esc(d.marque.accent)}"></div>`

  function pied (d, droite) {
    return `<div class="pied"><strong>${esc(d.marque.instagram)}</strong><span>${typo(droite)}</span></div>`
  }

  function tarifs (d) {
    const t = d.tarifs
    const lignes = t.niveaux.map((n) => `
      <div class="ligne">
        <span class="serif niveau">${typo(n.nom)}</span>
        <span class="duree">${typo(n.duree)}</span>
        <span class="prix">${prix(n.pose)}</span>
        <span class="prix">${prix(n.remplissage)}</span>
      </div>`).join('')
    return `
    <div class="page ig">
      <div class="entete">
        <p class="marque">${typo(d.marque.nom)} · ${typo(d.marque.ville)}</p>
        <h1 class="serif titre-xl">${typo(t.titre)}</h1>
        ${accentBar(d)}
        <p class="sous">${typo(t.sousTitre)}</p>
      </div>
      <div class="carte tableau">
        <div class="ligne tete"><span>Niveau</span><span>Durée</span><span class="prix">Pose</span><span class="prix">Remplissage</span></div>
        ${lignes}
        <p class="note">${typo(t.note)}</p>
      </div>
      <div class="duo">
        <div class="carte depose">
          <div><span class="serif h3">Dépose</span><span class="duree">${typo(t.depose.duree)}</span></div>
          <span class="prix gros">${prix(t.depose.prix)}</span>
        </div>
        <div class="carte mauve">
          <span class="serif h3 violet">${typo(t.garantie.titre)}</span>
          <span class="texte">${typo(t.garantie.texte)}</span>
        </div>
      </div>
      ${pied(d, 'Glisse pour voir les niveaux →')}
    </div>`
  }

  function niveaux (d) {
    const cartes = d.tarifs.niveaux.map((n, i, all) => `
      <div class="carte niveau-carte ${i === all.length - 1 ? 'mauve' : ''}">
        <div class="niveau-tete">
          <span class="serif h2 ${i === all.length - 1 ? 'violet' : ''}">${typo(n.nom)}</span>
          <span class="meta">${typo(n.duree)} · <strong>${prix(n.pose)}</strong></span>
        </div>
        <div class="exemples">${n.exemples.filter(Boolean).map((e) => `<span>${typo(e)}</span>`).join('')}</div>
      </div>`).join('')
    return `
    <div class="page ig">
      <div class="entete">
        <p class="marque">${typo(d.marque.nom)}</p>
        <h1 class="serif titre-l">${typo(d.niveaux.titre)}</h1>
        ${accentBar(d)}
      </div>
      <div class="pile">${cartes}</div>
      <p class="sous">${typo(d.niveaux.note)}</p>
      ${pied(d, 'Glisse pour les politiques →')}
    </div>`
  }

  function politiques (d) {
    const p = d.politiques
    const items = p.items.map((it) => `
      <div class="carte politique ${it.important ? 'mauve' : ''}">
        <span class="serif h3 ${it.important ? 'violet' : ''}">${typo(it.titre)}</span>
        <span class="texte">${typo(it.texte)}</span>
      </div>`).join('')
    return `
    <div class="page ig">
      <div class="entete">
        <p class="marque">${typo(d.marque.nom)}</p>
        <h1 class="serif titre-l">${typo(p.titre)}</h1>
        ${accentBar(d)}
      </div>
      <div class="grille">${items}</div>
      <p class="sous">${typo(p.note)}</p>
      ${pied(d, 'Réserve en message privé')}
    </div>`
  }

  function affiche (d, a) {
    const img = a.image ? `<img class="photo" src="${esc(a.image)}" alt="">` : ''
    return `
    <div class="page ig affiche fond-${esc(a.fond || 'clair')} ${a.image ? 'avec-photo' : ''}">
      <p class="marque">${typo(d.marque.nom)}</p>
      ${img}
      <div class="affiche-corps">
        ${a.surtitre ? `<p class="surtitre" style="color:${esc(d.marque.accent)}">${typo(a.surtitre)}</p>` : ''}
        <h1 class="serif affiche-titre">${typo(a.titre)}</h1>
        ${a.sousTitre ? `<p class="affiche-sous serif">${typo(a.sousTitre)}</p>` : ''}
        ${accentBar(d)}
        ${a.texte ? `<p class="affiche-texte">${typo(a.texte)}</p>` : ''}
      </div>
      ${pied(d, d.marque.ville)}
    </div>`
  }

  function imprimable (d) {
    const t = d.tarifs
    const lignes = t.niveaux.map((n) => `
      <div class="pl"><span class="serif">${typo(n.nom)}</span><span>${typo(n.duree)}</span><span class="r b">${prix(n.pose)}</span><span class="r b">${prix(n.remplissage)}</span></div>`).join('')
    const nivs = t.niveaux.map((n) => `
      <div class="pcarte"><span class="serif h">${typo(n.nom)}</span>${n.exemples.filter(Boolean).map((e) => `<span>${typo(e)}</span>`).join('')}</div>`).join('')
    const pols = d.politiques.items.map((it) => `<p><strong>${typo(it.titre)}${NBSP}:</strong> ${typo(it.texte)}</p>`).join('')
    return `
    <div class="page print">
      <div class="ptete">
        <div>
          <p class="marque">${typo(d.marque.nom)}</p>
          <h1 class="serif">${typo(t.titre)}</h1>
          <p class="psous">${typo(t.sousTitre)}</p>
        </div>
        <div class="pcoord"><span>${typo(d.marque.ville)}</span><span>Instagram${NBSP}: ${esc(d.marque.instagram)}</span></div>
      </div>
      <div class="pbarre" style="background:${esc(d.marque.accent)}"></div>
      <div class="ptable">
        <div class="pl ph"><span>Niveau</span><span>Durée</span><span class="r">Pose</span><span class="r">Remplissage</span></div>
        ${lignes}
        <div class="pl fin"><span class="serif">Dépose</span><span>${typo(t.depose.duree)}</span><span class="r b">${prix(t.depose.prix)}</span><span class="r">—</span></div>
        <p class="pnote">${typo(t.note.replace(/\s*\(voir la page suivante\)/, ''))}</p>
      </div>
      <div class="pgarantie"><span class="serif">${typo(t.garantie.titre)}</span><span>${typo(t.garantie.texte)}</span></div>
      <h2 class="serif">${typo(d.niveaux.titre)}</h2>
      <div class="pniveaux" style="grid-template-columns:repeat(${t.niveaux.length},minmax(0,1fr))">${nivs}</div>
      <h2 class="serif">${typo(d.politiques.titre)}</h2>
      <div class="ppol">${pols}</div>
      <div class="ppied"><span>Réserve ton rendez-vous en message privé sur Instagram</span><strong>${esc(d.marque.instagram)}</strong></div>
    </div>`
  }

  // Liste des visuels disponibles, dans l'ordre du carrousel.
  function visuels (d) {
    const base = [
      { id: 'tarifs', nom: '1. Tarifs', fichier: '1-tarifs.png', rendu: () => tarifs(d) },
      { id: 'niveaux', nom: '2. Niveaux', fichier: '2-niveaux.png', rendu: () => niveaux(d) },
      { id: 'politiques', nom: '3. Bon à savoir', fichier: '3-politiques.png', rendu: () => politiques(d) }
    ]
    const aff = (d.affiches || []).map((a, i) => ({
      id: 'affiche:' + a.id,
      nom: 'Affiche : ' + (a.nom || 'sans nom'),
      fichier: `affiche-${i + 1}-${String(a.nom || 'affiche').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.png`,
      rendu: () => affiche(d, a)
    }))
    return base.concat(aff)
  }

  window.Gabarits = { visuels, imprimable, typo }
})()
