import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { ThemeProvider} from "@mui/material"
import { LightTheme } from './themes/Light';

import SignUpPage from './pages/SignUpPage/SignUpPage';
import TasksPage from './pages/TasksPage/TasksPage';
import UserContext from './context/UserContext';
import { useState } from 'react';
import SignInPage from './pages/SignInPage/SignInPage';
export default function App() {
  const [userLogged, setUserLogged] = useState(null);
  return (
    <UserContext.Provider value={{userLogged, setUserLogged}}>
      <ThemeProvider theme={LightTheme}>
        <Router>
          <Routes>
            <Route path="/sign-in" element={<SignInPage/>}/>
            <Route path="*" element={<Navigate to="/sign-in"/>}/>
            <Route path="/sign-up" element={<SignUpPage/>}/>
            <Route path="/tasks" element={<TasksPage/>}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
