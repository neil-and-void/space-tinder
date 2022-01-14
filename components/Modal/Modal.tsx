import { useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.styles.css';

interface ModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        onClose();
      }}
      className="modal absolute h-screen w-screen top-0 left-0 z-20 grid place-items-center"
    >
      {children}
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal')
    );
  } else {
    return null;
  }
};

export default Modal;
