import styled from "@emotion/styled"
import { InputStyled } from "../../components/InputStyled";
import { Button } from "@mui/material";


export default function TasksPage(){
    return(
        <>
            <CaixaEstruturaTaks>
                <CaixaPesquisa>
                    <p>SeuToru List</p>
                    <Form>
                        <InputStyled
                        placeholder="Pesquise sua tarefa..."
                        />
                        <Button variant='contained' color='primary'>
                            Pesquisa
                        </Button>
                    </Form>
                </CaixaPesquisa>
                <CaixaConteudo>
                    <AddTask>
                        <p> Create Tasks with title_task, description</p>
                        <FormTask>
                            <InputStyled/>
                            <InputStyled/>
                            <Button variant='contained' color='primary'>
                                Criar Tarefa
                            </Button>
                        </FormTask>
                    </AddTask>
                    <List>
                        <p>Por enquanto não ha nem uma tarefa registrada...</p>
                    </List>
                </CaixaConteudo>
            </CaixaEstruturaTaks>
        </>
    )
};

const CaixaEstruturaTaks = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const CaixaPesquisa = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  color: cyan;
  font-size: 50px;
  padding: 30px;
`;

const Form = styled.div`
  justify-content: space-between;
`;

const CaixaConteudo = styled.div`
    display: flex;
    flex-direction: row;
    color: cyan;
`;

const AddTask = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: lightblue;
    color: black;
    padding: 20%;
    padding-bottom: 26%;
    p{
        margin-bottom: 20px;
    }
`;

const FormTask = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const List = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 10%;
`