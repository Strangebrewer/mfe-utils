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
  let className = 'bka-form-element bka-textarea';
  if (full === true || full === "true") className += ' bka-form-element-full';

  return (
    <textarea
      className={className}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Textarea;
