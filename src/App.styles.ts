import styled, { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background: ##ddedfb;
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
  * {
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    color: #fff;
  }
  .score {
    color: #000;
    font-size: 1rem;
    margin: 1em 0;
  }
  h1 {
    font-family: 'Oswald', sans-serif;
    font-color: #000;
    font-weight: 400;
    background-size: 100%;   
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }
  .start, .next {
    cursor: pointer;
    background: #f1edc6fa;
    border: transparent;
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
    font-weight:600;
  }
  .start {
    max-width: 200px;
  }
`;