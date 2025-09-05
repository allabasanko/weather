import { FC } from 'react';

import styles from './Icon.module.css';

type Props = {
  name: string;
  color?: string;
  size?: number;
};

export const Icon: FC<Props> = ({ name, color = 'currentColor', size = 50 }) => {
  return (
    <svg className={styles.icon} color={color} width={size} height={size} aria-hidden="true">
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
};
