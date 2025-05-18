
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
    <section id="pricing" className="bg-white">
      <div className="container-custom">
        <div 
          className="text-center mb-12 animate-on-scroll"
          ref={el => elementsRef.current[0] = el}
        >
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">
            Choose the plan that works best for you. All plans include our satisfaction guarantee.
          </p>
        </div>
        
        <div 
          className="flex justify-center mb-10 animate-on-scroll"
          ref={el => elementsRef.current[1] = el}
        >
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              className={cn(
                "px-6 py-2 rounded-md transition-all duration-300",
                !annual ? "bg-white shadow-md text-blue-dark" : "text-gray-600"
              )}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={cn(
                "px-6 py-2 rounded-md transition-all duration-300",
                annual ? "bg-white shadow-md text-blue-dark" : "text-gray-600"
              )}
              onClick={() => setAnnual(true)}
            >
              Annual <span className="text-green text-xs">Save 15%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={cn(
                "card border-2 relative animate-on-scroll foam-bubbles",
                plan.popular ? "border-blue" : "border-gray-100"
              )}
              ref={el => elementsRef.current[index + 2] = el}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue text-white px-4 py-1 rounded-bl-lg rounded-tr-md text-sm font-medium">
                  Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2 text-blue-dark">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-500 ml-1">/{annual ? 'year' : 'month'}</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-green flex-shrink-0 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="#contact" 
                className={cn(
                  "w-full py-3 px-6 rounded-md transition-all duration-300 text-center font-semibold",
                  plan.popular ? "bg-blue text-white hover:bg-blue-dark" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                )}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
