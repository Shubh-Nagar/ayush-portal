import type { Disease } from '@/types'

export const DISEASES: Disease[] = [
  {
    id: 'd-001',
    name: 'Hypertension',
    category: 'Cardiovascular',
    description:
      'Persistently elevated blood pressure. A leading modifiable risk factor for stroke and heart disease.',
    systemsStudied: ['Yoga & Naturopathy', 'Ayurveda'],
    researchCount: 1240,
    trialCount: 86,
    topInterventions: ['Structured yoga', 'Sarpagandha', 'Dietary sodium reduction'],
    evidenceSummary:
      'Yoga-based lifestyle interventions have moderate-to-strong RCT support as adjuncts. Herbal evidence is more mixed.',
  },
  {
    id: 'd-002',
    name: 'Type-2 Diabetes',
    category: 'Endocrine / Metabolic',
    description:
      'A chronic metabolic disorder marked by insulin resistance and elevated blood glucose.',
    systemsStudied: ['Ayurveda', 'Yoga & Naturopathy', 'Unani'],
    researchCount: 1680,
    trialCount: 112,
    topInterventions: ['Yoga + naturopathy', 'Vijaysar', 'Methi (fenugreek)'],
    evidenceSummary:
      'Integrated yoga/naturopathy programmes show glycaemic benefit in controlled studies; several herbs show promise but need larger blinded trials.',
  },
  {
    id: 'd-003',
    name: 'Anxiety Disorders',
    category: 'Mental Health',
    description:
      'A spectrum of conditions characterised by excessive worry, tension and physiological arousal.',
    systemsStudied: ['Ayurveda', 'Yoga & Naturopathy'],
    researchCount: 940,
    trialCount: 64,
    topInterventions: ['Ashwagandha', 'Yoga & pranayama', 'Brahmi'],
    evidenceSummary:
      'Ashwagandha has meta-analytic support for stress and anxiety. Yoga shows consistent benefit across trials.',
  },
  {
    id: 'd-004',
    name: 'Osteoarthritis',
    category: 'Musculoskeletal',
    description: 'Degenerative joint disease causing pain and reduced mobility, commonly of the knee.',
    systemsStudied: ['Ayurveda', 'Unani'],
    researchCount: 720,
    trialCount: 48,
    topInterventions: ['Curcumin', 'Boswellia (Shallaki)', 'Panchakarma therapies'],
    evidenceSummary:
      'Curcumin and Boswellia have RCT support as adjuncts for pain relief, with good safety profiles.',
  },
  {
    id: 'd-005',
    name: 'Allergic Rhinitis',
    category: 'Immunology / ENT',
    description: 'An IgE-mediated inflammation of the nasal mucosa triggered by allergens.',
    systemsStudied: ['Homoeopathy', 'Ayurveda'],
    researchCount: 410,
    trialCount: 27,
    topInterventions: ['Individualised homoeopathy', 'Nasya', 'Haridra (turmeric)'],
    evidenceSummary:
      'Some RCT signals for individualised homoeopathy; overall evidence remains limited and warrants replication.',
  },
  {
    id: 'd-006',
    name: 'Insomnia',
    category: 'Sleep / Neurology',
    description: 'Difficulty initiating or maintaining sleep, with daytime impairment.',
    systemsStudied: ['Yoga & Naturopathy', 'Ayurveda'],
    researchCount: 380,
    trialCount: 22,
    topInterventions: ['Yoga nidra', 'Ashwagandha', 'Shirodhara'],
    evidenceSummary:
      'Yoga nidra shows objective sleep benefits in actigraphy-based RCTs. Ashwagandha shows early positive signals.',
  },
  {
    id: 'd-007',
    name: 'Dyslipidaemia',
    category: 'Cardiometabolic',
    description: 'Abnormal blood lipid levels associated with cardiovascular risk.',
    systemsStudied: ['Ayurveda'],
    researchCount: 290,
    trialCount: 19,
    topInterventions: ['Guggul', 'Arjuna', 'Dietary therapy'],
    evidenceSummary:
      'Guggulipid shows variable lipid-lowering effects; standardised extracts are more consistent than crude forms.',
  },
  {
    id: 'd-008',
    name: 'Psoriasis',
    category: 'Dermatology',
    description: 'A chronic immune-mediated skin disease with scaly plaques.',
    systemsStudied: ['Unani', 'Ayurveda', 'Siddha'],
    researchCount: 210,
    trialCount: 14,
    topInterventions: ['Poly-herbal Unani formulations', 'Panchakarma', 'Topical herbal oils'],
    evidenceSummary:
      'Evidence is largely early-phase and observational; controlled trials are underway.',
  },
]
