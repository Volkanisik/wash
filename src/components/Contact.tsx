
import { useEffect, useRef, useState } from 'react';
import ContactForm from './contact/ContactForm';
import SuccessMessage from './contact/SuccessMessage';
import HowItWorks from './contact/HowItWorks';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
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

  const handleSubmitSuccess = (reference: string) => {
    setBookingReference(reference);
    setSubmitted(true);
  };
  
  return (
    <section id="contact" className="bg-blue-dark text-white relative overflow-hidden">
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
            {submitted ? (
              <SuccessMessage bookingReference={bookingReference} />
            ) : (
              <ContactForm onSubmitSuccess={handleSubmitSuccess} />
            )}
          </div>
          
          <div className="lg:order-2 animate-on-scroll" ref={el => elementsRef.current[2] = el}>
            <HowItWorks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
