
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { GlassPanel } from '@/components/ui/animations';
import emailjs from '@emailjs/browser';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { FormState, FormErrors, ContactFormProps } from './types';
import { validateForm, generateBookingReference, saveBookingToLocalStorage } from './utils';

// EmailJS configuration constants
const EMAILJS_SERVICE_ID = 'service_x8eo1vk';
const EMAILJS_TEMPLATE_ID = 'template_4wlqy2s';
const EMAILJS_PUBLIC_KEY = 'cvmL39cnfHLFUikTD';

const ContactForm = ({ onSubmitSuccess }: ContactFormProps) => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: 'Ekspres Vask',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('EmailJS Config:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      publicKey: EMAILJS_PUBLIC_KEY ? 'Present' : 'Missing'
    });
    
    // Validate form
    const validation = validateForm(formState);
    if (!validation.isValid) {
      console.log('Form validation failed', validation.errors);
      setErrors(validation.errors);
      
      // Shake the form slightly to indicate error
      if (formRef.current) {
        formRef.current.classList.add('animate-shake');
        setTimeout(() => {
          formRef.current?.classList.remove('animate-shake');
        }, 500);
      }
      
      toast({
        title: "Udfyld venligst alle felter",
        description: "Nogle felter mangler eller er ugyldige",
        variant: "destructive"
      });
      
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Generate a booking reference
      const reference = generateBookingReference();
      console.log('Generated booking reference:', reference);
      
      // Store in localStorage as backup
      saveBookingToLocalStorage(formState, reference, 'pending');
      
      // Format date for better display
      const today = new Date();
      const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
      
      // Send email via EmailJS
      const templateParams = {
        from_name: formState.name,
        service_selection: formState.service,
        reply_to: formState.email,
        phone: formState.phone,
        message: formState.message,
        booking_reference: reference,
        booking_date: formattedDate
      };
      
      console.log('Sending email with params:', templateParams);
      
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('EmailJS response:', response);
      
      // Show success message
      onSubmitSuccess(reference);
      toast({
        title: "Booking modtaget!",
        description: "Vi bekræfter din aftale snarest.",
        variant: "default"
      });
      
      // Clear form
      setFormState({
        name: '',
        email: '',
        phone: '',
        service: 'Ekspres Vask',
        message: ''
      });
      
    } catch (error) {
      console.error('Booking submission error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      // More specific error messages
      let errorMessage = "Vi kunne ikke modtage din booking. Prøv igen senere eller ring til os.";
      
      if (error instanceof Error) {
        if (error.message.includes('network')) {
          errorMessage = "Netværksfejl. Tjek din internetforbindelse og prøv igen.";
        } else if (error.message.includes('403') || error.message.includes('401')) {
          errorMessage = "Autoriseringsfejl. Kontakt os direkte på telefon.";
        } else if (error.message.includes('400')) {
          errorMessage = "Der er et problem med formularen. Kontakt os direkte.";
        }
      }
      
      toast({
        title: "Der opstod en fejl",
        description: errorMessage,
        variant: "destructive"
      });
      
      // Still save to localStorage as backup
      const reference = generateBookingReference();
      saveBookingToLocalStorage(formState, reference, 'failed', error instanceof Error ? error.message : 'Unknown error');
      
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add subtle water ripple effect for inputs when focused
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.classList.add('water-ripple');
    setTimeout(() => {
      e.target.classList.remove('water-ripple');
    }, 1000);
  };

  return (
    <GlassPanel opacity={0.1} blur="10px" glowColor="rgba(59, 130, 246, 0.15)" glowIntensity="medium" className="p-1">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-blue-100">Navn</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formState.name} 
              onChange={handleChange}
              onFocus={handleFocus}
              className={cn(
                "w-full p-3 bg-blue-900/50 rounded-md border text-white placeholder:text-blue-300 transition-all duration-300 focus:glow-blue", 
                errors.name ? "border-red-500" : "border-blue-700"
              )}
              placeholder="Dit navn" 
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-100">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formState.email} 
              onChange={handleChange}
              onFocus={handleFocus}
              className={cn(
                "w-full p-3 bg-blue-900/50 rounded-md border text-white placeholder:text-blue-300 transition-all duration-300 focus:glow-blue",
                errors.email ? "border-red-500" : "border-blue-700"
              )}
              placeholder="Din e-mail" 
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-blue-100">Telefon</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formState.phone} 
              onChange={handleChange}
              onFocus={handleFocus}
              className={cn(
                "w-full p-3 bg-blue-900/50 rounded-md border text-white placeholder:text-blue-300 transition-all duration-300 focus:glow-blue",
                errors.phone ? "border-red-500" : "border-blue-700"
              )}
              placeholder="Dit telefonnummer" 
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="service" className="block mb-2 text-sm font-medium text-blue-100">Service</label>
            <select 
              id="service" 
              name="service" 
              value={formState.service} 
              onChange={handleChange}
              onFocus={handleFocus}
              className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white transition-all duration-300 focus:glow-blue" 
              required
            >
              <option value="Ekspres Vask">Ekspres Vask</option>
              <option value="Premium Vask">Premium Vask</option>
              <option value="Deluxe Detalje">Deluxe Detalje</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-blue-100">Besked</label>
          <textarea 
            id="message" 
            name="message" 
            value={formState.message} 
            onChange={handleChange}
            onFocus={handleFocus}
            rows={4} 
            className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white placeholder:text-blue-300 transition-all duration-300 focus:glow-blue" 
            placeholder="Fortæl os om din bil og dit foretrukne tidspunkt for service"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className={cn(
            "w-full btn-secondary relative overflow-hidden group", 
            isLoading ? "opacity-80" : ""
          )}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sender...</span>
              </>
            ) : "Book Nu"}
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0 bg-green-dark/50 transition-all duration-300 group-hover:h-full"></span>
        </button>
      </form>
    </GlassPanel>
  );
};

export default ContactForm;
