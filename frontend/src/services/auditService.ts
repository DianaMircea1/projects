import { AuditFormData, ClientDataPayload } from '@/types';

// Use local API route as proxy to avoid CORS issues
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://api.tourism-audit.devidevs.com'
  : ''; // Use relative URL for local development (Next.js API routes)

const API_CLIENT_ID = process.env.API_CLIENT_ID || '1D_xoyV2m-KUyz1rUkVk9cGqxj1zHPo5';
const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET || 'HVKpMqzrUPVBQ-NTCDe94Mqdl_npHZyc0eVRH8DHnHKNxZeMt190WC7oZ-BsS2Cw';
const HONEYPOT_FIELD_NAME = process.env.NEXT_PUBLIC_HONEYPOT_FIELD_NAME || '_hp_website';

export interface AuditResponse {
  message: string;
  status_message: 'success' | 'failed';
  status_code: number;
  property_id?: string;
}

export class AuditService {
  private static getBasicAuthHeader(): string {
    const credentials = btoa(`${API_CLIENT_ID}:${API_CLIENT_SECRET}`);
    return `Basic ${credentials}`;
  }

  private static generatePropertyId(): string {
    // Generate a unique property ID based on timestamp and random string
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `prop_${timestamp}_${random}`;
  }

  private static transformFormDataToPayload(formData: AuditFormData, recaptchaToken: string): ClientDataPayload {
    const propertyId = this.generatePropertyId();
    
    return {
      property_id: propertyId,
      email: formData.contactInfo.email,
      owner_name: formData.contactInfo.fullName,
      phone_number: formData.contactInfo.phone,
      property_name: formData.unitInfo.unitName,
      property_address: formData.unitInfo.address,
      website_url: formData.onlinePresence.website || null,
      booking_platform_links: formData.onlinePresence.reservationLinks.filter(link => link.trim() !== ''),
      social_media_links: formData.onlinePresence.socialMedia ? [formData.onlinePresence.socialMedia] : [],
      google_my_business_link: formData.onlinePresence.googleBusiness || null,
      primary_marketing_goal: formData.marketingInfo.mainObjective,
      past_marketing_methods: formData.marketingInfo.marketingMethods || null,
      marketing_team_structure: formData.marketingInfo.marketingTeam || null,
      online_challenges: formData.marketingInfo.challenges || null,
      content_update_frequency: formData.marketingInfo.contentFrequency || null,
      review_management_strategy: formData.marketingInfo.reviewStrategy || null,
      target_customer_segments: formData.strategyInfo.targetSegments || null,
      unique_selling_points: formData.strategyInfo.uniqueFacilities || null,
      public_performance_data: formData.analyticsInfo.analytics || 'No public performance data was shared.',
      business_description: formData.analyticsInfo.businessDescription || null,
      recaptcha_token: recaptchaToken,
      [HONEYPOT_FIELD_NAME]: '' // Honeypot field should always be empty
    };
  }

  static async submitAuditForm(formData: AuditFormData, recaptchaToken: string): Promise<AuditResponse> {
    try {
      const payload = this.transformFormDataToPayload(formData, recaptchaToken);

      // Use local API route in development, direct backend in production
      const endpoint = process.env.NODE_ENV === 'production' 
        ? `${API_BASE_URL}/api/generate-audit`
        : '/api/generate-audit';

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Only add Authorization header for direct backend calls (production)
      if (process.env.NODE_ENV === 'production') {
        headers['Authorization'] = this.getBasicAuthHeader();
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Error submitting audit form:', error);
      return {
        message: error instanceof Error ? error.message : 'A apărut o eroare la trimiterea formularului.',
        status_message: 'failed',
        status_code: 500
      };
    }
  }

  static async validateForm(formData: AuditFormData): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Validare informații de contact
    if (!formData.contactInfo.fullName.trim()) {
      errors.push('Numele complet este obligatoriu');
    }
    if (!formData.contactInfo.email.trim()) {
      errors.push('Email-ul este obligatoriu');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo.email)) {
      errors.push('Email-ul nu este valid');
    }
    if (!formData.contactInfo.phone.trim()) {
      errors.push('Numărul de telefon este obligatoriu');
    }

    // Validare informații unitate
    if (!formData.unitInfo.unitName.trim()) {
      errors.push('Numele unității este obligatoriu');
    }
    if (!formData.unitInfo.address.trim()) {
      errors.push('Adresa unității este obligatorie');
    }

    // Validare obiectiv marketing
    if (!formData.marketingInfo.mainObjective.trim()) {
      errors.push('Obiectivul principal de marketing este obligatoriu');
    }

    // Validare descriere business
    if (!formData.analyticsInfo.businessDescription.trim()) {
      errors.push('Descrierea afacerii este obligatorie');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
} 