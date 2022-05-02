import Home from "./components/Home";
import {BrowserRouter, Routes, Link, Route} from "react-router-dom";
import { Nav } from "react-bootstrap";
import ListarAreas from "./components/ListarAreas";
import ListarDisciplinas from "./components/ListarDisciplinas";
import ListarCursos from "./components/ListarCursos";
import CadastrarPpcs from "./components/CadastrarPpcs";

function App() {
  return (
    <div className="App">
      <h1>Avacadabra do desespero</h1>
      <BrowserRouter>
      <Nav variant="tabs">
        <Nav.Link as={Link} to="/">Página inicial</Nav.Link>
        <Nav.Link as={Link} to="/areas">Cadastro de áreas</Nav.Link>
        <Nav.Link as={Link} to="/disciplinas">Cadastro de Disciplinas</Nav.Link>
        <Nav.Link as={Link} to="/cursos">Cadastro de Cursos</Nav.Link>
        <Nav.Link as={Link} to="/ppcs">Cadastro de Ppc's</Nav.Link>
      </Nav>

        <Routes>
          <Route path="/" index element={<Home/>}></Route>
          <Route path="/areas" element={<ListarAreas/>}></Route>
          <Route path="/disciplinas" element={<ListarDisciplinas/>}></Route>
          <Route path="/cursos" element={<ListarCursos/>}></Route>
          <Route path="/ppcs" element={<CadastrarPpcs/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
