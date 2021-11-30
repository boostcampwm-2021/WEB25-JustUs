import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, textarea {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: "NanumGothic", sans-serif;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  html {
    @media screen and (max-width: 10000px) {
      font-size: 30px;
    }
    
    @media screen and (max-width: 6000px) {
      font-size: 24px;
    }

    @media screen and (max-width: 3000px) {
      font-size: 12px;
    }

    @media screen and (max-width: 2000px) {
      font-size: 10px;
    }

    @media screen and (max-width: 1440px) {
      font-size: 8px;
    }

    @media screen and (max-width: 1100px) {
      font-size: 6px;
    }

    @media screen and (max-width: 768px) {
      font-size: 4px;
    }
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .nanum-dacaesarang * {
    font-family: "NanumDaCaeSaRang", "NanumGothic", sans-serif;
  }
`;

export default GlobalStyle;
