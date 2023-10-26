import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Button, ThemeProvider} from "@mui/material"
import { LightTheme } from './themes/Light';
export default function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <Router>
        <Routes>
          <Route path="/sign-in" element={<Button variant='contained' color='primary'>Teste</Button>}/>
          <Route path="*" element={<Navigate to="/sign-in"/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
