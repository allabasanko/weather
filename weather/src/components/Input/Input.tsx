import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  style?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(({ style = '', className, ...props }, ref) => {
  return <input ref={ref} className={clsx(styles.input, className, style)} {...props} />;
});

Input.displayName = 'Input';
