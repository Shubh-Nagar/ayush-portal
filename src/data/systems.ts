import type { SystemInfo, PortalStat } from '@/types'

export const SYSTEMS: SystemInfo[] = [
  {
    id: 'ayurveda',
    name: 'Ayurveda',
    slug: 'ayurveda',
    tagline: 'The science of life',
    description:
      'A holistic system emphasising balance of the three doshas through diet, herbs, therapies and lifestyle. India hosts the largest concentration of Ayurvedic clinical research worldwide.',
    origin: 'Indian subcontinent, c. 1500 BCE',
    researchCount: 18420,
    trialCount: 1240,
    keyAreas: ['Metabolic disorders', 'Rasayana / immunity', 'Rheumatology', 'Digestive health'],
    accent: 'india',
  },
  {
    id: 'yoga-naturopathy',
    name: 'Yoga & Naturopathy',
    slug: 'yoga-naturopathy',
    tagline: 'Movement, breath and nature as medicine',
    description:
      'Evidence for yoga and naturopathic interventions in cardiometabolic, mental-health and pain conditions has grown rapidly, with several high-quality randomised trials.',
    origin: 'India, classical to modern era',
    researchCount: 9860,
    trialCount: 980,
    keyAreas: ['Hypertension', 'Anxiety & depression', 'Chronic pain', 'Sleep quality'],
    accent: 'chakra',
  },
  {
    id: 'unani',
    name: 'Unani',
    slug: 'unani',
    tagline: 'The Graeco-Arabic tradition',
    description:
      'A humoral system practised widely across India, with a growing body of pharmacological and clinical research on its poly-herbal formulations.',
    origin: 'Greece → Persia → India',
    researchCount: 4120,
    trialCount: 310,
    keyAreas: ['Dermatology', 'Respiratory health', 'Hepatology', 'Women’s health'],
    accent: 'saffron',
  },
  {
    id: 'siddha',
    name: 'Siddha',
    slug: 'siddha',
    tagline: 'Ancient Tamil medicine',
    description:
      'One of the oldest medical systems, rooted in Tamil Nadu, with distinctive metallo-mineral and herbal preparations now undergoing modern safety and efficacy evaluation.',
    origin: 'Tamil Nadu, ancient era',
    researchCount: 3280,
    trialCount: 210,
    keyAreas: ['Fever & infections', 'Skin disorders', 'Musculoskeletal', 'Anaemia'],
    accent: 'india',
  },
  {
    id: 'homoeopathy',
    name: 'Homoeopathy',
    slug: 'homoeopathy',
    tagline: 'Individualised micro-dose therapeutics',
    description:
      'Widely used across India for chronic conditions. Research quality varies; this portal foregrounds the evidence grade so users can weigh findings critically.',
    origin: 'Germany, late 18th century',
    researchCount: 6740,
    trialCount: 520,
    keyAreas: ['Allergic disorders', 'Dermatology', 'Paediatrics', 'Anxiety'],
    accent: 'chakra',
  },
]

export const getSystemBySlug = (slug: string) =>
  SYSTEMS.find((s) => s.slug === slug)

export const PORTAL_STATS: PortalStat[] = [
  { label: 'Research articles indexed', value: 42420, suffix: '+' },
  { label: 'Registered clinical trials', value: 3260, suffix: '+' },
  { label: 'Herbs & formulations', value: 8900, suffix: '+' },
  { label: 'Partner institutions', value: 214 },
]
