import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function ChatbotButton() {
  return (
    <a
      href="https://10.63.225.145:8501/" 
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 flex items-center rounded-full shadow-lg bg-gradient-to-r from-primary to-accent text-white hover:opacity-95 transition z-50 group"
    >
      <div className="p-3">
        <MessageCircle size={22} />
      </div>


      <span
        className="whitespace-nowrap overflow-hidden max-w-0 opacity-0 translate-x-2 
                   group-hover:max-w-xs group-hover:opacity-100 group-hover:translate-x-0
                   transition-all duration-300 ease-in-out pr-4"
      >
        Ask our AP Police Smart Assistant
      </span>
    </a>
  );
}
