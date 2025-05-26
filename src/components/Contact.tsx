import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FloatingElement, GlassPanel } from '@/components/ui/animations';
import emailjs from '@emailjs/browser';
import { toast } from '@/hooks/use-toast';
import { Check, Loader2 } from 'lucide-react';

// EmailJS configuration constants
const EMAILJS_SERVICE_ID = 'service_x8eo1vk';  // Updated with the user's service ID
const EMAILJS_TEMPLATE_ID = 'template_4wlqy2s'; // Updated with the user's template ID
const EMAILJS_PUBLIC_KEY = 'cvmL39cnfHLFUikTD'; // Updated with the user's public key

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Ekspres Vask',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const formRef = useRef<HTMLFormElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    elementsRef.current.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      elementsRef.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);
  
  // Generate a unique booking reference
  const generateBookingReference = () => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BK-${dateStr}-${randomStr}`;
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    
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
    if (!validateForm()) {
      console.log('Form validation failed', errors);
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
      setBookingReference(reference);
      console.log('Generated booking reference:', reference);
      
      // Store in localStorage as backup
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const newBooking = { 
        ...formState, 
        reference, 
        date: new Date().toISOString(),
        status: 'pending'
      };
      
      bookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      console.log('Booking saved to localStorage');
      
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
      setSubmitted(true);
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
      try {
        const reference = generateBookingReference();
        setBookingReference(reference);
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const newBooking = { 
          ...formState, 
          reference, 
          date: new Date().toISOString(),
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
        bookings.push(newBooking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        console.log('Failed booking saved to localStorage for recovery');
      } catch (localStorageError) {
        console.error('Could not save to localStorage:', localStorageError);
      }
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
  
  return <section id="contact" className="bg-blue-dark text-white relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-green-400/5 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12 animate-on-scroll" ref={el => elementsRef.current[0] = el}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Book Din Vask</h2>
          <p className="text-lg mb-12 text-blue-100 max-w-2xl mx-auto">
            Klar til en pletfri bil? Planlæg din aftale, og vi kommer til dig.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll order-2 lg:order-1" ref={el => elementsRef.current[1] = el}>
            <GlassPanel opacity={0.1} blur="10px" glowColor="rgba(59, 130, 246, 0.15)" glowIntensity="medium" className="p-1">
              {submitted ? 
                <div className="bg-green-dark/20 p-8 rounded-xl border border-green-light/30 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-green/20 rounded-full flex items-center justify-center">
                      <Check className="w-8 h-8 text-green" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Tak!</h3>
                  <p className="text-blue-100 mb-4">
                    Vi har modtaget din forespørgsel og vender tilbage til dig inden for 2 timer.
                  </p>
                  <div className="bg-blue-900/40 p-4 rounded-lg mb-4 backdrop-blur-sm">
                    <p className="text-sm text-blue-100">Din booking reference</p>
                    <p className="text-xl font-mono tracking-wider">{bookingReference}</p>
                  </div>
                  <p className="text-sm text-blue-100">
                    Gem venligst denne reference i tilfælde af, at du har brug for at kontakte os angående din booking.
                  </p>
                </div> 
                : 
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
              }
            </GlassPanel>
          </div>
          
          <div className="lg:order-2 animate-on-scroll" ref={el => elementsRef.current[2] = el}>
            <GlassPanel opacity={0.1} blur="10px" glowColor="rgba(74, 222, 128, 0.15)" glowIntensity="light" className="p-8">
              <h3 className="text-2xl font-bold mb-6">Sådan Fungerer Det</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Book</h4>
                    <p className="text-blue-100">Planlæg din vask gennem vores formular eller mobilapp.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Vi Kommer Til Dig</h4>
                    <p className="text-blue-100">Vores mobile team ankommer til din lokation med alt udstyr.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Nyd</h4>
                    <p className="text-blue-100">Læn dig tilbage, mens vi forvandler din bil til en pletfri finish.</p>
                  </div>
                </div>
              </div>
              
              <FloatingElement duration={7} distance="10px" delay={0.5}>
                <div className="mt-8 pt-6 border-t border-blue-700/50">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">Brug for øjeblikkelig hjælp?</p>
                      <a href="tel:+1234567890" className="text-lg font-bold text-white hover:underline">40 32 04 18 
                    </a>
                    </div>
                  </div>
                </div>
              </FloatingElement>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;
