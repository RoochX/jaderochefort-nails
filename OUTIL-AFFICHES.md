# Outil « Mes visuels » (liste de prix et affiches Instagram)

Page web pour que Jade modifie elle-même sa liste de prix et ses affiches, sur son téléphone ou son ordinateur, sans toucher au code.

- Adresse : `https://roochx.github.io/jaderochefort-nails/outil/` (plus tard `https://jaderochefort.com/outil/`).
- Code : `public/outil/`. Nuxt copie ce dossier tel quel dans le site ; rien à compiler.
- La page est exclue des moteurs de recherche (`noindex` et `robots.txt`) et aucun lien du site n’y mène.

## Fonctionnement

- Les données sont gardées dans le navigateur (localStorage). Rien n’est envoyé sur un serveur.
- Onglet Général : « Exporter mes données » crée une copie de sécurité en JSON ; « Importer une copie » la restaure, aussi sur un autre appareil.
- Les images PNG (1080 × 1350) sont créées dans le navigateur avec html-to-image (`vendor/`, licence MIT).
- Sur téléphone, les images passent par la feuille de partage : « Enregistrer l’image » ou publication directe sur Instagram.
- Le PDF passe par la fenêtre d’impression du navigateur (« Enregistrer en PDF »), en format lettre.
- Les polices Inter et Playfair Display sont incluses dans `polices/` (licence OFL).

## Fichiers

- `index.html`, `app.js`, `app.css` : l’éditeur.
- `gabarits.js`, `gabarits.css` : les gabarits des visuels (aperçu et export).
- `stockage.js` : sauvegarde, photos, création des images et du PDF.
- `donnees-par-defaut.js` : les valeurs de départ.
