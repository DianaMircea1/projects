export interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
}

export interface UnitInfo {
  unitName: string;
  address: string;
}

export interface OnlinePresence {
  website: string;
  reservationLinks: string[];
  socialMedia: string;
  googleBusiness: string;
}

export interface MarketingInfo {
  mainObjective: string;
  marketingMethods: string;
  marketingTeam: 'internal' | 'external' | 'both' | 'none';
  challenges: string;
  contentFrequency: 'daily' | 'weekly' | 'monthly' | 'rarely';
  reviewStrategy: string;
}

export interface StrategyInfo {
  targetSegments: string;
  uniqueFacilities: string;
}

export interface AnalyticsInfo {
  analytics: string;
  businessDescription: string;
}

export interface AuditFormData {
  contactInfo: ContactInfo;
  unitInfo: UnitInfo;
  onlinePresence: OnlinePresence;
  marketingInfo: MarketingInfo;
  strategyInfo: StrategyInfo;
  analyticsInfo: AnalyticsInfo;
}

export interface FormSection {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Backend payload interface matching the Python models
export interface ClientDataPayload {
  property_id: string;
  owner_name: string;
  phone_number: string;
  email: string;
  property_name: string;
  property_address: string;
  website_url: string | null;
  booking_platform_links: string[];
  social_media_links: string[];
  google_my_business_link: string | null;
  primary_marketing_goal: string;
  past_marketing_methods: string | null;
  marketing_team_structure: string | null;
  online_challenges: string | null;
  content_update_frequency: string | null;
  review_management_strategy: string | null;
  target_customer_segments: string | null;
  unique_selling_points: string | null;
  public_performance_data: string;
  business_description: string | null;
  recaptcha_token: string;
  [key: string]: string | string[] | null; // For honeypot field
} 