import React from 'react';
import { CRM } from './CRM';
import { LoginPage } from './components/LoginPage';
import { GlobalStyle } from './styles';
import { useAuth } from './hooks/useAuth';

export function App() {
  const { user, login, logout } = useAuth();

  return (
    <>
      <GlobalStyle />
      {user ? (
        <CRM user={user} onLogout={logout} />
      ) : (
        <LoginPage onLogin={login} />
      )}
    </>
  );
}
