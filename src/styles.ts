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
    font-family: 'Inter', 'Roboto Mono', sans-serif;
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
    background: rgba(16, 185, 129, 0.3);
    color: white;
  }
`;

const InputCSS = css`
  padding: 14px 16px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: #e4e4e7;
  outline: none;
  transition: all 0.2s ease;
  &:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(16, 185, 129, 0.4);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
`;

export const Input = styled.input`
  height: 48px;
  ${InputCSS}
`;

export const Textarea = styled.textarea`
  ${InputCSS}
  resize: vertical;
  min-height: 80px;
`;

export const Select = styled.select`
  padding: 14px 16px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  color: #e4e4e7;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(16, 185, 129, 0.4);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  option {
    background: #1a1d25;
    color: #e4e4e7;
  }
`;

export const ButtonCSS = css<{ $gradient?: boolean }>`
  padding: 12px 22px;
  color: white;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
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
    background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%);
    border: 1px solid rgba(16, 185, 129, 0.3);
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
    &:hover, &:focus {
      background: linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%);
      border-color: rgba(16, 185, 129, 0.5);
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.2s ease;
`;
