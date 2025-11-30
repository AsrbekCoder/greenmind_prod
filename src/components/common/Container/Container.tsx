import styles from "./Container.module.css";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "full";
}

export const Container = ({
  children,
  className = "",
  size = "large",
}: ContainerProps) => {
  const classes = [styles.container, styles[size], className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};
