import styles from "./Card.module.css";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  bordered?: boolean;
  padding?: "none" | "small" | "medium" | "large";
}

export const Card = ({
  children,
  className = "",
  hover = true,
  bordered = false,
  padding = "medium",
}: CardProps) => {
  const classes = [
    styles.card,
    hover && styles.hover,
    bordered && styles.bordered,
    styles[`padding-${padding}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};
