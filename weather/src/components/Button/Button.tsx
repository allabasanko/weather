import { FC, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  style?: string;
};

export const Button: FC<Props> = ({ title, style = '', className, type = 'button', ...props }) => {
  return (
    <button className={clsx(styles.button, className, style)} type={type} {...props}>
      {title}
    </button>
  );
};
