import styled from "@emotion/styled"
import { InputStyled } from "../../components/InputStyled";
import { Button, SvgIcon } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; 
import { CaixaEstruturaTasksSearch } from "../../components/CaixaEstruturaTasksSearch";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { BoxContent } from "../../components/BoxContent";
import { CreateSearchTask } from "../../components/CreateSearchTask";
import { ListTasks } from "../../components/ListTasks";


export default function TasksPage(){
    const [title_task, setTitle_task] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("EM ANDAMENTO");
    const [tasks, setTasks] = useState([]);
    const [check, setCheck] = useState("none");
    const { userLogged } = useContext(UserContext);

    const navigate = useNavigate();

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
        const config = {
            headers: {
              Authorization: `Bearer ${userLogged.token}`,
            },
        };
        try{
            if(status === "EM ANDAMENTO"){
                setStatus("CONCLUIDO");
                setCheck("block")
            } else{
                setStatus("EM ANDAMENTO");
                setCheck("none");
            }

            const body = {status};
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
    }, [userLogged.token, userLogged.user_id, title_task, description, status]);

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

    function nav(){
        navigate("/search");
    }

    return(
            <CaixaEstruturaTasksSearch>
                <Navbar>
                    <p>SeuToru List</p>
                    <Button onClick={nav} variant='contained' color='primary'>
                            Pesquisa
                    </Button>
                </Navbar>
                <BoxContent>
                    <CreateSearchTask>
                        <p> Criar Tarefas</p>
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
                    </CreateSearchTask>
                    <ListTasks>
                    {Array.isArray(tasks.tasks) && tasks.tasks.length > 0? (
                        tasks.tasks.map((t) => 
                            <BoxTask status={t.status} key={t._id}>
                                <SvgIcon component={CheckCircleIcon}viewBox="0 0 24 24" style={{ display: check, color: "green", margin: "10px"}}/>
                                <Content>
                                    <p >{t.title_task}</p>
                                    <p>{t.description}</p>
                                    <Button onClick={() => updateTask(t._id)} variant='contained' color='primary'>
                                        Update
                                    </Button>
                                    <Button onClick={() => deleteTask(t._id)} variant='contained' color='primary'>
                                        Delete
                                    </Button>
                                </Content>
                                
                            </BoxTask>)
                    ) : (
                    <p>Ainda não há nenhuma tarefa</p>
                    )}
                    </ListTasks>
                </BoxContent>
            </CaixaEstruturaTasksSearch>
    )
};

const FormTask = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BoxTask = styled.div`
    display: flex;
    margin: 10px;
    border-radius: 10px;
    padding: 10%;
    align-items: center;
    justify-content: space-evenly;
    background-color: white;
    text-decoration: ${(props) => (props.status !== "CONCLUIDO"?'none':'line-through')}
`;

const Content = styled.div`
    flex-direction: column
`