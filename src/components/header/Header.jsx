import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">
            <img src="/Logo-Bar-Churreria-Carmelo.jpg" alt="Churrería Carmelo" />
          </Link>
        </div>

        {/* Desktop Navigation - Always visible en desktop */}
        <nav className="desktop-nav">
          <Link to="/">INICIO</Link>
          <Link to="/historia">NUESTRA HISTORIA</Link>
          <Link to="/carta">CARTA</Link>
          <Link to="/contacto">CONTACTO</Link>
          <Link to="/trabajanos">TRABAJA CON NOSOTROS</Link>
          <Link to="/rss">NEWS / RSS 📰</Link>
          <Link to="/blog">BLOG</Link>
        </nav>

        {/* Desktop CTA Button */}
        <div className="header-cta">
          <Link to="/pedido" className="cta-button">Pedir Ahora</Link>
        </div>

        {/* Mobile Menu Button - Solo visible en móvil */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setShowMenu(!showMenu)}
          type="button"
        >
          {showMenu ? '✕' : '☰'}
        </button>

        {/* Mobile Menu - Condicional */}
        {showMenu && (
          <div className="mobile-menu">
            <Link to="/" onClick={() => setShowMenu(false)}>🏠 INICIO</Link>
            <Link to="/historia" onClick={() => setShowMenu(false)}>📖 NUESTRA HISTORIA</Link>
            <Link to="/carta" onClick={() => setShowMenu(false)}>📋 CARTA</Link>
            <Link to="/contacto" onClick={() => setShowMenu(false)}>📞 CONTACTO</Link>
            <Link to="/trabajanos" onClick={() => setShowMenu(false)}>💼 TRABAJA CON NOSOTROS</Link>
            <Link to="/rss" onClick={() => setShowMenu(false)}>📰 NEWS / RSS</Link>
            <Link to="/blog" onClick={() => setShowMenu(false)}>✍️ BLOG</Link>
            <Link to="/pedido" onClick={() => setShowMenu(false)} className="mobile-cta">
              🛒 Pedir Ahora
            </Link>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;