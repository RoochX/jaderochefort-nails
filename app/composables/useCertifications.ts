export interface Certification {
  title: string
  issuer: string
  year: string
  icon: string
}

export const useCertifications = () => {
  const certifications: Certification[] = [
    {
      title: 'Diplôme en stylisme d’ongles',
      issuer: 'Centre de formation en esthétique',
      year: '2025',
      icon: 'mdi:certificate-outline'
    }
  ]
  return { certifications }
}