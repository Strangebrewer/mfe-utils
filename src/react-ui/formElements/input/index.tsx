import React, { FC } from "react";
import "../formStyles.css";

type InputProps = {
  type: string;
  name: string;
  value: any;
  onChange: (e: any) => any;
  full?: boolean | "true";
  autofocus?: boolean;
}

const Input: FC<InputProps> = ({
  type = 'text',
  name,
  value,
  onChange,
  full = false,
  autofocus = false,
}) => {
  const addedProps: Obj = {};
  if (autofocus) addedProps.autoFocus = autofocus;
  return (
    <input
      className={`bka-form-element ${full ? 'bka-form-element-full' : ''}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...addedProps}
    />
  );
};

export default Input;
