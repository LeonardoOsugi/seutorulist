import styled from "@emotion/styled"
import { InputStyled } from "../../components/InputStyled";
import { Button } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";


export default function TasksPage(){
    const [title_task, setTitle_task] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("EM ANDAMENTO");
    const [tasks, setTasks] = useState([]);
    const { userLogged } = useContext(UserContext);

    const deleteTask = useCallback(async(id) => {
        console.log("deu certo?")
        const config = {
            headers: {
              Authorization: `Bearer ${userLogged.token}`,
            },
        };
        try{
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`, config);
        }catch(e){
            alert(e.response.data.message);
        }
    }, [userLogged.token]);

    const updateTask = useCallback(async(id) => {
        setStatus("CONCLUIDO");
        const config = {
            headers: {
              Authorization: `Bearer ${userLogged.token}`,
            },
        };

        const body = {status};
        try{
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`, body, config);
        }catch(e){
            alert(e.response.data.message);
        }
    },[userLogged.token, status]);

    const addTask = useCallback(async(e) => {
        const config = {
            headers: {
              Authorization: `Bearer ${userLogged.token}`,
            },
          };
        
        const body = {user_id: userLogged.user_id, title_task, description, status};

        try{
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/tasks`, body, config);
        }catch(e){
            
            alert(e.response.data.message);
        }
    }, [userLogged.token, userLogged.user_id, title_task, description, status])

    useEffect(() => {
        async function getTasks(){
            const config = {
                headers: {
                  Authorization: `Bearer ${userLogged.token}`,
                },
              };
            
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks`, config);
                setTasks(res.data);
            }catch(e){
                console.log("deu erro direto");
                alert(e.response.data.message);
            }
        }

        getTasks();
    },[userLogged.token, deleteTask, updateTask, addTask, tasks]);

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
                            <InputStyled
                            placeholder="title"
                            value={title_task}
                            onChange={(e) => setTitle_task(e.target.value)}
                            required/>
                            <InputStyled
                            placeholder="descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required/>
                            <Button onClick={addTask} variant='contained' color='primary'>
                                Criar Tarefa
                            </Button>
                        </FormTask>
                    </AddTask>
                    <List>
                    {Array.isArray(tasks.tasks) && tasks.tasks.length > 0? (
                        tasks.tasks.map((t) => 
                            <BoxTask status={t.status} key={t._id}>
                                <p >{t.title_task}</p>
                                <p>{t.description}</p>
                                <Button onClick={() => updateTask(t._id)} variant='contained' color='primary'>
                                    Update
                                </Button>
                                <Button onClick={() => deleteTask(t._id)} variant='contained' color='primary'>
                                    Delete
                                </Button>
                            </BoxTask>)
                    ) : (
                    <p>Ainda não há nenhuma tarefa</p>
                    )}
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
`;

const BoxTask = styled.div`
    background-color: white;
    text-decoration: ${(props) => (props.status === "CONCLUIDO"?'line-through':'none')}
`