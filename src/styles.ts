import styled, { createGlobalStyle, css } from 'styled-components';

export const MOBILE = '@media (min-width: 400px)';
export const TABLET = '@media (min-width: 750px)';
export const DESKTOP = '@media (min-width: 1280px)';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
  }
  body {
    margin: 0;
    color: white;
    background: #090a0d;
    cursor: default;
  }
  h1, h2, h3, h4 {
    margin: 0;
  }
  body, input, button, textarea, pre, select {
    font-family: 'Roboto Mono', sans-serif;
    font-size: 14px;
  }
  #root {
    height: 100%;
  }
`;

const InputCSS = css`
  padding: 15px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  border: none;
  background: rgb(47 51 60);
  color: white;
  outline: none;
  transition: background .1s;
  &:focus {
    background: rgb(58 63 75);
  }
  &::placeholder {
    color: #6b7280;
  }
`;

export const Input = styled.input`
  height: 50px;
  ${InputCSS}
`;

export const Textarea = styled.textarea`
  ${InputCSS}
  resize: vertical;
`;

export const Select = styled.select`
  padding: 15px;
  width: 100%;
  border-radius: 10px;
  border: none;
  background: rgb(47 51 60);
  color: white;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  &:focus {
    background: rgb(58 63 75);
  }
`;

export const ButtonCSS = css<{$gradient?: boolean}>`
  padding: 12px 20px;
  color: white;
  background: rgba(47, 51, 60, 1);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background .1s;
  outline: none;
  font-weight: 500;
  &:hover, &:focus {
    background: rgba(58, 63, 75, 1);
  }
  &:disabled {
    cursor: default;
    background: rgba(58, 63, 75, .1)!important;
  }
  ${({ $gradient }) => $gradient && `
    background-image: linear-gradient(90deg, #059669 0%, #10b981 50%, #34d399 100%);
    &:hover, &:focus {
      background-image: linear-gradient(90deg, #047857 0%, #059669 50%, #10b981 100%);
    }
  `}
`;

export const Button = styled.button`
  ${ButtonCSS}
`;

export const SmallButton = styled.button`
  ${ButtonCSS}
  padding: 6px 12px;
  font-size: 12px;
`;
