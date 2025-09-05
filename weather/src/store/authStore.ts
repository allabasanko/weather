import { loginUser } from '@/services/operations';
import { create } from 'zustand';
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  loading: boolean;

  setAuth: (token?: string) => void;
  login: (username: string, password: string) => void;
  getToken: () => string | null;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  error: null,
  loading: false,

  setAuth: (token?: string) => {
    if (token) {
      set({ isAuthenticated: true, token, error: null, loading: false });
    } else {
      set({ isAuthenticated: false, token: null, error: null, loading: false });
    }
  },

  login: async (username, password) => {
    try {
      set({ loading: true, error: null });
      const res = await loginUser(username, password);

      set({ isAuthenticated: true, token: res?.token, error: null, loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      set({
        isAuthenticated: false,
        token: null,
        error: message,
        loading: false,
      });
    }
  },

  getToken: () => {
    return localStorage.getItem('token') || null;
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, token: null });
  },
}));
