import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FieldError } from "react-hook-form";
import styles from "./style.module.css";

type InputProps = {
  name: string;
  label: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, type = "text", ...props }) => {
    const { control, formState: { errors } } = useFormContext();
    const error = errors[name] as FieldError | undefined;
    return (
      <div className={styles.inputContainer}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={name}
              type={type}
              className={`${styles.input} ${error ? styles.errorInput : ""}`}
              {...field}
              {...props}
            />
          )}
        />
        {error && <span className={styles.errorText}>{error.message}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };