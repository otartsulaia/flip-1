import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
  }
  body {
    margin: 0;
    color: #e4e4e7;
    background: linear-gradient(145deg, #050507 0%, #0a0d14 50%, #080b12 100%);
    background-attachment: fixed;
    cursor: default;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4 {
    margin: 0;
    color: #fafafa;
  }
  body, input, button, textarea, pre, select {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
  #root {
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  ::selection {
    background: rgba(0, 122, 255, 0.3);
    color: white;
  }
`;

const InputCSS = css`
  padding: 12px 14px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: #e4e4e7;
  outline: none;
  transition: all 0.2s ease;
  &:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 122, 255, 0.5);
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.12);
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
`;

export const Input = styled.input`
  height: 44px;
  ${InputCSS}
`;

export const Textarea = styled.textarea`
  ${InputCSS}
  resize: vertical;
  min-height: 80px;
`;

export const Select = styled.select`
  padding: 12px 14px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  color: #e4e4e7;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 122, 255, 0.5);
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.12);
  }
  option {
    background: #1a1d25;
    color: #e4e4e7;
  }
`;

export const ButtonCSS = css<{ $gradient?: boolean }>`
  padding: 10px 20px;
  color: white;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  font-weight: 500;
  backdrop-filter: blur(10px);
  &:hover, &:focus {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.15);
  }
  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
  ${({ $gradient }) =>
    $gradient &&
    `
    background: #007AFF;
    border: 1px solid rgba(0, 122, 255, 0.4);
    box-shadow: 0 2px 12px rgba(0, 122, 255, 0.25);
    &:hover, &:focus {
      background: #0066DD;
      border-color: rgba(0, 122, 255, 0.6);
      box-shadow: 0 4px 16px rgba(0, 122, 255, 0.35);
    }
  `}
`;

export const Button = styled.button`
  ${ButtonCSS}
`;

export const SmallButton = styled.button`
  ${ButtonCSS}
  padding: 6px 14px;
  font-size: 12px;
  border-radius: 8px;
`;

export const GlassCard = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 20px;
  transition: all 0.2s ease;
`;
