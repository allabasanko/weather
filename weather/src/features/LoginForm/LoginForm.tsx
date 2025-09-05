'use client';
import { FC, useEffect } from 'react';
import styles from './LoginForm.module.css';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginFormValues } from '@/types';
import { loginSchema } from '@/schemas';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export const LoginForm: FC = () => {
  const { isAuthenticated, login, error } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/today');
    }
  }, [isAuthenticated, router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('Form submitted:', data);
    login(data.username, data.password);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>
        Username:
        <Input placeholder="Username" {...register('username')} />
        {errors.username && <p className={styles.error}>{errors.username.message}</p>}
      </label>

      <label className={styles.label}>
        Password:
        <Input {...register('password')} placeholder="Password" type="password" />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </label>

      {error && <p className={styles.formError}>{error}</p>}

      <Button title="Login" type="submit" className={styles.button} />
    </form>
  );
};
