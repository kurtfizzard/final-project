import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`

:focus{
 outline: none; 
}

${reset};

body{
    background: #E5E5E5;
    font-family: 'Inter', sans-serif;
    line-height: 105%;
}

a{
    text-decoration: none;
}

`;

export default GlobalStyle;
