'use client';
import { FC } from 'react';
import styles from './Header.module.css';
import { NAV_LIST } from '@/constants/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { SearchBar } from '../SearchBar';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store';

export const Header: FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      {pathname.includes('login') || pathname === '/' ? (
        <Icon name="umbrella" size={30} color="var(--color-accent)" />
      ) : (
        <>
          <SearchBar />
          <nav aria-label="Main navigation">
            <ul className={styles.navList}>
              {NAV_LIST.map((item) => (
                <li key={item.name}>
                  <Link href={item.link} className={pathname === item.link ? styles.active : ''}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
      {isAuthenticated && <Button title="Logout" onClick={logout} />}
    </header>
  );
};
