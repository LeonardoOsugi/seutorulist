import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoSignInUp from '../../components/LogoSignInUp';
import { CaixaEstruturaSignInUp } from '../../components/CaixaEstruturaSignInUp';
import { InputStyled } from '../../components/InputStyled';

export default function SignInPage(){

    return(
        <>
            <CaixaEstruturaSignInUp>
                <LogoSignInUp/>
                <CaixaSign >
                    <p>Faça seu Login</p>
                    <Form onSubmit="">
                        <InputStyled
                        type="email"
                        placeholder="E-mail"
                        />
                        <InputStyled
                        type="password"
                        placeholder="Senha"
                        />
                        <Button variant='contained' color='primary'>
                            Entrar
                        </Button>
                    </Form>
                    <Link to="/sign-up">
                        <p>Ainda não possui uma conta? Cadastre-se!</p>
                    </Link>
                </CaixaSign>
            </CaixaEstruturaSignInUp>
        </>
    )
}

const CaixaSign = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: cyan;
  padding-top: 20%;
  padding-bottom: 20%;
  padding-left: 15%;
  padding-right: 15%;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;