import Home from "./Home"
import Formulario from "./Formulario";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Formulario />} />
        </Routes>
    </Router>
  );
}

export default App;
