
import { FormState, FormErrors } from './types';

// Generate a unique booking reference
export const generateBookingReference = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BK-${dateStr}-${randomStr}`;
};

// Form validation
export const validateForm = (formState: FormState): { isValid: boolean; errors: FormErrors } => {
  const newErrors: FormErrors = {};
  
  if (!formState.name.trim()) {
    newErrors.name = 'Navn er påkrævet';
  }
  
  if (!formState.email.trim()) {
    newErrors.email = 'E-mail er påkrævet';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
    newErrors.email = 'E-mail er ikke gyldig';
  }
  
  if (!formState.phone.trim()) {
    newErrors.phone = 'Telefon er påkrævet';
  } else if (!/^(\+\d{1,3}[- ]?)?\d{8,}$/.test(formState.phone)) {
    newErrors.phone = 'Telefon er ikke gyldig';
  }
  
  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors
  };
};

// Save booking to localStorage
export const saveBookingToLocalStorage = (formState: FormState, reference: string, status: 'pending' | 'failed', error?: string) => {
  try {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = { 
      ...formState, 
      reference, 
      date: new Date().toISOString(),
      status,
      ...(error && { error })
    };
    
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    console.log(`Booking saved to localStorage with status: ${status}`);
  } catch (localStorageError) {
    console.error('Could not save to localStorage:', localStorageError);
  }
};
