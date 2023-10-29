import { Button, SvgIcon } from "@mui/material";
import { CaixaEstruturaTasksSearch } from "../../components/CaixaEstruturaTasksSearch";
import { Navbar } from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { BoxContent } from "../../components/BoxContent";
import { CreateSearchTask } from "../../components/CreateSearchTask";
import styled from "@emotion/styled";
import { InputStyled } from "../../components/InputStyled";
import { useCallback, useContext, useState } from "react";
import { ListTasks } from "../../components/ListTasks";
import UserContext from "../../context/UserContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; 
import axios from "axios";



export default function SearchPage(){
    const [title_task, setTitle_task] = useState("");
    const [status, setStatus] = useState("EM ANDAMENTO");
    const [check, setCheck] = useState("none");
    const [tasks, setTasks] = useState([]);

    const { userLogged } = useContext(UserContext);

    const navigate = useNavigate();
    function nav(){
        navigate("/tasks");
    }

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


    const findTask = useCallback(async() => {
        const config = {
            headers: {
              Authorization: `Bearer ${userLogged.token}`,
            },
          };

        try{
            const body = {title_task};
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/tasks-for-title`, body, config);
            setTasks(res.data);
        }catch(e){
            alert(e.response.data.message);
        }
    },[userLogged.token, title_task, tasks, deleteTask, updateTask]);

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
                                Pesquisar Tarefa
                        </Button>
                    </FormTask>
                </CreateSearchTask>
                <ListTasks>
                    {Array.isArray(tasks.tasks) && tasks.tasks.length > 0? (
                        tasks.tasks.map((t) => 
                       <BoxTask key={t._id}>
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
                        ):(
                            <p>Ainda não há nenhuma tarefa ou sua tarefa ainda não existe</p>
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