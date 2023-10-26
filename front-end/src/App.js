import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { ThemeProvider} from "@mui/material"
import { LightTheme } from './themes/Light';
import SignInPage from './pages/SignInPage/SigInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import TasksPage from './pages/TasksPage/TasksPage';
export default function App() {
  return (
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
  );
}
