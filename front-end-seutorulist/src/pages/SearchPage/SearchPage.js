import { Button } from "@mui/material";
import { CaixaEstruturaTasksSearch } from "../../components/CaixaEstruturaTasksSearch";
import { Navbar } from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { BoxContent } from "../../components/BoxContent";
import { CreateSearchTask } from "../../components/CreateSearchTask";
import styled from "@emotion/styled";
import { InputStyled } from "../../components/InputStyled";
import { useCallback, useState } from "react";



export default function SearchPage(){
    const [title_task, setTitle_task] = useState("");

    const navigate = useNavigate();
    function nav(){
        navigate("/tasks");
    }

    const findTask = useCallback(async() => {

    },[]);

    return(
        <CaixaEstruturaTasksSearch>
            <Navbar>
                <p>SeuToru List</p>
                <Button onClick={nav} variant='contained' color='primary'>
                    Voltar para Tasks 
                </Button>
            </Navbar>
            <BoxContent>
                <CreateSearchTask>
                    <p>Procurar tarefa</p>
                    <FormTask>
                        <InputStyled
                        placeholder="title"
                        value={title_task}
                        onChange={(e) => setTitle_task(e.target.value)}
                        required/>
                        <Button onClick={findTask} variant='contained' color='primary'>
                                Criar Tarefa
                        </Button>
                    </FormTask>
                </CreateSearchTask>
            </BoxContent>
        </CaixaEstruturaTasksSearch>
    )
};

const FormTask = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;