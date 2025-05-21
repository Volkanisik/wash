import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FloatingElement, GlassPanel } from '@/components/ui/animations';
const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Ekspres Vask',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
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
              {submitted ? <div className="bg-green-dark/20 p-8 rounded-xl border border-green-light/30 text-center">
                  <div className="mb-4 text-5xl">✅</div>
                  <h3 className="text-2xl font-bold mb-2">Tak!</h3>
                  <p className="text-blue-100">
                    Vi har modtaget din forespørgsel og vender tilbage til dig inden for 2 timer.
                  </p>
                </div> : <form onSubmit={handleSubmit} className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-blue-100">Navn</label>
                      <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white placeholder:text-blue-300" placeholder="Dit navn" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-100">E-mail</label>
                      <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white placeholder:text-blue-300" placeholder="Din e-mail" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-blue-100">Telefon</label>
                      <input type="tel" id="phone" name="phone" value={formState.phone} onChange={handleChange} className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white placeholder:text-blue-300" placeholder="Dit telefonnummer" required />
                    </div>
                    <div>
                      <label htmlFor="service" className="block mb-2 text-sm font-medium text-blue-100">Service</label>
                      <select id="service" name="service" value={formState.service} onChange={handleChange} className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white" required>
                        <option value="Ekspres Vask">Ekspres Vask</option>
                        <option value="Premium Vask">Premium Vask</option>
                        <option value="Deluxe Detalje">Deluxe Detalje</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-blue-100">Besked</label>
                    <textarea id="message" name="message" value={formState.message} onChange={handleChange} rows={4} className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white placeholder:text-blue-300" placeholder="Fortæl os om din bil og dit foretrukne tidspunkt for service"></textarea>
                  </div>
                  
                  <button type="submit" className="w-full btn-secondary">
                    Book Nu
                  </button>
                </form>}
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