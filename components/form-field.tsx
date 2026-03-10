import { Input } from './ui/input';
import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div>
      <label className="text-xs sm:text-sm font-medium mb-2 block">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function SimpleInput({ label, error, ...props }: SimpleInputProps) {
  return (
    <FormField label={label} error={error}>
      <Input {...props} className="text-xs sm:text-sm" />
    </FormField>
  );
}
