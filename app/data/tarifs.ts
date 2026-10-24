export interface Niveau {
  nom: string
  duree: string
  pose: string
  remplissage: string
  exemples: string[]
}

export const niveaux: Niveau[] = [
  {
    nom: 'Simple',
    duree: '1\u00a0h',
    pose: '55\u00a0$',
    remplissage: '55\u00a0$',
    exemples: ['Couleur unie', 'Chrome', 'Œil de chat (cat eye)', 'Nail art minimaliste (1\u00a0doigt)']
  },
  {
    nom: 'Médium',
    duree: '1\u00a0h\u00a030',
    pose: '60\u00a0$',
    remplissage: '60\u00a0$',
    exemples: ['French (10\u00a0doigts)', 'Nail art précis (2 ou 3\u00a0doigts)', 'Effet 3D (1\u00a0doigt)', 'Blooming gel']
  },
  {
    nom: 'Extra',
    duree: '2\u00a0h',
    pose: '80\u00a0$',
    remplissage: '80\u00a0$',
    exemples: ['Nail art complexe', 'Combinaison de techniques']
  }
]

export const depose = { duree: '30\u00a0min', prix: '15\u00a0$' }
