"use client";

import { forwardRef, useImperativeHandle } from 'react';

interface RecaptchaPlaceholderProps {
  sitekey: string;
  size?: 'normal' | 'invisible';
}

export interface RecaptchaPlaceholderRef {
  executeAsync: () => Promise<string>;
  reset: () => void;
}

const RecaptchaPlaceholder = forwardRef<RecaptchaPlaceholderRef, RecaptchaPlaceholderProps>(
  ({ size = 'normal' }, ref) => {
    useImperativeHandle(ref, () => ({
      executeAsync: async () => {
        // Return a dummy token for development
        return 'development-token-' + Date.now();
      },
      reset: () => {
        // No-op for placeholder
      }
    }));

    if (size === 'invisible') {
      return null;
    }

    return (
      <div className="flex items-center justify-center p-4 border border-gray-300 rounded bg-gray-50">
        <div className="text-sm text-gray-600">
          reCAPTCHA Placeholder (Development Mode)
        </div>
      </div>
    );
  }
);

RecaptchaPlaceholder.displayName = 'RecaptchaPlaceholder';

export default RecaptchaPlaceholder;
