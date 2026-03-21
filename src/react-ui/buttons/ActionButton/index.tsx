import React, { FC } from "react";
import "./styles.css";

type ActionButtonProps = {
  iconClass: string;
  onClick: () => any;
  color?: 'blue' | 'red' | 'green';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ActionButton: FC<ActionButtonProps> = ({ iconClass, color = 'green', size = 'md', onClick }) => {
  const style: Obj = { fontSize: '12px' };
  if (size !== 'md')   {
    if (size === 'sm') style.fontSize = '9px';
    if (size === 'lg') style.fontSize = '15px';
    if (size === 'xl') style.fontSize = '18px';
  }
  
  return (
    <button
      style={style}
      className={`bka-action-btn bka-action-btn--${color}`}
      onClick={onClick}
    >
      <i className={iconClass} />
    </button>
  )
}

export default ActionButton;
