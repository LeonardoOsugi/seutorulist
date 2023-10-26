import styled from "@emotion/styled";
import { CaixaEstruturaSignInUp } from "../../components/CaixaEstruturaSignInUp";
import LogoSignInUp from "../../components/LogoSignInUp";
import { InputStyled } from "../../components/InputStyled";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function SignUpPage(){
    return(
        <>
            <CaixaEstruturaSignInUp>
                <LogoSignInUp/>
                <CaixaSignUp>
                    <p>Se Cadastre</p>
                    <Form>
                        <InputStyled
                        type="name"
                        placeholder="Nome"
                        />
                        <InputStyled
                        type="email"
                        placeholder="E-mail"
                        />
                        <InputStyled
                        type="password"
                        placeholder="Senha"
                        />
                        <Button variant='contained' color='primary'>
                            Cadastre-se
                        </Button>
                    </Form>
                    <br />
                    <Link to="/sign-in">
                        <p>Já possui conta? Faça login!</p>
                    </Link>
                </CaixaSignUp>
            </CaixaEstruturaSignInUp>
        </>
    )
};

const CaixaSignUp = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: cyan;
  padding-top: 20%;
  padding-bottom: 15%;
  padding-left: 15%;
  padding-right: 15%;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
