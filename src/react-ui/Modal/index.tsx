import React, { FC } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, close, children }) => {
  if (!isOpen) return null;

  function onClickOutside(e: React.BaseSyntheticEvent) {
    if (e.target.className.includes('bka-modal-wrapper')) {
      close();
    }
  }

  const modalWrapper = () => {
    return (
      <div className="bka-modal-fade-in bka-modal-wrapper" onClick={onClickOutside}>
        <div className="bka-modal-fade-in bka-modal-body">'
          {children}
        </div>
      </div>
    )
  }
  return createPortal(modalWrapper(), document.body);
}

export default Modal;

