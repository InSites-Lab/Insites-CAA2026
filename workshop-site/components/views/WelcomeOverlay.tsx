import React, { useEffect, useState } from 'react';
import { Modal } from '../common';
import { AboutView } from './AboutView';
import { Cpu } from 'lucide-react';

export interface WelcomeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (route: string) => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  const handleNavigate = (route: string) => {
    onClose(); // Close the modal first
    if (onNavigate) {
      onNavigate(route);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-2xl"
      title={
        <div className="flex items-center gap-3 w-full" dir="ltr">
          <div className="p-1.5 bg-indigo-600 text-white rounded-lg shadow-sm shrink-0">
            <Cpu size={18} />
          </div>
          <div>
            <h2 className="font-black text-base text-slate-600 leading-tight">
              Resource Center — InSites-CAA Workshop — Cultural Significance Assessment with AI            </h2>
            <p className="text-sm text-slate-500 font-medium">
              InSites Lab • Faculty of Architecture, Technion
            </p>
          </div>
        </div>
      }
    >
      <AboutView onNavigate={handleNavigate} hideHeader />
    </Modal>
  );
};

export default WelcomeOverlay;
