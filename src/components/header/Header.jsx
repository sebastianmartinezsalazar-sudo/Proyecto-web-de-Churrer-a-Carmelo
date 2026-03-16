import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">


        <div className="header-logo">
          <Link to="/">
            <img src="/Logo-Bar-Churreria-Carmelo.jpg" alt="Churrería Carmelo" />
          </Link>
        </div>


        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>


        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">INICIO</Link></li>
          <li><Link to="/historia">NUESTRA HISTORIA</Link></li>
          <li><Link to="/carta">CARTA</Link></li>
          <li><Link to="/contacto">CONTACTO</Link></li>
          <li><Link to="/trabajanos">TRABAJA CON NOSOTROS</Link></li>
          <li>
            <Link to="/rss">
              NEWS / RSS
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#e67e22" viewBox="0 0 16 16" style={{ marginLeft: '4px', verticalAlign: 'middle' }}>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-4a5.5 5.5 0 0 0-5.5 5.5H0A7.5 7.5 0 0 1 7.5 5v2zm0-4a9.5 9.5 0 0 0-9.5 9.5H2A11.5 11.5 0 0 1 13.5 3v2z" />
              </svg>
            </Link>
          </li>
          <li><Link to="/blog">BLOG</Link></li>


          <li className="mobile-cta">
            <Link to="/pedido">
              Pedir Ahora
            </Link>
          </li>
        </nav>


        <div className="header-cta">
          <Link to="/pedido" className="cta-button">
             Pedir Ahora
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;