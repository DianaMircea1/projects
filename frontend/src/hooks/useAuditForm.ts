import { useState } from 'react';
import { AuditFormData } from '@/types';

export function useAuditForm() {
  const [formData, setFormData] = useState<AuditFormData>({
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
      contentFrequency: 'monthly',
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
  });

  const updateContactInfo = (field: keyof AuditFormData['contactInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const updateUnitInfo = (field: keyof AuditFormData['unitInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      unitInfo: {
        ...prev.unitInfo,
        [field]: value
      }
    }));
  };

  const updateOnlinePresence = (field: keyof AuditFormData['onlinePresence'], value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      onlinePresence: {
        ...prev.onlinePresence,
        [field]: value
      }
    }));
  };

  const addReservationLink = () => {
    setFormData(prev => ({
      ...prev,
      onlinePresence: {
        ...prev.onlinePresence,
        reservationLinks: [...prev.onlinePresence.reservationLinks, '']
      }
    }));
  };

  const removeReservationLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      onlinePresence: {
        ...prev.onlinePresence,
        reservationLinks: prev.onlinePresence.reservationLinks.filter((_, i) => i !== index)
      }
    }));
  };

  const updateReservationLink = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      onlinePresence: {
        ...prev.onlinePresence,
        reservationLinks: prev.onlinePresence.reservationLinks.map((link, i) => 
          i === index ? value : link
        )
      }
    }));
  };

  const updateMarketingInfo = (field: keyof AuditFormData['marketingInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      marketingInfo: {
        ...prev.marketingInfo,
        [field]: value
      }
    }));
  };

  const updateStrategyInfo = (field: keyof AuditFormData['strategyInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      strategyInfo: {
        ...prev.strategyInfo,
        [field]: value
      }
    }));
  };

  const updateAnalyticsInfo = (field: keyof AuditFormData['analyticsInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      analyticsInfo: {
        ...prev.analyticsInfo,
        [field]: value
      }
    }));
  };

  const resetForm = () => {
    setFormData({
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
        contentFrequency: 'monthly',
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
    });
  };

  return {
    formData,
    updateContactInfo,
    updateUnitInfo,
    updateOnlinePresence,
    addReservationLink,
    removeReservationLink,
    updateReservationLink,
    updateMarketingInfo,
    updateStrategyInfo,
    updateAnalyticsInfo,
    resetForm
  };
} 