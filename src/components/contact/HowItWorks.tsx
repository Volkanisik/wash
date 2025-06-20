import { GlassPanel, FloatingElement } from '@/components/ui/animations';
const HowItWorks = () => {
  return <GlassPanel opacity={0.1} blur="10px" glowColor="rgba(74, 222, 128, 0.15)" glowIntensity="light" className="p-8">
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
              <p className="text-blue-150 font-extrabold text-xl text-left">Brug for øjeblikkelig hjælp?</p>
              <a href="tel:+4540320418" className="text-lg font-bold text-white hover:underline">40 32 04 18</a>
            </div>
          </div>
        </div>
      </FloatingElement>
    </GlassPanel>;
};
export default HowItWorks;