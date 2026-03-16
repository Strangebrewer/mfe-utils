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
  return (
    <input
      className={`bka-form-element ${full ? 'bka-form-element-full' : ''}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
