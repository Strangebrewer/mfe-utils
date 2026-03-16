import React, { FC } from "react";
import "../formStyles.css";

type TextareaProps = {
  name: string;
  value: any;
  onChange: (e: any) => any;
  full?: boolean | "true";
};

const Textarea: FC<TextareaProps> = ({
  name,
  value,
  onChange,
  full = false,
}) => {
  return (
    <textarea
      className={`bka-form-element bka-textarea ${full ? 'bka-form-element-full' : ''}`}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Textarea;
