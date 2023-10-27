import styled from "@emotion/styled";
import { CaixaEstruturaSignInUp } from "../../components/CaixaEstruturaSignInUp";
import LogoSignInUp from "../../components/LogoSignInUp";
import { InputStyled } from "../../components/InputStyled";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const signUp = async (e) => {
        console.log("foi");
        e.preventDefault()
        const dadosCadastro = {name, email, password}
        setLoading(true)

        try{    

        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`, dadosCadastro)
        console.log(process.env.REACT_APP_API_BASE_URL)
        
        } catch (err){       
            alert(err.response)
            setLoading(false)
            return;
        }    
        
        setLoading(false)
        navigate("/sign-in")
    
    }
    return(
        <>
            <CaixaEstruturaSignInUp>
                <LogoSignInUp/>
                <CaixaSignUp>
                    <p>Se Cadastre</p>
                        <InputStyled
                        type="name"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
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
                        <Register isLoading={loading}>
                        {loading ? (
                            <ThreeDots 
                                height="40"
                                width="40"
                                color="#ffffff"
                            />
                        ):(
                            <Button onClick={signUp} variant='contained' color='primary'>
                                Cadastre-se
                            </Button>
                        )}
                        </Register>
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

// const Form = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 20px;
// `;

const Register = styled.div`
    align-items: center;
`;
