import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import { ContactInfo } from '@/types';

interface ContactInfoFormProps {
  contactInfo: ContactInfo;
  onUpdate: (field: keyof ContactInfo, value: string) => void;
}

export function ContactInfoForm({ contactInfo, onUpdate }: ContactInfoFormProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <User className="h-6 w-6 text-blue-600" />
          <div>
            <CardTitle className="text-xl">Informații de Contact</CardTitle>
            <CardDescription>Datele dumneavoastră de contact</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Nume complet
            </Label>
            <Input
              id="fullName"
              placeholder="Ion Popescu"
              className="h-11"
              value={contactInfo.fullName}
              onChange={(e) => onUpdate('fullName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Număr de telefon
            </Label>
            <Input
              id="phone"
              placeholder="+40 123 456 789"
              className="h-11"
              value={contactInfo.phone}
              onChange={(e) => onUpdate('phone', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="contact@exemple.ro"
            className="h-11"
            value={contactInfo.email}
            onChange={(e) => onUpdate('email', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
} 