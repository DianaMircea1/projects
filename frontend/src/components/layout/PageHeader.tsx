import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function PageHeader({ title, description, icon: Icon, iconColor = "text-blue-600" }: PageHeaderProps) {
  return (
    <div className="text-center mb-12">
      <Icon className={`mx-auto h-16 w-16 ${iconColor} mb-4`} />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
} 