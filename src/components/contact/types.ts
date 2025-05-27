
export interface FormState {
  name: string;
  email: string;
  phone: string;
  service: 'Ekspres Vask' | 'Premium Vask' | 'Deluxe Detalje';
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface ContactFormProps {
  onSubmitSuccess: (reference: string) => void;
}
