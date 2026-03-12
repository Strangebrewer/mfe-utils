import React, { FC } from "react";
import "./styles.css";

type ActionButtonProps = {
  iconClass: string;
  onClick: () => any;
  color?: 'blue' | 'red' | 'green';
}

const ActionButton: FC<ActionButtonProps> = ({ iconClass, color = 'green', onClick }) => {
  return (
    <button className={`bka-action-btn bka-action-btn--${color}`} onClick={onClick}>
      <i className={iconClass} />
    </button>
  )
}

export default ActionButton;
