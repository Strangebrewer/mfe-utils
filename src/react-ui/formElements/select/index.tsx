import React, { FC } from 'react';
import "../formStyles.css";

type SelectProps = {
  name: string;
  value: any;
  onChange: (e: any) => any;
  full?: boolean | "true";
  children: React.ReactNode
}

const Select: FC<SelectProps> = ({
  name,
  value,
  onChange,
  full = false,
  children,
}) => {
  let className = 'bka-form-element bka-select';
  if (full === true || full === "true") className += ' bka-form-element-full';

  return (
    <select
      className={className}
      name={name}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default Select;
