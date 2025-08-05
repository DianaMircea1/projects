import { useState, useCallback } from 'react';
import { AuditFormData } from '@/types';
import { AuditService } from '@/services/auditService';

interface UseFormValidationReturn {
  errors: string[];
  isValid: boolean;
  validateForm: (formData: AuditFormData) => Promise<void>;
  clearErrors: () => void;
}

export const useFormValidation = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const validateForm = useCallback(async (formData: AuditFormData) => {
    const validation = await AuditService.validateForm(formData);
    setErrors(validation.errors);
    setIsValid(validation.isValid);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
    setIsValid(false);
  }, []);

  return {
    errors,
    isValid,
    validateForm,
    clearErrors
  };
};
