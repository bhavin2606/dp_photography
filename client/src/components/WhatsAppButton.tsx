
import { MessageCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const WhatsAppButton = () => {
  const message = encodeURIComponent("Hi! I'm interested in booking a photography session.");
  const whatsappLink = `https://wa.me/919876543210?text=${message}`;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
            aria-label="Contact on WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chat with us on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
