import { FC } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  children: React.ReactNode
}

const Modal: FC<ModalProps> = ({ open, children }) => {
  if (!open) return null;
  return createPortal(children, document.body);
}

export default Modal;

