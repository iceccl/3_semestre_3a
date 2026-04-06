import './Navbar.css'
import { Link } from 'react-router-dom';


function Navbar() {
  return(
    <header className='navbar'>
      <div className='navbar-conteudo'>
        {/* Logo / titulo */}
        <Link to='/' className='navbar-logo'>📈 Renda Fixa</Link>

        {/* Link de navegação */}
        <div className='navbar-links'>
          <Link to='/' className='navbar-link'>🧮 Calculadora</Link>
          <Link to='/sobre' className='navbar-link'>ℹ️ Sobre</Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar;