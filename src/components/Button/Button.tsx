import cn from "classnames";
import React, { FC, ReactNode } from "react";
import styles from "./button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  variant?: "primary" | "success";
};

const Button: FC<ButtonProps> = ({
  icon,
  children,
  variant = "primary",
  ...props
}) => {
  return (
    <button className={cn(styles.button, styles[variant])} {...props}>
      <span className={styles.icon}>{icon}</span>
      <span>{children}</span>
    </button>
  );
};

export default Button;
