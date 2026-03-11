import React, { FC, useState } from "react";
import Modal from ".";

type ModalProps = {
  button: React.ElementType;
  text: string;
  children: React.ReactNode;
  onClose?: () => void;
  title?: string;
}

const ModalButton: FC<ModalProps> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  
  function toggleModal(bool: boolean) {
    if (typeof onClose === 'function' && !bool) onClose();
    setShowModal(bool);
  }

  const {
    button: Button,
    text,
    children,
    onClose,
    title,
  } = props;

  return (
    <>
      <Modal isOpen={showModal} close={() => toggleModal(false)}>
        {children}
      </Modal>

      <Button
        onClick={() => toggleModal(true)}
        title={title}
      >
        {text}
      </Button>
    </>
  )
}

export default ModalButton;