import React, { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      const handleKeyDown = (event: KeyboardEvent) => {
        // Close on Escape
        if (event.key === 'Escape') {
          onClose();
          return;
        }

        // Trap focus
        if (event.key === 'Tab') {
          const modalElement = modalRef.current;
          if (!modalElement) return;

          // Fix: Use a type guard to ensure elements are HTMLElements and visible.
          // This correctly types `focusableElements` and allows accessing `offsetParent` and `focus`.
          const focusableElements = Array.from(
            modalElement.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter(
            (el): el is HTMLElement => el instanceof HTMLElement && el.offsetParent !== null
          );

          if (focusableElements.length === 0) {
            event.preventDefault();
            return;
          }

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
            }
          }
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);

      // Set initial focus to the first focusable element inside the modal.
      // A timeout ensures the modal is rendered before we try to focus.
      setTimeout(() => {
          const modalElement = modalRef.current;
          if (modalElement) {
              const firstFocusableElement = modalElement.querySelector<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
              );
              if (firstFocusableElement) {
                  firstFocusableElement.focus();
              } else {
                  modalElement.focus(); // Fallback to the modal container
              }
          }
      }, 100);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-bg-secondary rounded-lg shadow-xl w-full max-w-md m-4 p-6 border border-border-color relative transform transition-all focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="flex justify-between items-center pb-3 border-b border-border-color">
          <h3 id="modal-title" className="text-xl font-bold text-text-primary">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;