"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, User, AlertCircle, CheckCircle, Send, Loader2 } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { v4 as uuidv4 } from 'uuid';

// Form data structure matching backend requirements
interface AuditFormData {
  // Required fields
  email: string;
  property_name: string;
  property_address: string;
  owner_name: string;
  phone_number: string;
  business_description: string;
  primary_marketing_goal: string;
  
  // Optional fields
  website_url?: string;
  google_my_business_link?: string;
  target_customer_segments?: string;
  unique_selling_points?: string;
}

export default function SimpleAuditForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const RECAPTCHA_SITE_KEY = "6LeZpJQrAAAAAArqiQeJj5xMK0JkGVkaObfjKOcN";
  const HONEYPOT_FIELD_NAME = '_hp_website';

  const [formData, setFormData] = useState<AuditFormData>({
    email: '',
    property_name: '',
    property_address: '',
    owner_name: '',
    phone_number: '',
    business_description: '',
    primary_marketing_goal: '',
    website_url: '',
    google_my_business_link: '',
    target_customer_segments: '',
    unique_selling_points: ''
  });

  const handleInputChange = (field: keyof AuditFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!formData.email.trim()) {
      errors.push('Email-ul este obligatoriu');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Email-ul nu este valid');
    }

    if (!formData.owner_name.trim()) {
      errors.push('Numele proprietarului este obligatoriu');
    }

    if (!formData.phone_number.trim()) {
      errors.push('Numărul de telefon este obligatoriu');
    }

    if (!formData.property_name.trim()) {
      errors.push('Numele proprietății este obligatoriu');
    }

    if (!formData.property_address.trim()) {
      errors.push('Adresa proprietății este obligatorie');
    }

    if (!formData.business_description.trim()) {
      errors.push('Descrierea afacerii este obligatorie');
    }

    if (!formData.primary_marketing_goal.trim()) {
      errors.push('Obiectivul principal de marketing este obligatoriu');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const submitAuditForm = async (formData: AuditFormData, recaptchaToken: string) => {
  try {
    const propertyId = uuidv4();

    const payload = {
      property_id: propertyId,
      email: formData.email,
      owner_name: formData.owner_name,
      phone_number: formData.phone_number,
      property_name: formData.property_name,
      property_address: formData.property_address,
      website_url: formData.website_url || null,
      booking_platform_links: [],
      social_media_links: [],
      google_my_business_link: formData.google_my_business_link || null,
      primary_marketing_goal: formData.primary_marketing_goal,
      past_marketing_methods: null,
      marketing_team_structure: null,
      online_challenges: null,
      content_update_frequency: null,
      review_management_strategy: null,
      target_customer_segments: formData.target_customer_segments || null,
      unique_selling_points: formData.unique_selling_points || null,
      public_performance_data: 'No public performance data was shared.',
      business_description: formData.business_description,
      recaptcha_token: recaptchaToken,
      bot_field: '' // Honeypot field
    };

    const response = await fetch('https://api.tourism-audit.devidevs.com/api/generate-audit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic MURfeG95VjJtLUtVeXoxclVrVms5Y0dxeGoxekhQbzU6SFZLcE1xenJVUFZCUS1OVENEZTk0TXFkbF9ucEhaeWMwZVZSSDhESG5IS054WmVNdDE5MFdDN29aLUJzUzJDdw=='
      },
      body: JSON.stringify(payload)
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
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    setFormErrors([]);

    try {
      // Validate form
      const validation = validateForm();
      if (!validation.isValid) {
        setFormErrors(validation.errors);
        setSubmitStatus({
          type: 'error',
          message: 'Vă rugăm să corectați erorile din formular.'
        });
        return;
      }

      // Get reCAPTCHA token
      const recaptchaToken = await recaptchaRef.current?.executeAsync();
      if (!recaptchaToken) {
        setSubmitStatus({
          type: 'error',
          message: 'Verificarea reCAPTCHA a eșuat. Vă rugăm să încercați din nou.'
        });
        return;
      }

      // Submit form
      const response = await submitAuditForm(formData, recaptchaToken);
      
      if (response.status_message === 'success') {
        setSubmitStatus({
          type: 'success',
          message: 'Formularul a fost trimis cu succes! Veți primi auditorul în maxim 24 de ore pe email.'
        });

        // Reset form
        setFormData({
          email: '',
          property_name: '',
          property_address: '',
          owner_name: '',
          phone_number: '',
          business_description: '',
          primary_marketing_goal: '',
          website_url: '',
          google_my_business_link: '',
          target_customer_segments: '',
          unique_selling_points: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.message || 'A apărut o eroare la trimiterea formularului.'
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'A apărut o eroare neașteptată. Vă rugăm să încercați din nou.'
      });
    } finally {
      setIsSubmitting(false);
      recaptchaRef.current?.reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Building2 className="mx-auto h-16 w-16 text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Audit Gratuit de Marketing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Obțineți un audit detaliat și personalizat pentru unitatea dumneavoastră de cazare. 
            Primești raportul complet în maxim 24 de ore pe email.
          </p>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>100% Gratuit</strong> • Audit personalizat • Fără obligații • Răspuns în 24h
            </p>
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus.type && (
          <Card className={`mb-8 ${submitStatus.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardContent className="p-6">
              <div className={`flex items-center gap-3 ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <AlertCircle className="h-6 w-6" />
                )}
                <p className="font-medium">{submitStatus.message}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form Errors */}
        {formErrors.length > 0 && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 text-red-800">
                <AlertCircle className="h-6 w-6 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-2">Vă rugăm să corectați următoarele erori:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {formErrors.map((error, index) => (
                      <li key={index} className="text-sm">{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle className="text-xl">Informații de Contact</CardTitle>
                  <CardDescription>Detaliile dumneavoastră de contact</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="owner_name" className="text-sm font-medium">
                    Numele proprietarului <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="owner_name" 
                    placeholder="Ex: Ion Popescu" 
                    className="h-11"
                    required
                    value={formData.owner_name}
                    onChange={(e) => handleInputChange('owner_name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number" className="text-sm font-medium">
                    Număr de telefon <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="phone_number" 
                    placeholder="Ex: +40 123 456 789" 
                    className="h-11"
                    required
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Adresa de email <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Ex: contact@hotel.ro" 
                  className="h-11"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Pe această adresă veți primi auditorul complet în maxim 24 de ore
                </p>
              </div>
              
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name={HONEYPOT_FIELD_NAME}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
            </CardContent>
          </Card>

          {/* Property Information */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-green-600" />
                <div>
                  <CardTitle className="text-xl">Informații despre Proprietate</CardTitle>
                  <CardDescription>Detalii despre unitatea de cazare</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="property_name" className="text-sm font-medium">
                  Numele unității de cazare <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="property_name" 
                  placeholder="Ex: Hotel Paradise, Pensiunea Casa cu Flori" 
                  className="h-11"
                  required
                  value={formData.property_name}
                  onChange={(e) => handleInputChange('property_name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_address" className="text-sm font-medium">
                  Adresa completă <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="property_address" 
                  placeholder="Ex: Str. Principală nr. 15, Brașov, România" 
                  className="h-11"
                  required
                  value={formData.property_address}
                  onChange={(e) => handleInputChange('property_address', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website_url" className="text-sm font-medium">
                  Website-ul unității (opțional)
                </Label>
                <Input 
                  id="website_url" 
                  placeholder="Ex: https://www.hotel-paradise.ro" 
                  className="h-11"
                  value={formData.website_url || ''}
                  onChange={(e) => handleInputChange('website_url', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google_my_business_link" className="text-sm font-medium">
                  Google My Business link (opțional)
                </Label>
                <Input 
                  id="google_my_business_link" 
                  placeholder="Ex: https://maps.google.com/..." 
                  className="h-11"
                  value={formData.google_my_business_link || ''}
                  onChange={(e) => handleInputChange('google_my_business_link', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <Send className="h-6 w-6 text-purple-600" />
                <div>
                  <CardTitle className="text-xl">Informații despre Afacere</CardTitle>
                  <CardDescription>Detalii care ne ajută să vă oferim cel mai bun audit</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="business_description" className="text-sm font-medium">
                  Descrierea afacerii <span className="text-red-500">*</span>
                </Label>
                <Textarea 
                  id="business_description" 
                  placeholder="Descrieți unitatea dumneavoastră: tipul (hotel, pensiune, apartament), numărul de camere, serviciile oferite, locația, etc."
                  className="min-h-[100px]"
                  required
                  value={formData.business_description}
                  onChange={(e) => handleInputChange('business_description', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary_marketing_goal" className="text-sm font-medium">
                  Obiectivul principal de marketing <span className="text-red-500">*</span>
                </Label>
                <Textarea 
                  id="primary_marketing_goal" 
                  placeholder="Ex: Vreau să cresc rezervările directe cu 30%, să atrag mai mulți turiști străini, să îmbunătățesc prezența online, etc."
                  className="min-h-[80px]"
                  required
                  value={formData.primary_marketing_goal}
                  onChange={(e) => handleInputChange('primary_marketing_goal', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target_customer_segments" className="text-sm font-medium">
                  Segmentul de clienți țintă (opțional)
                </Label>
                <Textarea 
                  id="target_customer_segments" 
                  placeholder="Ex: Familii cu copii, cupluri în luna de miere, turiști de afaceri, etc."
                  className="min-h-[60px]"
                  value={formData.target_customer_segments || ''}
                  onChange={(e) => handleInputChange('target_customer_segments', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unique_selling_points" className="text-sm font-medium">
                  Ce vă face unici? (opțional)
                </Label>
                <Textarea 
                  id="unique_selling_points" 
                  placeholder="Ex: Vedere la munte, spa inclus, mic dejun tradițional, locație centrală, etc."
                  className="min-h-[60px]"
                  value={formData.unique_selling_points || ''}
                  onChange={(e) => handleInputChange('unique_selling_points', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={RECAPTCHA_SITE_KEY}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              className="px-12 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Se trimite...
                </>
              ) : (
                <>
                  <Send className="mr-3 h-5 w-5" />
                  Trimite pentru Audit Gratuit
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Auditorul va fi generat și trimis pe email în maxim 24 de ore
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
