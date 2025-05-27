
import { Check } from 'lucide-react';

interface SuccessMessageProps {
  bookingReference: string;
}

const SuccessMessage = ({ bookingReference }: SuccessMessageProps) => {
  return (
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
  );
};

export default SuccessMessage;
