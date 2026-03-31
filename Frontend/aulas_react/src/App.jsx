import { BrowserRouter, Routes, Route } from "react-router-dom";
import Aula15_Login from "./components/Aula15_Login";
import Principal from './pages/Principal';
import Sobre from './pages/Sobre';
import NotFound from './pages/NotFound';
import Perfil from "./pages/Perfil";
import Inicio from "./pages/Inicio";
import Detalhes from "./pages/Detalhes";
import Contato from "./pages/Contato";
import Filmes from "./pages/Filmes";
import Filme from "./pages/Filme";


function App() {
    return (
        <BrowserRouter >
            <Routes>
                {/* Principais */}
                <Route path="/" element={<Principal/>} />
                <Route path="/Sobre" element={<Sobre/>} />
                <Route path="/Perfil/:nome" element={<Perfil/>}/>
                <Route path="*" element={<NotFound/>} />

                {/* Atividade */}
                <Route path="/Inicio" element={<Inicio/>}/>
                <Route path="/Detalhes" element={<Detalhes/>}/>
                <Route path="/Contato" element={<Contato/>}/>
                <Route path="/Filmes" element={<Filmes/>}/>
                <Route path="/Filmes/:nomeFilme" element={<Filme/>}/>
                <Route path="/login" element={<Aula15_Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;