import React, { FC } from "react";
import "../formStyles.css";

type InputProps = {
  type: string;
  name: string;
  value: any;
  onChange: (e: any) => any;
  full?: boolean | "true";
}

const Input: FC<InputProps> = ({
  type = 'text',
  name,
  value,
  onChange,
  full = false,
}) => {
  let className = 'bka-form-element';
  if (full === true || full === "true") className += ' bka-form-element-full';

  return (
    <input
      className={className}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
