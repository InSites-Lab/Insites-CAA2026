import React from 'react';
import { Modal } from '../common/Modal';
import { WorkshopProgramView } from '../views/WorkshopProgramView';

export interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (route: string) => void;
  workshopPanel?: React.ReactNode;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ isOpen, onClose, onNavigate, workshopPanel }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Workshop Presentation" fullscreen>
    <WorkshopProgramView onNavigate={onNavigate} workshopPanel={workshopPanel} />
  </Modal>
);
