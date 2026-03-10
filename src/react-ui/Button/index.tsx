import React, { FC } from "react";
import "./styles.css";

type ButtonProps = {
  text: string;
  variant: 'blue' | 'green' | 'red' | 'grey';
  small?: boolean;
  last?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  text,
  variant,
  small = false,
  last = false,
  onClick,
}) => {
  return (
    <button
      className={`
        button-base
        ${small ? 'button-small' : ''}
        ${last ? 'button-last' : ''}
        button-${variant}
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
