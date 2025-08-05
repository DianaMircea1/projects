import { FormSection } from '@/types';

export const AUDIT_FORM_SECTIONS: FormSection[] = [
  {
    id: 'contact',
    title: 'Informații de Contact',
    description: 'Datele dumneavoastră de contact',
    icon: 'User'
  },
  {
    id: 'unit',
    title: 'Informații despre Unitate',
    description: 'Detalii despre unitatea de cazare',
    icon: 'Building2'
  },
  {
    id: 'online',
    title: 'Prezența Online',
    description: 'Link-urile către platformele online',
    icon: 'Globe'
  },
  {
    id: 'marketing',
    title: 'Marketing și Promovare',
    description: 'Strategiile actuale de marketing',
    icon: 'BarChart3'
  },
  {
    id: 'strategy',
    title: 'Strategii și Targetare',
    description: 'Publicul țintă și facilitățile unice',
    icon: 'Target'
  },
  {
    id: 'analytics',
    title: 'Date și Analize',
    description: 'Informații despre performanța actuală',
    icon: 'MessageSquare'
  }
];

export const MARKETING_TEAM_OPTIONS = [
  { value: 'internal', label: 'Echipă internă' },
  { value: 'external', label: 'Echipă externă' },
  { value: 'both', label: 'Ambele' },
  { value: 'none', label: 'Nu avem echipă dedicată' }
];

export const CONTENT_FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Zilnic' },
  { value: 'weekly', label: 'Săptămânal' },
  { value: 'monthly', label: 'Lunar' },
  { value: 'rarely', label: 'Rar' }
];

export const FORM_VALIDATION_MESSAGES = {
  required: 'Acest câmp este obligatoriu',
  email: 'Vă rugăm să introduceți o adresă de email validă',
  phone: 'Vă rugăm să introduceți un număr de telefon valid',
  url: 'Vă rugăm să introduceți o adresă URL validă'
};

export const API_ENDPOINTS = {
  SUBMIT_AUDIT: '/audit/submit',
  GET_HISTORY: '/audit/history',
  GET_AUDIT: '/audit/:id'
} as const; 