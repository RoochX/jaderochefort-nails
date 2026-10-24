export interface Certification {
  title: string
  issuer: string
  year: string
  icon: string
}

export const useCertifications = () => {
  const certifications: Certification[] = [
    {
      title: 'Pose d’ongles en pose américaine en gel',
      issuer: 'Ongles DW · 25 heures de formation incluant les stages',
      year: 'Août 2026',
      icon: 'mdi:certificate-outline'
    }
  ]
  return { certifications }
}