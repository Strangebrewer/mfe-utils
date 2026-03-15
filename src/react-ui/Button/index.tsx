import React, { FC } from "react";
import "../theme.css";
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
  disabled = false,
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
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
