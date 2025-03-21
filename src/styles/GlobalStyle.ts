import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  img {
    width: 100%;
    border-radius: 8px;
  }

  input[type="text"] {
    padding: 10px;
    font-size: 16px;
    margin: 20px 0;
    width: 80%;
    max-width: 600px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .error {
    color: red;
    font-size: 18px;
    text-align: center;
  }

  /* Media Queries for responsiveness */
  @media (max-width: 768px) {
    body {
      padding: 10px;
    }

    input[type="text"] {
      width: 100%;
      max-width: none;
    }
  }

  @media (max-width: 480px) {
    input[type="text"] {
      font-size: 14px;
    }

    .error {
      font-size: 16px;
    }
  }
`;
