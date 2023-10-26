import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<p>Página inicial</p>}/>
        <Route path="*" element={<Navigate to="/sign-in"/>}/>
      </Routes>
    </Router>
  );
}
