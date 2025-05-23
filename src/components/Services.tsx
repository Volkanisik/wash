import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FloatingElement, GlassPanel } from '@/components/ui/animations';
const services = [{
  title: "Ekspres Vask",
  description: "Hurtig udvendig vask og håndtørring for en skinnende ren bil på kun 20 minutter.",
  icon: "🚿",
  features: ["Udvendig Vask", "Hjul Rengøring", "Håndtørring", "Vinduespudsning"],
  glowColor: "rgba(59, 130, 246, 0.3)" // blue glow
}, {
  title: "Premium Vask",
  description: "Komplet indvendig og udvendig rengøring for et udstillingskvalitets-finish.",
  icon: "✨",
  features: ["Ekspres Vask +", "Indvendig Støvsugning", "Instrumentbræt Rengøring", "Dørkarme Rengøring"],
  glowColor: "rgba(74, 222, 128, 0.3)" // green glow
}, {
  title: "Deluxe Detalje",
  description: "Vores omfattende pakke med voksbehandling og premium indvendig behandling.",
  icon: "🌟",
  features: ["Premium Vask +", "Håndvoksning", "Læderbehandling", "Indvendig Detaljering"],
  glowColor: "rgba(139, 92, 246, 0.3)" // purple glow
}];
const Services = () => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState(-1);
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
  return;
};
export default Services;