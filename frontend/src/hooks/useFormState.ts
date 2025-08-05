import { useState, useCallback } from 'react';
import { AuditFormData } from '@/types';

interface UseFormStateReturn {
  formData: AuditFormData;
  updateField: (section: keyof AuditFormData, field: string, value: string) => void;
  resetForm: () => void;
}

const initialFormState: AuditFormData = {
  contactInfo: {
    fullName: '',
    phone: '',
    email: ''
  },
  unitInfo: {
    unitName: '',
    address: ''
  },
  onlinePresence: {
    website: '',
    reservationLinks: [''],
    socialMedia: '',
    googleBusiness: ''
  },
  marketingInfo: {
    mainObjective: '',
    marketingMethods: '',
    marketingTeam: 'none',
    challenges: '',
    contentFrequency: 'rarely',
    reviewStrategy: ''
  },
  strategyInfo: {
    targetSegments: '',
    uniqueFacilities: ''
  },
  analyticsInfo: {
    analytics: '',
    businessDescription: ''
  }
};

export const useFormState = (): UseFormStateReturn => {
  const [formData, setFormData] = useState<AuditFormData>(initialFormState);

  const updateField = useCallback((section: keyof AuditFormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
  }, []);

  return {
    formData,
    updateField,
    resetForm
  };
};
