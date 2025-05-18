
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const monthlyPlans = [
  {
    name: "Basic",
    price: 29,
    features: [
      "2 Express Washes per month",
      "Exterior cleaning",
      "Window cleaning",
      "Same-day service",
      "Mobile app access"
    ],
    popular: false
  },
  {
    name: "Standard",
    price: 49,
    features: [
      "2 Premium Washes per month",
      "Interior & exterior cleaning",
      "Tire dressing",
      "Dashboard conditioning",
      "Priority scheduling",
      "Mobile app access"
    ],
    popular: true
  },
  {
    name: "Premium",
    price: 79,
    features: [
      "2 Deluxe Details per month",
      "Complete interior & exterior",
      "Hand waxing",
      "Leather conditioning",
      "VIP scheduling",
      "Family plan options",
      "Mobile app access"
    ],
    popular: false
  }
];

const yearlyPlans = monthlyPlans.map(plan => ({
  ...plan,
  price: Math.floor(plan.price * 10)
}));

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  const plans = annual ? yearlyPlans : monthlyPlans;
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elementsRef.current.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      elementsRef.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="pricing" className="bg-white py-24">
      <div className="container-custom">
        <div 
          className="text-center mb-16 animate-on-scroll"
          ref={el => elementsRef.current[0] = el}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-blue to-blue-dark text-transparent bg-clip-text">Simple, Transparent Pricing</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue to-blue-dark rounded-full transform scale-x-50 origin-center"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Choose the plan that works best for you. All plans include our satisfaction guarantee.
          </p>
        </div>
        
        <div 
          className="flex justify-center mb-10 animate-on-scroll"
          ref={el => elementsRef.current[1] = el}
        >
          <div className="bg-gray-100/80 p-1 rounded-full flex backdrop-blur-sm">
            <button
              className={cn(
                "px-6 py-2 rounded-full transition-all duration-300",
                !annual ? "bg-white shadow-md text-blue-dark font-medium" : "text-gray-600"
              )}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={cn(
                "px-6 py-2 rounded-full transition-all duration-300",
                annual ? "bg-white shadow-md text-blue-dark font-medium" : "text-gray-600"
              )}
              onClick={() => setAnnual(true)}
            >
              Annual <span className="text-green text-xs ml-1">Save 15%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={cn(
                "rounded-2xl relative animate-on-scroll transition-all duration-500 foam-bubbles",
                "transform hover:-translate-y-2",
                plan.popular 
                  ? "bg-gradient-to-br from-blue/5 to-blue/20 shadow-[0_8px_30px_rgba(30,136,229,0.15)]" 
                  : "bg-white shadow-[0_0_15px_rgba(0,0,0,0.05)]"
              )}
              ref={el => elementsRef.current[index + 2] = el}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue to-blue-dark text-white px-6 py-2 rounded-lg shadow-lg text-sm font-medium">
                  Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className={cn(
                  "text-2xl font-bold mb-2",
                  plan.popular ? "text-blue" : "text-blue-dark"
                )}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 ml-1">/{annual ? 'year' : 'month'}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className={cn(
                        "w-5 h-5 flex-shrink-0 mr-3 mt-0.5",
                        plan.popular ? "text-blue" : "text-green"
                      )} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#contact" 
                  className={cn(
                    "relative overflow-hidden rounded-md w-full py-3 px-6 font-semibold transition-all duration-300 text-center block",
                    "hover:shadow-lg hover:scale-105 active:scale-95",
                    plan.popular 
                      ? "bg-blue text-white shadow-md" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  )}
                >
                  <span className="relative z-10">Get Started</span>
                  {plan.popular && (
                    <span className="absolute inset-0 bg-blue-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
