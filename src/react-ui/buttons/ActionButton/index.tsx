import React, { FC } from "react";
import "./styles.css";

type ActionButtonProps = {
  iconClass: string;
  color: 'blue' | 'red' | 'green';
}

const ActionButton: FC<ActionButtonProps> = ({ iconClass, color = 'green', ...rest }) => {
  return (
    <button className={`bka-action-btn bka-action-btn--${color}`} {...rest}>
      <i className={iconClass} />
    </button>
  )
}

export default ActionButton;
