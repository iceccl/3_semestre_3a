import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Calculadora from './pages/Calculadora'
import Sobre from './pages/Sobre'

function App() {
  return(
    // Habilita o sistema de navegação por rotas
    <BrowserRouter>
      {/* Barra de navegação, para aparecer em todas as paginas */}
      <Navbar />

      <main className='conteudo-principal'>
        <Routes>
          <Route path='/' element={<Calculadora/>}/>
          <Route path='/sobre' element={<Sobre/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;