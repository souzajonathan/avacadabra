import Home from "./components/Home";
import {BrowserRouter, Routes, Link, Route} from "react-router-dom";
import Areas from "./components/Areas";
import Sobre from "./components/Sobre";
import { Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Minha Aplicação React</h1>
      <BrowserRouter>
      <Nav variant="tabs">
        <Nav.Link as={Link} to="/">Página inicial</Nav.Link>
        <Nav.Link as={Link} to="/areas">Cadastro de áreas</Nav.Link>
        <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
      </Nav>

        <Routes>
          <Route path="/" index element={<Home/>}></Route>
          <Route path="/areas" element={<Areas/>}></Route>
          <Route path="/sobre" element={<Sobre/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
