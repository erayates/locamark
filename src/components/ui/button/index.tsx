import { forwardRef } from "react";
import styles from "./style.module.css";

interface ButtonOptions {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  tooltip?: string;
}

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const { type = "button", children, color = 'primary', size = 'md', rounded = 'md', tooltip, ...rest } = props;

  const colorClass = styles[`btn-${color}`];
  const sizeClass = styles[`btn-${size}`];
  const roundedClass = styles[`rounded-${rounded}`];

  return (
    <div className={styles.tooltip}>
      <button
        type={type}
        ref={ref}
        className={`${styles.btn} ${colorClass} ${sizeClass} ${roundedClass}`}
        {...rest}
      >
        {children}
      </button>
      {tooltip && <span className={styles.tooltiptext}>{tooltip}</span>}
    </div>
  );
});

Button.displayName = "Button";
export default Button;