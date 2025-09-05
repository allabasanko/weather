import { FC } from 'react';
import styles from './ForecastTimeSelect.module.css';
type Props = {
  variant: 'hourly' | 'daily';
  value: number;
  onChange: (value: number) => void;
};

export const ForecastTimeSelect: FC<Props> = ({ variant, value, onChange }) => {
  const options = variant === 'hourly' ? [6, 12, 24, 48] : [1, 3, 5, 7];

  return (
    <select className={styles.select} value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt} {variant === 'hourly' ? 'hours' : 'days'}
        </option>
      ))}
    </select>
  );
};
