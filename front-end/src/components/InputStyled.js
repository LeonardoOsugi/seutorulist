import styled from "@emotion/styled";
import { TextField } from "@mui/material";


export const InputStyled = styled(TextField)`
& .MuiInputBase-input {
  color: blue; // Cor do texto
}

& .MuiInputLabel-root {
  color: green; // Cor do rótulo
}

& .MuiInput-underline:before {
  border-bottom: 2px solid red; // Cor da linha inferior quando inativo
}

& .MuiInput-underline:hover:before {
  border-bottom: 2px solid orange; // Cor da linha inferior ao passar o mouse
}

& .MuiInput-underline:after {
  border-bottom: 2px solid purple; // Cor da linha inferior quando ativo
}

background-color: white;
border-radius: 10px;
margin-bottom: 20px;
`;