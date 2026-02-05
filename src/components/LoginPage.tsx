import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from '../styles';
import { useLanguage } from '../hooks/useLanguage';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  backdrop-filter: blur(30px);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 40px 36px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const LogoImg = styled.img`
  height: 36px;
  width: auto;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #fafafa;
  margin: 0;
  span {
    color: #007AFF;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  margin-bottom: 4px;
  display: block;
`;

const ErrorMsg = styled.div`
  color: #FF3B30;
  font-size: 13px;
  text-align: center;
  padding: 10px;
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.2);
  border-radius: 10px;
`;

const LangRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const LangBtn = styled.button<{ $active?: boolean }>`
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid ${({ $active }) => $active ? 'rgba(0, 122, 255, 0.4)' : 'rgba(255, 255, 255, 0.08)'};
  background: ${({ $active }) => $active ? 'rgba(0, 122, 255, 0.15)' : 'transparent'};
  color: ${({ $active }) => $active ? '#007AFF' : 'rgba(255, 255, 255, 0.4)'};
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  outline: none;
`;

interface LoginPageProps {
  onLogin: (username: string, password: string) => boolean;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const { lang, setLang, t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError(true);
    }
  };

  return (
    <Wrapper>
      <Card>
        <LogoRow>
          <LogoImg src="/simpler-logo.svg" alt="simpler.ge" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <Title>simpler<span>.ge</span> CRM</Title>
        </LogoRow>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMsg>{t('loginError')}</ErrorMsg>}

          <div>
            <Label>{t('username')}</Label>
            <Input
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(false); }}
              placeholder={t('username')}
              autoFocus
              required
            />
          </div>

          <div>
            <Label>{t('password')}</Label>
            <Input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              placeholder={t('password')}
              required
            />
          </div>

          <Button type="submit" $gradient style={{ width: '100%', padding: '14px', marginTop: 8 }}>
            {t('login')}
          </Button>
        </Form>

        <LangRow>
          <LangBtn $active={lang === 'ka'} onClick={() => setLang('ka')}>KA</LangBtn>
          <LangBtn $active={lang === 'en'} onClick={() => setLang('en')}>EN</LangBtn>
        </LangRow>
      </Card>
    </Wrapper>
  );
}
