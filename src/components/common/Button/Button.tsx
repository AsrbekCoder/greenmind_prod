import React from "react";
import styles from "./Button.module.css";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  variant = "primary",
  size = "medium",
  children,
  isLoading = false,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    isLoading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? <span className={styles.spinner}></span> : children}
    </button>
  );
};
