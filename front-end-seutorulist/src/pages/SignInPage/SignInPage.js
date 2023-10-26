import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LogoSignInUp from '../../components/LogoSignInUp';
import { CaixaEstruturaSignInUp } from '../../components/CaixaEstruturaSignInUp';
import { InputStyled } from '../../components/InputStyled';
import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import axios from 'axios';

export default function SignInPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setUserLogged} = useContext(UserContext);
    const navigate = useNavigate();

    function login(e){
        e.preventDefault();
        const body = { email, password };
        console.log(body);
        const promisse = axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-in`, body)
        console.log(promisse);
        promisse.then((res) => {
            alert("Login realizado com sucesso! :)");
            setUserLogged(res.data);
            console.log(res.data);
            navigate("/tasks");
        }).catch((e) => alert(e.response.data.message));
    }
    return(
        <>
            <CaixaEstruturaSignInUp>
                <LogoSignInUp/>
                <CaixaSign >
                    <p>Faça seu Login</p>
                    <Form onSubmit={login}>
                        <InputStyled
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        <InputStyled
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <Button type="submit"variant='contained' color='primary'>
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