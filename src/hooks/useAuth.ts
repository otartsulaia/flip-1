import { useState, useCallback } from 'react';
import { AppUser, UserRole } from '../types';

const AUTH_KEY = 'simpler_crm_auth';

// Hardcoded users – change passwords here
const USERS: { username: string; password: string; role: UserRole; displayName: string }[] = [
  { username: 'admin', password: 'admin123', role: 'admin', displayName: 'Admin' },
  { username: 'kz', password: 'kz123', role: 'kz_manager', displayName: 'Kazakhstan Manager' },
];

function loadUser(): AppUser | null {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(loadUser);

  const login = useCallback((username: string, password: string): boolean => {
    const found = USERS.find(u => u.username === username && u.password === password);
    if (found) {
      const appUser: AppUser = { username: found.username, role: found.role, displayName: found.displayName };
      localStorage.setItem(AUTH_KEY, JSON.stringify(appUser));
      setUser(appUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  return { user, login, logout };
}
